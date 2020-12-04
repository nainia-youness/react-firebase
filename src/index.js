import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase,{FireBaseContext} from './Components/Firebase' 

//WE put the context here so that we can acces it anywhere
ReactDOM.render(
  <React.StrictMode>
    <FireBaseContext.Provider value={new Firebase()}>
    <App />
    </FireBaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

