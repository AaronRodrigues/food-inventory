import React from 'react';
import ReactDom from 'react-dom';
// Import the App component
import App from './components/App.jsx';

/**
 * Render the App element (a div element with a h1 child element)
 * in the element with an id of 'root'.
 */ 
ReactDom.render(<App />, document.getElementById('root'));