// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
const axios = require('axios');
const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({debug: true});

app.intent('Default Welcome Intent', (conv) => {
  conv.ask('Welcome to Numbers Trivia. Which number do you want to know?');
  // Complete your fulfillment logic and
  // send a response when the function is done executing
});

app.intent('numbers_trivia', (conv, {number}) => {
  return axios.get(`http://numbersapi.com/${number}/trivia`).then(function (response) {
    conv.add(response.data);
    conv.ask('Would you want one more?')
  });
  // Complete your fulfillment logic and
  // send a response when the function is done executing
});

app.intent('quit', (conv) => {
  conv.close('Ok, have a nice day.');
  // Complete your fulfillment logic and
  // send a response when the function is done executing
});

exports.yourAction = functions.https.onRequest(app);
