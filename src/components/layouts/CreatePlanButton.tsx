import Link from "next/link";
import { AddSvg } from "src/components/icons/svgs/AddSvg";

export const CreatePlanButton: React.VFC = () => {
  return (
    <div className="relative">
      <Link href="/plans">
        <a className="flex flex-col items-center justify-center focus:outline-none bg-blue-600 rounded-full w-20 h-20 absolute -top-16 left-1/2 transform -translate-x-1/2 shadow-md">
          <AddSvg className="h-10 w-10 text-white" />
          <span className="block text-xs text-white">プラン作成</span>
        </a>
      </Link>
    </div>
  );
};
