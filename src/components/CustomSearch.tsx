import React, { ReactNode, useState } from 'react';
import { Paper, Box } from '@mui/material';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useHomeStatusStore from '../store';

type SearchProp = {
  position?: 'before' | 'after';
  params?: InputBaseProps;
  children?: ReactNode;
  triggerSearch: (value) => void;
  setShowLeftbar?: (value) => void;
  setDrawerStatus?: (value) => void;
};

type searchData = {
  name: string;
  [key: string]: string | number | any;
};

export default function CustomSearch({
  params,
  children,
  position = 'after',
  triggerSearch,
  setShowLeftbar,
  setDrawerStatus,
}: Readonly<SearchProp>) {
  const [searchList, setSearchList] = useState<searchData[]>([]);
  const theme = useTheme();
  const isMediumScreenDown = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    homeStatus: { viewState },
    setViewState,
  } = useHomeStatusStore(state => ({
    homeStatus: state.homeStatus,
    setViewState: state.setViewState,
  }));

  // prevent body from shifting on mobile view
  const preventBodyFromShifting = () => {
    if (isMediumScreenDown) {
      document.body.style.position = 'fixed';
    }
  };

  const removeFixedBody = () => {
    document.body.style.position = 'unset';
  };

  let timer: NodeJS.Timeout;

  const search = async event => {
    clearTimeout(timer);
    const searchValue = event.target.value;

    // call the api with the query
    const url = `https://elb.qutii.org:443/search/subtopic?q=${searchValue}`;

    // setTimeout to debounce the api call
    timer = setTimeout(() => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          const { data } = result;
          setSearchList(data);
        })
        .catch(error => console.error(error));
    }, 500);
  };

  const updateSearch = value => {
    triggerSearch({ ...value, nodelabel: value.name, qnasubtopicid: value.id });
    const { qnasubtopiclongitude, qnasubtopiclatitude } = value;
    setViewState({
      ...viewState,
      longitude: qnasubtopiclongitude,
      latitude: qnasubtopiclatitude,
      zoom: 8,
      transitionDuration: 1000,
    });

    if (setShowLeftbar && setDrawerStatus) {
      setShowLeftbar(true);
      setDrawerStatus('overview');
    }

    reset();
  };

  const reset = () => {
    // clear the search box
    setSearchList([]);
  };

  return (
    <Box id="input-parent" sx={{ position: 'relative' }}>
      <Paper
        sx={{
          width: '100%',
          height: '35px',
          display: 'flex',
          boxShadow: 'none',
          border: 'solid 1px #EBEAED',
        }}
      >
        {position === 'before' && children}

        <InputBase
          {...params}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Topic..."
          onChange={search}
          inputProps={{
            'aria-label': 'search topic',
            sx: {
              '&.MuiInputBase-input': {
                p: '5px',
              },
              '&.MuiInputBase-input:hover': {
                border: 'none',
              },
            },
          }}
          onFocus={preventBodyFromShifting}
          onBlur={removeFixedBody}
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon sx={{ color: '#4B7D94' }} />
        </IconButton>
        {position === 'after' && children}
      </Paper>
      {searchList.length > 0 && (
        <Box
          sx={{
            background: 'white',
            borderRadius: '5px',
            color: '#000',
            padding: '13px',
            maxHeight: '300px',
            overflowY: 'scroll',
            position: 'absolute',
            zIndex: '4000',
            boxShadow: '0px 1px 10px 0px',
            top: '110%',
          }}
        >
          {searchList.map((ele, index) => {
            return (
              <Box
                key={index}
                sx={{ mb: '15px', cursor: 'pointer' }}
                onClick={() => updateSearch(ele)}
              >
                <span>{ele.name}</span>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
