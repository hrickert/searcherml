import React from 'react';
import { Helmet } from 'react-helmet';
import './Spinner.scss';

interface SpinnerProps {}

const Spinner = (props: SpinnerProps) => {
  let text = 'Cargando';

  return (
    <div className="Spinner">
      {text}
      <Helmet>
        <title>{text}</title>
      </Helmet>
    </div>
  );
};

export default Spinner;
