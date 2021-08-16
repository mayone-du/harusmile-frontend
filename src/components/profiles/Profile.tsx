import Rating from "@material-ui/lab/Rating";
import Link from "next/link";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { RightSvg } from "src/components/icons/svgs/RightSvg";

type Props = {
  profileId: string;
  profileName: string;
  profileText: string;
  profileImage: string;
  schoolName: string;
  age: number;
  undergraduate: string;
  department: string;
  clubActivities: string;
  admissionFormat: string;
  favoriteSubject: string;
  isCollegeStudent: boolean;
  problem: string;
  // tags: any;
  stars: any;
};
// プロフィールカード
export const Profile: React.VFC<Props> = (props) => {
  /* 配列の数字の平均を出し、少数第二位を四捨五入 */
  const starRating =
    Math.round(
      props.stars.reduce((prev: number, current: number) => {
        return prev + current / props.stars.length;
      }, 0) * 10,
    ) / 10;
  return (
    <li className="md:p-4 p-1 md:w-1/3 w-1/2">
      <div className="md:p-6 p-2 border border-t-8 border-pink-200">
        <div className="flex items-center w-full">
          <ProfileImageIcon
            className="block object-cover md:w-14 md:h-14 w-8 h-8 rounded-full border"
            profileImagePath={props.profileImage}
          />
          {/* 名前、歳、学校 */}
          <div className="md:pr-12 pr-2 md:pl-6 pl-2 w-full">
            <div className="md:text-2xl text-sm font-bold">{props.profileName}</div>
            <p className="text-1xs md:text-base">
              {/* {props.age.toString() === "0" ? "年齢未設定" : `${props.age.toString()}歳`} */}
              {props.isCollegeStudent ? "大学生" : "高校生"}
            </p>
            <div className="text-gray-600 dark:text-white md:text-base text-xs">
              {props.schoolName}
            </div>
          </div>
        </div>

        {/* プロフィールテキスト */}
        <div className="md:p-4 p-2 md:text-sm text-1xs text-gray-600 dark:text-white">
          {props.profileText}
        </div>

        {/* 大学生と高校生によって表示する項目を出し分け */}
        {props.isCollegeStudent ? (
          <div>
            {/* レビュー */}
            <div className="flex justify-between items-center py-4 border-b border-gray-400">
              <div>
                {/* StarRating */}
                <Rating name={`${props.profileId} stars`} value={starRating} precision={0.1} />
              </div>
              <div className="md:text-base text-xs">
                <span className="block text-yellow-300 font-bold">
                  {/* 評価の平均値が一桁だったら.0を付け加える */}
                  {starRating.toString().length === 1
                    ? `${starRating.toString()}.0`
                    : starRating.toString()}
                </span>
                <span className="block text-black dark:text-white">
                  ({props.stars.length.toString()})
                </span>
              </div>
            </div>

            {/* tags */}
            {/* <ul>
          <div className="text-lg">Tags</div>
          {props.tags.edges.map((tag: any, index: any) => {
            return (
              <li key={index} className="border">
                {tag.node.tagName}
              </li>
            );
          })}
        </ul> */}

            {/* 学校詳細 */}
            <dl className="md:px-4 md:pt-4 px-2 pt-2 md:text-base text-xs">
              <div className="flex items-center">
                <dt className="w-1/2">学部</dt>
                <dd className="w-1/2">
                  {props.undergraduate === "" ? "未設定" : props.undergraduate}
                </dd>
              </div>
              <div className="flex items-center">
                <dt className="w-1/2">学科</dt>
                <dd className="w-1/2">{props.department === "" ? "未設定" : props.department}</dd>
              </div>
              {/* <div className="flex items-center">
                <dt className="w-1/2">部活</dt>
                <dd className="w-1/2">{props.clubActivities}</dd>
              </div>
              <div className="flex items-center">
                <dt className="w-1/2">入学形式</dt>
                <dd className="w-1/2">{props.admissionFormat}</dd>
              </div>
              <div className="flex items-center">
                <dt className="w-1/2">好きな科目</dt>
                <dd className="w-1/2">{props.favoriteSubject}</dd>
              </div> */}
            </dl>
          </div>
        ) : (
          <div className="border-t">
            <dl className="md:px-4 md:pt-4 px-2 pt-2 md:text-base text-xs">
              <div className="flex items-center">
                <dt className="w-1/2">悩み</dt>
                <dd className="w-1/2">{props.problem ? props.problem : "未設定"}</dd>
              </div>
            </dl>
          </div>
        )}

        <div>
          <Link href={`/profiles/detail/${props.profileId}`}>
            <a className="flex items-center justify-center py-2 px-4 md:my-6 my-2 mx-auto md:w-2/3 w-5/6 text-pink-400 rounded-3xl border border-pink-400 md:text-base text-xs">
              <span className="block">詳細を見る</span>
              <RightSvg className="h-4 w-4 ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </li>
  );
};
