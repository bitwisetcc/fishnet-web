import { ChangeEvent } from "react";

interface ToggleButtonProps {
  title: string;
  checked: boolean;
  callback: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ToggleButton({
  title,
  checked,
  callback,
}: ToggleButtonProps) {
  const id = Math.ceil(Math.random() * 100);

  return (
    <>
      <label
        htmlFor={`env-${id}`}
        className="btn btn-block mt-2 rounded border border-slate-400 bg-transparent p-3 py-2 text-stone-700 hover:border-sky-600 hover:bg-sky-400/40 has-[:checked]:border-sky-600 has-[:checked]:bg-sky-400/40"
      >
        <input
          className="hidden"
          type="radio"
          name="environment"
          id={`env-${id}`}
          value={`fresh`}
          checked={checked}
          onChange={callback}
        />
        {title}
      </label>
    </>
  );
}
