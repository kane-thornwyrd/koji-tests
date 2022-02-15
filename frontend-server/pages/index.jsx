import React, { useState, useCallback } from "react";
import _, { debounce, sortBy } from "lodash";
import axios from 'axios'
import { useCookies } from "react-cookie";

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';

import { WeatherCard, WeatherCardSkeleton } from "./components/weatherCard";

// export type Commune = {
//   departement: string,
// }

// function parseString<Type>(v: Type): string { return v + ''; }
function parseString(v){ return v + ''; }

export function delay(ms = 100) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// const ContentLoader = dynamic(import('react-content-loader').then(mod => mod), { ssr: false })

// const getRandomInt = (max: number, min: number = 0): number =>
export const getRandomInt = (max, min = 0) =>
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
  if (!commune) return '';
  return `${parseString(commune["Code_postal"]).padStart(5, '0')} - ${commune["Nom_commune"]} ${commune["Ligne_5"] ? '| ' + commune["Ligne_5"] : ''}`
}

function requestWeatherData(commune){
  if(!commune) return Promise.reject();
  return axios.get(`/api/v00/weather/${encodeURIComponent(commune["coordonnees_gps"])}`)
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [dataLoadingPromise, setDataLoadingPromise] = useState(Promise.resolve([]));
  const [weatherDataPromise, setWeatherDataPromise] = useState(Promise.resolve([]));
  const [weatherData, setWeatherData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['city']);

  const [selectedLocation, setSelectedLocation] = useState(cookies.city);

  dataLoadingPromise.then(setOptions)
  weatherDataPromise.then(setWeatherData)

  console.log(selectedLocation , weatherData.length <= 0, weatherDataPromise.state === "fulfilled");
  if(selectedLocation && weatherData.length <= 0 && weatherDataPromise.state === "fulfilled"){
    // it's 21:12, few days into this exercice, I'm done with Typescript which shout
    // at me that axios Promises are special snowflakes that can't be casted to Promise
    // turning this back to jsx. no time to deal with this rn. 🧂
    setWeatherDataPromise(requestWeatherData(selectedLocation))
  }

  const onChange = (_, value) => {
    setCookie("city", value, { "sameSite": "strict" })
    setSelectedLocation(value)
    requestWeatherData(value).then(({data}) => setWeatherData(data))
  }

  const handleSearch = useCallback(debounce((_e, value, reason) => {
    switch (reason) {

      case "reset":
        setLoading(false);
        setSelectedLocation({});
        return;

      case "clear":
        setDataLoadingPromise(Promise.resolve(null))
        removeCookie("city", { "sameSite": "strict" })
        return;

      case "input":
        setLoading(true);
        if (value === "") {
          setLoading(false)
          setOptions([])
          return;
        }

        setDataLoadingPromise(axios.get(parseInt(value) !== NaN && parseInt(value) > 0 ?
          `/api/v00/geoloc/byPostalCode/${parseInt(value)}` :
          `/api/v00/geoloc/byName/${value}`).then((res) => res.data))
        setOptions([]);
        return;


      default:
        break;
    }
  }, 1250), [])

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
        groupBy={(v) => v.departement}
        getOptionLabel={v => communeToOptions(v)}
        defaultValue={cookies.city ?? ""}
        renderInput={(params) => (
          <StyledTextField {...params}
            label="Ville"
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

      {selectedLocation || weatherData.length > 0 ?
        <Box>
          {weatherData.length > 0 ?
            weatherData.map(data => <WeatherCard data={data} key={data.dt}/>):
            <WeatherCardSkeleton />
          }
        </Box> : <div></div>
      }


    </>
  );
}

export default Home;
