import React, { FC } from 'react';
import { WeatherDataType } from '../../Types';
import styles from './DailyCityData.module.scss';

interface Props {
  weatherData: WeatherDataType;
}

const DailyCityData: FC<Props> = ({ weatherData }) => {
  const forecastToday = weatherData?.forecast.forecastday[0];
  const currentWeather = weatherData?.current;

  return (
    <div className={styles.container}>
      {weatherData && (
        <div className={styles.wrapper}>
          <div className={styles.column}>
            <div>{`Feels like: ${currentWeather.feelslike_c}°`}</div>
            <div>{`Wind: ${currentWeather.wind_kph} km/h`}</div>
            {/* <div>{`Wind direction: ${currentWeather.wind_degree} °`}</div> */}
          </div>
          <div className={styles.column}>
            <div>{`Rain: ${forecastToday.day.daily_chance_of_rain}%`}</div>
            <div>{`Snow: ${forecastToday.day.daily_chance_of_snow}%`}</div>
          </div>
          <div className={styles.column}>
            <div>{`High: ${forecastToday.day.maxtemp_c}°`}</div>
            <div>{`Low: ${forecastToday.day.mintemp_c}°`}</div>
          </div>
          <div className={styles.column}>
            <div>{`Sunrise: ${forecastToday.astro.sunrise}`}</div>
            <div>{`Sunset: ${forecastToday.astro.sunset}`}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyCityData;
