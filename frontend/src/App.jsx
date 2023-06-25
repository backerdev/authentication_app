import { Container } from "react-bootstrap";
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

// https://www.traversymedia.com/blog/mern-crash-course-part-2
// stopped @ Now, change the Header.jsx file to the following:

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
