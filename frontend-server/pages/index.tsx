import React, { useState } from "react";
import _, { throttle, sortBy } from "lodash";
import axios from 'axios'

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';

function parseString<Type>(v: Type): string { return v + ''; }



function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

// const ContentLoader = dynamic(import('react-content-loader').then(mod => mod), { ssr: false })

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

function Home(props) {
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


      <Box>
        {/* <Paper
          elevation={24}
          variant="outlined"
          style={{
            "padding": "25px"
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton />
        </Paper> */}
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Nuageux
              <img
                src="https://openweathermap.org/img/wn/04n.png"
                alt="Nuageux"
                style={{ "backgroundColor": "#ccffcc", "borderRadius": "25px" }}
              />
            </Typography>
            <Typography variant="body2">
              Nuageux avec risque de boulettes de viande
            </Typography>
            <Divider component="div" style={{margin:"1em 0"}}/>
            <Typography variant="h5" component="div">
            Humidité <CircularProgressWithLabel thickness={7} value={96} size="50px"/>
            </Typography>
            <Divider component="div" style={{margin:"1em 0"}}/>
            <TableContainer>
              <Table aria-label="temperatures">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ "fontWeight": "bold" }}>Températures</TableCell>
                    <TableCell align="right">ressentie</TableCell>
                    <TableCell align="right">min</TableCell>
                    <TableCell align="right">max</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key="temp"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">28.1°C</TableCell>
                    <TableCell align="right">27.9°C</TableCell>
                    <TableCell align="right">28.1°C</TableCell>
                    <TableCell align="right">28.2°C</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer>
              <Table aria-label="pression">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ "fontWeight": "bold" }}>Pression</TableCell>
                    <TableCell align="right">niveau de la mer</TableCell>
                    <TableCell align="right">au sol</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key="temp"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">1026</TableCell>
                    <TableCell align="right">1026</TableCell>
                    <TableCell align="right">1008</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>


    </>
  );
}

export default Home;
