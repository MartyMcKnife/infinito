import { Box } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import Header from "../components/Header";
import ImageGrid from "../components/ImageGrid";

export default function index(): ReactElement {
  return (
    <>
      <Header />
      <ImageGrid />
    </>
  );
}
