import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// imports the socket.io-client module
import socketIOClient from "socket.io-client";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

class App2 extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
      // The endpoint points to our socketio-server port

    };
  }

  componentDidMount() {
    // this is called destructuring assignment
    /*
      const {girls, guys, women, men} = state;

      Is the same as
      const girls = state.girls;
      const guys = state.guys;
      const women = state.women;
      const men = state.men;
    */

    // pulls the endpoint from the state object, which is the
    // server address that socket.io will connect to
    const { endpoint } = this.state;

    // connects the client side socket.io to the server side
    // it will connect and then listen for messages from the
    // server. example socketIOClient("http://127.0.0.1:4001")
    const socket = socketIOClient(endpoint);
    // Now we will listen for the "FromAPI" event to sent from
    // the server to the client
    socket.on("FromAPI", data => {
      console.log(`FromAPI data: ${data}`);
      this.setState( {response : data} );
    });
  }

  render() {
    const { response } = this.state;
    console.log(response);
    return(
      <div style={{ textAlign: "center"}}>
      { response
        ? <p>
            The temperature in Florence is : {response} degrees Farenheit
          </p>
        : <p> Loading...123</p>
      }
      </div>
    );
  }
} 

export default App2;
//export default App2;

