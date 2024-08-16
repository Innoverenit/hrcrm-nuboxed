// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { upadtePayment } from "../../AccountAction";
// import { Input, Select, Switch, Button } from 'antd';

// const PiTable = (props) => {
//     const [visible, setVisible] = useState(true); // Ensure visible is true by default
//     const [RowData, setRowData] = useState({});
//     const [price1, setPrice1] = useState('');
//     const [price2, setPrice2] = useState('');
//     const [mode, setMode] = useState('order'); // 'manual' or 'order'

//     const handleSetParticularOrderData = (item) => {
//         setRowData(item);
//     };

//     const handleChange1 = (val) => {
//         setPrice1(val);
//     };

//     const handleChange2 = (val) => {
//         setPrice2(val);
//     };

//     const handleSubmitPrice = () => {
//         // Add your logic to handle the submission
//         props.upadtePayment(
//             {
//                 invoiceId: price1,
//                 otherInvoiceId: price2, // Example for another invoice ID
//             },
//             RowData.paymentId,
//             props.distributorId
//         );

//         // Clear the input fields but keep them visible
//         setPrice1('');
//         setPrice2('');
//     };

//     const toggleMode = (checked) => {
//         setMode(checked ? 'order' : 'manual');
//         setVisible(true); // Ensure visible is true when switching
//     };

//     return (
//         <div className="flex flex-col w-full p-4">
//             <div className="flex items-center mb-4">
//                 <div className="mr-4 font-bold">Type</div>
//                 <Switch
//                     checked={mode === 'order'}
//                     onChange={toggleMode}
//                     checkedChildren="Order"
//                     unCheckedChildren="Manual"
//                 />
//             </div>
//             <div className="flex items-center mb-4">
//                 <div className="mr-4 font-bold">GST</div>
//                 <Switch
//                     checkedChildren="Included"
//                     unCheckedChildren="Excluded"
//                     // Add functionality to handle this switch if needed
//                 />
//             </div>
//             <div className="text-xs font-poppins">
//                 {visible && (
//                     <>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <div className="font-bold mb-2">Item</div>
//                                 {mode === 'manual' ? (
//                                     <Input
//                                         type="text"
//                                         value={price1}
//                                         onChange={(e) => handleChange1(e.target.value)}
//                                         placeholder="Input 1"
//                                         className="mb-2"
//                                     />
//                                 ) : (
//                                     <Select
//                                         value={price1}
//                                         onChange={(value) => handleChange1(value)}
//                                         options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]} // Replace with your dropdown options
//                                         placeholder="Dropdown 1"
//                                         className="mb-2"
//                                     />
//                                 )}
//                             </div>
//                             <div>
//                                 <div className="font-bold mb-2">Value</div>
//                                 {mode === 'manual' ? (
//                                     <Input
//                                         type="text"
//                                         value={price2}
//                                         onChange={(e) => handleChange2(e.target.value)}
//                                         placeholder="Input 2"
//                                         className="mb-2"
//                                     />
//                                 ) : (
//                                     <Select
//                                         value={price2}
//                                         onChange={(value) => handleChange2(value)}
//                                         options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]} // Replace with your dropdown options
//                                         placeholder="Dropdown 2"
//                                         className="mb-2"
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                         <div className="mt-4">
//                             <Button type="primary" onClick={handleSubmitPrice}>
//                                 Add Row
//                             </Button>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// const mapStateToProps = ({ distributor, auth }) => ({
//     userId: auth.userDetails.userId,
//     orgId: auth.userDetails.organizationId,
//     currencies: auth.currencies,
//     fetchingAccountInvoice: distributor.fetchingAccountInvoice,
//     accountInvoice: distributor.accountInvoice,
//     invoiceOrders: distributor.invoiceOrders,
//     fetchingGeneratedInvoice: distributor.fetchingGeneratedInvoice,
//     generatedInvoice: distributor.generatedInvoice,
//     invoiceO: distributor.invoiceO
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             upadtePayment,
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(PiTable);


