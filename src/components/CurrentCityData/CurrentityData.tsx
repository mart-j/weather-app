import React, { FC } from 'react';
import { WeatherDataType } from '../../Types';
import styles from './CurrentCityData.module.scss';

interface Props {
  region: string;
  city: string;
  country: String;
  weatherData: WeatherDataType;
}

const CityData: FC<Props> = ({ region, city, country, weatherData }) => {
  const today = () => {
    const date = new Date().getDate();

    const dayNum = new Date().getDay();
    const days: { [key: string]: string } = {
      '1': 'Monday',
      '2': 'Tuesday',
      '3': 'Wednesday',
      '4': 'Thursday',
      '5': 'Friday',
      '6': 'Saturday',
      '0': 'Sunday',
    };

    const months: { [key: string]: string } = {
      '0': 'January',
      '1': 'February',
      '2': 'March',
      '3': 'April',
      '4': 'May',
      '5': 'June',
      '6': 'July',
      '7': 'August',
      '8': 'September',
      '9': 'October',
      '10': 'November',
      '11': 'Devember',
    };
    const day = days[dayNum];
    const month = months[new Date().getMonth()];

    return `${day} ${date} ${month}`;
  };
  return (
    <div className={styles.container}>
      {region && (
        <>
          <div className={styles.wrapper}>
            <div className={styles.cityInfo}>
              <div className={styles.city}>{`${city}, ${country}`}</div>

              <div className={styles.day}>{`${today()}`}</div>
            </div>
            <div className={styles.temperatureWrapper}>
              <div className={styles.currentTemperature}>
                <span>{weatherData?.current.temp_c}</span>
                <div className={styles.dot}></div>
              </div>{' '}
              <img
                src={`http:${weatherData ? weatherData?.current.condition.icon : '//i.pinimg.com/originals/25/ef/28/25ef280441ad6d3a5ccf89960b4e95eb.gif'}`}
                alt="weather condition"
                width='90px'
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CityData;
