import React, { useState } from 'react';
import {
	Input,
	ListItem,
	UnorderedList,
	Text,
	Button,
	VStack,
} from '@chakra-ui/react';
import { RipeOption } from './AddressForm';

interface InputSelectProps {
	placeholder?: string;
	options: RipeOption[];
	size: string;
	option: string;
	setOption: (arg0: string) => void;
	rawOptions: any[];
	setSelectedOption: (arg0: any) => void;
}

export const InputSelect = ({
	placeholder = '',
	options,
	size = 'md',
	option,
	setOption,
	rawOptions,
	setSelectedOption,
}: InputSelectProps) => {
	const [input, setInput] = useState<string>(option);
	const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);
	const [showOptions, setShowOptions] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const userInput = e.target.value;

		setOption(userInput);
		setInput(userInput);
		setActiveOptionIndex(0);
		setShowOptions(true);
	};

	//Handles both blur and itemClick
	const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		//check if the clicked item is an option
		if (e.relatedTarget !== null && e.relatedTarget.id === 'optionItem') {
			setInput(
				`${options[activeOptionIndex].streetName} ${options[activeOptionIndex].address}`
			);
			setSelectedOption(rawOptions[activeOptionIndex]);
		}
		setShowOptions(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		//User pressed the enter key
		if (e.keyCode === 13) {
			setSelectedOption(rawOptions[activeOptionIndex]);
			setInput(
				`${options[activeOptionIndex].streetName} ${options[activeOptionIndex].address}`
			);
			setActiveOptionIndex(0);
			setShowOptions(false);
		}
		// User pressed the up arrow
		else if (e.keyCode === 38) {
			if (activeOptionIndex === 0) {
				return;
			}

			setActiveOptionIndex(activeOptionIndex - 1);
		}
		// User pressed the down arrow
		else if (e.keyCode === 40) {
			if (activeOptionIndex + 1 === options.length) {
				return;
			}

			setActiveOptionIndex(activeOptionIndex + 1);
		}
	};

	const OptionsList = () => {
		if (options.length) {
			return (
				<UnorderedList
					id="myList"
					pos="absolute"
					m={0}
					mt={2}
					bg="gray.50"
					borderRadius={12}
					zIndex={2}
					w="full"
					styleType="none"
					style={{ overflow: 'hidden' }}
				>
					{options.map((option, index) => {
						let bgColor;

						//Flag the active option with a class
						if (index === activeOptionIndex) {
							bgColor = 'blue.200';
						}

						return (
							<ListItem
								bgColor={bgColor}
								key={index}
								onMouseEnter={() => setActiveOptionIndex(index)}
								style={{ cursor: 'pointer' }}
								className="optionItem"
							>
								<Button
									borderRadius={0}
									w="full"
									id="optionItem"
									p={4}
									bgColor={bgColor}
									variant="link"
									justifyContent="left"
									style={{ textDecoration: 'none' }}
								>
									<VStack alignItems="flex-start" id="VStack">
										<Text fontSize="lg" fontWeight="medium">
											{`${option.streetName} ${
												option.address ? option.address : ''
											}`}
										</Text>
										<Text
											fontSize="md"
											fontWeight="normal"
										>{`${option.postcode} ${option.city}`}</Text>
									</VStack>
								</Button>
							</ListItem>
						);
					})}
				</UnorderedList>
			);
		}
		return (
			<div style={{ overflow: 'hidden', position: 'absolute' }}>
				<Text>No options</Text>
			</div>
		);
	};

	return (
		<>
			<Input
				size={size}
				placeholder={placeholder}
				onChange={handleChange}
				onFocus={() => setShowOptions(true)}
				onBlur={handleInputBlur}
				onKeyDown={handleKeyDown}
				value={input}
			/>
			{showOptions && input && <OptionsList />}
		</>
	);
};
