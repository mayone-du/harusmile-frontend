import type { NextPage } from "next";
import { useState } from "react";
import toast from "react-hot-toast";
import { Layout } from "src/components/layouts/Layout";
import { CONTACT_SLACK_WEBHOOK_URL } from "src/utils/API_ENDPOINTS";

const Contact: NextPage = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputContent, setInputContent] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(event.target.value);
  };
  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputEmail === "" || inputName === "" || inputContent === "") {
      toast.error("すべての入力欄は必須です。");
      return;
    }
    const payload = {
      text: `
      お問い合わせがありました。\n
      名前: ${inputName}\n
      メールアドレス:${inputEmail}\n
      お問い合わせ内容\n
      ${inputContent}
      `,
    };
    const slack_webhook_url = CONTACT_SLACK_WEBHOOK_URL;

    try {
      slack_webhook_url &&
        (await fetch(slack_webhook_url, {
          method: "POST",
          body: JSON.stringify(payload),
        }));
      alert(
        `送信が完了しました。\n 1~3日以内に、送信していただいたメールアドレス(${inputEmail})宛にご連絡致します。`,
      );
      setInputEmail("");
      setInputName("");
      setInputContent("");
    } catch (error) {
      toast.error(
        "何らかのエラーが発生しました。時間を開けてもう一度試していただくか、Twitterなどからご連絡ください。",
      );
      console.error(error);
      return;
    }
  };
  return (
    <div>
      <Layout spHeaderTitle="お問い合わせ" meta={{ pageName: "お問い合わせ" }}>
        <h2 className="text-3xl text-center py-10">Contact</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            onChange={handleEmailChange}
            className="border p-2 block md:w-1/3 w-full mx-auto"
            value={inputEmail}
            placeholder="メールアドレス"
          />
          <input
            type="text"
            className="border p-2 block md:w-1/3 w-full mx-auto"
            onChange={handleNameChange}
            value={inputName}
            placeholder="ユーザーネーム"
          />
          <textarea
            className="block md:w-1/3 w-full mx-auto border resize-none p-2"
            cols={30}
            rows={5}
            onChange={handleContentChange}
            placeholder="お問い合わせ内容"
            value={inputContent}
          ></textarea>
          <button type="submit" className="block border w-1/4 mx-auto p-2">
            送信する
          </button>
        </form>
      </Layout>
    </div>
  );
};

export default Contact;
