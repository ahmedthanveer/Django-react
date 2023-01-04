import { React, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDjangoService } from "../api-service/api-service-hooks";
import { CFormInput, CForm, CButton } from "@coreui/react";
import { toast } from "react-toastify";
const UserUpdate = (props) => {
  const [firstName, setFirstName] = useState(props.details.first_name);
  const [lastName, setLastName] = useState(props.details.last_name);
  const [email, setEmail] = useState(props.details.email);
  const [phoneNumber, setPhoneNumber] = useState(props.details.phone_number);
  const [age, setAge] = useState(props.details.age);
  const { putProxy,postProxy } = useDjangoService();
  const [validated, setValidated] = useState(false);
  const [emailCheck, setEmailCheck] = useState("email");
  const [phoneCheck, setPhoneCheck] = useState('phone');
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
  const handleUpdate = (event) => {
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
      age: age,
    };
    putProxy(`Register/${props.id}`, data)
      .then((response) => {
        toast.success("Updated succesfully");
        props.handleClose();
        props.getUser();
      })
      .catch((response) => {
        toast.error("Updation failed");
      });
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
      postProxy(`emailUpdateValidate/${props.id}`, data)
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
    const rejexPhone = new RegExp(/^\d{10}$/);
    setPhoneNumber(phone);
    if (!rejexPhone.test(parseInt(phone))) {
      setPhoneCheck(
        <label style={{ color: "red" }}>Phone number invalid</label>
      );
    } else {
      const data = {
        phone_number: phone,
      };
      postProxy(`phoneUpdateValidate/${props.id}`, data)
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
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <h4>Edit profile</h4>
      </Modal.Header>
      <Modal.Body>
        <CForm
          className="row g-3 needs-validation"
          validated={validated}
          onSubmit={handleUpdate}
        >
          <div className="container-reg">
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
              />
            </div>
            <div className="mb-3">
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
              />
            </div>
            <div className="mb-3">
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
              />
            </div>
            <CButton type="submit" className="btn btn-success"disabled={emailCheck!='email'||phoneCheck!='phone'?true:false}>
              Update
            </CButton>
          </div>
        </CForm>
      </Modal.Body>
    </Modal>
  );
};
export default UserUpdate;
