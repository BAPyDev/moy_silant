import React from 'react';
import {Card, Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import MachineTable from "./MachineTable";
import MaintenanceTable from "./MaintenanceTable";
import ComplaintsTable from "./ComplaintsTable";

const MainTable = () => {
    const active_page = useSelector(state => state.active_page)

    return (
        <Container>
            <Card>
                <Card.Header>
                    <h3>Информация о комплектации и технических характеристиках Вашей техники:</h3>
                </Card.Header>
                <Card.Body className='p-2'>
                    {active_page === 'machine' && <MachineTable/>}
                    {active_page === 'maintenance' && <MaintenanceTable/>}
                    {active_page === 'complaints' && <ComplaintsTable/>}

                </Card.Body>
            </Card>
        </Container>
    );
};

export default MainTable;