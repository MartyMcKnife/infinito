import { HStack, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { ScaleFade } from "@chakra-ui/transition";
import React, { ReactElement } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { DropFile } from "../../interfaces/files";
import { removeFile } from "../../utils/upload";

interface Props {
  files: DropFile[];
  file: DropFile;
  setFiles: React.Dispatch<React.SetStateAction<DropFile[]>>;
}

export default function Thumbnails({
  file,
  files,
  setFiles,
}: Props): ReactElement {
  return (
    <ScaleFade in={true} initialScale={0.8} unmountOnExit>
      <HStack justifyContent="space-between" mt="6">
        <Image
          src={file.preview}
          alt={file.name}
          boxSize="32"
          borderRadius="lg"
          objectFit="cover"
          mr="auto"
          id={file.id}
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
  );
}
