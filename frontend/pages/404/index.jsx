import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import MainAppLayout from '@/layouts/MainAppLayout';

import LargeLogo from '@/assets/svg/MenuLogo.svg';
import Star3 from '@/assets/svg/Star_2.svg';
import Star from '@/assets/svg/Star_3.svg';
import Star2 from '@/assets/svg/Star_4.svg';

import ROUTES from '@/constants/routes';

import pageNotFoundStyles from '@/styles/pageNotFoundStyles';

/**
 * Renders the page for when the requested route is not found.
 *
 * @return {JSX.Element} The JSX element representing the page.
 */
const PageNotFound = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleRouteToHome = () => {
    router.push(ROUTES.HOME);
  };

  const renderMainTitle = () => {
    return (
      <Grid {...pageNotFoundStyles.titleGridProps}>
        <Typography {...pageNotFoundStyles.subtitleProps}>
          Oops, it seems like you&apos;ve
          <br />
          entered a black hole!
        </Typography>
      </Grid>
    );
  };

  const renderBodyText = () => {
    return (
      <Grid {...pageNotFoundStyles.bodyGridProps}>
        <Typography {...pageNotFoundStyles.bodyProps}>
          Don&apos;t worry, our trusty AI, ReX, is here to help navigate you
          <br />
          back to the known universe. Try checking the URL or head
          <br />
          back to our homepage to continue your tech odyssey.
        </Typography>
      </Grid>
    );
  };

  const renderGoHomeButton = () => {
    return (
      <Grid {...pageNotFoundStyles.buttonGridProps}>
        <GradientOutlinedButton
          bgcolor={theme.palette.Common.White['100p']}
          clickHandler={handleRouteToHome}
          text="Back to Homepage"
          textColor="white"
          {...pageNotFoundStyles.submitButtonProps}
        />
      </Grid>
    );
  };

  const renderTopContent = () => {
    return (
      <Grid {...pageNotFoundStyles.sectionGridProps}>
        <Typography {...pageNotFoundStyles.titleProps}>404</Typography>
      </Grid>
    );
  };

  const renderBottomContent = () => {
    return (
      <Grid {...pageNotFoundStyles.sectionGridProps}>
        <Grid {...pageNotFoundStyles.mainContentGridProps}>
          {renderMainTitle()}
          {renderBodyText()}
          {renderGoHomeButton()}
        </Grid>
      </Grid>
    );
  };

  const renderRadialBackground = () => {
    return (
      <>
        <Box {...pageNotFoundStyles.radialBg1Props} />
        <Box {...pageNotFoundStyles.radialBg2Props} />
        <Box {...pageNotFoundStyles.radialBg3Props} />
      </>
    );
  };

  const renderIcons = () => {
    return (
      <>
        <Box {...pageNotFoundStyles.star1Props}>
          <Star />
        </Box>
        <Box {...pageNotFoundStyles.star2Props}>
          <Star2 />
        </Box>
        <Box {...pageNotFoundStyles.star3Props}>
          <Star3 />
        </Box>
      </>
    );
  };

  const renderLogo = () => {
    return (
      <Grid
        onClick={() => router.push(ROUTES.HOME)}
        {...pageNotFoundStyles.LogoGridProps}
      >
        <Grid {...pageNotFoundStyles.LogoImageGridProps}>
          <LargeLogo />
        </Grid>
        <Grid {...pageNotFoundStyles.LogotitleGridProps}>
          <Typography {...pageNotFoundStyles.LogotitleProps}>KAI.AI</Typography>
          <Typography {...pageNotFoundStyles.LogosubtitleProps}>
            AI Teaching Assistant
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...pageNotFoundStyles.mainGridProps}>
      {renderRadialBackground()}
      <Grid {...pageNotFoundStyles.LogocontentGridProps}>{renderLogo()}</Grid>
      <Grid {...pageNotFoundStyles.TopcontentGridProps}>
        {renderTopContent()}
      </Grid>
      <Grid {...pageNotFoundStyles.BottomcontentGridProps}>
        {renderBottomContent()}
      </Grid>
      <Grid {...pageNotFoundStyles.IconcontentGridProps}>{renderIcons()}</Grid>
    </Grid>
  );
};

PageNotFound.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default PageNotFound;
