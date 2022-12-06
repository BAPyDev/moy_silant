import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "react-bootstrap";
import LogoutForm from "./LogoutForm";

const LogoutPage = () => {
    const dispatch = useDispatch()
    const show_logout_modal = useSelector(state => state.show_logout_modal)

    const show_modal = () => {
        dispatch({type: "SHOW_LOGOUT_MODAL"})
    }

    return (
        <Modal show={show_logout_modal} onHide={() => show_modal()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Выйти из системы
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LogoutForm/>
            </Modal.Body>
        </Modal>
    );
};

export default LogoutPage;