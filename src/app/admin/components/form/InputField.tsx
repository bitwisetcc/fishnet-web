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
        <span className="label-text text-base-content">{label}</span>
      </div>

      <label
        htmlFor={id}
        className="input input-sm input-bordered flex w-full max-w-xs items-center gap-2 bg-base-200"
      >
        {unit && (
          <span className="border-r border-base-300 pr-3 text-base-content/80">
            {unit}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="w-full max-w-xs"
          id={id}
        />
      </label>
    </label>
  );
}
