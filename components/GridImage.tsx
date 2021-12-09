import { Image } from "@chakra-ui/image";
import { Box, Text } from "@chakra-ui/layout";
import { Fade } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";

interface Props {
  src: string;
  alt: string;
  author: string;
  size?: "sm" | "md" | "lg" | "xs" | "xl" | string;
}

export default function GridImage({
  src,
  alt,
  author,
  size,
}: Props): ReactElement {
  const [hover, setHover] = useState(false);
  return (
    <Box
      position="relative"
      textAlign="center"
      textColor="white"
      _hover={{
        // Transition the image slightly bigger on hover, with a darkened background - display author
        transform: "scale(1.05)",
        bg: "gray.700",
        opacity: 0.9,
        transition: "all 0.3s 0s ease",
      }}
      mb="20px"
      width="max-content"
    >
      <Image
        src={src}
        alt={alt}
        rounded="lg"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        boxSize={size}
        objectFit={"cover"}
      />
      <Fade in={hover} unmountOnExit>
        <Text position="absolute" bottom="8px" left="16px">
          {author}
        </Text>
      </Fade>
    </Box>
  );
}
