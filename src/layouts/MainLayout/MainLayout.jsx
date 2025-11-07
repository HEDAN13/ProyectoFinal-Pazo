import Navbar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
