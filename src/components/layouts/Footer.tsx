import { memo } from "react";

export const Footer: React.VFC = memo(() => {
  return (
    <div>
      <footer>
        <p className="py-6 text-center">copyright&copy;</p>
      </footer>
    </div>
  );
});
Footer.displayName = "Footer";
