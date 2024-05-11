import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import PostInteractions from "../components/PostInteractions";
import { useState } from "react";
import Comment from "../components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zuckerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzuckerberg
            </Text>
            <Image src={"/verified.png"} w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text color={"gray.light"} fontSize={"sm"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Let's talk about threads</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src="/post1.png" w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <PostInteractions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          213 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {2390 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"} color={"gray.light"}>
            👋 To add Comment or likes{" "}
          </Text>
        </Flex>
        <Button>Try Now</Button>
      </Flex>
      <Divider my={4} />
      <Comment
        avatarURL="https://bit.ly/dan-abramov"
        username={"danabranikov"}
        comment={"This is amazing!"}
        postedOn={"2d"}
        likes={23}
      />
      <Comment
        avatarURL="https://bit.ly/kent-c-dodds"
        username={"kentc"}
        comment={"I have an Idea Zuck."}
        postedOn={"1d"}
        likes={348}
      />
      <Comment
        avatarURL="https://bit.ly/code-beast"
        username={"christiannwamba"}
        comment={"Threads sucks"}
        postedOn={"1hr"}
        likes={2}
      />
    </>
  );
};

export default PostPage;
