import { Button } from "@material-ui/core";
import type { NextPage } from "next";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Layout } from "src/components/layouts/Layout";
import { useValidateLoginUser } from "src/libs/hooks/users/useValidateLoginUser";
import { CONTACT_SLACK_WEBHOOK_URL } from "src/utils/API_ENDPOINTS";

const Contact: NextPage = () => {
  const { loginUserData } = useValidateLoginUser();

  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputContent, setInputContent] = useState("");

  useEffect(() => {
    setInputEmail(loginUserData.email);
    setInputName(loginUserData.profileName);
  }, [loginUserData]);

  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  }, []);
  const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  }, []);
  const handleContentChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(event.target.value);
  }, []);
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
        <h2 className="text-3xl text-center py-4">Contact</h2>
        <form onSubmit={handleSubmit}>
          <p className="text-xs mt-4">メールアドレス</p>
          <input
            type="email"
            onChange={handleEmailChange}
            value={inputEmail}
            placeholder="メールアドレス"
            className="w-full border rounded block mb-2 p-2"
          />
          <p className="text-xs mt-4">ユーザーネーム</p>
          <input
            type="text"
            onChange={handleNameChange}
            value={inputName}
            placeholder="ユーザーネーム"
            className="w-full border rounded block mb-2 p-2"
          />
          <p className="text-xs mt-4">お問い合わせ内容</p>
          <textarea
            className="w-full border rounded block mb-2 p-2"
            rows={4}
            onChange={handleContentChange}
            placeholder="お問い合わせ内容"
            value={inputContent}
          ></textarea>
          <div className="flex justify-center">
            <Button variant="outlined" type="submit">
              送信する
            </Button>
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default Contact;
