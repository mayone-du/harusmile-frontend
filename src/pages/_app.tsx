import "tailwindcss/tailwind.css";

import { ApolloProvider } from "@apollo/client";
import type { NextPageContext } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { initializeApollo } from "src/apollo/apolloClient";

const App = (props: AppProps, context: NextPageContext) => {
  const apolloClient = initializeApollo(null, context);

  return (
    <div>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider attribute="class">
          <props.Component {...props.pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </div>
  );
};

export default App;
