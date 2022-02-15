import React, { useState, useCallback } from "react";


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import { HygrometryGauge } from "./hygrometryGauge"


const DefaultSkeleton = (props) => <Skeleton {...props} animation="wave" />


export const WeatherCard = ({data}) => {
  const {
    "weather": [
      {
        mainWeather,
        weatherDescription,
        weatherIcon
      }
    ],
    "main": {
      temp,
      "feels_like": tempFeelsLike,
      "temp_min": tempMin,
      "temp_max": tempMax,
      pressure,
      humidity,
      "sea_level": seaLevel,
      "grnd_level": groundLevel,
    },
    visibility,
    "wind": { "speed": windSpeed, "deg": windDeg, "gust": windGust },
    "clouds": { "all": cloudiness },
    "dt": calculationDate,
    "sys": {
      sunrise,
      sunset,
    },
    "timezone": timezoneShift,
    "id": cityId,
  } = data;

  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table aria-label="temperatures">
            <TableBody>
              <TableRow
                key="temp"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ "fontWeight": "bold" }}><DefaultSkeleton width={200} style={{ display: "inline-block" }} /></TableCell>
                <TableCell align="right"><DefaultSkeleton variant="circular" sx={{ bgcolor: "#ccffcc" }} width={50} height={50} style={{ display: "inline-block" }} /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <DefaultSkeleton />


        <Divider component="div" style={{ margin: "1em 0" }} />
        <TableContainer>
          <Table aria-label="temperatures">
            <TableBody>
              <TableRow
                key="temp"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ "fontWeight": "bold" }}>Humidité</TableCell>
                <TableCell align="right"><HygrometryGauge value={humidity}/></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider component="div" style={{ margin: "1em 0" }} />
        <TableContainer>
          <Table aria-label="temperatures">
            <TableHead>
              <TableRow>
                <TableCell style={{ "fontWeight": "bold" }}>Températures (°C)</TableCell>
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
                <TableCell align="left"><DefaultSkeleton /></TableCell>
                <TableCell align="right"><DefaultSkeleton /></TableCell>
                <TableCell align="right"><DefaultSkeleton /></TableCell>
                <TableCell align="right"><DefaultSkeleton /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer>
          <Table aria-label="pression">
            <TableHead>
              <TableRow>
                <TableCell style={{ "fontWeight": "bold" }}>Pressions (hPa)</TableCell>
                <TableCell align="right">niveau de la mer</TableCell>
                <TableCell align="right">au sol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key="temp"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left"><DefaultSkeleton /></TableCell>
                <TableCell align="right"><DefaultSkeleton /></TableCell>
                <TableCell align="right"><DefaultSkeleton /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}


export const WeatherCardSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table aria-label="temperatures">
            <TableBody>
              <TableRow
                key="temp"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ "fontWeight": "bold" }}><DefaultSkeleton width={200} style={{ display: "inline-block" }} /></TableCell>
                <TableCell align="right"><DefaultSkeleton variant="circular" sx={{ bgcolor: "#ccffcc" }} width={50} height={50} style={{ display: "inline-block" }} /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <DefaultSkeleton />


        <Divider component="div" style={{ margin: "1em 0" }} />
        <TableContainer>
          <Table aria-label="temperatures">
            <TableBody>
              <TableRow
                key="temp"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ "fontWeight": "bold" }}>Humidité</TableCell>
                <TableCell align="right"><DefaultSkeleton variant="circular" width={50} height={50} style={{ display: "inline-block" }} /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider component="div" style={{ margin: "1em 0" }} />
        <TableContainer>
          <Table aria-label="temperatures">
            <TableHead>
              <TableRow>
                <TableCell style={{ "fontWeight": "bold" }}>Températures (°C)</TableCell>
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
                <TableCell align="left"><DefaultSkeleton /></TableCell>
                <TableCell align="right"><DefaultSkeleton /></TableCell>
                <TableCell align="right"><DefaultSkeleton /></TableCell>
                <TableCell align="right"><DefaultSkeleton /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer>
          <Table aria-label="pression">
            <TableHead>
              <TableRow>
                <TableCell style={{ "fontWeight": "bold" }}>Pressions (hPa)</TableCell>
                <TableCell align="right">niveau de la mer</TableCell>
                <TableCell align="right">au sol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key="temp"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left"><DefaultSkeleton /></TableCell>
                <TableCell align="right"><DefaultSkeleton /></TableCell>
                <TableCell align="right"><DefaultSkeleton /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}