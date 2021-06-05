import Link from "next/link";

export const Header: React.VFC = () => {
  return (
    <div>
      <header className="px-32">
        <nav className="flex justify-between items-center">
          <div className="m-2">
            <Link href="/">
              <a>logo</a>
            </Link>
          </div>
          <ul className="flex">
            <li className="m-2">
              <Link href="/">
                <a>HOME</a>
              </Link>
            </li>
            <li className="m-2">
              <Link href="/auth/signup">
                <a>SignUp</a>
              </Link>
            </li>
            <li className="m-2">
              <Link href="/settings">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
