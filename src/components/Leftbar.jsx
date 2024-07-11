import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Logo from './logo.jsx';
import CloseIcon from '@mui/icons-material/Close';
import Mobilelogo from '../assets/Logo.png';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MapIcon from '@mui/icons-material/Map';
import FAQModal from './FAQModal.tsx';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

let clickStyle = {
  overview: null,
  bookmark: null,
  personal: null,
};

export default function LeftBar(props) {
  let { setDrawerStatus, drawerStatus, showLeftbar = true } = props;

  const [forceUpdateKey, setForceUpdateKey] = useState(0);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const navigate = useNavigate();

  function ButtonClick(currentButton) {
    if (drawerStatus === currentButton) {
      let currentBackground = {
        backgroundColor: '#fff',
      };
      clickStyle = {
        [currentButton]: currentBackground,
      };
      setDrawerStatus(false);
      return;
    }

    if (currentButton) {
      let currentBackground = {
        backgroundColor: '#f0f0f0',
      };

      clickStyle = {
        [currentButton]: currentBackground,
      };
      setDrawerStatus(currentButton);
    }
  }

  useEffect(() => {
    if (drawerStatus === 'overview' && !clickStyle.overview) {
      let currentBackground = {
        backgroundColor: '#f0f0f0',
      };

      clickStyle = {
        ['overview']: currentBackground,
      };
      setForceUpdateKey(forceUpdateKey + 1);
    }
  }, [drawerStatus]);

  return (
    <div
      className={`leftbar ${drawerStatus ? 'sidebar-shadow' : ''}`}
      style={{
        width: showLeftbar ? '86px' : '0',
      }}
    >
      <Toolbar>
        <Logo />
      </Toolbar>
      <Toolbar
        className={`${
          drawerStatus === 'overview' ? 'active-leftbar-icon' : ''
        }`}
      >
       
      <IconButton
        onClick={() => ButtonClick('overview')}
        sx={{
          color: 'white',
          backgroundColor: '',
          '&:hover': { backgroundColor: '' },
        }}
      >
        <MapIcon sx={{color:"#4B7D94"}}/>
      </IconButton>
          
        
      </Toolbar>
      <Toolbar
        className={`${
          drawerStatus === 'bookmark' ? 'active-leftbar-icon' : ''
        }`}
      >
      <IconButton
        onClick={() => ButtonClick('bookmark')}
        sx={{
          color: 'white',
          backgroundColor: '',
          '&:hover': { backgroundColor: '' },
      }}
    >
      <BookmarkIcon fontSize="small" sx={{color:"#4B7D94"}}/>
    </IconButton>
     
      </Toolbar>
      <Toolbar
        className={`${
          drawerStatus === 'personal' ? 'active-leftbar-icon' : ''
        }`}>
        <IconButton
        onClick={() => navigate('')}
        sx={{
          color: 'white',
          backgroundColor: '',
          '&:hover': { backgroundColor: '' },
      }}
    >
      <AccountCircleIcon fontSize="small" sx={{color:"#4B7D94"}}/>
    </IconButton>
    </Toolbar>
    <Toolbar sx={{position: 'absolute', bottom: "10px"}}>
    <IconButton
        onClick={handleClick}
        sx={{
          color: 'white',
          backgroundColor: '',
          '&:hover': { backgroundColor: '' },
        }}
      >
        <TipsAndUpdatesOutlinedIcon sx={{color:"#4B7D94"}}/>
      </IconButton>
      </Toolbar>


      <FAQModal open={open} handleClose={handleClose} />
    </div>
  );
}

