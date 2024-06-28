import { useEffect, useState } from 'react';

import HistoryIcon from '@mui/icons-material/History';
import { Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

import Briefcase from '@/assets/svg/Briefcase.svg';
import ChatBubble from '@/assets/svg/ChatBubble.svg';

import ROUTES from '@/constants/routes';

import styles from './styles';

import { chatRegex, homeRegex } from '@/regex/routes';

const PAGES = [
  { name: 'Kai Tools', link: ROUTES.HOME, icon: <Briefcase />, id: 'page_1' },
  { name: 'Kai Chat', link: ROUTES.CHAT, icon: <ChatBubble />, id: 'page_2' },
  {
    name: 'History',
    link: ROUTES.HISTORY,
    icon: <HistoryIcon />,
    id: 'page_3',
  },
];

const NavMenu = () => {
  const router = useRouter();
  const { pathname } = router;
  const [activePage, setActivePage] = useState('');

  const determineActivePage = () => {
    if (
      homeRegex.test(pathname) &&
      !chatRegex.test(pathname) &&
      pathname !== '/output-history'
    )
      return 'page_1';
    if (pathname === '/output-history') return 'page_3';
    if (chatRegex.test(pathname)) return 'page_2';
    return '';
  };

  useEffect(() => {
    setActivePage(determineActivePage());
    router.events.on('routeChangeComplete', () =>
      setActivePage(determineActivePage())
    );
    return () => {
      router.events.off('routeChangeComplete', () =>
        setActivePage(determineActivePage())
      );
    };
  }, [pathname, router.events]);

  const handleRoute = async (link, id) => {
    await router.push(link);
    setActivePage(id);
  };

  return (
    <Grid {...styles.mainGridProps}>
      {PAGES.map((page) => (
        <MenuItem
          key={page.id}
          onClick={() => handleRoute(page.link, page.id)}
          {...styles.menuItemProps(page.id === activePage)}
        >
          <Grid {...styles.innerMenuGridProps}>
            <Grid {...styles.menuIconGridProps}>{page.icon}</Grid>
            <Grid {...styles.menuTitleGridProps}>{page.name}</Grid>
          </Grid>
        </MenuItem>
      ))}
    </Grid>
  );
};

export default NavMenu;
