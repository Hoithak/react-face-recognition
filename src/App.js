import React, { Component } from 'react';
import './App.css';
import Navigator from './components/navigator/Navigator';
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm'
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Rank from './components/rank/Rank'

const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';


const returnClarifairequestOptions = (imageURL) => {
  const PAT = '97c6272e2d5b4faf9ae1e553a0a3bdb5';
  const USER_ID = 'hoithak';
  const APP_ID = 'face-detection-app';
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
            // "base64": IMAGE_BYTES_STRING
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;

}



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxs: [],
    }
  }

  calculateFaceLocation = (result) => {

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxs = [];
    const regions = result.outputs[0].data.regions;
    regions.forEach(region => {
      // Accessing and rounding the bounding box values
      const boundingBox = region.region_info.bounding_box;
      const topRow = Number(boundingBox.top_row.toFixed(3));
      const leftCol = Number(boundingBox.left_col.toFixed(3));
      const bottomRow = Number(boundingBox.bottom_row.toFixed(3));
      const rightCol = Number(boundingBox.right_col.toFixed(3));
      const box = {
        leftCol: leftCol * width,
        topRow: topRow * height,
        rightCol: width - (rightCol * width),
        bottomRow: height - (bottomRow * height),
      };
      boxs.push(box);

      // region.data.concepts.forEach(concept => {
      //   // Accessing and rounding the concept value
      //   const name = concept.name;
      //   const value = concept.value.toFixed(4);

      //   console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);

      // });
    });

    return boxs;
  }

  displayFaceBox = (boxs) => {
    this.setState({ boxs: boxs });
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    // console.log(this.state.input);

    fetch("https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs"
      , returnClarifairequestOptions(this.state.input)
    )
      .then(response => response.json())
      .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch(error => console.log('error', error));

  }


  render() {
    return (
      <div className="App" >
        <div id='particles-js'></div>
        <Navigator />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition boxs={this.state.boxs} imageURL={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;