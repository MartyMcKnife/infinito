import React, { ReactElement, useEffect, useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Header from "../components/Header";
import User from "../components/Auth/User";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase/app";
import { useToast } from "@chakra-ui/toast";
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import Loader from "../components/Loader";

export default function UserPage(): ReactElement {
  const [register, setRegister] = useState(false);
  const [finishSignup, setFinishSignup] = useState(false);

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
        {user && finishSignup ? (
          <User user={user} setFinish={setFinishSignup} />
        ) : register ? (
          <Register setRegister={setRegister} setFinish={setFinishSignup} />
        ) : (
          <Login setRegister={setRegister} />
        )}
      </>
    );
  } else {
    return <Loader />;
  }
}
