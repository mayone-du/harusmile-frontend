import { useReactiveVar } from "@apollo/client";
import Link from "next/link";
import { loginUserVar } from "src/apollo/cache";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";

type Props = {
  targetProfileId: string;
  targetProfileName: string;
  targetProfileText: string;
  targetSchoolName: string;
  targetAge: number;
  targetUndergraduate: string;
  targetDepartment: string;
  targetClubActivities: string;
  targetFavoriteSubject: string;
  targetWantHear: string;
  targetProblem: string;
};
export const NormalProfile: React.VFC<Props> = (props) => {
  const loginUserData = useReactiveVar(loginUserVar);
  return (
    <div>
      <div className="flex items-center justify-between bg-gray-200">
        <p className="p-2 text-sm text-gray-600">
          基本情報 {loginUserData.isCollegeStudent ? "（大学生）" : "（高校生）"}
        </p>
        {loginUserData.profileId === props.targetProfileId && (
          <Link href="/settings">
            <a className="py-2 px-4 text-white text-sm bg-pink-400">編集</a>
          </Link>
        )}
      </div>
      <div className="flex items-center justify-center">
        <ProfileImageIcon profileImagePath="" className="w-20 h-20 px-2" />
        <div className="px-2">
          <h3 className="text-lg font-bold">{props.targetProfileName}</h3>
          <h4>{props.targetSchoolName}</h4>
          <p>{props.targetAge.toString()}歳</p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-gray-200">
        <p className="p-2 text-sm text-gray-600">プロフィール</p>
      </div>
      <div className="border my-4">
        <h4 className="text-center font-bold py-2">一言コメント</h4>
        <p>{props.targetProfileText}</p>
      </div>
      <ul className="break-words">
        {/* 大学生かによって表示するデータを変更 */}
        {loginUserData.isCollegeStudent && (
          <div>
            <li className="flex items-center border-b">
              <div className="text-xs w-1/3 text-gray-600">学部</div>
              <div className="px-2 w-2/3">{props.targetUndergraduate}</div>
            </li>
            <li className="flex items-center border-b">
              <div className="text-xs w-1/3 text-gray-600">学科</div>
              <div className="px-2 w-2/3">{props.targetDepartment}</div>
            </li>
            <li className="flex items-center border-b">
              <div className="text-xs w-1/3 text-gray-600">部活動・サークル</div>
              <div className="px-2 w-2/3">{props.targetClubActivities}</div>
            </li>
          </div>
        )}
        <li className="flex items-center border-b">
          <div className="text-xs w-1/3 text-gray-600">聞きたいこと</div>
          <div className="px-2 w-2/3">{props.targetWantHear}</div>
        </li>
        <li className="flex items-center border-b">
          <div className="text-xs w-1/3 text-gray-600">悩んでいること</div>
          <div className="px-2 w-2/3">{props.targetProblem}</div>
        </li>
      </ul>
    </div>
  );
};
