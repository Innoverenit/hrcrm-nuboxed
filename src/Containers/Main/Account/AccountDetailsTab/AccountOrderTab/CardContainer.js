

import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { useReactToPrint } from 'react-to-print';

// Define TableRow Component
const TableRow = ({ rowData }) => {
    const [showPrintButton, setShowPrintButton] = useState(true);

    const handlePrint = useReactToPrint({
        content: () => document.getElementById(`row-${rowData.id}`),
        onBeforeGetContent: () => setShowPrintButton(false),
        onAfterPrint: () => setShowPrintButton(true),
    });

    return (
        <tr id={`row-${rowData.id}`}>
            <td>{rowData.id}</td>
            <td>{rowData.name}</td>
            <td>{rowData.age}</td>
            <td>
                {showPrintButton && (
                    <Button onClick={handlePrint}>Print</Button>
                )}
            </td>
        </tr>
    );
};

// Define Table Component
const TableComponent = ({ data }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => <TableRow rowData={record} />, // Render TableRow for each row
        },
    ];

    return <Table dataSource={data} columns={columns} />;
};

// Main App Component
const CardContainer = () => {
    const data = [
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Doe', age: 25 },
        // Add more data as needed
    ];

    return <TableComponent data={data} />;
};

export default CardContainer;
