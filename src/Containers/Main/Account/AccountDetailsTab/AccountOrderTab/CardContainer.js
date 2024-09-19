

// import React, { useState } from 'react';
// import { Button, Table } from 'antd';
// import { useReactToPrint } from 'react-to-print';

// // Define TableRow Component
// const TableRow = ({ rowData }) => {
//     const [showPrintButton, setShowPrintButton] = useState(true);

//     const handlePrint = useReactToPrint({
//         content: () => document.getElementById(`row-${rowData.id}`),
//         onBeforeGetContent: () => setShowPrintButton(false),
//         onAfterPrint: () => setShowPrintButton(true),
//     });

//     return (
//         <tr id={`row-${rowData.id}`}>
//             <td>{rowData.id}</td>
//             <td>{rowData.name}</td>
//             <td>{rowData.age}</td>
//             <td>
//                 {showPrintButton && (
//                     <Button onClick={handlePrint}>Print</Button>
//                 )}
//             </td>
//         </tr>
//     );
// };

// // Define Table Component
// const TableComponent = ({ data }) => {
//     const columns = [
//         {
//             title: 'ID',
//             dataIndex: 'id',
//             key: 'id',
//         },
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             key: 'name',
//         },
//         {
//             title: 'Age',
//             dataIndex: 'age',
//             key: 'age',
//         },
//         {
//             title: 'Action',
//             dataIndex: 'action',
//             key: 'action',
//             render: (text, record) => <TableRow rowData={record} />, // Render TableRow for each row
//         },
//     ];

//     return <Table dataSource={data} columns={columns} />;
// };

// // Main App Component
// const CardContainer = () => {
//     const data = [
//         { id: 1, name: 'John', age: 30 },
//         { id: 2, name: 'Doe', age: 25 },
//         // Add more data as needed
//     ];

//     return <TableComponent data={data} />;
// };

// export default CardContainer;

import React, { useRef } from "react";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";

const QRCodeGenerator = ({ data }) => {
    const componentRefs = useRef([]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "12px" }}>
            {data.map((item, index) => (
                <div
                    key={index}
                    style={{
                        marginBottom: "20px",
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "5px",
                    }}
                >
                    <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Product: {item.product}</div>
                    <div style={{ marginBottom: "10px" }}>IMEI: {item.imei}</div>
                    <QRCode value={item.phoneId} size={128} />
                    <ReactToPrint
                        trigger={() => <button onClick={handlePrint}>Print</button>}
                        content={() => componentRefs.current[index]}
                    />
                    <div style={{ display: "none", textAlign: "center" }}>

                        <div
                            ref={(el) => (componentRefs.current[index] = el)}
                            style={{
                                fontSize: "16px",
                                marginBottom: "20px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Product: {item.product}</div>
                            <div style={{ marginBottom: "10px" }}>IMEI: {item.imei}</div>
                            <div style={{ marginBottom: "10px" }}>
                                <QRCode value={item.phoneId} size={128} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const CardContainer = () => {
    const data = [
        { product: "Apple", imei: "IMEI3570" },
        { product: "Reedmo", imei: "IMEI3568" }
    ];

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>QR Code Generator</h1>
            <QRCodeGenerator data={data} />
        </div>
    );
};

export default CardContainer;