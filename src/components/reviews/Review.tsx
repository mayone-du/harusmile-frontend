import { RatingView } from "react-simple-star-rating";
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
            <RatingView
              className="flex items-center"
              ratingValue={props.reviewStars}
              emptyColor={"#cccccc"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </RatingView>
            <div className="px-2">{props.reviewStars.toString()}</div>
          </div>
          <p className="text-sm">{props.reviewText}</p>
          <p className="font-bold text-xs">{props.customerName}</p>
        </div>
      </div>
    </li>
  );
};
