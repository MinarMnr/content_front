import * as Yup from "yup";

type FormikSingleProps = [string, any];

export class FormikProps {
  private initialValue: { [key: string]: number | boolean | string } = {};
  private submitFunc?: Function;
  private others: any;

  private validations: Yup.ObjectSchema<{ [x: string]: any }> =
    Yup.object().shape({});

  constructor(
    props: { [key: string]: FormikSingleProps },
    submit: Function,
    others?: any
  ) {
    let tempVal: { [key: string]: any } = {};
    Object.entries(props)?.forEach(
      ([key, val]: [string, FormikSingleProps]) => {
        this.initialValue = {
          ...this.initialValue,
          [key]: val?.[0],
        };

        tempVal = {
          ...tempVal,
          [key]: val?.[1],
        };
      }
    );
    this.validations = Yup.object().shape(tempVal);
    this.submitFunc = submit;
    this.others = others;
  }

  getFormik() {
    return {
      initialValues: this.initialValue,
      validationSchema: this.validations,
      ...(this.submitFunc
        ? {
            onSubmit: this.submitFunc,
          }
        : {
            onSubmit: () => {},
          }),
      ...(this.others ? this.others : {}),
    };
  }
}
