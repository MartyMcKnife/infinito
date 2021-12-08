import React, { ReactElement, useEffect, useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Header from "../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase/app";
import { useToast } from "@chakra-ui/toast";
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export default function User(): ReactElement {
  const [register, setRegister] = useState(false);
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

  if (!loading) {
    return (
      <>
        <Header />
        {register ? (
          <Register setRegister={setRegister} />
        ) : (
          <Login setRegister={setRegister} />
        )}
      </>
    );
  } else {
    return (
      <Center>
        <Spinner size="xl" thickness="4px" color="white" mt="24" mr="4" />
      </Center>
    );
  }
}
