export const HttpError = class extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
};
  