import React from 'react';
import './InputSearch.scss';
import { observer } from 'mobx-react';

interface InputSearchProps {
  searchParams: string | any[];
  setSearchParams: (v: string | any[]) => void;
}

const InputSearch = observer((props: InputSearchProps) => {
  const { searchParams, setSearchParams } = props;

  return (
    <input
      type="text"
      className="InputSearch"
      value={searchParams}
      onChange={(event) => {
        let filter = event.target.value;
        setSearchParams(filter);
      }}
      aria-label="Ingresá lo que quieras encontrar"
      placeholder="Nunca dejes de buscar"
      maxLength={120}
    />
  );
});

export default InputSearch;
