import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, boxs }) => {

    return (
        <div className='center'>
            <div className="relative">
                <img id='inputimage' className='result-image' src={imageURL} alt="Result" />
                <div
                    className='bounding-box'
                    style={{
                        // top: boxs[1].topRow,
                        // right: boxs[1].rightCol,
                        // bottom: boxs[1].bottomRow,
                        // left: boxs[1].leftCol
                    }}
                ></div>
            </div>
        </div>
    );
}

export default FaceRecognition;