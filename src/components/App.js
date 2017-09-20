import React, { Component } from 'react';
import '../styles/App.css';
import Footer from './footer.js';
import Slider from './slider.js';
import EtsyInfo from './etsy-info.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <EtsyInfo />
        <Slider />
        <Slider />
        <Footer />
      </div>
    );
  }
}

export default App;
