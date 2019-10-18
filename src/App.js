import React from 'react';
import Swatch from './components/swatch.js';
import Recommendation from './components/recommendation.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      numberOfSwatches: 6,
      swatches: [],
      likes: [],
      colorAverage: [],
      recommendedSwatch: false,
      recommendedHex: ""
    };

    for (let i = 0; i < this.state.numberOfSwatches; i +=1) {
      this.state.swatches.push({hexCode: this.generateColor()});
    }
    this.updateUserLikeStatus = this.updateUserLikeStatus.bind(this);
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
     ] : null;
  }

  rgbToHex(rgb) {
    return "#" 
    + this.componentToHex(rgb[0]) 
    + this.componentToHex(rgb[1]) 
    + this.componentToHex(rgb[2]);
  }

  componentToHex(c) {
    var hex = Math.round(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  updateUserLikeStatus(statusFromButton,hexCode) {
    this.state.likes.push({statusFromButton,hexCode});
  }

  generateColor () {
    return '#' +  Math.random().toString(16).substr(-6);
  }

 recommend() {
  if(this.state.likes.length > 0) {
    let average = [0,0,0];
    let totalLikes = 0;
    for(let i = 0; i < this.state.likes.length; i++) {
       if (this.state.likes[i].statusFromButton) {
        totalLikes++;
        console.log(this.hexToRgb(this.state.likes[i].hexCode));
        for(let j = 0; j < average.length; j++) {
          average[j] = average[j] +
          this.hexToRgb(this.state.likes[i].hexCode)[j];
       }
      }
    }
    console.log(average + " , " + totalLikes);
    for(let k = 0; k < average.length; k++) {
      average[k] = average[k]/totalLikes;
    }
    console.log(average + " , " + totalLikes);
    this.setState({
      colorAverage: average,
      recommendedSwatch: true,
      recommendedHex: this.rgbToHex(average)
    });
    }
  }

  render() {
    return (
      <div>
      <h1 className="header text-center">Professor Mutlu's Color Recommender</h1>
      <p className="lead text-center text-muted">👍 or 👎 swatches below to get a recommendation</p>
      <div className="app-container">
        <div className="color-container">
          { this.state.swatches.map((color, index) => 
          <Swatch key={`color-${index}`} index={index} 
          // update={this.updateColor.bind(this)} 
          hexCode={color.hexCode}
          likePressed={this.updateUserLikeStatus}>
          </Swatch>) }
        </div>
        <button type="button" 
        className="btn btn-outline-secondary button-recommend "
        onClick={() => {this.recommend()}}>Recommend</button>
        {this.state.recommendedSwatch && 
        <Recommendation hexCode={this.state.recommendedHex} />}
      </div>
      </div>
    )
  }
}

export default App;
