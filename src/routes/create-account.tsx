import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  Wrapper,
  Title,
  Form,
  Input,
  Error,
  Switcher,
} from "../component/auth-component";

export default function Account() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      /* 계정 생성 */
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ); // 회원가입에 성공하면 자격증명을 얻게 됨. credentials에 담음.
      console.log(credentials.user);

      /* 유저 이름 세팅 (firebase에서 userName을 필요로 하기때문) */
      await updateProfile(credentials.user, {
        displayName: name,
      });

      /* 계정 생성이 완료되면 홈페이지로 리다이렉트 */
      navigate("/");
    } catch (e) {
      /* 오류 제어 */
      // 해당 이메일로 이미 계정이 존재하거나, 비밀번호가 유효하지않을 때 createUserWithEmailAndPassword에서 오류를 반환하게 됨, 그럼 여기서 캐치!
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join to 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 있으신가요? 지금 바로 로그인하세요!{" "}
        <Link to="/login">로그인 &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
