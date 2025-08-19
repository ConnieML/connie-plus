import React from "react";
import { Theme } from "@twilio-paste/core/theme";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { AuthProvider } from "../lib/auth";
import { AuthGuard } from "../components/AuthGuard";
import { GlobalNavigation } from "../components/GlobalNavigation";
import { useRouter } from "next/router";

const MyApp: React.FC<React.PropsWithChildren<AppProps>> = ({ Component, pageProps }) => {
  const router = useRouter();
  
  // Pages that don't require authentication
  const publicPages = ['/callback', '/test-okta', '/simple-test', '/debug'];
  const isPublicPage = publicPages.includes(router.pathname);
  
  // Pages that should hide the support buttons (homepage has Quick Actions, support pages don't need them)
  const hideSupportButtons = router.pathname === '/' || router.pathname.startsWith('/support/');

  return (
    <Theme.Provider theme="default">
      <AuthProvider>
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <AuthGuard>
            {!hideSupportButtons && <GlobalNavigation />}
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
