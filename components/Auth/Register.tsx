import React, { ReactElement, useEffect, useState } from "react";
import { Center, Heading, Link, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { VStack, ScaleFade } from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase/app";
import { useToast } from "@chakra-ui/toast";

interface Props {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setRegister }: Props): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Something went wrong",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }, [error, toast]);
  return (
    <ScaleFade in={true} initialScale={0.9}>
      <Center mt="40">
        <VStack alignItems="flex-start" spacing="4">
          <Heading fontSize="5xl" mb="4">
            Register
          </Heading>
          <Input
            placeholder="Email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Text fontSize="xl">
            Already have an account?{" "}
            <Link textDecoration="underline" onClick={() => setRegister(false)}>
              Login
            </Link>{" "}
          </Text>
          <Button
            size="lg"
            colorScheme="whiteAlpha"
            onClick={() => createUserWithEmailAndPassword(email, password)}
            isLoading={loading}
            loadingText="Loading"
          >
            Register!
          </Button>
        </VStack>
      </Center>
    </ScaleFade>
  );
}
