import React from 'react';
import {Toast, ToastContainer} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

const InfoModal = () => {
    const dispatch = useDispatch()
    const show_info = useSelector(state => state.show_info)

    return (
        <ToastContainer className='p-3' position="top-center">
            <Toast
                onClose={() => dispatch({type: "SHOW_INFO", payload: {show: false, text: ''}})}
                show={show_info.show}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <strong className="me-auto">Внимание!</strong>
                </Toast.Header>
                <Toast.Body><h5>{show_info.text}</h5></Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default InfoModal;