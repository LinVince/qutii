import { ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import Leftbar, { MobileLeftBar } from './Leftbar';
import Drawer from './Drawer';

type Props = {
  children: ReactElement;
};

export default function Sidebar({ children }: Props) {
  const [showLeftbar, setShowLeftbar] = useState(false);
  const [showMobileLeftbar, setShowMobileLeftbar] = useState(false);
  const [drawerStatus, setDrawerStatus] = useState('');
  const [currentInfo, setCurrentInfo] = useState();
  const theme = useTheme();

  const isMediumScreenUp = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (isMediumScreenUp) {
      setShowLeftbar(true);
    } else {
      setShowLeftbar(false);
    }
  }, [isMediumScreenUp]);

  const renderChildren = () => {
    return React.cloneElement(children, {
      showLeftbar,
      showMobileLeftbar,
      setShowLeftbar,
      setShowMobileLeftbar,
      setDrawerStatus,
      setCurrentInfo,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Leftbar
        showLeftbar={showLeftbar}
        setDrawerStatus={setDrawerStatus}
        drawerStatus={drawerStatus}
      />
      <MobileLeftBar
        showLeftbar={showMobileLeftbar}
        setDrawerStatus={setDrawerStatus}
        drawerStatus={drawerStatus}
        setShowMobileLeftbar={setShowMobileLeftbar}
      />
      <Drawer
        currentInfo={currentInfo}
        drawerStatus={drawerStatus}
        setDrawerStatus={setDrawerStatus}
      />
      {renderChildren()}
    </ThemeProvider>
  );
}
