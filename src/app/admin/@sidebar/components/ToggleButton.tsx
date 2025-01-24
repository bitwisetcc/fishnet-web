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
        className="btn btn-outline btn-secondary btn-block mt-2 has-[:checked]:btn-active"
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
