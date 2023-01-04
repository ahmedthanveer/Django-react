import { React, useEffect, useState } from "react";
import { Spinner, Container, Nav, Navbar, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDjangoService } from "../api-service/api-service-hooks";
import "./home.css";
import ChangePassword from "../change-password/change-password";
import axiosInstance from "../api-service/user-service";
import UserUpdate from "../edit-user-profile/edit-user-profile";
const Home = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [user, setUser] = useState({});
  const [showEditModel, setShowEditModel] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getProxy } = useDjangoService();
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    // setShowSpinner(true);
    getProxy(`Register/${location.state.id}`)
      .then((res) => {
        setShowSpinner(false);
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const customValue = () => {
    if (showCustom === true) {
      setShowCustom(false);
    } else {
      setShowCustom(true);
    }
  };
  const userLogout = () => {
    axiosInstance.post("blacklist", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    navigate("/");
  };
  return (
    <>
      <div className="container-home">
        {showSpinner && (
          <div className="overlay">
            <Spinner className="loading" animation="grow" variant="primary" />
          </div>
        )}
        <Navbar bg="light" variant="light">
          <Container fluid="sm">
            <h1>
              welcome {user.first_name} {user.last_name}
            </h1>
            <Nav
              onClick={() => {
                customValue();
              }}
            >
              Profile
            </Nav>
          </Container>
        </Navbar>
        <div
          className="container-custom"
          hidden={showCustom === false ? true : false}
        >
          <div className="profile">
            <h5>
              {user.first_name} {user.last_name}
            </h5>
            <h6>{user.email}</h6>
            <h6>{user.phone_number}</h6>
          </div>
          <div>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditModel(true);
              }}
            >
              Edit profile
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setShowChangePassword(true);
            }}
          >
            change password
          </Button>
          <div>
            <Button
              variant="outline"
              onClick={() => {
                userLogout();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
        {showChangePassword && (
          <ChangePassword
            show={showChangePassword}
            id={location.state.id}
            handleClose={() => {
              setShowChangePassword(false);
            }}
          />
        )}
      </div>
      {showEditModel && (
        <UserUpdate
          show={showEditModel}
          handleClose={() => {
            setShowEditModel(false);
          }}
          id={location.state.id}
          details={user}
          getUser={() => {
            getData();
          }}
        />
      )}
    </>
  );
};
export default Home;
