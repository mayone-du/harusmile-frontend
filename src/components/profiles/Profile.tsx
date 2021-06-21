import Link from "next/link";
import { ProfileImageIcon } from "src/components/ProfileImageIcon";
import { Stars } from "src/components/profiles/Stars";

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
  isCollageStudent: boolean;
  // tags: any;
  stars: any;
};
export const Profile: React.VFC<Props> = (props) => {
  return (
    <li className="md:p-4 p-2 md:w-1/3 w-1/2">
      <div className="md:p-6 p-2 border border-t-8 border-pink-200">
        <div className="flex items-center w-full">
          <ProfileImageIcon
            className="block object-cover md:w-14 md:h-14 w-8 h-8 rounded-full border"
            profileImagePath={props.profileImage}
          />
          {/* 名前、歳、学校 */}
          <div className="md:pr-12 pr-2 md:pl-6 pl-2 w-full">
            <div className="flex justify-between items-center">
              <div className="md:text-2xl text-base font-bold">{props.profileName}</div>
              <p className="text-xs md:text-base"> {props.age.toString()}歳</p>
            </div>

            <div className="text-gray-600 md:text-base text-xs">{props.schoolName}</div>
          </div>
        </div>

        {/* プロフィールテキスト */}
        <div className="md:p-4 p-2 md:text-sm text-xs text-gray-600">{props.profileText}</div>

        {/* 星 */}
        <div className="flex justify-between items-center py-4 border-b border-gray-400">
          <div>
            <Stars />
          </div>
          <div className="md:text-base text-xs">
            {/* 配列の数字の平均を出し、少数第二位を四捨五入 */}
            {(
              Math.round(
                props.stars.reduce((prev: number, current: number) => {
                  return prev + current / props.stars.length;
                }, 0) * 10,
              ) / 10
            ).toString()}{" "}
            / 5<span className="text-black">({props.stars.length.toString()}件)</span>
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
          <Link href={`/profiles/detail/${props.profileId}`}>
            <a className="block py-2 px-4 md:my-6 my-2 mx-auto md:w-2/3 w-5/6 text-center text-pink-400 rounded-3xl border border-pink-400 md:text-base text-xs">
              詳細を見る
            </a>
          </Link>
        </div>
      </div>
    </li>
  );
};
