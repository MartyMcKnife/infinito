import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React, { ReactElement } from "react";

export default function Loader(): ReactElement {
  return (
    <Center>
      <Spinner size="xl" thickness="4px" color="white" mt="24" mr="4" />
    </Center>
  );
}
