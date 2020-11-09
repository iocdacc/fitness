import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from "react-router-dom";
import './assets/css/reset.css';
import './assets/css/index.css';

import Home from './view/Home';
import VideoPage from './view/VideoPage';

let App = props => {
  return (
    <HashRouter>

      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/video" exact>
        <VideoPage />
      </Route>

    </HashRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))