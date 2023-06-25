import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { BsLightbulbOff, BsLightbulb } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/usersApiSlice";

import { logout } from "../../features/authSlice";
import { setDarkMode, setLightMode } from "../../features/screenModeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { screenMode } = useSelector((state) => state.screenMode);

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const screenModeHandler = (e) => {
    e.preventDefault();
    if (screenMode === "light") {
      dispatch(setDarkMode());
    } else {
      dispatch(setLightMode());
    }
  };
  return (
    <header>
      <Navbar bg={screenMode} variant={screenMode} expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            <span
              onClick={screenModeHandler}
              className=" d-flex justify-content-center "
            >
              MERN APP{" "}
              {screenMode === "dark" ? <BsLightbulb /> : <BsLightbulbOff />}{" "}
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt />
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignInAlt />
                      Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
