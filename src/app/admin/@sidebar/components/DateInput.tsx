import { ChangeEvent, useId } from "react";

interface DateInputProps {
  callback: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export default function DateInput({
  callback,
  label,
}: DateInputProps) {
  const id = useId();

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text text-stone-700">{label}</span>
      </div>
      <label
        htmlFor={`nb-money-${id}`}
        className="input input-bordered flex w-full max-w-xs items-center gap-1 border-slate-300 bg-transparent shadow-sm"
      >
        <input
          id={`nb-money-${id}}`}
          name={`money-${id}}`}
          type="date"
          step={0.01}
          min={0}
          onChange={callback}
        />
      </label>
    </label>
  );
}
