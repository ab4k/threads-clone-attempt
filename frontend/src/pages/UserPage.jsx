import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

export default function UserPage() {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={123}
        replies={342}
        postTitle="This is my first thread."
        postImage={"/post1.png"}
      />
      <UserPost
        likes={45}
        replies={2}
        postTitle="I am following this course to build threads."
        postImage={"/post2.png"}
      />
      <UserPost
        likes={12}
        replies={1}
        postTitle="I am searching for my success."
        postImage={"/post3.png"}
      />
      <UserPost
        likes={234}
        replies={56}
        postTitle="I will definitely succeed tomorrow."
      />
    </>
  );
}
