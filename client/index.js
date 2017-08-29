import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
// Import the App component
import App from './components/App.jsx';

/**
 * Render the App element (a div element with a h1 child element)
 * in the element with an id of 'root'.
 */ 
// ReactDom.render(<App />, document.getElementById('root'));

render (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/app" component={App}/>
      </Switch>
    </div>
  </BrowserRouter>, document.getElementById('root')
);