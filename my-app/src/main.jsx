import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from './store/Store.js'
import Header from './components/header.jsx'
import Footer from './components/Footer.jsx'
import SlideBar from './components/slideBar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
      <BrowserRouter>
        <Provider store={Store}>
          <Header/>
            <App />
          <Footer/>
        </Provider>
      </BrowserRouter>
  </React.StrictMode>
)
