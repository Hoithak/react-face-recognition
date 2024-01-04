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
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    console.log(this.state.input);

    fetch("https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs"
      , returnClarifairequestOptions(this.state.input)
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        const regions = result.outputs[0].data.regions;

        regions.forEach(region => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row.toFixed(3);
          const leftCol = boundingBox.left_col.toFixed(3);
          const bottomRow = boundingBox.bottom_row.toFixed(3);
          const rightCol = boundingBox.right_col.toFixed(3);

          region.data.concepts.forEach(concept => {
            // Accessing and rounding the concept value
            const name = concept.name;
            const value = concept.value.toFixed(4);

            console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);

          });
        });

      })
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
        <FaceRecognition imageURL={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;