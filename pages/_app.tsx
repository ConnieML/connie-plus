import React from "react";
import { Theme } from "@twilio-paste/core/theme";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { AuthProvider } from "../lib/auth";
import { AuthGuard } from "../components/AuthGuard";
import { useRouter } from "next/router";

const MyApp: React.FC<React.PropsWithChildren<AppProps>> = ({ Component, pageProps }) => {
  const router = useRouter();
  
  // Pages that don't require authentication
  const publicPages = ['/callback', '/test-okta', '/simple-test', '/debug'];
  const isPublicPage = publicPages.includes(router.pathname);

  return (
    <Theme.Provider theme="default">
      <AuthProvider>
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        )}
      </AuthProvider>
    </Theme.Provider>
  );
};

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  // eslint-disable-next-line no-console
  console.log(metric);
}

export default MyApp;
