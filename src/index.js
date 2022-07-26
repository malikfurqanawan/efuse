import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './redux/store'

import { library } from '@fortawesome/fontawesome-svg-core'
  import { fab } from '@fortawesome/free-brands-svg-icons'
  import { faHeart, faComment, faEdit, faTrash, faPowerOff } from '@fortawesome/free-solid-svg-icons'

  library.add(fab, faComment, faHeart, faEdit, faTrash, faPowerOff)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
