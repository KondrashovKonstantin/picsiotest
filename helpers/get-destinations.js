import fs from 'fs';

const defaultDestinationsJson = fs.readFileSync(`${process.cwd()}/${process.env.DEFAULT_DESTINATIONS_JSON}.json`);
const DEFAULT_DESTINATIONS = JSON.parse(defaultDestinationsJson)
export default DEFAULT_DESTINATIONS;
