import HistoryIcon from '@mui/icons-material/History';
import { Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

import DiscoveryIcon from '@/assets/svg/add-block.svg';

import ChatBubble from '@/assets/svg/ChatBubbleV2.svg';
import HomeIcon from '@/assets/svg/HomeIconOutline.svg';

import ROUTES from '@/constants/routes';

import styles from './styles';

import { chatRegex, historyRegex, homeRegex } from '@/regex/routes';

const PAGES = [
  {
    name: 'Home',
    link: ROUTES.HOME,
    icon: <HomeIcon />,
    id: 'page_1',
  },
  {
    name: 'Discovery',
    link: ROUTES.CHAT,
    icon: <DiscoveryIcon />,
    id: 'page_2',
  },
  {
    name: 'Chat',
    link: ROUTES.CHAT,
    icon: <ChatBubble />,
    id: 'page_3',
  },
  {
    name: 'History',
    link: ROUTES.HISTORY,
    icon: <HistoryIcon />,
    id: 'page_3',
  },
];

/**
 * Returns a navigation menu component that displays a list of links.
 *
 * @return {JSX.Element} A React component that renders a navigation menu.
 */
const NavMenu = () => {
  const router = useRouter();
  const { pathname } = router;

  const setActive = (id) => {
    const isNotHomePage = [
      chatRegex.test(pathname) || historyRegex.test(pathname),
    ].includes(true);

    if (id === 'page_1')
      return isNotHomePage ? false : homeRegex.test(pathname);

    if (id === 'page_2') return chatRegex.test(pathname);

    if (id === 'page_3') return historyRegex.test(pathname);

    return false;
  };

  const handleRoute = (link) => {
    router.push(link);
  };

  return (
    <Grid {...styles.mainGridProps}>
      {PAGES.map((page) => (
        <MenuItem
          key={page.id}
          onClick={() => handleRoute(page.link)}
          {...styles.menuItemProps(setActive(page.id))}
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
