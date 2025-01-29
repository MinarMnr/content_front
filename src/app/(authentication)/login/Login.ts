import * as Yup from "yup";

class Login {
  public id: string;
  public email: string;
  public password: string;
  public captcha_key: string;
  public captcha_result: string;

  constructor() {
    this.id = "";
    this.email = "";
    this.password = "";
    this.captcha_key = "";
    this.captcha_result = "";
  }

  fromJson(data: any = {}): Login {
    let obj: Login = new Login();
    if (data.id !== undefined && data.id) {
      obj.id = data.id;
    }

    obj.email = data.email ?? "";
    obj.password = data.password ?? "";
    obj.captcha_key = data.captcha_key ?? "";
    obj.captcha_result = data.captcha_result ?? "";
    return obj;
  }

  /**
   * Get string from model instance
   */
  toString(data: any = {}): string {
    let obj = new Login().fromJson(data);
    return JSON.stringify(obj);
  }

  validation(): Yup.ObjectSchema<any> {
    return Yup.object().shape({
      email: Yup.string()
        .trim("Username cannot include leading and trailing spaces")
        .strict(true)
        .required("Required")
        .typeError("Required"),

      password: Yup.string().required("Required").typeError("Required"),
      captcha_key: Yup.string().required("Required").typeError("Required"),
      captcha_result: Yup.string().required("Required").typeError("Required"),
    });
  }
}

export const LoginModel = new Login();