export function MobileLeftBar(props) {
  let {
    setDrawerStatus,
    drawerStatus,
    showLeftbar = true,
    setShowMobileLeftbar,
  } = props;

  const [forceUpdateKey, setForceUpdateKey] = useState(0);

  const navigate = useNavigate();

  function ButtonClick(currentButton) {
    if (drawerStatus === currentButton) {
      let currentBackground = {
        backgroundColor: '#fff',
      };
      clickStyle = {
        [currentButton]: currentBackground,
      };
      setDrawerStatus(false);
      return;
    }

    if (currentButton) {
      let currentBackground = {
        backgroundColor: '#f0f0f0',
      };

      clickStyle = {
        [currentButton]: currentBackground,
      };
      setDrawerStatus(currentButton);
    }
  }

  const setColor = (currentButton, color) => {
    let currentBackground = {
      backgroundColor: color,
    };

    clickStyle = {
      [currentButton]: currentBackground,
    };
    return clickStyle;
  };

  useEffect(() => {
    if (drawerStatus === 'overview' && !clickStyle.overview) {
      let currentBackground = {
        backgroundColor: '#f0f0f0',
      };

      clickStyle = {
        ['overview']: currentBackground,
      };
      setForceUpdateKey(forceUpdateKey + 1);
    }
  }, [drawerStatus]);

  return (
    <div
      className={`leftbar ${drawerStatus ? 'sidebar-shadow' : ''}`}
      style={{
        width: showLeftbar ? '360px' : '0',
      }}
    >
      <Toolbar>
        <Box
          sx={{
            marginTop: '40px',
            marginLeft: '12px',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <img src={Mobilelogo} />
          <Box>
            <IconButton
              aria-label="close-icon"
              onClick={() => {
                setDrawerStatus('');
                setShowMobileLeftbar(false);
              }}
              sx={{ color: '#4B7D94' }}
            />
          </Box>
        </Box>
      </Toolbar>

      <Box sx={{ marginTop: 10, paddingLeft: 2 }}>
        <Toolbar
          className={`${
            drawerStatus === 'overview' ? 'active-leftbar-icon' : ''
          }`}
        >
          <a
            className=""
            style={clickStyle.bookmark}
            onClick={() => {
              ButtonClick('overview');
              setShowMobileLeftbar(false);
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 3L20.34 3.03L15 5.1L9 3L3.36 4.9C3.15 4.97 3 5.15 3 5.38V20.5C3 20.78 3.22 21 3.5 21L3.66 20.97L9 18.9L15 21L20.64 19.1C20.85 19.03 21 18.85 21 18.62V3.5C21 3.22 20.78 3 20.5 3ZM15 19L9 16.89V5L15 7.11V19Z"
                  fill="#4B7D94"
                />
              </svg>

              <p style={{ color: '#4B7D94' }}>Knowledge Map</p>
            </Box>
          </a>
        </Toolbar>
        <Toolbar
          className={`${
            drawerStatus === 'bookmark' ? 'active-leftbar-icon' : ''
          }`}
        >
          <a
            className=""
            style={clickStyle.bookmark}
            onClick={() => {
              // These these pages are currently not available
              // ButtonClick('bookmark');
              setShowMobileLeftbar(false);
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 18L21 19V3C21 1.9 20.1 1 19 1H8.99C7.89 1 7 1.9 7 3H17C18.1 3 19 3.9 19 5V18ZM15 5H5C3.9 5 3 5.9 3 7V23L10 20L17 23V7C17 5.9 16.1 5 15 5Z"
                  fill="#4B7D94"
                />
              </svg>

              <p style={{ color: '#4B7D94' }}>Bookmark History</p>
            </Box>
          </a>
        </Toolbar>

        <Toolbar
          className={`${
            drawerStatus === 'personal' ? 'active-leftbar-icon' : ''
          }`}
        >
          <a
            className=""
            style={clickStyle.personal}
            onClick={() => {
              // navigate to my account
              navigate('/account');
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                  fill="#4B7D94"
                />
              </svg>
              <p style={{ color: '#4B7D94' }}>My Account</p>
            </Box>
          </a>
        </Toolbar>
      </Box>
    </div>
  );
}
