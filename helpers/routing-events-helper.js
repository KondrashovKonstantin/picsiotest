import axios from 'axios';
import {VM} from 'vm2';
import {HttpError} from './http-error.js';
import {
    AVAILABLE_CONSOLE_METHODS, AVAILABLE_HTTP_METHODS, 
    DESTINATION_ERRORS, STRATEGY_TYPES, TRANSPORT_TYPES
} from "./constants.js";
import DEFAULT_DESTINATIONS from './get-destinations.js';

export const getAllDestinations = (possibleDestinations) => {
    const destinations = [];
    possibleDestinations.forEach(destinationsObject => {
        Object.entries(destinationsObject).forEach(([key, value]) => {
            if (!destinations.find(destination => destination.name === key)) {
                const destination = DEFAULT_DESTINATIONS.find(destination => destination.name === key) ||
                    {name: key, error: DESTINATION_ERRORS.NOT_FOUND(key)};
                destinations.push(destination)
            }
        });
    });
    return destinations;
}

const getDestinationsForAnyStrategy = (possibleDestinations) => {
    const destinations = [];
    possibleDestinations.forEach(destinationsObject => {
        Object.entries(destinationsObject).forEach(([key, value]) => {
            if (value && !destinations.find(destination => destination.name === key)) {
                const destination = DEFAULT_DESTINATIONS.find(destination => destination.name === key) ||
                    {name: key, error: DESTINATION_ERRORS.NOT_FOUND(key)};
                destinations.push(destination)
            }
        });
    });
    return destinations;
};

const getDestinationsForAllStrategy = (possibleDestinations) => {
    const destinations = [];
    possibleDestinations.forEach(destinationsObject => {
        Object.entries(destinationsObject).forEach(([key, value]) => {
            const addedDestinationIndex = destinations.findIndex(destination => destination.name === key);
            if (addedDestinationIndex === -1) {
                const destination = DEFAULT_DESTINATIONS.find(destination => destination.name === key) ||
                    {name: key, error: DESTINATION_ERRORS.NOT_FOUND(key)};
                destination.isForRemove = !value;
                destinations.push(destination)
            } else if (!value) {
                destinations[addedDestinationIndex].isForRemove = true;
            }
        });
    });
    return destinations.filter(destination => destination.isForRemove === false);
};

export const getDestinations = ({possibleDestinations, strategy = process.env.STRATEGY}) => {
    if (strategy === STRATEGY_TYPES.ANY) {
        return getDestinationsForAnyStrategy(possibleDestinations);
    }
    if (strategy === STRATEGY_TYPES.ALL) {
        return getDestinationsForAllStrategy(possibleDestinations);
    }
    try {
        // vm2 is unsafe but i think it's enough for test task
        const vm = new VM({
            allowAsync: false,
            sandbox: {
                possibleDestinations
            }
        });
        const shouldBeRouted = vm.run(`(${strategy})(possibleDestinations)`);
        if (shouldBeRouted) return getAllDestinations(possibleDestinations);
        return [];
    } catch (e) {
        throw new HttpError(400, `Strategy function is invalid`);
    }
};


export const routeEventData = async (destination, payload) => {
    const {name, transport, url, error} = destination;
    if (error) {
        throw new Error(error);
    }
    const [transportType, transportMethod] = transport.split('.');
    switch (transportType) {
        case TRANSPORT_TYPES.CONSOLE:
            if (!AVAILABLE_CONSOLE_METHODS.find((method) => method === transportMethod)) {
                throw new Error(DESTINATION_ERRORS.METHOD_ERROR(name));
            }
            console[transportMethod](JSON.stringify(payload));
            break;
        case TRANSPORT_TYPES.HTTP:
            if (!AVAILABLE_HTTP_METHODS.find((method) => method === transportMethod)) {
                throw new Error(DESTINATION_ERRORS.METHOD_ERROR(name));
            }
            if (!url) {
                throw new Error(DESTINATION_ERRORS.URL_ERROR(name));
            }
            try {
                const requestConfig = {
                    method: transportMethod,
                    url,
                    data: payload
                };
                if (transportMethod === 'get') {
                    //convert payload to query string
                    const queryParams = new URLSearchParams(payload).toString();
                    requestConfig.url = `${requestConfig.url}?${queryParams}`;
                    delete requestConfig.data;
                }
                await axios(requestConfig);    
            } catch (e) {
                console.log(`Request for destination ${name} is failed`);
            }
            break;
        default:
            throw Error(DESTINATION_ERRORS.TRANSPORT_ERROR(name));
    }
};