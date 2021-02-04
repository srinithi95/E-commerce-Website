import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import {setViews} from './redux/actions/itemActions'
import {setNotifications} from './redux/actions/userActions'
const store = createStore(rootReducer, applyMiddleware(thunk));
const ws= new WebSocket('ws://localhost:4000');



ws.onclose=()=>{
  console.log('connection closed');
}
ws.onmessage =(message) =>{

  const messageObject = JSON.parse(message.data);
  console.log(message);
  switch(messageObject.type){

    case 'NOTIFICATION':
      store.dispatch(setNotifications(messageObject.notification))
      break;
      default:
        console.log('message type not supported');

  
}}
ws.onerror=(e)=>{
  console.log('connection closed with error');
}
ws.onopen=(e)=>{
  console.log('connection opened');
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App ws={ws}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
export default store;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
