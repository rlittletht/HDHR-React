import React from 'react';
import './App.css';

export interface AppProps
{
}

export interface AppState
{
}

export class App extends React.Component<AppProps, AppState>
{
  render()
  {
    return (
      <div>
        <h1>HDHR Tools in React!</h1>
      </div>
    );
  }
}