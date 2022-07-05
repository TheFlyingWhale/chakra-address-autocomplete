import {
    VStack,
    FormControl,
    FormLabel,
    Select,
    Grid,
    GridItem,
    Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { countryList } from "./utils/country-list";
import { InputSelect } from "./InputSelect";

export const AddressForm = () => {
    return (
        <VStack>
            <Grid
                templateColumns="repeat(3, 1fr)"
                templateRows="repeat(3, 1fr)"
                gap={4}
            >
                <GridItem colSpan={3}>
                    <CountryFormItem />
                </GridItem>
                <GridItem colSpan={3}>
                    <StreetNameFormItem />
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

const CountryFormItem = () => {
    const [country, setCountry] = useState("");

    return (
        <FormControl>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Select
                name="country"
                size="lg"
                placeholder="Select country"
                // value={country}
            >
                {countryList.countries.map((country, index) => (
                    <option
                        key={index}
                        onClick={() => setCountry(country)}
                        value={country}
                    >
                        {country}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

const StreetNameFormItem = () => {
    // const [streetName, setStreetName] = useState("");

    return (
        <FormControl>
            <FormLabel htmlFor="streetName">Street name</FormLabel>
            <InputSelect
                size="lg"
                options={["opt1", "opt2", "opt3", "opt4"]}
                // option={streetName}
                // setOption={setStreetName}
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
