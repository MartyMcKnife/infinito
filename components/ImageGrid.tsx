import React, { ReactElement, useEffect, useState } from "react";
import useAxios from "axios-hooks";
import { Box } from "@chakra-ui/layout";
import { createStandaloneToast } from "@chakra-ui/toast";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import GridImage from "./GridImage";
import { Image } from "../interfaces/files";

export default function ImageGrid(): ReactElement {
  //Initiale fetch
  const [{ data, loading, error }, refetch] = useAxios<Image[]>("/api/photos");

  //Handle updating of images
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (data) {
      setImages((images) => [...images, ...data]);
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

  //Responsive Grid
  const breakpointColumnsObj = {
    default: 4,
    1600: 3,
    1200: 2,
    900: 1,
  };

  return (
    <Box mt="4" overflowY="hidden">
      <InfiniteScroll
        dataLength={images.length}
        //Refetch on scroll, with slightly less images
        next={() => refetch({ params: { count: 10 } })}
        hasMore={true}
        loader={<Loader />}
        style={{ overflow: "hidden" }}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="grid"
          columnClassName="column"
        >
          {images.map((photo) => (
            <GridImage
              key={photo.id}
              alt={photo.name}
              author={photo.author}
              src={photo.link}
            />
          ))}
        </Masonry>
      </InfiniteScroll>
    </Box>
  );
}
