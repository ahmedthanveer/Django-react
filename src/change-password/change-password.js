import { React, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDjangoService } from "../api-service/api-service-hooks";
import { toast } from "react-toastify";
const ChangePassword = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState('new password');
  const { postProxy, putProxy } = useDjangoService();
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
  const checkPassword = (id) => {
    const data = {
      password: currentPassword,
    };
    postProxy(`checkPassword/${id}`, data)
      .then((response) => {
        if (response === true) {
          setShowPasswordField(true);
        } else {
          toast.error(response.password[0]);
        }
      })
      .catch((response) => {
        toast.error(response.password[0]);
      });
  };
  const handleChangePassword = (id) => {
    const data = {
      password: newPassword,
      confirmpassword: confirmPassword,
    };
    putProxy(`changePassword/${id}`, data)
      .then((response) => {
        toast.success("password changed successfully");
        props.handleClose();
      })
      .catch((response) => {
        toast.error(response.password[0]);
      });
  };
  const passwordValidate = (password) => {
    setNewPassword(password);
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
      setPasswordCheck('new password');
    }
  };
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Body>
          <div>
            <div hidden={showPasswordField === true ? true : false}>
              <label>Current password</label>
              <input
                type="password"
                placeholder="Current password"
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                value={currentPassword}
                className="form-control mt-2"
              />
              <Button
                variant="primary"
                type="submit"
                className="mb-3 mt-2"
                onClick={() => {
                  checkPassword(props.id);
                }}
                disabled={!currentPassword}
              >
                Submit
              </Button>
            </div>
            <div hidden={showPasswordField === true ? false : true}>
              <label>{passwordCheck}</label>
              <input
                type="password"
                placeholder="New password"
                onChange={(e) => {
                  passwordValidate(e.target.value);
                }}
                value={newPassword}
                className="form-control mt-2 mb-2"
              />
              <label>Confirm password</label>
              <input
                type="password"
                placeholder="Confirm password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                className="form-control mt-2"
              />
              <Button
                variant="primary"
                type="submit"
                className="mb-3 mt-2"
                onClick={() => {
                  handleChangePassword(props.id);
                }}
                disabled={!newPassword || !confirmPassword}
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  );
};
export default ChangePassword;
