import {route} from "../../helpers/route.js";
import {getAllDestinations, getDestinations, routeEventData} from "../../helpers/routing-events-helper.js";
import {validateRequest} from "../../helpers/validate-request.js";
import {eventSchema} from "./validate.js";

export const RouteEvent = [
    validateRequest({
        body: eventSchema
    }),
    route(async (req, res, next) => {
        const {strategy, payload, possibleDestinations} = req.body;
        const destinations = getDestinations({possibleDestinations, strategy});
        const routedDestinations = await Promise.all(destinations.map(async destination => {
            try {
                await routeEventData(destination, payload);
                return destination.name;
            } catch (e) {
                console.log(e.message);
            }
        }));
        const preparedResponse = {};
        const allDestinations = getAllDestinations(possibleDestinations);
        allDestinations.forEach(({name}) => {
            routedDestinations.find(destination => destination === name) ?
                preparedResponse[name] = true :
                preparedResponse[name] = false;
        })
        return preparedResponse;
    })
];