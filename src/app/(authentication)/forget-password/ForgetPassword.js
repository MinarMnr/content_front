import * as Yup from "yup";

class ForgetPassword {
  constructor() {
    this.email = "";
  }

  fromJson(data = {}) {
    let obj = new ForgetPassword();
    if (data.id !== undefined && data.id) {
      obj.id = data.id;
    }

    obj.email = data.email ?? "";
    return obj;
  }

  /**
   * Get string from model instance
   */
  toString(data = {}) {
    let obj = new ForgetPassword().fromJson(data);
    return JSON.stringify(obj);
  }

  validation() {
    return Yup.object().shape({
      email: Yup.string().required("Required").typeError("Required"),
    });
  }
}

export const ForgetPasswordModel = new ForgetPassword();
