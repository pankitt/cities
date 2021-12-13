import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';
import './index.css';

const Root = (): JSX.Element => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
