import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { GeoProvider } from 'store/geodb';
import App from 'components/App';
import './index.css';

const Root = (): JSX.Element => (
  <MemoryRouter initialEntries={['/cities']}>
    <GeoProvider>
      <App />
    </GeoProvider>
  </MemoryRouter>
);

export default Root;
