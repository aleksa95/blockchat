import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// <img src={logo} className="App-logo" alt="logo" />



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var writeCallback = (err, data) => {
       console.log("MESSAGE SENT", data);
       this.setState({value: ''});
    }

    window.ethereumService.writeMessage(this.state.value, writeCallback);
    event.preventDefault();
  }

  componentDidMount() {

    var watchMessages = (messages) => {
      console.log("MESSAGES", messages);
      var oldMessages = this.state.messages;
      oldMessages.push(messages.args);
      this.setState({messages: oldMessages});
    }



    function handleRegisterUser (err, data) {
        if (data) {
          console.log("REGISTERED", data);
          window.ethereumService.writeMessage(this.state.value);
          window.ethereumService.watchForMessages(watchMessages);
        } else if (err) {
          console.log("REGISTERED ERROR", err);
        }
    }

    function handleCheckCallback(data) {
      console.log("DATA FROM CHECK", data);
      if (!data) {
        window.ethereumService.registerUser(handleRegisterUser);
      } else {
        window.ethereumService.watchForMessages(watchMessages);
      }
    }

    var myVar = setInterval(function(){ check() }, 300);

      function check() {
          if (window.connected) {
              stop();
          }
      }

      function stop() {
          clearInterval(myVar);
          console.log("d");
          window.ethereumService.checkIfUserExists(handleCheckCallback);
      }
  }

  render() {
    var messages = this.state.messages;
    return (
      <div className="App">
        <div className="App-header">
          BlockChat
        </div>
        
        <div className="wrapper">

          <div className="main">
            {messages.map((message, index) => (
              <div key={index}>
                <span>{message.sender}:</span>
                <span>{message.message}</span>
              </div>
            ))}
          </div>

          <form className="footer" onSubmit={this.handleSubmit}>
            <textarea placeholder='Message' value={this.state.value} onChange={this.handleChange} className="text" />
        
            <div className="back submit_button">

              <button type="submit" className="button_base b05_3d_roll">
                <div>Submit</div>
                <div>Submit</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
