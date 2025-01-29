import * as Yup from "yup";

class ResetForgetPassword {
  constructor() {
    this.token = "";
    //this.email = "";
    this.password = "";
    this.password_confirmation = "";
  }

  fromJson(data = {}) {
    let obj = new ResetForgetPassword();
    if (data.id !== undefined && data.id) {
      obj.id = data.id;
    }

    //obj.email = data.email ?? "";
    //obj.token = data.token ?? "";
    obj.password_confirmation = data.password_confirmation ?? "";
    obj.password = data.password ?? "";
    return obj;
  }

  /**
   * Get string from model instance
   */
  toString(data = {}) {
    let obj = new ResetForgetPassword().fromJson(data);
    return JSON.stringify(obj);
  }

  validation() {
    return Yup.object().shape({
      //email: Yup.string().required("Required").typeError("Required"),

      password: Yup.string()
        .required("Please Enter your password")
        .typeError("Required"),

      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .typeError("Required! Passwords must match"),
    });
  }
}

export const ResetForgetPasswordModel = new ResetForgetPassword();
