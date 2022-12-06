import React, {useEffect} from 'react';
import {Nav} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import MainTable from "../Tables/MainTable";
import MainAPI from "../../API/MainAPI";

const MachineNav = () => {
    const dispatch = useDispatch()
    const current_user = useSelector(state => state.current_user)
    const machine_info = useSelector(state => state.machine_info)
    const active_page = useSelector(state => state.active_page)
    const target_machin_num = useSelector(state => state.target_machin_num)

    useEffect(() => {
        if (target_machin_num) {
            get_info(target_machin_num)
        }
    }, [target_machin_num, active_page, current_user])

    async function get_info(target_machin_num) {
        let result = await MainAPI.get_data(current_user.token, `service/api/${active_page}/?factory_number=${target_machin_num}`)

        if (!result) {
            dispatch({
                type: "SHOW_INFO", payload: {
                    show: true,
                    text: 'Машина с таким заводским номером не найдена. ' +
                        'Проверьте раскладку клавиатуры и знаки в заводском номере на шильде изделия.'
                }
            })
        }

        switch (active_page) {
            case 'machine':
                return dispatch({type: 'SET_MACHINE_INFO', payload: result})
            case 'maintenance':
                return dispatch({type: 'SET_MAINTENANCE_INFO', payload: result})
            case 'complaints':
                return dispatch({type: 'SET_COMPLAINS_INFO', payload: result})
            default:
                return dispatch({type: 'SET_MACHINE_INFO', payload: result})
        }
    }

    return (
        <div>
            {current_user.authenticated && machine_info &&
                <Nav fill={true} variant="pills" defaultActiveKey="#" className='mb-2'>
                    <Nav.Item>
                        <Nav.Link href="#" onClick={() => {
                            dispatch({type: "SET_ACTIVE_PAGE", payload: 'machine'})
                        }}>
                            Общая инфо
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" onClick={() => {
                            dispatch({type: "SET_ACTIVE_PAGE", payload: 'maintenance'})
                        }}>
                            Список ТО
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2" onClick={() => {
                            dispatch({type: "SET_ACTIVE_PAGE", payload: 'complaints'})
                        }}>
                            Рекламации
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            }
            {target_machin_num && <MainTable/>}
        </div>
    );
};

export default MachineNav;