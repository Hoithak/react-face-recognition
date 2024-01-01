import React, { Component } from 'react';
import './App.css';
import Navigator from './components/navigator/Navigator';
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import Rank from './components/rank/Rank'


class App extends Component {
  render() {
    return (
      <div className="App" >
        <div id='particles-js'></div>
        <Navigator />
        <Logo />
        <Rank />
        <ImageLinkForm />
      </div>
    );
  }
}

export default App;
