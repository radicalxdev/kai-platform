import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Card, Grid, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/slices/authSlice';

import Loader from '@/components/Loader';
import AppDisabled from '@/components/AppDisabled';

import ImageURLs from '@/assets/urls';
import Star from '@/assets/svg/Star_3.svg';
import Star2 from '@/assets/svg/Star_4.svg';

import styles from './styles';

/**
 * Renders the authentication layout component that wraps the children components
 *
 * @param {Object} props - The props object
 * @param {ReactNode} props.children - The child components to be wrapped
 * @return {JSX.Element} The React component to be rendered
 */
const AuthLayout = (props) => {
  const { children, isAuthScreen } = props;

  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth);

  const isTabletScreen = useMediaQuery((theme) =>
    theme.breakpoints.down('laptop')
  );

  const isLoading = authUser.loading;

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  const renderBgImage = () => {
    return <Image src={ImageURLs.AuthBgImage} {...styles.imageProps} />;
  };

  const renderArtifacts = () => {
    return (
      <>
        <Box {...styles.reXProps}>
          <Image {...styles.reXImageProps} src={ImageURLs.ReXAuthImg} />
        </Box>
        <Box {...styles.greenBlobProps}>
          <Image {...styles.blobImageProps} src={ImageURLs.GreenBlobSvg} />
        </Box>
      </>
    );
  };

  const renderHead = () => {
    return (
      <Head>
        <title>Radical AI</title>
      </Head>
    );
  };

  const renderCard = () => {
    return (
      <Card {...styles.mainCardProps} {...props}>
        <Box {...styles.starProps}>
          <Star />
        </Box>
        <Box {...styles.star2Props}>
          <Star2 />
        </Box>
        <Grid {...styles.innerCardGridProps}>{children}</Grid>
      </Card>
    );
  };

  if (isTabletScreen) return <AppDisabled head={renderHead()} />;

  return (
    <Grid {...styles.mainGridProps}>
      {renderHead()}
      {renderBgImage()}
      {renderArtifacts()}
      {isAuthScreen && renderCard()}
      {!isAuthScreen && children}
    </Grid>
  );
};

export default AuthLayout;