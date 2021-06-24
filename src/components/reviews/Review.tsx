import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";

type Props = {
  customerImagePath: string | undefined | null;
  customerName: string;
  reviewText: string;
  reviewStars: number;
};

export const Review: React.VFC<Props> = (props) => {
  return (
    <li className="border my-4 flex items-center">
      <div>
        <ProfileImageIcon
          profileImagePath={props.customerImagePath}
          className="border rounded-full w-12 h-12"
        />
        <div className="font-bold text-xs">{props.customerName}</div>
      </div>
      <div className="px-2">
        <p>{props.reviewText}</p>
        <div>{props.reviewStars.toString()}</div>
      </div>
    </li>
  );
};
