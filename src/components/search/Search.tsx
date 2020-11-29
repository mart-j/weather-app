import React, { FC, RefObject } from 'react';
import { CityType } from '../../Types';
import styles from './Search.module.scss';

interface Props {
  inputEl: RefObject<HTMLInputElement>;
  keyPressHandler: (key: string | number) => void;
  inputTextChangeHandler: (value: string) => void;
  searchCityResults: CityType[];
  getCityInfo: (url: string, name: string, countr: string) => void;
  selected: number;
}

const Search: FC<Props> = ({
  getCityInfo,
  searchCityResults,
  inputTextChangeHandler,
  inputEl,
  keyPressHandler,
  selected,
}) => {


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          placeholder="new york"
          onKeyDown={(e) => keyPressHandler(e.key)}
          ref={inputEl}
          onChange={(e) => inputTextChangeHandler(e.target.value)}
        />
        <div className={styles.resultWrapper}>
          {searchCityResults?.map((item, i) => {
            return (
              <div
              
                className={selected === i ? styles.active : styles.result}
                onClick={() => getCityInfo(item.url, item.name, item.country)}
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
