import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// <img src={logo} className="App-logo" alt="logo" />

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          BlockChat
        </div>
        
        <div className="wrapper">

          <div className="main">
            main
          </div>

          <form className="footer" onSubmit={this.handleSubmit}>
            <textarea value={this.state.value} onChange={this.handleChange} className="text" />
        
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
