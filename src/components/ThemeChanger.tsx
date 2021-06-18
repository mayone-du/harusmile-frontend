import { useTheme } from "next-themes";

export const ThemeChanger = () => {
  const { setTheme } = useTheme();
  const handleLight = () => {
    setTheme("light");
  };
  const handleDark = () => {
    return setTheme("dark");
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <button className="border block p-2 rounded-sm" onClick={handleLight}>
          Light
        </button>
        <button className="border block p-2 rounded-sm" onClick={handleDark}>
          Dark
        </button>
      </div>
    </div>
  );
};
