import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'components/App';
import './index.css';

const Root = (): JSX.Element => (
  <Router>
    <App />
  </Router>
);

export default Root;
