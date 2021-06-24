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
    <li className={`my-2 border ${props.price === 0 ? "border-blue-300" : "border-pink-300"}`}>
      <Link href={`/plans/${props.planId}`}>
        <a className={`flex items-center ${props.price === 0 ? "bg-blue-300" : "bg-pink-300"}`}>
          {props.planImage === "" ? (
            <PencilSvg className="w-12 h-12 mx-2" />
          ) : (
            <img
              src={`${MEDIAFILE_API_ENDPOINT}${props.planImage}`}
              className="w-12 h-12 block object-cover"
              alt=""
            />
          )}

          <div className="pl-2">
            <div className="font-bold">{props.title}</div>
            <div className="text-xs text-gray-500">{props.content}</div>
            <div>{props.price.toString()}円</div>
          </div>
        </a>
      </Link>
    </li>
  );
};
