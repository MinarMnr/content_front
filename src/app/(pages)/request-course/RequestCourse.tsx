import * as Yup from "yup";

class RequestCourse {
  public id: string;
  public title: string;
  public description: string;
  public name: string;
  public mobile_no: string;
  public course_type_id: string;
  public category_id: string;
  public sub_category_id: string;
  public other_type: string;

  constructor() {
    this.id = "";
    this.title = "";
    this.name = "";
    this.mobile_no = "";
    this.course_type_id = "";
    this.category_id = "";
    this.sub_category_id = "";
    this.description = "";
    this.other_type = "";
  }

  fromJson(data: any = {}): RequestCourse {
    let obj: RequestCourse = new RequestCourse();
    if (data.id !== undefined && data.id) {
      obj.id = data.id;
    }

    obj.title = data.title ?? "";
    obj.name = data.name ?? "";
    obj.mobile_no = data.mobile ?? "";
    obj.course_type_id = data.course_type_id ?? "";
    obj.category_id = data.category_id ?? "";
    obj.sub_category_id = data.sub_category_id ?? "";
    obj.description = data.description ?? "";
    obj.other_type = data.other_type ?? "";
    return obj;
  }

  /**
   * Get string from model instance
   */
  toString(data: any = {}): string {
    let obj = new RequestCourse().fromJson(data);
    return JSON.stringify(obj);
  }

  toFormData(obj = {}) {
    let data = new FormData();
    data.append("request", new RequestCourse().toString(obj));
    //data.get("request");
    return data;
  }

  validation(): Yup.ObjectSchema<any> {
    return Yup.object().shape({
      title: Yup.string().required("Required").typeError("Required"),
      description: Yup.string().required("Required").typeError("Required"),
      name: Yup.string().required("Required").typeError("Required"),
      mobile_no: Yup.string().required("Required").typeError("Required"),
    });
  }
}

export const RequestCourseModel = new RequestCourse();
