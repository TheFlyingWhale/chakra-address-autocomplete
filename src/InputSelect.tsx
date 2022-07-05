import React, { useState } from "react";
import { Input, ListItem, UnorderedList, Text, Button } from "@chakra-ui/react";

interface InputSelectProps {
    placeholder?: string;
    options: string[];
    size: string;
}

export const InputSelect = ({
    placeholder = "",
    options,
    size = "md",
}: InputSelectProps) => {
    const [input, setInput] = useState<string>("");
    const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;

        setInput(userInput);
        setActiveOptionIndex(0);
        setShowOptions(true);
    };

    //Handles both blur and itemClick
    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        //check if the clicked item is an option
        if (e.relatedTarget !== null && e.relatedTarget.id === "optionItem") {
            setInput(e.relatedTarget.innerHTML);
        }
        setShowOptions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        //User pressed the enter key
        if (e.keyCode === 13) {
            setInput(options[activeOptionIndex]);
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
                            >
                                <Button
                                    borderRadius={0}
                                    w="full"
                                    id="optionItem"
                                    p={4}
                                    bgColor={bgColor}
                                    variant="link"
                                    justifyContent="left"
                                >
                                    {option}
                                </Button>
                            </ListItem>
                        );
                    })}
                </UnorderedList>
            );
        }
        return (
            <div>
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
