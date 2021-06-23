import Link from "next/link";
import { PencilSvg } from "src/components/icons/svgs/PencilSvg";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

type Props = {
  planId: string;
  title: string;
  content: string;
  price: number;
  planImage: string;
};
export const Plan: React.VFC<Props> = (props) => {
  return (
    <li>
      <Link href={`/plans/${props.planId}`}>
        <a
          className={`border flex items-center ${
            props.price === 0 ? "bg-blue-300" : "bg-pink-300"
          }`}
        >
          {props.planImage === "" ? (
            <PencilSvg className="w-12 h-12 border" />
          ) : (
            <img
              src={`${MEDIAFILE_API_ENDPOINT}${props.planImage}`}
              className="w-8 h-8 block"
              alt=""
            />
          )}

          <div className="px-4">
            <div className="font-bold">{props.title}</div>
            <div className="text-xs text-gray-500">{props.content}</div>
            <div>{props.price.toString()}円</div>
          </div>
        </a>
      </Link>
    </li>
  );
};
