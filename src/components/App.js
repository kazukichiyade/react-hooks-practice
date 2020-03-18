import React, { useReducer, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import EventForm from './EventForm';
import Events from './Events';
import OperationLogs from './OperationLogs';
import AppContext from '../contexts/AppContext';
import reducer from '../reducers';

const APP_KEY = 'appWithRedux';

const App = () => {
  // ローカルストレージから表示変数
  const appState = localStorage.getItem(APP_KEY);

  // appStateが取得出来た場合、文字列からオブジェクトへ変換して表示
  const initialState = appState
    ? JSON.parse(appState)
    : {
        events: [],
        operationLogs: []
      };

  const [state, dispatch] = useReducer(reducer, initialState);

  // state変更時に発火
  useEffect(() => {
    // 文字列化してからローカルストレージに保存
    localStorage.setItem(APP_KEY, JSON.stringify(state));
  }, [state]);

  console.log(state, 'in App.js');
  console.log({ state });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="container-fluid">
        <EventForm />
        <Events />
        <OperationLogs />
      </div>
    </AppContext.Provider>
  );
};

export default App;
