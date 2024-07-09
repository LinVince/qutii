import { ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import React, { ReactElement, useEffect, useState, createContext, useMemo } from 'react';
import Leftbar from './Leftbar';
import Drawer from './Drawer';

type Props = {
  children: ReactElement;
};

const voidFunc = (() => {} ) as any

export const SidebarContext = createContext({
  showLeftbar: false,
  showMobileLeftbar: false,
  currentInfo: {},
  setShowLeftbar: voidFunc,
  setShowMobileLeftbar: voidFunc,
  setDrawerStatus: voidFunc,
  setCurrentInfo: voidFunc,
});

export default function Sidebar({ children }: Readonly<Props>) {
  const [showLeftbar, setShowLeftbar] = useState(false);
  const [showMobileLeftbar, setShowMobileLeftbar] = useState(false);
  const [drawerStatus, setDrawerStatus] = useState('');
  const [currentInfo, setCurrentInfo] = useState({});
  const theme = useTheme();

  const isMediumScreenUp = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (isMediumScreenUp) {
      setShowLeftbar(true);
    } else {
      setShowLeftbar(false);
    }
  }, []);

  const sidebarValue = useMemo(() => ({
      showLeftbar,
      showMobileLeftbar,
      currentInfo,
      setShowLeftbar,
      setShowMobileLeftbar,
      setDrawerStatus,
      setCurrentInfo,
    }), [showLeftbar, showMobileLeftbar])

  return (
    <SidebarContext.Provider value={sidebarValue}>
      <ThemeProvider theme={theme}>
        <Leftbar
          showLeftbar={showLeftbar}
          setDrawerStatus={setDrawerStatus}
          drawerStatus={drawerStatus}
        />
        <Drawer
          showLeftbar={showLeftbar}
          setCurrentInfo={setCurrentInfo}
          currentInfo={currentInfo}
          drawerStatus={drawerStatus}
          setDrawerStatus={setDrawerStatus}
        />
        {
          children
        }
      </ThemeProvider>
    </SidebarContext.Provider>
  );
}
