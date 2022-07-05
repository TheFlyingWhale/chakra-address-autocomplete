import { Flex } from "@chakra-ui/react";
import { AddressForm } from "./AddressForm";

function App() {
    return (
        <Flex
            m={0}
            p={12}
            w="full"
            maxWidth="full"
            h="full"
            justifyContent="center"
        >
            <AddressForm />
        </Flex>
    );
}

export default App;
