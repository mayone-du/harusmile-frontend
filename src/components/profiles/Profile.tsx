import Link from "next/link";
import { Stars } from "src/components/profiles/Stars";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

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
  // tags: any;
  stars: any;
};
export const Profile: React.VFC<Props> = (props) => {
  return (
    <li className="p-4 md:w-1/3">
      <div className="p-6 border border-t-8 border-pink-200">
        <div className="flex items-center w-full">
          {/* プロフ画像の有無によって出し分け */}
          {props.profileImage !== "" ? (
            <img
              src={`${MEDIAFILE_API_ENDPOINT}${props.profileImage}`}
              className="block object-cover w-14 h-14 rounded-full border border-gray-500"
              alt="Profile"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block w-14 h-14"
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
          )}

          {/* 名前、歳、学校 */}
          <div className="pr-12 pl-6 w-full">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{props.profileName}</div>
              <div> {props.age.toString()}歳</div>
            </div>

            <div className="text-gray-600">{props.schoolName}</div>
          </div>
        </div>

        {/* プロフィールテキスト */}
        <div className="p-4 text-sm text-gray-600">{props.profileText}</div>

        {/* 星 */}
        <div className="flex justify-between items-center py-4 border-b border-gray-400">
          <div>
            <Stars />
          </div>
          <div>
            {/* 配列の数字の平均を出し、少数第二位を四捨五入 */}
            {(
              Math.round(
                props.stars.reduce((prev: number, current: number) => {
                  return prev + current / props.stars.length;
                }, 0) * 10,
              ) / 10
            ).toString()}{" "}
            / 5<span className="text-black">(合計{props.stars.length.toString()}件)</span>
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
        <dl className="px-4 pt-4">
          <div className="flex items-center">
            <dt className="w-1/2">学部</dt>
            <dd className="w-1/2">{props.undergraduate}</dd>
          </div>
          <div className="flex items-center">
            <dt className="w-1/2">学科</dt>
            <dd className="w-1/2">{props.department}</dd>
          </div>
          <div className="flex items-center">
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
          </div>
        </dl>

        <div>
          <Link href={`/profiles/${props.profileId}`}>
            <a className="block py-2 px-4 my-6 mx-auto w-2/3 text-center rounded-lg border border-pink-200">
              詳細を見る
            </a>
          </Link>
        </div>
      </div>
    </li>
  );
};
