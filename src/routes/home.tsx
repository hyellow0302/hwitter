import { styled } from "styled-components";
import PostTweetForm from "../component/post-tweet-form";
import Timeline from "../component/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  doverflow-y: scroll;
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
