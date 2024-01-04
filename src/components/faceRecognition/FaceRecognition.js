import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL }) => {
    return (
        <div className='center'>
            <img className='result-image' src={imageURL} alt="Image Result" />
        </div>
    );
}

export default FaceRecognition;