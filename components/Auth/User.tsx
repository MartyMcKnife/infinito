import { Button } from "@chakra-ui/button";
import { Box, Center, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { User } from "@firebase/auth";
import React, { ReactElement, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/app";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "@firebase/firestore";
import { userColl } from "../../utils/firebase/firestore";
import Loader from "../Loader";
import { useToast } from "@chakra-ui/toast";
import { BiImages } from "react-icons/bi";
import { User as IUser } from "../../interfaces/firestore";
import { Image } from "@chakra-ui/react";

interface Props {
  user: User;
}

export default function UserInfo({ user }: Props): ReactElement {
  const [value, loading, error] = useDocumentData<IUser>(
    doc(userColl, user.uid)
  );

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

  if (loading || !value) {
    return <Loader />;
  } else {
    return (
      <Box mt="6">
        <HStack spacing="6" alignItems="center">
          {" "}
          <Heading fontSize="5xl">
            Hello,{" "}
            <Text fontWeight="400" display="inline" as="i">
              {value.username}!
            </Text>
          </Heading>
          <Button
            onClick={() => signOut(auth)}
            size="sm"
            colorScheme="gray"
            variant="outline"
            _hover={{ bg: "gray.200", textColor: "black" }}
          >
            Sign Out
          </Button>
        </HStack>
        <Heading mt="12">Your Photos</Heading>
        {/* Display the users photos. If they don't have any photos, show an error messsage */}
        <Center mt="20">
          {value.photos.length > 0 ? (
            <HStack overflowX="auto">
              {value.photos.map((photo) => {
                return (
                  <Image
                    rounded="lg"
                    src={photo.link}
                    alt={photo.name}
                    key={photo.id}
                  />
                );
              })}
            </HStack>
          ) : (
            <VStack>
              <BiImages size="150" />
              <Heading fontWeight="400" fontSize="3xl">
                D&apos;oh. Looks like you haven&apos;t added any photos!
              </Heading>
            </VStack>
          )}
        </Center>
      </Box>
    );
  }
}
