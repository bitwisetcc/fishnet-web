import { useId } from "react";

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  options: Record<string, any>;
}

export default function SelectField({
  name,
  label,
  placeholder,
  options,
}: SelectFieldProps) {
  const id = useId();

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label pb-1">
        <span className="label-text">{label}</span>
      </div>

      <select
        className="select select-bordered select-sm bg-slate-100"
        name={name}
      >
        {placeholder && (
          <option disabled selected>
            {placeholder}
          </option>
        )}

        {Object.entries(options).map(([key, label]) => (
          <option value={key}>{label}</option>
        ))}
      </select>
    </label>
  );
}
