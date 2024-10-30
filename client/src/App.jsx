import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  // const { pathname } = useLocation();
  // console.log(pathname);
  // console.log(pathname.split("/")[1] === "admin");
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
