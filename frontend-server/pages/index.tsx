import React, { useState } from "react";
import _, { throttle, sortBy } from "lodash";
import axios from 'axios'

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

function parseString<Type>(v: Type): string { return v + ''; }

const getRandomInt = (max, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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

  const onChange = (_, value) => setSelectedLocation(value)

  const handleSearch = (_e, value, reason) => {
    switch (reason) {

      case "reset":
        setLoading(false);
      case "blur":
        return;

      case "clear":
        setSearch('');
        setDataLoadingPromise(Promise.resolve(null))
        return;

      case "input":
        setLoading(true);
        if (value === "") {
          setSearch(value)
          setLoading(false)
          setOptions([])
          return;
        }
        throttle(() => {
          setSearch(value);
          setOptions([]);
          setDataLoadingPromise(axios.get(parseInt(value) !== NaN && parseInt(value) > 0 ?
            `/api/v0/geoloc/byPostalCode/${parseInt(value)}` :
            `/api/v0/geoloc/byName/${value}`).then((res) => res.data))
        }, 1000, { leading: false })();
        return;


      default:
        break;
    }
  }


  return (
    <>
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
        isOptionEqualToValue={(o, v) => loading || (communeToOptions(o) === communeToOptions(v))}
        onInputChange={handleSearch}
        onChange={onChange}
        groupBy={v => v.departement}
        getOptionLabel={v => communeToOptions(v)}
        renderInput={(params) => (
          <StyledTextField {...params}
            label="Desired location"
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

    </>
  );
}

export default Home;
