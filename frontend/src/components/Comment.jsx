import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import PostInteractions from "./PostInteractions";
import { useState } from "react";

const Comment = ({ avatarURL, username, comment, postedOn, likes }) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={avatarURL} size={"sm"} />

        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {username}
            </Text>

            <Flex gap={2} alignItems={"center"}>
              <Text color={"gray.light"}>{postedOn}</Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text>{comment}</Text>
          <PostInteractions liked={liked} setLiked={setLiked} />
          <Text color={"gray.light"} size={"sm"}>
            {likes + (liked ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default Comment;
