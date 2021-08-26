import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

// プロフィール設定ページのinput
export const Input: React.VFC<InputProps> = (props) => {
  return (
    <div>
      <div className="mx-auto md:w-2/3 text-xs">{props.label}</div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className="block p-2 mx-auto md:w-2/3 w-full border-b border-pink-500 focus:outline-none"
        value={props.value}
        onChange={props.onChange}
        max={props.max}
        min={props.min}
      />
    </div>
  );
};
