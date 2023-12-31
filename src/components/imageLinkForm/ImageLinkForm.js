import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className='ma4 mt0'>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures.'}
            </p>
            <p>
                {'https://i0.wp.com/boingboing.net/wp-content/uploads/2015/08/combo1.jpg'}
            </p>
            <p>
                {'https://i.stack.imgur.com/bfZUt.jpg'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input
                        className='f4 pa2 w-70 center'
                        type="text"
                        onChange={onInputChange}
                    />
                    <button
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;