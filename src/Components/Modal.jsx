import React from 'react';

const Modal = (props) => {
    return (
        <div className={'modal'}>
            <div className={'innerModal'}>
                <button className={'closeModalBtn'} onClick={props.onCloseModal}>close</button>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;