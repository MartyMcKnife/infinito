import React, { ReactElement, useEffect, useState } from "react";
import { Center, Heading, Link, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { VStack, ScaleFade } from "@chakra-ui/react";
import { auth } from "../../utils/firebase/app";
import { useToast } from "@chakra-ui/toast";
import { createUser } from "../../utils/firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";

interface Props {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setRegister }: Props): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Something went wrong",
        description: error,
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
            placeholder="Username"
            size="lg"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            placeholder="Email"
            size="lg"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <Text fontSize="xl">
            Already have an account?{" "}
            <Link textDecoration="underline" onClick={() => setRegister(false)}>
              Login
            </Link>{" "}
          </Text>
          <Button
            size="lg"
            colorScheme="white"
            variant="outline"
            onClick={async () => {
              setLoading(true);
              try {
                const user = await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password
                );
                await createUser(user.user, username);
                setLoading(false);
              } catch (error: any) {
                const err: FirebaseError = error;
                setError(err.message);
                setLoading(false);
              }
            }}
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
