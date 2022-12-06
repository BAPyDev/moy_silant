import React from 'react';
import {Table} from "react-bootstrap";
import {useSelector} from "react-redux";

const MaintenanceTable = () => {
    const maintenance_info = useSelector(state => state.maintenance_info)

    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>Вид ТО</th>
                <th>Дата проведения</th>
                <th>Наработка, м/час</th>
                <th>№ заказ-наряда</th>
                <th>Дата заказ-наряда</th>
                <th>Машина</th>
            </tr>
            </thead>

            <tbody>
            {maintenance_info && maintenance_info.map((maintenance) => (
                <tr key={maintenance.id}>
                    <td>{maintenance['Вид ТО']}</td>
                    <td>{maintenance['Дата проведения']}</td>
                    <td>{maintenance['Наработка, м/час']}</td>
                    <td>{maintenance['№ заказ-наряда']}</td>
                    <td>{maintenance['Дата заказ-наряда']}</td>
                    <td>{maintenance['Машина']}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default MaintenanceTable;