import { Button, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { getTaggedSuppliesByBrand, addSpareList } from "../../AccountAction";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { getCurrency } from "../../../../Auth/AuthAction";
const { Option } = Select;

const AddMultipleSpare = (props) => {

    useEffect(() => {
        props.getCurrency()
        props.getTaggedSuppliesByBrand(props.RowData.company, props.RowData.model)
    }, [])

    const [rows, setRows] = useState([{ suppliesId: "", noOfSpare: "", hours: "", extraCost: "", spareCurrency: "", id: 1,orgId:props.orgId }]);
    const [id, setId] = useState(1);
    const [level, setLevel] = useState(1);

    function buttonOnClick() {
        let data = {
            spareList: rows,
            phoneId: props.RowData.phoneId,
            orderPhoneId: props.RowData.orderPhoneId,
        }
        props.addSpareList(data, props.RowData.phoneId, props.RowData.orderPhoneId, handleCallBack);
    };

    function handleCallBack() {
        // props.getPhoneOrderIdByUser()
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
                              Units
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
                                  Hours
                                </div>
                                <Input
                                    type='text'
                                    value={`${row.hours}`}
                                    onChange={(e) =>
                                        handleChangeValue3(e.target.value, `${row.id}_value`)
                                    }
                                />
                            </div>
                            <div class="w-[15%]">
                                <div class="font-bold text-xs font-poppins text-black">
                                   Cost
                                </div>
                                <Input
                                    type='text'
                                    value={`${row.extraCost}`}
                                    onChange={(e) =>
                                        handleChangeValue4(e.target.value, `${row.id}_value`)
                                    }
                                />
                            </div>
                            <div class="w-[15%]">
                                <div class="font-bold text-xs font-poppins text-black">{`Currency`}</div>

                                <Select
                                    name={`${row.id}_value`}
                                    value={`${row.spareCurrency}`}
                                    onChange={(value) =>
                                        handleChangeValues5(value, `${row.id}_value`)
                                    }
                                // placeholder={`select`}
                                >
                                    {props.currencies.map((a) => {
                                        return <Option value={a.currency_name}>{a.currency_name}</Option>;
                                    })}
                                </Select>

                            </div>
                            {rows.length > 1 && (row.id + 1 > row.id) ? (
                                <div class="w-[5%] mt-[30px]">
                                    <CloseIcon
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
                  Add More
                </Button>
                <Button
                    htmlType='submit'
                    type='primary'
                    loading={props.addingSpareList}
                    onClick={buttonOnClick}
                >
                   Save
                </Button>
            </div>

        </>

    )
}

const mapStateToProps = ({ inventory, auth, distributor }) => ({
    addingRoomAndRackInInventory: inventory.addingRoomAndRackInInventory,
    spareByBrand: distributor.spareByBrand,
    currencies: auth.currencies,
    addingSpareList: distributor.addingSpareList,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getTaggedSuppliesByBrand,
            addSpareList,
            getCurrency,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddMultipleSpare);
