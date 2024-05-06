import { ThemeProvider } from '@emotion/react';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useRouter } from 'next/router';

import useAmplitudeInit from '@/hooks/useAmplitudeInit';
import useLogRocketInit from '@/hooks/useLogRocketInit';

import GlobalProvider from '@/providers/GlobalProvider';
import theme from '@/theme/theme';

import '@/styles/globals.css';

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const { query } = useRouter();

  useLogRocketInit();
  useAmplitudeInit();

  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <GoogleAnalytics
          trackPageViews
          gaMeasurementId={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}
        />
        {getLayout(<Component {...pageProps} />, query)}
      </GlobalProvider>
    </ThemeProvider>
  );
};

export default App;
