import { useId } from "react";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  unit?: string;
}

export default function FormField({
  name,
  label,
  placeholder,
  type = "text",
  unit = "",
}: FormFieldProps) {
  const id = useId();

  return (
    <label className="form-control w-full" htmlFor={id}>
      <div className="label pb-1">
        <span className="label-text text-stone-600">{label}</span>
      </div>

      <label
        htmlFor={id}
        className="input input-sm input-bordered flex w-full max-w-xs items-center gap-2 bg-slate-100"
      >
        {unit && (
          <span className="border-r border-slate-400 pr-3 text-stone-600">
            {unit}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="w-full max-w-xs bg-slate-100"
          id={id}
        />
      </label>
    </label>
  );
}
