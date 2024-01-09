import { Outlet } from "../../node_modules/react-router-dom/dist/index";

export default function Layout() {
  return (
    <>
      <h2>layout</h2>
      <Outlet />
    </>
  );
}
