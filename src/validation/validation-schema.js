import axiosInstance from "../api-service/user-service";
export const UsernameValidate = (props) => {
  const rejexUsername = new RegExp(/^[A-Za-z-_'.]*$/);
  if (!rejexUsername.test(props)) {
    return 0;
  } 
else {
    const data = {
      username: props
    };
    return axiosInstance.post("usernameValidation", data)
      .then((response) => {
    console.log('response',response.data)
        if (response.data === true) {
          return 1;
        } else {
          return 2;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
export const EmailValidate = (props) => {
  const rejexEmail = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );
  if (!rejexEmail.test(props)) {
    return 0
  } else {
    const data = {
      email: props
    };
    axiosInstance.post("emailValidation", data)
      .then((response) => {
        if (response === true) {
          return 1
        } else {
          return 2        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
export const PhoneValidate = (props) => {
  const rejexPhone = new RegExp(/^\d{10}$/);
  if (!rejexPhone.test(parseInt(props))) {
    return 0
} else {
    const data = {
      phone_number: props
    };
    axiosInstance.post("phoneValidation", data)
      .then((response) => {
        if (response === true) {
          return 1
        } else {
          return 2
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
export const PasswordValidate = (props) => {
  const rejexPassword = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
  );
  if (!rejexPassword.test(props)) {
   return true
  } else {
    return false
  }
};
