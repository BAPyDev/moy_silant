import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import MachineNav from "../Nav/MachineNav";

const MachineInfoModal = () => {
    const dispatch = useDispatch()
    const show_machine_modal = useSelector(state => state.show_machine_modal)

    return (
        <Modal
            show={show_machine_modal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => dispatch({type: "SHOW_MACHINE_MODAL"})}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Информация о машине:
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <MachineNav/>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => dispatch({type: "SHOW_MACHINE_MODAL"})}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MachineInfoModal;