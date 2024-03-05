import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
  margin-right: 10px;
`;

const UploadeDate = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: gray;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Tweet({
  username,
  photo,
  date,
  tweet,
  userId,
  id,
}: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("게시글을 삭제하시겠습니까?");
    // 현재 로그인된 유저와 게시글 작성한 유저의 아이디가 같지 않을 경우 return
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      // 사진이 존재할 경우 사진의 경로 맨 끝 id (doc.id와 똑같음)를 조회해서 storage에서도 사진 삭제함
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <UploadeDate>{date}</UploadeDate>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>삭제</DeleteButton>
        ) : null}
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
}
