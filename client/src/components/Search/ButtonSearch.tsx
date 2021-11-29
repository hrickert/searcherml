import React from 'react';
import './ButtonSearch.scss';
import searchImg from '../../img/ic_Search.png';
import { useNavigate } from 'react-router-dom';

interface ButtonSearchProps {
  searchParams: string | any[];
}

const ButtonSearch = (props: ButtonSearchProps) => {
  let navigate = useNavigate();
  const { searchParams } = props;

  return (
    <button
      type="submit"
      className="ButtonSearch"
      onClick={(e) => {
        e.preventDefault();
        let urlParam = searchParams.length > 0 ? '?search=' : '';
        navigate(`items${urlParam}${searchParams}`);
      }}
    >
      <img className="Image" src={searchImg} alt={'Logo de mercadolibre'} />
    </button>
  );
};

export default ButtonSearch;
