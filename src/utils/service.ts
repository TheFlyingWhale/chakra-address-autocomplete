import { failure, Result, success } from "./result";

const accessToken =
    "pk.eyJ1IjoibXJmbHl3aGFsZWd1eSIsImEiOiJjazNoZGFpOGswMWJsM2xsMXp6N3ZnM25pIn0.qS7D5FBXfYUqswpNrCDkYw";

export const testMapBox = async (
    streetName: string,
    countryISO?: string
): Promise<Result<any[], string>> => {
    const cISO = countryISO ? `country=${countryISO}&` : "";
    // country=no&
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${streetName}.json?${cISO}types=place%2Cpostcode%2Caddress&access_token=${accessToken}`;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return success(data.features);
    } catch (err) {
        return failure(`${err}`);
    }
};
