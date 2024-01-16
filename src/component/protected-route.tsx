import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // 유저가 로그인을 했는지 여부를 확인
  const user = auth.currentUser; // 유저가 로그인을 했는지 여부를 알려줌, user값을 넘겨주거나 null을 넘김
  console.log(user);
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
