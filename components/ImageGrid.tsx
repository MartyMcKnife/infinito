import React, { ReactElement, useEffect, useState } from "react";
import useAxios from "axios-hooks";
import { Box, Center, Heading, HStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { createStandaloneToast } from "@chakra-ui/toast";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";

type Image = { link: string; width: number; height: number };

export default function ImageGrid(): ReactElement {
  //Initiale fetch
  const [{ data, loading, error }, refetch] = useAxios<Image[]>("/api/photos");

  //Handle updating of images
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (data) {
      setImages([...images, ...data]);
    }
  }, [data]);

  //Handle errors with a toast
  const toast = createStandaloneToast();
  const id = "image-grid-toast";
  useEffect(() => {
    if (error && !toast.isActive(id)) {
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
  return (
    <Box mt="4" overflowY="hidden">
      <InfiniteScroll
        dataLength={images.length}
        next={() => refetch({ params: { count: 10 } })}
        hasMore={true}
        loader={<Loader />}
        style={{ overflow: "hidden" }}
      >
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((photo) => (
            <Image
              src={photo.link}
              key={photo.link}
              alt="Photo"
              rounded="lg"
              mb="15px"
            />
          ))}
        </Masonry>
      </InfiniteScroll>
    </Box>
  );
  // }
}
