import React, { useState } from "react";
import { Input, ListItem, UnorderedList, Text } from "@chakra-ui/react";

interface InputSelectProps {
    placeholder?: string;
    options: string[];
    // option: OptionType;
    // setOption: React.Dispatch<OptionType>;
    size: string;
}

export const InputSelect = ({
    placeholder = "",
    options,
    // option,
    // setOption,
    size = "md",
}: InputSelectProps) => {
    const [input, setInput] = useState<string | undefined>(undefined);
    const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;

        setInput(userInput);
        setActiveOptionIndex(0);
        setShowOptions(true);
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        console.log("handleInputBlur");
        // e.preventDefault();
        // console.log(e.currentTarget);
        // console.log(e);
        // console.log(e.relatedTarget);
        // setShowOptions(false);
    };

    const handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log("handleItemClick");
        // console.log("item click");
        // console.log(e.currentTarget.innerText);
        // setInput(e.currentTarget.innerText);
        // setShowOptions(false);
        // setActiveOptionIndex(0);
    };

    const OptionsList = () => {
        if (options.length) {
            return (
                <UnorderedList
                    id="myList"
                    // pos="absolute"
                    m={0}
                    bg="white"
                    zIndex={2}
                    w="full"
                    styleType="none"
                >
                    {options.map((option, index) => {
                        let bgColor;

                        //Flag the active option with a class
                        if (index === activeOptionIndex) {
                            bgColor = "blue.200";
                        }

                        return (
                            <ListItem
                                px={4}
                                py={2}
                                bgColor={bgColor}
                                key={index}
                                onClick={handleItemClick}
                                onMouseEnter={() => setActiveOptionIndex(index)}
                                style={{ cursor: "pointer" }}
                            >
                                {option}
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
            />
            {showOptions && input && <OptionsList />}
        </>
    );
};
