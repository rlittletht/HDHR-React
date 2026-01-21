
// src/index.tsx
import React from 'react';
import { FluentProvider } from '@fluentui/react-components'
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css'; 
import {hdhrBlueThemeLight} from './hdhrBlueTheme';
import { TheAppContext, AppContext } from "./Controller/AppContext";

const container = document.getElementById('root');
const root = createRoot(container!);

const appContext: AppContext = new AppContext();

root.render(
  <React.StrictMode>
    <FluentProvider theme={hdhrBlueThemeLight}>
      <TheAppContext.Provider value={appContext}>
        <App/>
      </TheAppContext.Provider>
    </FluentProvider>

  </React.StrictMode>);