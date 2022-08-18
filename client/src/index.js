import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import { saveState } from './redux/browser-storage'
import { debounce } from 'debounce'



store.subscribe(
  debounce(() => {
    saveState(store.getState())
  }, 800)
)


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


