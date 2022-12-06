import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import MachineNav from "../Nav/MachineNav";

const MainContent = () => {
    const dispatch = useDispatch()

    const get_info = (event) => {
        event.preventDefault()
        let factory_number = event.target[0].value
        dispatch({type: 'SET_TARGET_MACHIN_NUM', payload: factory_number})
    }

    return (
        <Container className='mt-4 p-2'>
            <Card className='p-2'>
                <Card.Header>
                    <h3>
                        Проверьте комплектацию и технические характеристики техники Силант
                    </h3>
                </Card.Header>

                <Card.Body className='p-2'>
                    <Form className='p-2' onSubmit={(e) => get_info(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Введите заводской номер интересующей техники</Form.Label>
                            <Form.Control type="text" placeholder="Заводской номер"/>
                            <Form.Text className="text-muted">
                                Заводской номер указан на шильде и в паспорте на устройство
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Найти
                        </Button>
                    </Form>

                    <MachineNav/>

                </Card.Body>

            </Card>
        </Container>
    );
};

export default MainContent;
