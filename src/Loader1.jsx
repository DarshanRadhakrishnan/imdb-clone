// components/Loader.jsx
import { Spinner, Center } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Center h="60vh">
      <Spinner size="xl" thickness="4px" />
    </Center>
  );
};

export default Loader;
