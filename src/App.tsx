import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Search from './components/search/Search';
import CityData from './components/CurrentCityData/CurrentityData';
import DailyCityData from './components/dailyCityData/DailyCityData';
import { CityType, WeatherDataType } from './Types';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchCityResults, setSearchCityResults] = useState<CityType[]>();
  const [country, setCountry] = useState<string>('Latvia');
  const [region, setRegion] = useState<string>('Zilupe');
  const [city, setCity] = useState<string>('Zilupe');
  const [weatherData, setWeatherData] = useState<WeatherDataType>();
  const [selected, setSelected] = useState(0);

  const inputEl = useRef<HTMLInputElement>(null);

  const inputChangeHandler = (value: string) => {
    setInputValue(value);
  };

  const navigateSuggestions = (key: string | number) => {

    if (key === 'ArrowUp') {
      if (selected === 0) {
        return;
      }
      setSelected(selected - 1);
    } else if (key === 'ArrowDown'  && searchCityResults) {
      if (selected >= searchCityResults?.length! -1) {
        return;
      }
      setSelected(selected + 1);
    }
  };

  const clearInput = (key: string | number) => {
    navigateSuggestions(key);

    if (key === 'Enter' && searchCityResults![selected]) {
      inputEl.current!.value = '';
      setRegion(searchCityResults![selected].url);
      setCity(
        searchCityResults![selected].name.slice(
          0,
          searchCityResults![selected].name.indexOf(','),
        ),
      );
      setCountry(searchCityResults![selected].country);
      setSearchCityResults([]);
      setSelected(0);
    }
  };

  const getCityData = (url: string, name: string, countr: string) => {
    setRegion(url);
    setCity(name.slice(0, name.indexOf(',')));
    setCountry(countr);
    inputEl.current!.value = '';
    setSearchCityResults([]);
    setSelected(0);
  };

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/search.json?q=${inputValue
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')}`,
        {
          headers: { 'Access-Control-Allow-Origin': '*' },
        },
      )
      .then(({ data }) => setSearchCityResults(data));
  }, [inputValue]);

  axios.defaults.params = {
    key: '22aec32dda7c476e83f60437202811',
  };

  const objectToApiUrl = (params: object) => {
    return Object.entries(params).reduce((acc, [key, value]) => {
      let accCopy = acc;
      accCopy += `${key}=${value}&`;
      return accCopy;
    }, 'http://api.weatherapi.com/v1/forecast.json?');
  };

  useEffect(() => {
    const url = objectToApiUrl({
      q: region,
      units: 'metric',
      days: 3,
    });

    axios.get(url).then(({ data }) => {
      setWeatherData(data);
    });
  }, [city]);

  return (
    <>
      <Search
        selected={selected}
        getCityData={getCityData}
        searchCityResults={searchCityResults!}
        inputChangeHandler={inputChangeHandler}
        inputEl={inputEl}
        clearInput={clearInput}
      />
      <CityData
        region={region}
        city={city}
        country={country}
        weatherData={weatherData!}
      />

      <DailyCityData weatherData={weatherData!} />
    </>
  );
};
export default App;
