import { Button } from "@chakra-ui/button";
import { Box, Center, Heading, Text } from "@chakra-ui/layout";
import { User } from "@firebase/auth";
import React, { ReactElement, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../utils/firebase/app";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { User as IUser } from "../../interfaces/firestore";
import { doc } from "@firebase/firestore";
import { userColl } from "../../utils/firebase/firestore";
import { Spinner } from "@chakra-ui/spinner";
import Loader from "../Loader";
import { useToast } from "@chakra-ui/toast";

interface Props {
  user: User;
}

export default function UserInfo({ user }: Props): ReactElement {
  const [value, loading, error] = useDocumentData(doc(userColl, user.uid));

  const toast = useToast();
  const id = "image-grid-toast";
  useEffect(() => {
    if (error) {
      toast({
        id,
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }, [error, toast, id]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Box mt="6">
        <Heading>
          Hello,{" "}
          <Text fontWeight="400" display="inline" as="i">
            {value?.username}!
          </Text>
        </Heading>
        <Button onClick={() => signOut(auth)}>Signout</Button>
      </Box>
    );
  }
}
