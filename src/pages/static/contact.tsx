import type { NextPage } from "next";
import { useState } from "react";
import { Layout } from "src/components/layouts/Layout";

const Contact: NextPage = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputContent, setInputContent] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value);
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      text: `
      お問い合わせがありました。\n
      名前: ${inputName}\n
      メールアドレス:${inputEmail}\n
      お問い合わせ内容\n
      ${inputContent}
      `,
    };
    const slack_webhook_url = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;
    console.log(slack_webhook_url);

    try {
      slack_webhook_url &&
        (await fetch(slack_webhook_url, {
          method: "POST",
          body: JSON.stringify(payload),
        }));
      alert(
        `送信が完了しました。\n 1~3日以内に、送信していただいたメールアドレス($email)宛にご連絡致します。`,
      );
      setInputEmail("");
      setInputName("");
      setInputContent("");
    } catch (error) {
      alert(
        "何らかのエラーが発生しました。時間を開けてもう一度試していただくか、Twitterなどからご連絡ください。",
      );
      return;
    }
  };
  return (
    <div>
      <Layout metaTitle="Contact">
        <h2 className="text-3xl text-center py-10">Contact</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            onChange={handleEmailChange}
            className="border p-2 block w-1/3 mx-auto"
            value={inputEmail}
            placeholder="email"
          />
          <input
            type="text"
            className="border p-2 block w-1/3 mx-auto"
            onChange={handleNameChange}
            value={inputName}
            placeholder="name"
          />
          <textarea
            className="block w-1/3 mx-auto border resize-none p-2"
            cols={30}
            rows={5}
            onChange={handleContentChange}
            placeholder="content"
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
