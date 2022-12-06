import React from 'react';
import {Button, Card, Container, Table} from "react-bootstrap";
import FilterForm from "../Components/Filters/FilterForm";
import {useDispatch, useSelector} from "react-redux";

const MachineListPage = () => {
    const dispatch = useDispatch()
    const machine_list_data = useSelector(state => state.machine_list_data)
    const current_user = useSelector(state => state.current_user)

    const get_info = (target_machin_num) => {
        dispatch({type: 'SET_TARGET_MACHIN_NUM', payload: target_machin_num})
        dispatch({type: "SHOW_MACHINE_MODAL"})
    }

    return (
        <Container className='mt-3 p-2'>
            <Card>
                <Card.Header><h2>Список машин:</h2></Card.Header>
                <FilterForm/>
                {current_user.role === 'manager'
                    &&
                    <div>
                        <Button type='button' variant='outline-primary' className='m-2'
                                onClick={() => dispatch({type: "SHOW_MACHINE_MODAL"})}
                        >
                            ➕ Добавить машину
                        </Button>
                    </div>
                }
                <Card.Body>

                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Машина</th>
                            <th>Заводской номер</th>
                            <th>Модель двигателя</th>
                            <th>Модель трансмиссии</th>
                            <th>Модель ведущего моста</th>
                            <th>Модель управляемого моста</th>
                        </tr>
                        </thead>

                        <tbody>
                        {machine_list_data &&
                            machine_list_data.machine_list_data.map((machine) => (
                                <tr key={machine.id} onClick={() => get_info(machine.factory_number)}>
                                    <td>{machine.machine_model__name}</td>
                                    <td>{machine.factory_number}</td>
                                    <td>{machine.engine_model__name}</td>
                                    <td>{machine.transmission_model__name}</td>
                                    <td>{machine.driving_bridge_model__name}</td>
                                    <td>{machine.controlled_bridge_model__name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MachineListPage;