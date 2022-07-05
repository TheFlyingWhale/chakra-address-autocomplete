import {
    VStack,
    FormControl,
    FormLabel,
    Select,
    Grid,
    GridItem,
    Input,
    Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { countryList } from "./utils/country-list";
import { InputSelect } from "./InputSelect";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export const AddressForm = () => {
    const [country, setCountry] = useState("");
    const [streetName, setStreetName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [placeDetailsState, savePlaceDetailsToState] = useState("");

    const {
        placesService,
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });

    useEffect(() => {
        // fetch place details for the first element in placePredictions array
        if (placePredictions.length)
            placesService?.getDetails(
                {
                    placeId: placePredictions[0].place_id,
                },
                (placeDetails: any) => savePlaceDetailsToState(placeDetails)
            );
    }, [placePredictions]);

    useEffect(() => {
        getPlacePredictions({ input: streetName });
        console.log(placePredictions);
    }, [streetName]);

    const logState = () => {
        console.log(
            `country: ${country}, streetName: ${streetName}, zipCode: ${zipCode}, city: ${city}`
        );
    };

    return (
        <VStack>
            <Button onClick={logState}>logState</Button>
            <Grid
                templateColumns="repeat(3, 1fr)"
                templateRows="repeat(3, 1fr)"
                gap={4}
            >
                <GridItem colSpan={3}>
                    <CountryFormItem
                        country={country}
                        setCountry={setCountry}
                    />
                </GridItem>
                <GridItem colSpan={3}>
                    <StreetNameFormItem
                        streetName={streetName}
                        setStreetName={setStreetName}
                        options={placePredictions.map(
                            (item) => `${item.description}`
                        )}
                    />
                </GridItem>
                <GridItem colSpan={1}>
                    <ZipCodeFormItem />
                </GridItem>
                <GridItem colSpan={2}>
                    <CityFormItem />
                </GridItem>
            </Grid>
        </VStack>
    );
};

const CountryFormItem = ({
    country,
    setCountry,
}: {
    country: string;
    setCountry: (arg0: string) => void;
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(e.target.value);
    };

    return (
        <FormControl>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Select
                name="country"
                size="lg"
                placeholder="Select country"
                onChange={handleChange}
                value={country}
            >
                {countryList.countries.map((country, index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

const StreetNameFormItem = ({
    streetName,
    setStreetName,
    options,
}: {
    streetName: string;
    setStreetName: (arg0: string) => void;
    options: string[];
}) => {
    return (
        <FormControl>
            <FormLabel htmlFor="streetName">Street name</FormLabel>
            <InputSelect
                size="lg"
                options={options}
                option={streetName}
                setOption={setStreetName}
            />
        </FormControl>
    );
};

const ZipCodeFormItem = () => {
    return (
        <FormControl>
            <FormLabel htmlFor="zipCode">Zip code</FormLabel>
            <Input size="lg" name="zipCode" />
        </FormControl>
    );
};

const CityFormItem = () => {
    return (
        <FormControl>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input size="lg" name="city" />
        </FormControl>
    );
};
