import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { getReceivedUnitOfAnItem, updatePartIdOfAnItem } from "../../../InventoryAction"
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Input } from "antd";
import AutoPartNoTOggle from "./AutoPartNoTOggle";


const ReceivedUnitList = (props) => {
    useEffect(() => {
        props.getReceivedUnitOfAnItem(props.poSupplierSuppliesId)
    }, [])

    const [part, setPart] = useState("")
    const [edit, setEdit] = useState(false)
    const [row, setRow] = useState({})

    const handleRowData = (item) => {
        setRow(item)
    }

    const handlePartNo = () => {
        setEdit(!edit)
    }
    const handleInputPart = (val) => {
        setPart(val)
    }
    const handleCallback = () => {
        setEdit(false)
        setPart("")
    }
    return (
        <>
            <div className=' flex justify-end sticky z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" w-[17.12rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                        <div className=" w-[12.42rem]"><FormattedMessage id="app.id" defaultMessage="System ID" /></div>
                        <div className=" w-[15.05rem]"><FormattedMessage id="app.part" defaultMessage="Part #" /></div>
                        <div className=""></div>
                    </div>

                    {props.reciveUnitData.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                                    <div className=" flex font-medium flex-col w-[15.01rem] max-sm:w-full  ">
                                        <div class="flex justify-between text-sm text-cardBody font-semibold  font-poppins ">

                                            {item.suppliesFullName.substring(0, 20)}
                                        </div>
                                    </div>
                                    <div class="flex">
                                        <div className=" flex font-medium flex-col w-[14.6rem] max-sm:w-full  ">
                                            <div class="flex justify-between text-sm text-cardBody font-semibold  font-poppins ">
                                                {item.supplierSuppliesUniqueNumberId}
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className=" flex font-medium flex-col  w-[8.12rem] max-sm:flex-row  max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.unit}
                                        </div>
                                    </div> */}

                                    <div className=" flex font-medium  w-[12.2rem] max-sm:justify-between  max-sm:flex-row ">
                                        <div class=" font-normal flex text-[0.85rem] text-cardBody font-poppins">

                                            {edit && row.supplierSuppliesUniqueNumberId === item.supplierSuppliesUniqueNumberId ?
                                                <>
                                                    <Input
                                                        value={part}
                                                        type="text"
                                                        placeholder="Enter Part Number"
                                                        onChange={(e) => handleInputPart(e.target.value)}
                                                    />
                                                    <Button
                                                        type="primary"
                                                        onClick={() => props.updatePartIdOfAnItem({
                                                            partNumber: part,
                                                            autoPartInd: true,
                                                            userId: props.userId,
                                                            poSupplierSuppliesId: props.poSupplierSuppliesId,
                                                        }, item.supplierSuppliesUniqueNumberId, handleCallback())}
                                                    >Add</Button>
                                                    <Button onClick={handlePartNo}>Cancel</Button>
                                                </>
                                                : <span>
                                                    {item.partNumber}
                                                </span>
                                            }

                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col w-[7.2rem] max-sm:justify-between  max-sm:flex-row ">
                                        <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                            {/* {item.autoPartInd ? null : */}
                                            <BorderColorIcon
                                                className=" !text-base cursor-pointer text-[tomato]"
                                                onClick={() => {
                                                    handlePartNo()
                                                    handleRowData(item)
                                                }}
                                            />
                                            {/* } */}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col w-[7.5rem] max-sm:justify-between  max-sm:flex-row ">
                                        <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                            <AutoPartNoTOggle
                                                supplierSuppliesUniqueNumberId={item.supplierSuppliesUniqueNumberId}
                                                autoPartInd={item.autoPartInd}
                                                showPartNoInd={item.showPartNoInd}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>

        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    userId: auth.userDetails.userId,
    reciveUnitData: inventory.reciveUnitData
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getReceivedUnitOfAnItem,
            updatePartIdOfAnItem
        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ReceivedUnitList)
);
