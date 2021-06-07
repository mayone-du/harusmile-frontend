import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

type Props = {
  profileName: string;
  profileText: string;
  profileImage: string;
};
export const Profile: React.VFC<Props> = (props) => {
  return (
    <div className="p-4 md:w-1/3">
      <div className="border border-t-4 border-pink-200 ">
        <div className="flex">
          <img
            src={`${MEDIAFILE_API_ENDPOINT}${props.profileImage}`}
            className="object-cover w-6 h-6"
            alt=""
          />
          <div className="text-3xl">{props.profileName}</div>
        </div>
        <div>{props.profileText}</div>
      </div>
    </div>
  );
};
