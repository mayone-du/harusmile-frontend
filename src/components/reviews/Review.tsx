import Rating from "@material-ui/lab/Rating";
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
      <div className="flex items-center">
        <ProfileImageIcon
          profileImagePath={props.customerImagePath}
          className="border rounded-full w-12 h-12"
        />
        <div className="px-2">
          <div className="flex items-center">
            <Rating
              name={`${props.customerImagePath} stars`}
              readOnly
              value={props.reviewStars}
              precision={0.1}
            />
            <div className="px-2 font-bold text-yellow-300">
              {props.reviewStars.toString().length === 1
                ? `${props.reviewStars.toString()}.0`
                : props.reviewStars.toString()}
            </div>
          </div>
          <p className="text-sm">{props.reviewText}</p>
          <p className="font-bold text-xs">{props.customerName}</p>
        </div>
      </div>
    </li>
  );
};
