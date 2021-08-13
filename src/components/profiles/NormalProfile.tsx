import { useReactiveVar } from "@apollo/client";
import Link from "next/link";
import { loginUserVar } from "src/apollo/cache";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";

type Props = {
  targetProfileId: string;
  targetProfileName: string;
  targetProfileText: string;
  targetProfileImage: string;
  targetIsCollegeStudent: boolean;
  targetSchoolName: string;
  targetAge: number;
  targetUndergraduate: string;
  targetDepartment: string;
  targetClubActivities: string;
  targetFavoriteSubject: string;
  targetWantHear: string;
  targetProblem: string;
  targetGender: string;
  targetAddress: string;
};
// プロフィール詳細
export const NormalProfile: React.VFC<Props> = (props) => {
  const loginUserData = useReactiveVar(loginUserVar);
  return (
    <div>
      <div className="flex items-center justify-between bg-gray-200">
        <p className="p-2 text-sm text-gray-600">
          基本情報 {props.targetIsCollegeStudent ? "（大学生）" : "（高校生）"}
        </p>
        {loginUserData.profileId === props.targetProfileId && (
          <Link href="/settings">
            <a className="py-2 px-4 text-white text-sm bg-pink-400">編集</a>
          </Link>
        )}
      </div>
      <div className="flex items-center justify-center py-4">
        <ProfileImageIcon
          profileImagePath={props.targetProfileImage}
          className="w-20 h-20 mx-2 rounded-full object-cover"
        />
        <div className="px-2">
          <p className="text-lg font-bold">{props.targetProfileName}</p>
          <p className="text-sm text-gray-600 dark:text-white">
            {props.targetSchoolName === "" ? "学校名：未設定" : props.targetSchoolName}
          </p>
          <p className="text-xs text-gray-600 dark:text-white">
            {props.targetAge === 0 ? "年齢：未設定" : `${props.targetAge.toString()}歳`}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-gray-200">
        <p className="p-2 text-sm text-gray-600">プロフィール</p>
      </div>
      {/* <div className="flex items-center justify-between bg-gray-200">
        <p className="p-2 text-sm text-gray-600">プロフィール</p>
        {loginUserData.profileId === props.targetProfileId && (
          <Link href="/settings">
            <a className="py-2 px-4 text-white text-sm bg-pink-400">編集</a>
          </Link>
        )}
      </div> */}
      {/* 自己紹介 */}
      <div className="my-4">
        <p className="text-sm text-gray-600 dark:text-white">
          {props.targetProfileText ? props.targetProfileText : "未設定"}
        </p>
      </div>
      <ul className="break-words">
        {/* 大学生かによって表示するデータを変更 */}
        {props.targetIsCollegeStudent && (
          <div>
            <li className="flex items-center border-b p-1">
              <div className="text-xs w-1/3 text-gray-600 dark:text-white">学部</div>
              <div className="px-2 w-2/3">
                {props.targetUndergraduate ? props.targetUndergraduate : "未設定"}
              </div>
            </li>
            <li className="flex items-center border-b p-1">
              <div className="text-xs w-1/3 text-gray-600 dark:text-white">学科</div>
              <div className="px-2 w-2/3">
                {props.targetDepartment ? props.targetDepartment : "未設定"}
              </div>
            </li>
            <li className="flex items-center border-b p-1">
              <div className="text-xs w-1/3 text-gray-600 dark:text-white">部活動・サークル</div>
              <div className="px-2 w-2/3">
                {props.targetClubActivities ? props.targetClubActivities : "未設定"}
              </div>
            </li>
          </div>
        )}
        <li className="flex items-center border-b p-1">
          <div className="text-xs w-1/3 text-gray-600 dark:text-white">性別</div>
          <div className="px-2 w-2/3">{props.targetGender ? props.targetGender : "未設定"}</div>
        </li>
        <li className="flex items-center border-b p-1">
          <div className="text-xs w-1/3 text-gray-600 dark:text-white">住所</div>
          <div className="px-2 w-2/3">{props.targetAddress ? props.targetAddress : "未設定"}</div>
        </li>
        <li className="flex items-center border-b p-1">
          <div className="text-xs w-1/3 text-gray-600 dark:text-white">聞きたいこと</div>
          <div className="px-2 w-2/3">{props.targetWantHear ? props.targetWantHear : "未設定"}</div>
        </li>
        <li className="flex items-center border-b p-1">
          <div className="text-xs w-1/3 text-gray-600 dark:text-white">悩んでいること</div>
          <div className="px-2 w-2/3">{props.targetProblem}</div>
        </li>
      </ul>
    </div>
  );
};
