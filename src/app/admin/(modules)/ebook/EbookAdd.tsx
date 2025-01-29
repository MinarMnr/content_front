import * as Yup from "yup";

class EbookAdd {
  public id: string;
  public title: string;
  //public sub_title: string;
  public course_type_id: string;
  public category_id: string;
  public sub_category_id: string;
  public is_published: number;
  public upload_file: string;
  public upload_thumbnail: any;
  //public description: string;
  //public requirement: string;

  constructor() {
    this.id = "";
    this.title = "";
    // this.sub_title = "";
    this.course_type_id = "";
    this.category_id = "";
    this.sub_category_id = "";
    this.is_published = 1;
    this.upload_file = "";
    this.upload_thumbnail = "";
    //this.description = "";
    // this.requirement = "";
  }

  fromJson(data: any = {}): EbookAdd {
    let obj: EbookAdd = new EbookAdd();
    if (data.id !== undefined && data.id) {
      obj.id = data.id;
    }

    obj.title = data.title ?? "";
    // obj.sub_title = data.sub_title ?? "";
    obj.course_type_id = data.course_type_id ?? "";
    obj.category_id = data.category_id ?? "";
    obj.sub_category_id = data.sub_category_id ?? "";
    obj.is_published = data.is_published ?? 0;
    obj.upload_file = data.upload_file ?? data?.document?.url ?? "";
    obj.upload_thumbnail = data.upload_thumbnail ?? data.thumbnail ?? "";
    //obj.description = data.description ?? "";
    //obj.requirement = data.requirement ?? "";
    return obj;
  }

  /**
   * Get string from model instance
   */
  toString(data: any = {}): string {
    let obj = new EbookAdd().fromJson(data);
    return JSON.stringify(obj);
  }

  toFormData(obj = {}) {
    let data = new FormData();

    data.append("request", new EbookAdd().toString(obj));
    //data.get("request");
    return data;
  }

  validation(): Yup.ObjectSchema<any> {
    return Yup.object().shape({
      title: Yup.string().required("Required").typeError("Required"),
      //sub_title: Yup.string().required("Required").typeError("Required"),
      //description: Yup.string().required("Required").typeError("Required"),
      course_type_id: Yup.string().required("Required").typeError("Required"),
      category_id: Yup.string().required("Required").typeError("Required"),
      upload_file: Yup.string().required("Required").typeError("Required"),
      is_published: Yup.number().required("Required").typeError("Required"),
    });
  }
}

export const EbookAddModel = new EbookAdd();
