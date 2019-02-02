import request from './fakeRequest';
import axios from 'axios';

const headers = {'Content-Type': 'application/json'};
const burl = 'http://10.17.5.23:3001';

let localStorage;

// If we're testing, use a local storage polyfill
if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage
}

const auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  login (username, password) {

    console.log('username:',username);
    console.log('password:',password);

    //if (auth.loggedIn()) return Promise.resolve(true)

    return axios.post(`${burl}/user/login`, { username, password }, { headers }); 

    // Post a fake request
    /*return axios.post('http://localhost:3001/user/login', {username, password},{headers})
      .then(response => {
        // Save token to local storage
        localStorage.token = response.token
        return Promise.resolve(true)
      })*/
  },
  /**
  * Logs the current user out
  */
  logout () {
    return request.post('/logout')
  },
  /**
  * Checks if a user is logged in
  */
  loggedIn () {
    return !!localStorage.token
  },
  /**
  * Registers a user and then logs them in
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  register (username, password) {
    // Post a fake request
    return axios.post(`${burl}/user/signup`, {username, password}, { headers });
    /*return request.post('/register', {username, password})
      // Log user in after registering
      .then(() => auth.login(username, password))*/
  },
  onChange () {}
}

export default auth
