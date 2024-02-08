export const STRATEGY_TYPES = {
    ALL: 'ALL',
    ANY: 'ANY'
};

export const TRANSPORT_TYPES = {
    HTTP: 'http',
    CONSOLE: 'console'
}

export const AVAILABLE_CONSOLE_METHODS = ['log', 'warn', 'error', 'info', 'debug'];

export const AVAILABLE_HTTP_METHODS = ['get', 'post', 'put', 'delete', 'patch'];

export const DESTINATION_ERRORS = {
    NOT_FOUND: (name) => `UnknownDestinationError (${name})`,
    URL_ERROR: (name) => `UnknownUrlError (${name})`,
    TRANSPORT_ERROR: (name) => `UnknownTransportType (${name})`,
    METHOD_ERROR: (name) => `UnknownTransportMethod (${name})`
};