import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "react-bootstrap";
import LoginForm from "./LoginForm";

const AuthPage = () => {
    const dispatch = useDispatch()
    const show_auth_modal = useSelector(state => state.show_auth_modal)


    const show_modal = () => {
        dispatch({type: "SHOW_AUTH_MODAL"})
    }

    return (
        <Modal show={show_auth_modal} onHide={() => show_modal()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Вход в систему
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginForm/>
            </Modal.Body>
        </Modal>
    );
};

export default AuthPage;