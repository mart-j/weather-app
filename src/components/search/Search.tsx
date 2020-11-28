import React, { FC, RefObject, useState } from 'react';
import { CityType } from '../../Types';
import styles from './Search.module.scss';

interface Props {
  inputEl: RefObject<HTMLInputElement>;
  clearInput: (key: string | number) => void;
  inputChangeHandler: (value: string) => void;
  searchCityResults: CityType[];
  getCityData: (url: string, name: string, countr: string) => void;
  selected: number;
}

const Search: FC<Props> = ({
  getCityData,
  searchCityResults,
  inputChangeHandler,
  inputEl,
  clearInput,
  selected,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          placeholder="new york"
          onKeyDown={(e) => clearInput(e.key)}
          ref={inputEl}
          onChange={(e) => inputChangeHandler(e.target.value)}
        />
        <div className={styles.resultWrapper}>
          {searchCityResults?.map((item, i) => {
            return (
              <div
              
                className={selected === i ? styles.active : styles.result}
                onClick={() => getCityData(item.url, item.name, item.country)}
                key={item.url}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
