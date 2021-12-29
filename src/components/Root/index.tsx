import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from 'store/i18n';
import { GeoProvider } from 'store/geodb';
import App from 'components/App';
import './index.css';

const Root = (): JSX.Element => (
  <MemoryRouter initialEntries={['/cities']}>
    <I18nProvider>
      <GeoProvider>
        <App />
      </GeoProvider>
    </I18nProvider>
  </MemoryRouter>
);

export default Root;
