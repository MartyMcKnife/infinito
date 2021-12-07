import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import { HStack, Heading, Link, LinkOverlay, LinkBox } from "@chakra-ui/layout";

export default function Header(): ReactElement {
  const router = useRouter();
  const isActive = (route: string): boolean =>
    router.pathname === route ? true : false;

  return (
    <HStack
      borderBottom="4px"
      borderColor="white"
      justifyContent="space-between"
      alignItems="center"
      pb="4"
    >
      <Heading fontSize="6xl">infinito</Heading>
      <HStack spacing="16">
        <LinkBox>
          <LinkOverlay href="/">
            <Heading
              borderBottom={isActive("/") ? "2px" : "0px"}
              borderColor="white"
              fontSize="4xl"
              fontWeight="400"
            >
              Home
            </Heading>
          </LinkOverlay>
        </LinkBox>
        <LinkBox>
          <LinkOverlay href="/add">
            <Heading
              borderBottom={isActive("/add") ? "2px" : "0px"}
              borderColor="white"
              fontSize="4xl"
              fontWeight="400"
            >
              Add
            </Heading>
          </LinkOverlay>
        </LinkBox>
        <LinkBox>
          <LinkOverlay href="/login">
            <Heading
              borderBottom={isActive("/login") ? "2px" : "0px"}
              borderColor="white"
              fontSize="4xl"
              fontWeight="400"
            >
              Login
            </Heading>
          </LinkOverlay>
        </LinkBox>
      </HStack>
    </HStack>
  );
}
