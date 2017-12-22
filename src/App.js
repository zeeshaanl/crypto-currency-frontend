import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
    constructor() {
        super();
        this.state = {
            bitcoin: '',
            ripple: ''
        };
        this.socket = io('localhost:2200');

    }

    componentDidMount() {
        this.socket.on('sentiment', data => {
            console.log('caught emit');
            console.log(data, 'data');
                const { bitcoin: bitSenti, ripple } = data;
                this.setState(prevState => ({
                    bitcoin: bitSenti || prevState.bitcoin,
                    ripple: ripple || prevState.ripple
                }))
            }
        )
    }

    render() {
        const { bitcoin, ripple } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <button onClick={() => this.subscribeToSentiment('bitcoin')}>#bitcoin</button>
                <button onClick={() => this.subscribeToSentiment('ripple')}>#ripple</button>
                <h3>{bitcoin}</h3>
                <h3>{ripple}</h3>
            </div>
        );
    }

    subscribeToSentiment = (phrase) => {
        this.socket.emit('subscribeToSentiment', phrase);
    }
}

export default App;
