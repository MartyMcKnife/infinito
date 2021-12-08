import React, { ReactElement, useState, useEffect } from "react";
import Header from "../components/Header";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
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
import axios from "axios";
import { auth } from "../utils/firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToast } from "@chakra-ui/toast";
import Loader from "../components/Loader";

interface DropFile extends File {
  id: string;
  preview: string;
}

//Given an array of objects, with the shape {id: string, preview: string}, remove the object with the given id
function removeFile(files: DropFile[], id: string) {
  return files.filter((file) => file.id !== id);
}

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

  const [uploading, setUploading] = useState(false);

  const [files, setFiles] = useState<DropFile[]>([]);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
  });

  useEffect(() => {
    setFiles([
      ...files,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: uuidv4(),
        })
      ),
    ]);
  }, [acceptedFiles]);

  const thumbs = files.map((file) => (
    <ScaleFade in={true} initialScale={0.8} key={file.id} unmountOnExit>
      <HStack justifyContent="space-between" mt="6">
        <Image
          src={file.preview}
          alt={file.name}
          boxSize="32"
          borderRadius="lg"
          objectFit="cover"
          mr="auto"
        />
        <Text mx="auto">{file.name}</Text>
        <BiTrashAlt
          color="#E53E3E"
          size="32"
          onClick={() => setFiles(removeFile(files, file.id))}
          cursor="pointer"
        />
      </HStack>
    </ScaleFade>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : !user ? (
        <Heading>
          Please <Link href="/user">login first</Link>
        </Heading>
      ) : files.length > 0 ? (
        <>
          <Heading mt="16" ml="8">
            Your Photos
          </Heading>
          <VStack>{thumbs}</VStack>
          <Center>
            <Box {...getRootProps()}>
              <input {...getInputProps()} />
              <Button
                leftIcon={<BiPlusCircle />}
                colorScheme="white"
                variant="outline"
                mt="4"
              >
                Add More
              </Button>
            </Box>
          </Center>
          <Flex w="full" justifyContent="flex-end" mr="8" mb="4">
            <Button
              colorScheme="green"
              mt="4"
              onClick={async () => {
                setUploading(true);
                files.forEach(async (file) => {
                  await axios.post(
                    "/api/upload",
                    { file },
                    { params: { userID: user.uid } }
                  );
                });
                setUploading(false);
                setFiles([]);
              }}
            >
              Submit
            </Button>
          </Flex>
        </>
      ) : (
        <VStack mt="16" justifyContent="flex-start">
          <ScaleFade in={true} initialScale={0.8}>
            <Box
              {...getRootProps()}
              bgColor="gray.800"
              py="28"
              px="52"
              borderStyle="dotted"
              border="2px"
              borderRadius="xl"
            >
              <input {...getInputProps()} />
              <Center>
                <BiImages size="100" />
              </Center>
              <Text mt="4">
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </Text>
            </Box>
          </ScaleFade>
        </VStack>
      )}
    </>
  );
}
