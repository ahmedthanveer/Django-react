import { React, useState,useEffect } from "react";
import UserRegister from "../user-register/user-register";
import axiosInstance from "../api-service/user-service";
import { useNavigate } from "react-router-dom";
import { CFormInput, CForm, CButton } from "@coreui/react";
import "./login.css";
import { toast } from "react-toastify";
import { Spinner} from "react-bootstrap";
const Login = () => {
  const [showUserRegModal, setShowUserRegModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const userLogin = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    axiosInstance
      .post("token", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        console.log("Login success");
        navigate("/Home", { state: { id: response.data.id } });
      })
      .catch(() => {
        toast.error("Invalid username or password");
      });
  };
  return (
    <>
    {showSpinner && (
          <div className="overlay">
            <Spinner className="loading" animation="grow" variant="primary" />
          </div>
        )}
      <CForm
        className="row g-3 needs-validation"
        validated={validated}
        onSubmit={userLogin}
      >
        <div className="container">
          <div className="mb-3 mt-4">
            <CFormInput
              label="username"
              type="text"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <CFormInput
              label="password"
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <a href="">forgot password</a>
          </div>
          <CButton type="submit" className="btn btn-success">
            Sign-In
          </CButton>
          <CButton
            type="button"
            className="btn btn-info reg"
            onClick={() => {
              setShowUserRegModal(true);
            }}
          >
            Sign-Up
          </CButton>
        </div>
      </CForm>
      {showUserRegModal && (
        <UserRegister
          show={showUserRegModal}
          handleClose={() => {
            setShowUserRegModal(false);
          }}
        />
      )}
    </>
  );
};
export default Login;
