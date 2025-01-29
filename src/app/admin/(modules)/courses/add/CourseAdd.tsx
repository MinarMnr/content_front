import * as Yup from "yup";

class CourseAdd {
  public id: string;
  public title: string;
  public sub_title: string;
  public course_type_id: string;
  public category_id: string;
  public sub_category_id: string;
  public is_published: boolean;
  public description: string;
  public requirement: string;

  constructor() {
    this.id = "";
    this.title = "";
    this.sub_title = "";
    this.course_type_id = "";
    this.category_id = "";
    this.sub_category_id = "";
    this.is_published = false;
    this.description = "";
    this.requirement = "";
  }

  fromJson(data: any = {}): CourseAdd {
    let obj: CourseAdd = new CourseAdd();
    if (data.id !== undefined && data.id) {
      obj.id = data.id;
    }

    obj.title = data.title ?? "";
    obj.sub_title = data.sub_title ?? "";
    obj.course_type_id = data.course_type_id ?? "";
    obj.category_id = data.category_id ?? "";
    obj.sub_category_id = data.sub_category_id ?? "";
    obj.is_published = data.is_published ?? false;
    obj.description = data.description ?? "";
    obj.requirement = data.requirement ?? "";
    return obj;
  }

  /**
   * Get string from model instance
   */
  toString(data: any = {}): string {
    let obj = new CourseAdd().fromJson(data);
    return JSON.stringify(obj);
  }

  validation(): Yup.ObjectSchema<any> {
    return Yup.object().shape({
      title: Yup.string().required("Required").typeError("Required"),
      sub_title: Yup.string().required("Required").typeError("Required"),
      description: Yup.string().required("Required").typeError("Required"),
      course_type_id: Yup.string().required("Required").typeError("Required"),
      category_id: Yup.string().required("Required").typeError("Required"),
    });
  }
}

export const CourseAddModel = new CourseAdd();
