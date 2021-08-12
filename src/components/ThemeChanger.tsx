import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

// カラーモード変更コンポーネント
export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const handleChangeTheme = useCallback(() => {
    theme === "light" && setTheme("dark");
    theme === "dark" && setTheme("light");
  }, [theme, setTheme]);
  return (
    <div className="py-16">
      <Switch
        checked={theme === "light"}
        onChange={handleChangeTheme}
        className={`${theme === "light" ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-gray-500 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${theme === "light" ? "translate-x-9" : "translate-x-0"}
            pointer-events-none flex items-center justify-center h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        >
          {/* 現在のテーマによってアイコンを出し分け */}
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </span>
      </Switch>
    </div>
  );
};
