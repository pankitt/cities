import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from 'store/i18n';
import { GeoProvider } from 'store/geodb';
import { FiltersProvider } from 'store/filters';
import App from 'components/App';
import './index.css';

const Root = (): JSX.Element => (
  <MemoryRouter initialEntries={['/cities']}>
    <I18nProvider>
      <GeoProvider>
        <FiltersProvider>
          <App />
        </FiltersProvider>
      </GeoProvider>
    </I18nProvider>
  </MemoryRouter>
);

export default Root;
