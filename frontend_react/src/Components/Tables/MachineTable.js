import React, {useEffect} from 'react';
import {Table, Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import MainAPI from "../../API/MainAPI";

const MachineTable = () => {
    const dispatch = useDispatch()
    const machine_info = useSelector(state => state.machine_info)
    const current_user = useSelector(state => state.current_user)

    async function save_machine() {
        let result = await MainAPI.post_data(current_user.token, `service/api/update_machine/`, machine_info)
        dispatch({type: "SHOW_INFO", payload: {show: true, text: result.result}})
    }

    return (
        <>
            {machine_info &&
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>Характеристика</th>
                        <th>Значение</th>
                    </tr>
                    </thead>

                    <tbody>
                    {machine_info && Object.entries(machine_info).map((key, value) =>
                        <tr key={key[0]}>
                            <td width='35%'>{key[0]}</td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    value={key[1]}
                                    disabled={current_user.role !== 'manager'}
                                    onChange={
                                        (e) => dispatch({
                                            type: "UPDATE_MACHINE_INFO",
                                            key: key[0],
                                            value: e.target.value
                                        })
                                    }
                                />
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            }
            {current_user.role === 'manager' &&
                <Button type='button' variant='outline-primary' className='m-2' onClick={() => save_machine()}> ✅
                    Сохранить</Button>
            }
        </>
    );
};

export default MachineTable;