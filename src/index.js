import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


//AWS-AMPLIFY
import Amplify, { Auth } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);


ReactDOM.render(<App/>, document.getElementById('root'));