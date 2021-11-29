import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import './Searcher.scss';
import InputSearch from './InputSearch';
import ButtonSearch from './ButtonSearch';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface SearcherProps {}

const Searcher = observer((props: SearcherProps) => {
  let navigate = useNavigate();
  let { searchParams, setSearchParams } = useInitializeSearchParams();

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let urlParam = searchParams.length > 0 ? '?search=' : '';
      navigate(`items${urlParam}${searchParams}`);
    }
  };

  return (
    <form className="SearcherForm" onKeyDown={(e) => onKeyDown(e)}>
      <InputSearch searchParams={searchParams} setSearchParams={setSearchParams} />
      <ButtonSearch searchParams={searchParams} />
    </form>
  );
});

function useInitializeSearchParams() {
  let [params] = useSearchParams();
  let [searchParams, setSearchParams] = useState<string | any[]>('');

  useEffect(() => {
    let list = params.getAll('search');
    setSearchParams(list.length > 0 ? list.map((p: any) => p) : '');
  }, [params]);

  return { searchParams, setSearchParams };
}

export default Searcher;
