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
    <li className="my-4 flex items-center">
      <div className="flex items-center w-full">
        <div className="w-1/5">
          <ProfileImageIcon
            profileImagePath={props.customerImagePath}
            className="border rounded-full w-12 h-12"
          />
        </div>
        {/* 吹き出し */}
        <div className="px-2 border-2 w-4/5 rounded bg-gray relative before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:-rotate-45 dark:before:bg-black before:bg-white before:absolute before:top-1/2 before:-left-2 before:transform before:-translate-y-1/2 before:block">
          <div className="flex items-center px-1">
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
