import React, { useState } from "react";
import { Input, ListItem, UnorderedList, Text, VStack } from "@chakra-ui/react";
import { RipeOption } from "./AddressForm";

interface InputSelectProps {
    placeholder?: string;
    options: RipeOption[];
    size: string;
    input: string;
    setInput: (arg0: string) => void;
    rawOptions: any[];
    setSelectedOption: (arg0: any) => void;
}

export const InputSelect = ({
    placeholder = "",
    options,
    size = "md",
    input,
    setInput,
    rawOptions,
    setSelectedOption,
}: InputSelectProps) => {
    // const [input, setInput] = useState<string>(option);
    const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const userInput = e.target.value;

        setInput(userInput);
        setActiveOptionIndex(0);
        setShowOptions(true);
    };

    const determineInput = (
        streetName: string,
        streetAddress: string | undefined
    ) => {
        if (streetAddress === undefined) {
            return streetName;
        }
        return `${streetName} ${streetAddress}`;
    };

    const handleItemClick = (index: number) => {
        const { streetName, address } = options[index];
        setInput(determineInput(streetName, address));
        setSelectedOption(rawOptions[index]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        //User pressed the enter key
        if (e.keyCode === 13) {
            setSelectedOption(rawOptions[activeOptionIndex]);
            const { streetName, address } = options[activeOptionIndex];
            setInput(determineInput(streetName, address));
            // setInput(determineInput(streetName, address));
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
                    style={{ overflow: "hidden" }}
                >
                    {options.map((option, index) => {
                        let bgColor;

                        //Flag the active option with a class
                        if (index === activeOptionIndex) {
                            bgColor = "blue.200";
                        }

                        return (
                            <ListItem
                                bgColor={bgColor}
                                key={index}
                                onMouseEnter={() => setActiveOptionIndex(index)}
                                style={{ cursor: "pointer" }}
                                className="optionItem"
                                onMouseDown={() => {
                                    handleItemClick(index);
                                }}
                            >
                                <VStack
                                    alignItems="flex-start"
                                    id="VStack"
                                    px={4}
                                    py={2}
                                    gap={0}
                                >
                                    <Text fontSize="lg" fontWeight="medium">
                                        {`${option.streetName} ${
                                            option.address ? option.address : ""
                                        }`}
                                    </Text>
                                    <Text
                                        fontSize="md"
                                        fontWeight="normal"
                                        style={{ marginTop: "0" }}
                                    >{`${option.postcode} ${option.city}`}</Text>
                                </VStack>
                            </ListItem>
                        );
                    })}
                </UnorderedList>
            );
        }
        return <></>;
    };

    return (
        <>
            <Input
                size={size}
                placeholder={placeholder}
                onChange={handleChange}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setShowOptions(false)}
                onKeyDown={handleKeyDown}
                value={input}
            />
            {showOptions && input && <OptionsList />}
        </>
    );
};
