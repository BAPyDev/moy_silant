import React, {useEffect, useRef} from 'react';
import {Accordion, Button, Card, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import MainAPI from "../../API/MainAPI";

const FilterForm = () => {
    const dispatch = useDispatch()
    const machine_list_data = useSelector(state => state.machine_list_data)
    const current_user = useSelector(state => state.current_user)

    const formFactoryNumber = useRef()
    const formMachinModel = useRef()
    const formEngineModel = useRef()
    const formTransmissionModel = useRef()
    const formControlledBridgeModel = useRef()
    const formDrivingBridgeModel = useRef()

    useEffect(() => {
        get_info()
    }, [])

    async function get_info() {
        let machine_filter = "?factory_number="+ formFactoryNumber.current.value +
        "&machine_model=" + formMachinModel.current.value +
        "&engine_model=" + formEngineModel.current.value +
        "&transmission_model=" + formTransmissionModel.current.value +
        "&driving_bridge_model=" + formDrivingBridgeModel.current.value +
        "&controlled_bridge_model=" + formControlledBridgeModel.current.value

        let result = await MainAPI.get_data(
            current_user.token,
            `service/api/machine_list/`,
            machine_filter
        )
        dispatch({type: "SET_MACHINE_LIST_DATA", payload: result})
        console.log(result)
    }

    return (
        <Card className='m-2'>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Фильтр</Accordion.Header>
                    <Accordion.Body>
                        <Card.Body>
                            <Form onSubmit={(e) => {
                                e.preventDefault()
                                get_info()
                            }}>
                                <Row className="mb-1">
                                    <Form.Group as={Col} className="mb-1" controlId="formFactoryNumber">
                                        <Form.Label>Заводской номер машины</Form.Label>
                                        <Form.Control placeholder="Нанесен на шильду изделия" ref={formFactoryNumber}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formMachinModel">
                                        <Form.Label>Модель техники</Form.Label>
                                        <Form.Select ref={formMachinModel}>
                                            <option>Все модели</option>
                                            {machine_list_data &&
                                                machine_list_data.filter_data.machine_models.map((model) => (
                                                <option key={model['name']}>{model['name']}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formEngineModel">
                                        <Form.Label>Модель двигателя</Form.Label>
                                        <Form.Select ref={formEngineModel}>
                                            <option>Все модели</option>
                                            {machine_list_data &&
                                                machine_list_data.filter_data.engine_models.map((model) => (
                                                <option key={model['name']}>{model['name']}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                </Row>

                                <Row className="mb-1">
                                    <Form.Group as={Col} className="mb-1" controlId="formTransmissionModel">
                                        <Form.Label>Модель трансмиссии</Form.Label>
                                        <Form.Select ref={formTransmissionModel}>
                                            <option>Все модели</option>
                                            {machine_list_data &&
                                                machine_list_data.filter_data.transmission_models.map((model) => (
                                                <option key={model['name']}>{model['name']}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-1" controlId="formDrivingBridgeModel">
                                        <Form.Label>Модель ведущего моста</Form.Label>
                                        <Form.Select ref={formDrivingBridgeModel}>
                                            <option>Все модели</option>
                                            {machine_list_data &&
                                                machine_list_data.filter_data.driving_bridge_models.map((model) => (
                                                <option key={model['name']}>{model['name']}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-1" controlId="formControlledBridgeModel">
                                        <Form.Label>Модель управляемого моста</Form.Label>
                                        <Form.Select ref={formControlledBridgeModel}>
                                            <option>Все модели</option>
                                            {machine_list_data &&
                                                machine_list_data.filter_data.controlled_bridge_models.map((model) => (
                                                <option key={model['name']}>{model['name']}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                </Row>

                                <Button variant="primary" type="submit">
                                    Найти
                                </Button>
                            </Form>
                        </Card.Body>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Card>
    );
};

export default FilterForm;