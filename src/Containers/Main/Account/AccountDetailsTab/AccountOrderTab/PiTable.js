import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { addPi, getPibyItem, getPiFirststep } from "../../AccountAction";
import { Input, Switch, Button, Checkbox } from 'antd';

const PiTable = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [mode, setMode] = useState('order'); 
    const [selectedItems, setSelectedItems] = useState([]); 
    const [inputValues, setInputValues] = useState({}); 

    useEffect(() => {
        props.getPibyItem(props.particularRowData.orderPhoneId)
        if (props.piIdFromPreview) {
            props.getPiFirststep(props.piIdFromPreview,mode);
        }
    }, [props.particularRowData.orderPhoneId, props.piIdFromPreview,mode]);

    const toggleMode = (checked) => {
        setMode(checked ? 'order' : 'manual');
        setEditMode(false);
        setSelectedItems([]); 
        setInputValues({});

    };

    const handleCheckboxChange = (itemId) => {
        setSelectedItems(prevSelectedItems => {
            if (prevSelectedItems.includes(itemId)) {
                const newInputValues = { ...inputValues };
                delete newInputValues[itemId];
                setInputValues(newInputValues);
                return prevSelectedItems.filter(id => id !== itemId);
            } else {
                return [...prevSelectedItems, itemId];
            }
        });
    };

    const handleInputChange = (key, itemId, value) => {
    if (mode === 'manual') {
        setInputValues(prevInputValues => ({
            ...prevInputValues,
            [key]: value
        }));
    } else {
        setInputValues(prevInputValues => ({
            ...prevInputValues,
            [itemId]: {
                ...prevInputValues[itemId],
                [key]: value
            }
        }));
    }
};

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(props.piByItem.map(item => item.phoneId));
            const newInputValues = {};
            props.piByItem.forEach(item => {
                newInputValues[item.phoneId] = {
                    itemId: item.phoneId,
                    itemValue: ""
                };
            });
            setInputValues(newInputValues);
        } else {
            setSelectedItems([]);
            setInputValues({});
        }
    };

    const handleSubmitPrice = () => {
        let payload;

        if (mode === 'order') {
            const selectedItemsData = props.piByItem.filter(item => selectedItems.includes(item.phoneId));
            payload = {
                gst: "included",
                itemList: selectedItemsData.map(item => ({
                    itemId: item.phoneId,
                    itemValue: inputValues[item.phoneId]?.itemValue || item.itemValue
                })),
                itemType: "Repair",
                phoneOrderId: props.particularRowData.orderPhoneId,
                piId: "",
                type: mode,
                userId: props.userId,
                distributorId: props.distributorId
            };
        } else {
            payload = {
                gst: "included",
                itemId: inputValues.itemId || "",  
                itemValue: inputValues.itemValue || "", 
                itemType: "Repair",
                phoneOrderId: props.particularRowData.orderPhoneId,
                piId: "",
                type: mode,
                userId: props.userId,
                distributorId: props.distributorId
            };
        }

        props.addPi(payload);
        setSelectedItems([]);
        setInputValues({});
    };

    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex">
                <div className="flex items-center mb-4">
                    <div className="mr-4 font-bold">
                        {/* Type */} {props.translatedMenuItems[32]}

                    </div>
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
            
            {mode === 'order' && (
                <div className="flex sticky z-auto">
                    <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className="flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                            <div className="md:w-[1.5rem]">
                                <Checkbox 
                                    onChange={handleSelectAll}
                                    checked={selectedItems.length === props.piByItem.length && props.piByItem.length > 0}
                                />
                            </div>
                            <div className="md:w-[7.1rem]">{props.translatedMenuItems[34]}</div>
                            <div className="md:w-[3.8rem]">{props.translatedMenuItems[22]}</div>
                        </div>
                        <div className="h-[33vh]">
                            {props.piByItem.map((item) => {
                                return (
                                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" key={item.phoneId}>
                                        <div>
                                            <Checkbox 
                                                checked={selectedItems.includes(item.phoneId)}
                                                onChange={() => handleCheckboxChange(item.phoneId)}
                                            />
                                        </div>
                                        <div className="flex font-medium justify-between w-[10.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.imei}
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            {selectedItems.includes(item.phoneId) ? (
                                                <Input 
                                                    placeholder="Enter value"
                                                    value={inputValues[item.phoneId]?.itemValue || ""}
                                                    onChange={(e) => handleInputChange('itemValue', item.phoneId, e.target.value)}
                                                />
                                            ) : (
                                                <div className="text-xs font-poppins">
                                                    {item.itemValue}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

            {mode === 'manual' && (
                <div className="mt-4">
                    {/* {props.piByItem.map((item) => ( */}
                        <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1" >                        
                            <div className="flex w-[7.1rem]">
                                <Input 
                                    placeholder="Enter item"
                                    value={inputValues.itemId || ""}
                                    onChange={(e) => handleInputChange('itemId', null, e.target.value)}
                                />
                            </div>
                            <div className="flex w-[7.1rem] ml-2">
                                <Input 
                                    placeholder="Enter value"
                                    value={inputValues.itemValue || ""}
                    onChange={(e) => handleInputChange('itemValue', null, e.target.value)}
                                />
                            </div>
                        </div>
                    {/* ))} */}
                </div>
            )}
            
            <div className="mt-4 flex justify-between">
                <Button 
                    type="primary" 
                    onClick={handleSubmitPrice} 
                    disabled={mode === 'order' ? selectedItems.length === 0 : Object.keys(inputValues).length === 0}>
                    {props.translatedMenuItems[48]}
                </Button>
            </div>
            <div className="flex sticky z-auto">
                    <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className="flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                           
                            <div className="md:w-[7.1rem]">Pi ID</div>
                            <div className="md:w-[10.8rem]">PI INQUIRY</div>
                        </div>
                        <div className="h-[33vh]">
                            {props.piFirstStep.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.paymentDate).format("DD/MM/YYYY");
                                return (
                                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                                       
                                        <div className="flex font-medium justify-between w-[10.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.piId}
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins">
                                                {item.piInquiryItemLinkId}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
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
    invoiceO: distributor.invoiceO,
    piByItem: distributor.piByItem,
    piFirstStep:distributor.piFirstStep,
    piIdFromPreview:distributor.piIdFromPreview
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addPi,
            getPibyItem,
            getPiFirststep
            
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PiTable);
