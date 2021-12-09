import React, { ReactElement, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { DropFile } from "../../interfaces/files";
import { Box, Center, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { ScaleFade } from "@chakra-ui/transition";
import { useToast } from "@chakra-ui/toast";
import { BiImages, BiPlusCircle } from "react-icons/bi";
import Thumbnails from "./Thumbnails";
import { User } from "@firebase/auth";
import axios from "axios";
import { uploadFile } from "../../utils/upload";

interface Props {
  user: User;
}

export default function Drop({ user }: Props): ReactElement {
  const [files, setFiles] = useState<DropFile[]>([]);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
  });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const toast = useToast();

  //Process images to generate preview
  useEffect(() => {
    setFiles((files) => [
      ...files,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: uuidv4(),
        })
      ),
    ]);
  }, [acceptedFiles]);

  // Revoke the data uris to avoid memory leaks
  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  //Generate Thumbnails
  const thumbs = files.map((file) => (
    <Thumbnails setFiles={setFiles} file={file} files={files} key={file.id} />
  ));

  //Success popup on finish upload
  useEffect(() => {
    if (success) {
      toast({
        title: "Success!",
        description: "Your images have been uploaded!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setSuccess(false);
    }
  }, [success, toast]);

  //Error popoup if something goes wrong
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setSuccess(false);
    }
  }, [error, toast]);
  console.log(files);
  return (
    <>
      {files.length > 0 ? (
        <>
          <Heading mt="16" ml={["0", "4", "8"]}>
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
                try {
                  await Promise.all(
                    files.map(async (file) => {
                      await uploadFile(file, user.uid);
                    })
                  );
                  setSuccess(true);
                } catch (error) {
                  console.log(error);
                  setError(true);
                }
                setFiles([]);
                setUploading(false);
              }}
              isLoading={uploading}
              loadingText="Uploading..."
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
              py={["14", "28"]}
              px={["12", "24", "52"]}
              borderStyle="dotted"
              border="2px"
              borderRadius="xl"
            >
              <input {...getInputProps()} />
              <Center>
                <BiImages size="100" />
              </Center>
              <Text mt="4" textAlign="center">
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
