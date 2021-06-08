import Link from "next/link";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

type Props = {
  profileName: string;
  profileText: string;
  profileImage: string;
  schoolName: string;
  age: number;
  tags: any;
  stars: any;
};
export const Profile: React.VFC<Props> = (props) => {
  return (
    <li className="p-4 md:w-1/3">
      <div className="border border-t-4 border-pink-200 ">
        <div className="flex">
          <img
            src={`${MEDIAFILE_API_ENDPOINT}${props.profileImage}`}
            className="object-cover w-6 h-6"
            alt=""
          />

          <div>
            <div>
              <span className="text-3xl">{props.profileName}</span>
              <span>{props.age.toString()}歳</span>
            </div>
            <div>
              <div>{props.schoolName}</div>
            </div>
          </div>
        </div>

        <div>{props.profileText}</div>
        <div className="text-yellow-200">
          {/* 配列の数字の平均を出し、少数第二位を切り上げ */}
          {(
            Math.ceil(
              props.stars.reduce((prev: number, current: number) => {
                return prev + current / props.stars.length;
              }, 0) * 10,
            ) / 10
          ).toString()}{" "}
          / 5<span className="text-black">(合計{props.stars.length.toString()}件)</span>
        </div>
        <ul>
          <div className="text-lg">Tags</div>
          {props.tags.edges.map((tag: any, index: any) => {
            return (
              <li key={index} className="border">
                {tag.node.tagName}
              </li>
            );
          })}
        </ul>
        <div>
          <Link href="/">
            <a className="block py-2 px-4 my-6 mx-auto w-2/3 text-center rounded-lg border border-pink-200">
              詳細を見る
            </a>
          </Link>
        </div>
      </div>
    </li>
  );
};