import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { upadtePayment } from "../../AccountAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Input, Select, Switch, Button } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';

const PiTable = (props) => {
    const [editMode, setEditMode] = useState(false); // Control edit mode
    const [price1, setPrice1] = useState(); // Initial value for "Item"
    const [price2, setPrice2] = useState(); // Initial value for "Value"
    const [mode, setMode] = useState('order'); // 'manual' or 'order'

    const toggleMode = (checked) => {
        setMode(checked ? 'order' : 'manual');
        setEditMode(false); // Exit edit mode when switching
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancelEdit = () => {
        // Reset to original values and exit edit mode
        setPrice1('10');
        setPrice2('20');
        setEditMode(false);
    };

    const handleSubmitPrice = () => {
        props.upadtePayment(
            {
                invoiceId: price1,
                otherInvoiceId: price2,
            },
            null, // Replace with relevant RowData if needed
            props.distributorId
        );

        // Clear the input fields after submission, keep them visible
        setPrice1('10');
        setPrice2('20');
        setEditMode(false); // Exit edit mode after submission
    };

    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex">
            <div className="flex items-center mb-4">
                <div className="mr-4 font-bold">Type</div>
                <Switch
                    checked={mode === 'order'}
                    onChange={toggleMode}
                    checkedChildren="Order"
                    unCheckedChildren="Manual"
                />
            </div>
            <div className="flex items-center ml-4 mb-4">
                <div className="mr-4 font-bold">GST</div>
                <Switch
                    checkedChildren="Included"
                    unCheckedChildren="Excluded"
                />
            </div>
            </div>
            <div className="text-xs font-poppins flex items-center">
                <div className="grid grid-cols-2 w-full gap-4">
                    <div>
                        <div className="font-bold mb-2">Item</div>
                        {!editMode ? (
                            <span>{price1}</span>
                        ) : (
                            mode === 'manual' ? (
                                <Input
                                    type="text"
                                    value={price1}
                                    onChange={(e) => setPrice1(e.target.value)}
                                    placeholder="Input 1"
                                    className="mb-2"
                                />
                            ) : (
                                <Select
                                    value={price1}
                                    onChange={(value) => setPrice1(value)}
                                    options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]}
                                    placeholder="Dropdown 1"
                                    className="mb-2"
                                />
                            )
                        )}
                    </div>
                    <div>
                        <div className="font-bold mb-2">Value</div>
                        {!editMode ? (
                            <span>{price2}</span>
                        ) : (
                            mode === 'manual' ? (
                                <Input
                                    type="text"
                                    value={price2}
                                    onChange={(e) => setPrice2(e.target.value)}
                                    placeholder="Input 2"
                                    className="mb-2"
                                />
                            ) : (
                                <Select
                                    value={price2}
                                    onChange={(value) => setPrice2(value)}
                                    options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]}
                                    placeholder="Dropdown 2"
                                    className="mb-2"
                                />
                            )
                        )}
                    </div>
                </div>
                {!editMode ? (
                    <div className="flex justify-end mt-2">
                        <BorderColorIcon onClick={handleEdit} style={{ cursor: 'pointer', fontSize: '16px' }} />
                    </div>
                ) : (
                    <div className="mt-4 flex justify-between">
                        <Button type="default" onClick={handleCancelEdit} icon={<CloseOutlined />} className="mr-2">
                            Cancel
                        </Button>
                        <Button type="primary" onClick={handleSubmitPrice}>
                          Save
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    currencies: auth.currencies,
    fetchingAccountInvoice: distributor.fetchingAccountInvoice,
    accountInvoice: distributor.accountInvoice,
    invoiceOrders: distributor.invoiceOrders,
    fetchingGeneratedInvoice: distributor.fetchingGeneratedInvoice,
    generatedInvoice: distributor.generatedInvoice,
    invoiceO: distributor.invoiceO
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            upadtePayment,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PiTable);
