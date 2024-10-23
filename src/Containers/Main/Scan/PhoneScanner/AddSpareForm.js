import { Button, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { getTaggedSuppliesByBrand, addSpareList } from "../../Account/AccountAction";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CloseOutlined } from "@ant-design/icons"
import { getCurrency } from "../../../Auth/AuthAction";
import { FormattedMessage } from 'react-intl';
const { Option } = Select;

const AddSpareForm = (props) => {

    useEffect(() => {
        props.getCurrency()
        props.getTaggedSuppliesByBrand(props.phoneDetails.company, props.phoneDetails.model)
    }, [])

    const [rows, setRows] = useState([{ suppliesId: "", noOfSpare: "", hours: "", extraCost: "", spareCurrency: "", id: 1 }]);
    const [id, setId] = useState(1);
    const [level, setLevel] = useState(1);

    function buttonOnClick() {
        let data = {
            userId: props.userId,
            spareList: rows,
            phoneId: props.phoneDetails.phoneId,
            orderPhoneId: props.phoneDetails.orderPhoneId,
        }
        props.addSpareList(data, props.phoneDetails.phoneId, props.phoneDetails.orderPhoneId, handleCallBack);
    };

    function handleCallBack() {
        setRows([{ suppliesId: "", noOfSpare: "", hours: "", extraCost: "", spareCurrency: "", id: 1 }])
    }

    function handleChangeValues1(value, a) {
        setRows((v) => {
            return v.map((d) => {
                if (`${d.id}_value` === a) {
                    return { ...d, suppliesId: value };
                } else {
                    return d;
                }
            });
        });
    }
    function handleChangeValue2(value, a) {
        setRows((v) => {
            return v.map((d) => {
                if (`${d.id}_value` === a) {
                    return { ...d, noOfSpare: value };
                } else {
                    return d;
                }
            });
        });
    }
    function handleChangeValue3(value, a) {
        setRows((v) => {
            return v.map((d) => {
                if (`${d.id}_value` === a) {
                    return { ...d, hours: value };
                } else {
                    return d;
                }
            });
        });
    }
    function handleChangeValue4(value, a) {
        setRows((v) => {
            return v.map((d) => {
                if (`${d.id}_value` === a) {
                    return { ...d, extraCost: value };
                } else {
                    return d;
                }
            });
        });
    }
    function handleChangeValues5(value, a) {
        setRows((v) => {
            return v.map((d) => {
                if (`${d.id}_value` === a) {
                    return { ...d, spareCurrency: value };
                } else {
                    return d;
                }
            });
        });
    }
    function handleAddRowClick() {
        setId((v) => v + 1);
        setLevel((v) => v + 1);
        setRows((v) => [...v, { suppliesId: "", noOfSpare: "", hours: "", extraCost: "", spareCurrency: "", id: id + 1, roomFullInd: 0 }]);
    }
    function handleDelete(row) {
        setRows((v) => v.filter((d) => d.id !== row.id));
        setLevel((v) => v - 1);
    }
    console.log(rows);
    return (
        <>
            {rows.map((row, i) => {
                return (
                    <>
                        <div class="flex justify-between">
                            <div class="w-[30%]">
                                <div class="font-bold text-xs font-poppins text-black">{`Spare ${i + 1}`}</div>

                                <Select
                                    name={`${row.id}_value`}
                                    value={`${row.suppliesId}`}
                                    onChange={(value) =>
                                        handleChangeValues1(value, `${row.id}_value`)
                                    }
                                // placeholder={`select`}
                                >
                                    {props.spareByBrand.map((a) => {
                                        return <Option value={a.suppliesId}>{a.suppliesName}</Option>;
                                    })}
                                </Select>

                            </div>

                            <div class="w-[15%]">
                                <div class="font-bold text-xs font-poppins text-black">
                                    <FormattedMessage
                                        id="app.units"
                                        defaultMessage="Units"
                                    />

                                </div>
                                <Input
                                    type='text'
                                    value={`${row.noOfSpare}`}
                                    onChange={(e) =>
                                        handleChangeValue2(e.target.value, `${row.id}_value`)
                                    }
                                />
                            </div>
                            <div class="w-[15%]">
                                <div class="font-bold text-xs font-poppins text-black">
                                    <FormattedMessage
                                        id="app.hours"
                                        defaultMessage="Hours"
                                    />
                                </div>
                                <Input
                                    type='text'
                                    value={`${row.hours}`}
                                    onChange={(e) =>
                                        handleChangeValue3(e.target.value, `${row.id}_value`)
                                    }
                                />
                            </div>

                            {rows.length > 1 && (row.id + 1 > row.id) ? (
                                <div class="w-[5%] mt-[30px]">
                                    <CloseOutlined
                                        onClick={() => handleDelete(row)}
                                        style={{ fontSize: "16px", color: "red" }} />
                                </div>
                            ) : null}

                        </div>
                    </>
                )
            })}
            <div class="flex justify-end mr-[47px] mt-[25px]">
                <Button className="bg-[#24a3fb] mr-4"
                    type="primary"
                    onClick={handleAddRowClick}
                >
                    <FormattedMessage
                        id="app.addmore"
                        defaultMessage="Add More"
                    />
                </Button>
                <Button
                    htmlType='submit'
                    type='primary'
                    onClick={buttonOnClick}
                >
                    <FormattedMessage
                        id="app.save"
                        defaultMessage="Save"
                    />
                </Button>
            </div>

        </>

    )
}

const mapStateToProps = ({ inventory, auth, distributor }) => ({
    addingRoomAndRackInInventory: inventory.addingRoomAndRackInInventory,
    spareByBrand: distributor.spareByBrand,
    userId: auth.userDetails.userId,
    currencies: auth.currencies,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTaggedSuppliesByBrand,
            addSpareList,
            getCurrency
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddSpareForm);
