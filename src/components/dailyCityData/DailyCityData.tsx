/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC } from 'react';
import { WeatherDataType } from '../../Types';
import styles from './DailyCityData.module.scss';

interface Props {
  weatherData: WeatherDataType;
}

const DailyCityData: FC<Props> = ({ weatherData }) => {
  const forecastToday = weatherData?.forecast.forecastday[0];

  const defaultCurrent = { feelslike_c: 0, wind_kph: 0 };
  const { current: { feelslike_c, wind_kph } = defaultCurrent } =
    weatherData || {};

  const defaultAstro = { sunrise: 'loading', sunset: 'loading' };
  const { astro: { sunrise, sunset } = defaultAstro } = forecastToday || {};

  const defaultDay = {
    daily_chance_of_rain: 'loading',
    daily_chance_of_snow: 'loading',
    maxtemp_c: 'loading',
    mintemp_c: 'loading',
  };
  const {
    day: {
      daily_chance_of_rain,
      daily_chance_of_snow,
      maxtemp_c,
      mintemp_c,
    } = defaultDay,
  } = forecastToday || {};

  return (
    <div className={styles.container}>
      {weatherData && (
        <div className={styles.wrapper}>
          <div className={styles.column}>
            <div>{`Feels like: ${feelslike_c}°`}</div>
            <div>{`Wind: ${wind_kph} km/h`}</div>
            {/* <div>{`Wind direction: ${currentWeather.wind_degree} °`}</div> */}
          </div>
          <div className={styles.column}>
            <div>{`Rain: ${daily_chance_of_rain}%`}</div>
            <div>{`Snow: ${daily_chance_of_snow}%`}</div>
          </div>
          <div className={styles.column}>
            <div>{`High: ${maxtemp_c}°`}</div>
            <div>{`Low: ${mintemp_c}°`}</div>
          </div>
          <div className={styles.column}>
            <div>{`Sunrise: ${sunrise}`}</div>
            <div>{`Sunset: ${sunset}`}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyCityData;
