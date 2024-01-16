import {
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase";

const Button = styled.span`
  background-color: white;
  font-weight: 400;
  color: black;
  width: 100%;
  height: 35px;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  margin: 20px;
  cursor: pointer;
`;
const Logo = styled.img`
  height: 20px;
`;

export default function GihubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      // await signInWithRedirect(auth, provider);
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/github-mark.svg" />
      Gihub로 계속하기
    </Button>
  );
}
