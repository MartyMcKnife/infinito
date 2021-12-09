import React, { ReactElement, useState, useEffect } from "react";
import Header from "../components/Header";

import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { BiTrashAlt, BiImages, BiPlusCircle } from "react-icons/bi";
import { ScaleFade } from "@chakra-ui/transition";
import { Button } from "@chakra-ui/button";
import { auth } from "../utils/firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToast } from "@chakra-ui/toast";
import Loader from "../components/Loader";
import Drop from "../components/Upload/Drop";

export default function Add(): ReactElement {
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast();
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }, [error, toast]);

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : !user ? (
        <Center>
          <Heading mt="8" fontWeight="400">
            Please{" "}
            <Link href="/user" textDecoration="underline" fontStyle="italic">
              login first!
            </Link>
          </Heading>
        </Center>
      ) : (
        <Drop user={user} />
      )}
    </>
  );
}
