import React from 'react';
import { observer } from 'mobx-react';
import { Outlet } from 'react-router-dom';
import './Header.scss';
import RootStore from '../../stores/RootStore';
import logo from '../../img/Logo_ML.png';
import Searcher from './Searcher';

interface HeaderProps {
  store: RootStore;
}

const Header = observer((props: HeaderProps) => {
  return (
    <>
      <header className="Header">
        <div className="HeaderWrapper">
          <img className="Image" src={logo} alt={'Logo de mercadolibre'} />
          <Searcher />
        </div>
      </header>
      <Outlet />
    </>
  );
});

export default Header;
