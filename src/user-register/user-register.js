import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDjangoService } from "../api-service/api-service-hooks";
import { CFormInput, CForm, CButton,CFormSelect } from "@coreui/react";
import { toast } from "react-toastify";
import { contrycode } from "../shared/constants";
const UserRegister = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const { postProxy } = useDjangoService();
  const [validated, setValidated] = useState(false);
  const [usernameCheck, setUsernameCheck] = useState('username');
  const [emailCheck, setEmailCheck] = useState("email");
  const [phoneCheck, setPhoneCheck] = useState('phone');
  const [passwordCheck, setPasswordCheck] = useState('password');
  useEffect(() => {
    escExit();
  }, []);
  const escExit = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        props.handleClose();
      }
    });
  };
  const createUser = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      username: username,
      password: password,
      confirmpassword: confirmPassword,
      gender: gender,
      age: age,
    };
    const savePromise = postProxy("Register", data);
    savePromise
      .then((response) => {
        props.handleClose();
        toast.success("Registered successfuly");
      })
      .catch((response) => {
        let message = response.username
          ? response.username[0]
          : response.password[0];
        toast.error(message);
      });
  };
  const usernameValidate = (username) => {
    setUsername(username.toLowerCase());
    const rejexUsername = new RegExp(/^[A-Za-z-_'.]*$/);
    if (!rejexUsername.test(username)) {
      setUsernameCheck(
        <label style={{ color: "red" }}>username invalid</label>
      );
    } else {
      const data = {
        username: username,
      };
      postProxy("usernameValidation", data)
        .then((response) => {
          if (response === true) {
            setUsernameCheck(
              <label style={{ color: "red" }}>username already exist</label>
            );
          } else {
            setUsernameCheck("username");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const emailValidate = (email) => {
    setEmail(email);
    const rejexUsername = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    if (!rejexUsername.test(email)) {
      setEmailCheck(<label style={{ color: "red" }}>email not valid</label>);
    } else {
      const data = {
        email: email,
      };
      postProxy("emailValidation", data)
        .then((response) => {
          if (response === true) {
            setEmailCheck(
              <label style={{ color: "red" }}>email already registered</label>
            );
          } else {
            setEmailCheck("email");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const phoneValidate = (phone) => {
    const rejexPhone = new RegExp(/^[0-9]$/);
    setPhoneNumber(phone);
    if (!rejexPhone.test(parseInt(phone))) {
      setPhoneCheck(
        <label style={{ color: "red" }}>Phone number invalid</label>
      );
    } else {
      const data = {
        phone_number: phone,
      };
      postProxy("phoneValidation", data)
        .then((response) => {
          if (response === true) {
            setPhoneCheck(
              <label style={{ color: "red" }}>
                phone number already registered
              </label>
            );
          } else {
            setPhoneCheck('phone');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const passwordValidate = (password) => {
    setPassword(password);
    const rejexPassword = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
    );
    if (!rejexPassword.test(password)) {
      setPasswordCheck(
        <label style={{ color: "red" }}>
          Minimum eight and maximum 10 characters, at least one uppercase
          letter, one lowercase letter, one number and one special character
        </label>
      );
    } else {
      setPasswordCheck('password');
    }
  };
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <h4>New Registration</h4>
      </Modal.Header>
      <Modal.Body>
        <CForm
          className="row g-3 needs-validation"
          validated={validated}
          onSubmit={createUser}
        >
          <div className="container-reg">
            <div className="mb-3">
              <CFormInput
                type="text"
                label={usernameCheck}
                id="validationCustom01"
                name="username"
                feedbackInvalid="You can't miss username!"
                feedbackValid="Looks good!"
                onChange={(e) => {
                  usernameValidate(e.target.value);
                }}
                value={username}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="text"
                name="first"
                label="First name"
                feedbackValid="Looks good!"
                feedbackInvalid="You can't miss first name!"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <CFormInput
                feedbackInvalid="You can't miss last name!"
                label="Last name"
                type="text"
                name="last"
                feedbackValid="Looks good!"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <CFormInput
                label={emailCheck}
                type="email"
                name="email"
                feedbackValid="Looks fine!"
                feedbackInvalid="You can't miss email!"
                onChange={(e) => {
                  emailValidate(e.target.value);
                }}
                value={email}
                required
                autoComplete="off"
              />
            </div>
            <div className="row mb-3">
                <div className="col-4">
                <CFormSelect id="validationDefault04" label="Cuntry">
      <option >Choose</option>
      <option>...</option>
    </CFormSelect>
                </div>
                <div className="col-8">
                <CFormInput
                label={phoneCheck}
                type="text"
                name="phone"
                feedbackInvalid="You can't miss Phone number!"
                feedbackValid="Looks good!"
                onChange={(e) => {
                  phoneValidate(e.target.value);
                }}
                value={phoneNumber}
                required
                autoComplete="off"
              />
                </div>
            </div>
            <div className="row mb-3">
            <div className="col-4">
                <CFormSelect value={gender} onChange={(e)=>setGender(e.target.value)} id="validationDefault04" label="Gender">
      <option  value='male' >male</option>
      <option value='female'>female</option>
      <option value='transgender'>transgender</option>
    </CFormSelect>
                </div>
           <div className="col-8">
           <CFormInput
                label="Age"
                type="string"
                feedbackInvalid="You can't miss your Age"
                feedbackValid="Looks good!"
                name="age"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                value={age}
                required
                autoComplete="off"
              />
           </div>
            </div>
            <div className="mb-3">
              <CFormInput
                label={passwordCheck}
                type="password"
                name="password"
                feedbackInvalid="Please enter your password"
                feedbackValid="Looks good!"
                onChange={(e) => {
                  passwordValidate(e.target.value);
                }}
                value={password}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                label="Confirm password"
                type="password"
                name="confpassword"
                feedbackValid="It should mach with password"
                feedbackInvalid="Please confirm your password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                required
              />
            </div>
            <CButton
              type="submit"
              className="btn btn-success"
              disabled={
                usernameCheck!=='username' || emailCheck!=='email' || phoneCheck!=='phone' || passwordCheck!=='password'
                  ? true
                  : false
              }
            >
              Submit
            </CButton>
          </div>
        </CForm>
      </Modal.Body>
    </Modal>
  );
};
export default UserRegister;
