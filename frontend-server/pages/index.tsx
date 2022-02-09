import React, { useState } from "react";
import _, { throttle, sortBy } from "lodash";
import axios from 'axios'

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

function parseString<Type>(v: Type): string { return v + ''; }

const getRandomInt = (max, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledTextField = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function communeToOptions(commune) {
  return `${parseString(commune["Code_postal"]).padStart(5, '0')} - ${commune["Nom_commune"]} ${commune["Ligne_5"] ? '| ' + commune["Ligne_5"] : ''}`
}


function Home() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [dataLoadingPromise, setDataLoadingPromise] = useState(Promise.resolve([]));

  dataLoadingPromise.then(setOptions)

  const onChange = (_, value) => {
    setSelectedLocation(value);
    setLoading(false);
  };

  const handleSearch = throttle((event, value, reason) => {
    if(reason == "blur") return;
    if(reason == "clear") {
      setSearch('');
      setDataLoadingPromise(Promise.resolve([]))
      setLoading(false);
      return;
    }
    setLoading(true);
    setSearch(value);
    setDataLoadingPromise(axios.get(parseInt(value) !== NaN && parseInt(value) > 0 ?
      `/api/v0/geoloc/byPostalCode/${parseInt(value)}` :
      `/api/v0/geoloc/byName/${value}`).then((res) => res.data))
  }, 1500, { leading: false });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Autocomplete
                fullWidth
                style={{
                  position: "relative"
                }}
                id="location-search"
                options={sortBy(options, "departement")}
                autoComplete
                clearOnEscape
                includeInputInList
                forcePopupIcon={false}
                isOptionEqualToValue={(o, v) => communeToOptions(o) === communeToOptions(v)}
                onInputChange={handleSearch}
                onChange={onChange}
                groupBy={v => v.departement}
                getOptionLabel={v => communeToOptions(v)}
                renderInput={(params) => (
                  <StyledTextField {...params}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading && <CircularProgress color="inherit" size={20} />}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }} />
                )}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

    </>
  );
}

export default Home;
