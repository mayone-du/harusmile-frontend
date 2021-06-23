import Link from "next/link";

type Props = {
  planId: string;
  title: string;
  content: string;
  price: number;
};
export const Plan: React.VFC<Props> = (props) => {
  return (
    <li>
      <Link href={`/plans/${props.planId}`}>
        <a className={`border block ${props.price === 0 ? "bg-blue-300" : "bg-pink-300"}`}>
          <div className="font-bold">{props.title}</div>
          <div className="text-xs text-gray-500">{props.content}</div>
          <div>{props.price.toString()}円</div>
        </a>
      </Link>
    </li>
  );
};
