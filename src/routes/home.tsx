import { styled } from "styled-components";
import PostTweetForm from "../component/post-tweet-form";
import Timeline from "../component/timeline";
import "../App.css";

const Wrapper = styled.div`
  overflow-y: scroll;
  display: grid;
  gap: 50px;
  grid-template-rows: 1fr 5fr;
`;

export default function Home() {
  return (
    <Wrapper id="scroll">
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
