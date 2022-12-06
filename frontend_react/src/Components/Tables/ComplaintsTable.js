import React from 'react';
import {Table} from "react-bootstrap";
import {useSelector} from "react-redux";

const ComplaintsTable = () => {
    const complaints_info = useSelector(state => state.complaints_info)

    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>Дата отказа</th>
                <th>Наработка, м/час</th>
                <th>Узел отказа</th>
                <th>Описание отказа</th>
                <th>Способ восстановления</th>
                <th>Используемые запасные части</th>
                <th>Дата восстановления</th>
                <th>Время простоя техники</th>
                <th>Машина</th>
            </tr>
            </thead>

            <tbody>
            {complaints_info && complaints_info.map((complaint) => (
                <tr key={complaint.id}>
                    <td>{complaint['Дата отказа']}</td>
                    <td>{complaint['Наработка, м/час']}</td>
                    <td>{complaint['Узел отказа']}</td>
                    <td>{complaint['Описание отказа']}</td>
                    <td>{complaint['Способ восстановления']}</td>
                    <td>{complaint['Используемые запасные части']}</td>
                    <td>{complaint['Дата восстановления']}</td>
                    <td>{complaint['Время простоя техники']}</td>
                    <td>{complaint['Машина']}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default ComplaintsTable;