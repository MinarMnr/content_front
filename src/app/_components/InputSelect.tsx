// components/InputSelect.tsx
import { useField } from "formik";

interface SelectOption {
  [key: string]: any;
}

interface InputSelectProps {
  name: string;
  label?: string;
  required?: boolean;
  options: SelectOption[];
  valueKey: string;
  labelKey: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect: React.FC<InputSelectProps> = ({
  name,
  label,
  required,
  options,
  valueKey,
  labelKey,
  placeholder,
  onChange,
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1 text-gray-600">
          {label} {required ? <span className="text-red-600">*</span> : null}
        </label>
      )}
      <div className="border border-gray-300 rounded h-10 p-1">
        <select
          {...field}
          id={name}
          onChange={(e) => {
            field.onChange(e); // Update Formik state
            if (onChange) {
              onChange(e); // Call the custom onChange handler if provided
            }
          }}
          className={`mt-1 block w-full rounded-md  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            meta.touched && meta.error ? "border-red-500" : ""
          }`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option[valueKey]} value={option[valueKey]}>
              {option[labelKey]}
            </option>
          ))}
        </select>
        {!meta.value && meta.touched && meta.error && (
          <p className="mt-3 text-sm text-red-600">{meta.error}</p>
        )}
      </div>
    </div>
  );
};

export default InputSelect;
