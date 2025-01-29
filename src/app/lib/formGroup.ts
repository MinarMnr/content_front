import * as validation_fns from '@/app/_services/validations';

interface FormControl {
  value: string | number;
  validation?: Function[];
  errors?: string[];
  options: any;
}

export class FormGroup {
  private _value: {
    [key: string]: FormControl;
  } = {};
  private _setValue: any;

  constructor(creator: { [key: string]: any }, data: any, setData: any) {
    this._value = creator;
    this._setValue = setData;
  }

  public getValue(): any {
    return Object.entries(this._value)?.reduce(
      (pV: any, cV: [key: string, value: FormControl]) => {
        return {
          ...pV,
          [cV?.[0]]: cV?.[1]?.value,
        };
      },
      {}
    );
  }

  public is_valid(): boolean {
    return !Object?.values(this._value)?.find(
      (tada: FormControl) => !!tada?.errors?.length
    );
  }

  public validate() {
    Object.entries(this._value)?.forEach(([key, val]: [string, FormControl]) => {
      
    })
  }

  public setControlError(control: string, errors?: string[]){
    if (this._value?.[control]) {
      this._value[control].errors = errors ?? [];
    }
  }
}
