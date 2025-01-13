import { ChangeEvent, useId } from "react";

interface ToggleButtonProps {
  title: string;
  group: string;
  checked: boolean;
  callback: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ToggleButton({
  title,
  group,
  checked,
  callback,
}: ToggleButtonProps) {
  const id = useId();

  return (
    <>
      <label
        htmlFor={`env-${id}`}
        className="btn btn-block mt-2 border-slate-400 bg-transparent text-stone-700 hover:border-sky-600 hover:bg-sky-400/40 has-[:checked]:border-sky-600 has-[:checked]:bg-sky-400/40"
      >
        <input
          className="hidden"
          type="radio"
          name={group}
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
