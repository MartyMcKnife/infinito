import React, { ReactElement, useEffect } from "react";
import useAxios from "axios-hooks";
import { Box, Center, Heading, HStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { createStandaloneToast } from "@chakra-ui/toast";
import Masonry from "react-masonry-css";

export default function ImageGrid(): ReactElement {
  const [{ data, loading, error }] =
    useAxios<[{ link: string; width: number; height: number }]>("/api/photos");
  const toast = createStandaloneToast();
  const id = "image-grid-toast";
  useEffect(() => {
    if (error && !toast.isActive(id)) {
      toast({
        id,
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }, [error, toast, id]);

  if (loading) {
    return (
      <Center alignItems="center">
        <Spinner size="xl" thickness="4px" color="white" mt="24" mr="4" />
      </Center>
    );
  } else {
    return (
      <Box mt="4">
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data?.map((photo) => (
            <Image
              src={photo.link}
              key={photo.link}
              alt="Photo"
              rounded="lg"
              mb="15px"
            />
          ))}
        </Masonry>
      </Box>
    );
  }
}
