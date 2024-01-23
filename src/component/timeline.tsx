import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createAt", "desc")
    );
    // 데이터베이스 및 쿼리와 실시간 연결을 생성하는 함수 onSnapshot()
    // 해당 쿼리에 새 요소가 생성되거나, 요소가 삭제되었거나 또는 업데이트 됐을 때 쿼리에 알려주는 함수임.
    // 전과 다른 점: 전엔 그냥 getDocs해서 가져오기만 했다면 지금은 쿼리에 리스너를 추가해서 변동되었을 때 쿼리에게 알려주어서 실시간으로 보여주게끔 함.
    await onSnapshot(tweetsQuery, (snapshot) => {
      const tweets = snapshot.docs.map((doc) => {
        // console.log(doc.data());
        const { tweet, createAt, userId, username, photo } = doc.data();
        return {
          tweet,
          createAt,
          userId,
          username,
          photo,
          id: doc.id,
        };
      });
      setTweets(tweets);
    });
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <Wrapper>
      {tweets.map((data) => (
        <Tweet key={data.id} {...data} />
      ))}
    </Wrapper>
  );
}
