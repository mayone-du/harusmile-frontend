import Link from "next/link";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

type Props = {
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
      <div className="p-4 border border-t-8 border-pink-200">
        <div className="flex items-center">
          <img
            src={`${MEDIAFILE_API_ENDPOINT}${props.profileImage}`}
            className="object-cover w-14 h-14 rounded-full border border-blue-600"
            alt="Profile"
          />

          <div>
            <div className="flex items-center">
              <div className="text-2xl">{props.profileName}</div>
              <div> {props.age.toString()}歳</div>
            </div>

            <div>
              <div>{props.schoolName}</div>
            </div>
          </div>
        </div>

        <div className="py-2">{props.profileText}</div>

        <div className="flex justify-between items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
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
          </div>
          <div>
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

        <dl>
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
