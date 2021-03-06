import { memo } from "react";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

type Props = {
  profileImagePath: string | undefined | null;
  className: string;
};

export const ProfileImageIcon: React.VFC<Props> = memo((props) => {
  if (
    props.profileImagePath === undefined ||
    props.profileImagePath === null ||
    props.profileImagePath === ""
  ) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${props.className} border-transparent`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }
  return (
    <img
      src={`${MEDIAFILE_API_ENDPOINT}${props.profileImagePath}`}
      className={props.className}
      alt=""
    />
  );
});

ProfileImageIcon.displayName = "ProfileImageIcon";
