# HaruSmile について

## 概要

## 主な使用技術

- Next.js
- TypeScript
- Tailwind CSS
- GraphQL
- Apollo Client
- GraphQL Code Generator
- Jest
- ESLint
- Prettier

### TODO

- バグ
  - 非ログイン時のプロフィール詳細、プラン詳細のデータ取得が、ページ遷移時は取得できるがリロードすると取得できない
- 機能追加
  - 友達申請
  - 検索機能
  - 大学生と高校生での検索相手などの変更
  - 数件ずつ結果を取得
  - 各入力欄などのバリデーション
  - エラーハンドリング
- リファクタリング
  - 検索時の条件など
  - ログインユーザーのデータ保持まわり
  - テストコード
  - useCallBack / useMemo の使用
  - 書き方などの統一
  - ファイルやコンポーネントの分割
- その他細かいタスクなど
  - title タグの設定や SEO 全般
  - UI の構築

### DONE

- 機能

  - 新規登録
  - ログイン
  - ログアウト
  - プランの投稿
  - メッセージ
  - レビュー
  - 通知

## 認証フロー

1. 新規登録
2. 登録したメールアドレスに送信したリンクをクリックして本登録
3. ログイン
