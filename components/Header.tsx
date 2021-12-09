import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import { HStack, Heading, Link, LinkOverlay, LinkBox } from "@chakra-ui/layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase/app";

export default function Header(): ReactElement {
  const router = useRouter();
  const isActive = (route: string): boolean =>
    router.pathname === route ? true : false;

  const [user, loading, error] = useAuthState(auth);

  return (
    <HStack
      borderBottom="4px"
      borderColor="white"
      justifyContent="space-between"
      alignItems="center"
      pb="4"
    >
      <Heading fontSize="6xl">infinito</Heading>
      {!loading && (
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
            <LinkOverlay href="/user">
              <Heading
                borderBottom={isActive("/user") ? "2px" : "0px"}
                borderColor="white"
                fontSize="4xl"
                fontWeight="400"
              >
                {user ? "Dashboard" : "Login"}
              </Heading>
            </LinkOverlay>
          </LinkBox>
        </HStack>
      )}
    </HStack>
  );
}
