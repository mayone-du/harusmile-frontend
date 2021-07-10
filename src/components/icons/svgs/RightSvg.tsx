import { memo } from "react";

type Props = {
  className: string;
};
export const RightSvg: React.VFC<Props> = memo((props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
});
RightSvg.displayName = "RightSvg";
