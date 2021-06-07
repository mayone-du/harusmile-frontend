type Props = {
  title: string;
  content: string;
};
export const Post: React.VFC<Props> = (props) => {
  return (
    <div>
      <div className="text-3xl">{props.title}</div>
      <div>{props.content}</div>
    </div>
  );
};
