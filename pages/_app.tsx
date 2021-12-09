import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import HeadTemplate from "../components/Head";
import "../styles/global.css";

const theme = extendTheme({
  fonts: {
    heading: "Noto Sans JP, sans-serif",
    body: "Noto Sans JP, sans-serif",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <HeadTemplate />

      <Box
        maxW="100vw"
        minH="100vh"
        bgColor="gray.900"
        px={["4", "8", "16", "32"]}
        pt="8"
        textColor="white"
      >
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
