import {
	VStack,
	FormControl,
	FormLabel,
	Select,
	Grid,
	GridItem,
	Input,
	Text,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { countryList } from './utils/country-list';
import { InputSelect } from './InputSelect';
import { testMapBox } from './utils/service';

interface OptionItem {
	center: [number, number];
	context: [
		{
			id: string;
			text: string;
			wikidata?: string;
			short_code?: string;
		}
	];
	geometry: {
		coordinates: [number, number];
		type: string;
	};
	id: string;
	place_name: string;
	place_type: string[];
	properties: {
		accuracy: string;
	};
	relevance: number;
	type: string;
}

export interface RipeOption {
	streetName: string;
	postcode: string;
	city: string;
	address: string;
}

export const AddressForm = () => {
	const [country, setCountry] = useState('');
	const [streetName, setStreetName] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [city, setCity] = useState('');

	const [ripeOptions, setRipeOptions] = useState<RipeOption[]>([]);
	const [rawOptions, setRawOptions] = useState<OptionItem[]>([]);
	const [selectedOption, setSelectedOption] = useState<OptionItem | undefined>(
		undefined
	);
	const [coordinates, setCoordinates] = useState([0, 0]);

	const prepareCountryISO = (country: string) => {
		const countryIndex = countryList.countries.findIndex(
			(item) => item.toLocaleLowerCase() === country.toLocaleLowerCase()
		);
		const countryISO = countryList.isoCodes[countryIndex].toLocaleLowerCase();
		if (countryISO.length) {
			return countryISO;
		}
	};
	const extractData = (option: OptionItem) => {
		let postcode = '';
		let city = '';
		let country = '';
		let coordinates = [0, 0];
		option.context.forEach((item) => {
			if (item.id.includes('postcode')) {
				postcode = item.text;
			}
			if (item.id.includes('place')) {
				city = item.text;
			}
			if (item.id.includes('country')) {
				country = item.text;
			}
		});
		coordinates = [option.center[1], option.center[0]];

		return { postcode, city, country, coordinates };
	};

	// Effect to fetch data from API
	useEffect(() => {
		const countryISO = country.length ? prepareCountryISO(country) : '';

		if (streetName.length) {
			testMapBox(streetName, countryISO).then((res) => {
				if (res.isSuccess()) {
					const raw = res.value;
					setRawOptions(raw);
					const ripe: RipeOption[] = raw.map((item) => {
						return {
							streetName: item.text,
							postcode: item.context[0].text,
							city: item.context[1].text,
							address: item.address,
						};
					});
					setRipeOptions(ripe);
				}
			});
		}
	}, [streetName]);

	// Effect to set data based on selection
	useEffect(() => {
		if (selectedOption) {
			const { postcode, city, country, coordinates } =
				extractData(selectedOption);
			setCity(city);
			setZipCode(postcode);
			setCountry(country);
			setCoordinates(coordinates);
		}
	}, [selectedOption]);

	return (
		<VStack>
			<Grid
				templateColumns="repeat(3, 1fr)"
				templateRows="repeat(4, 1fr)"
				gap={4}
			>
				<GridItem colSpan={3}>
					<CountryFormItem country={country} setCountry={setCountry} />
				</GridItem>
				<GridItem colSpan={3}>
					<StreetNameFormItem
						streetName={streetName}
						setStreetName={setStreetName}
						options={ripeOptions}
						rawOptions={rawOptions}
						setSelectedOption={setSelectedOption}
					/>
				</GridItem>
				<GridItem colSpan={1}>
					<ZipCodeFormItem zipCode={zipCode} setZipCode={setZipCode} />
				</GridItem>
				<GridItem colSpan={2}>
					<CityFormItem city={city} setCity={setCity} />
				</GridItem>
				<GridItem>
					<CoordinatesItem coordinates={coordinates} />
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
	rawOptions,
	setSelectedOption,
}: {
	streetName: string;
	setStreetName: (arg0: string) => void;
	options: RipeOption[];
	rawOptions: any[];
	setSelectedOption: (arg0: any) => void;
}) => {
	return (
		<FormControl>
			<FormLabel htmlFor="streetName">Street name</FormLabel>
			<InputSelect
				size="lg"
				options={options}
				rawOptions={rawOptions}
				input={streetName}
				setInput={setStreetName}
				setSelectedOption={setSelectedOption}
			/>
		</FormControl>
	);
};

const ZipCodeFormItem = ({
	zipCode,
	setZipCode,
}: {
	zipCode: string;
	setZipCode: (arg0: string) => void;
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setZipCode(e.target.value);
	};

	return (
		<FormControl>
			<FormLabel htmlFor="zipCode">Zip code</FormLabel>
			<Input size="lg" name="zipCode" value={zipCode} onChange={handleChange} />
		</FormControl>
	);
};

const CityFormItem = ({
	city,
	setCity,
}: {
	city: string;
	setCity: (arg0: string) => void;
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCity(e.target.value);
	};

	return (
		<FormControl>
			<FormLabel htmlFor="city">City</FormLabel>
			<Input size="lg" name="city" value={city} onChange={handleChange} />
		</FormControl>
	);
};

const CoordinatesItem = ({ coordinates }: { coordinates: number[] }) => {
	return (
		<VStack>
			<Text fontWeight="bold">Coordinates</Text>
			<Text>{`${coordinates[0]},${coordinates[1]}`}</Text>
		</VStack>
	);
};
