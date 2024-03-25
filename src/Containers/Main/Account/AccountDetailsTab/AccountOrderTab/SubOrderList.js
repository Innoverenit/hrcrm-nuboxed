import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSubOrderData, updateSubOrderAwb, handleSuborderPhone } from "../../AccountAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { FormattedMessage } from 'react-intl';
import { Badge, Button, Input } from "antd";
import SubOrderPhoneModal from "./SubOrderPhoneModal";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import { MultiAvatar2 } from "../../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../../Components/Placeholder";

function SubOrderList(props) {
    useEffect(() => {
        props.getSubOrderData(props.orderId)
    }, [])

    const [awbUpdate, setAwbUpdate] = useState(false)
    const handleAwbNoField = () => {
        setAwbUpdate(!awbUpdate)
    }
    const [awbNo, setAwbNo] = useState("")
    const handleAwbUpdate = (val) => {
        setAwbNo(val)
    }
    function handleCallback2() {
        setAwbUpdate(false)
        setAwbNo("")
    }
    const [subRow, setSubRow] = useState({});
    function handleSubOrderData(item) {
        setSubRow(item)
    }

    return (
        <>
            <div className='flex justify-end sticky top-0 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[12rem]"><FormattedMessage
                            id="app.order"
                            defaultMessage="Order#"
                        /></div>
                        <div className=" md:w-[10.1rem]"><FormattedMessage
                            id="app.created"
                            defaultMessage="Created"
                        /></div>
                        <div className=" md:w-[8rem] "><FormattedMessage
                            id="app.awb"
                            defaultMessage="AWB"
                        /></div>
                        <div className=" md:w-[5rem] "></div>

                    </div>
                    {props.fetchingSuborderData ? <BundleLoader /> : <div class="overflow-x-auto h-[30vh]">
                        <InfiniteScroll
                            dataLength={props.subOrderByOrderId.length}
                            loader={props.fetchingSuborderData ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"30vh"}
                        >
                            {props.subOrderByOrderId.map((item) => {
                                return (
                                    <div>
                                        <div className="flex rounded-xl  mt-4 bg-white h-10 items-center p-3 " >
                                            <div class="flex">
                                                <div className=" flex font-medium  md:w-[12rem] max-sm:w-full  ">
                                                    <Badge
                                                        class=" ml-2"
                                                        size="small"
                                                        count={item.totalPhone}
                                                        overflowCount={999}
                                                    >
                                                        <span
                                                            onClick={() => {
                                                                handleSubOrderData(item)
                                                                props.handleSuborderPhone(true);
                                                            }}
                                                            class="underline cursor-pointer text-[#1890ff] mr-4"
                                                        >{item.orderNo}</span>
                                                    </Badge>
                                                </div>

                                                <div className=" flex font-medium   md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <h4 class=" text-xs text-cardBody font-poppins">
                                                        <MultiAvatar2
                                                            primaryTitle={item.awbUserName}
                                                            imageURL={item.imageURL}
                                                            imgWidth={"1.8rem"}
                                                            imgHeight={"1.8rem"}
                                                        /> &nbsp;&nbsp; {` ${dayjs(item.awbCreationDate).format("DD-MM-YY")}`}
                                                    </h4>

                                                </div>
                                                <div className=" flex font-medium  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <h4 class=" text-sm text-cardBody font-poppins">
                                                        {awbUpdate && (item.orderPhoneAwbId === subRow.orderPhoneAwbId) ?
                                                            <>
                                                                <div class=" flex justify-around">
                                                                    <Input
                                                                        value={awbNo}
                                                                        type='text'
                                                                        onChange={(e) => handleAwbUpdate(e.target.value)} />
                                                                    <div class=" flex justify-evenly">
                                                                        <Button
                                                                            type='primary'
                                                                            loading={props.updatingSuborderAwb}
                                                                            onClick={() => {
                                                                                props.updateSubOrderAwb({
                                                                                    awbNo: awbNo,
                                                                                    userId: props.userId,
                                                                                    orderPhoneId: item.orderId
                                                                                }, item.orderPhoneAwbId, handleCallback2())
                                                                            }}>Save</Button>
                                                                        <Button onClick={handleAwbNoField}>Cancel</Button>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : item.awbNo}
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className=" flex font-medium  md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    <BorderColorIcon
                                                        onClick={() => {
                                                            handleAwbNoField();
                                                            handleSubOrderData(item)
                                                        }}
                                                        className=" !text-base cursor-pointer text-[tomato]"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}
                        </InfiniteScroll>
                    </div>}
                </div>
            </div>
            <SubOrderPhoneModal
                subRow={subRow}
                handleSuborderPhone={props.handleSuborderPhone}
                showSuborderPhoneList={props.showSuborderPhoneList}
            />
        </>
    );
}

const mapStateToProps = ({ distributor, auth }) => ({
    fetchingSuborderData: distributor.fetchingSuborderData,
    subOrderByOrderId: distributor.subOrderByOrderId,
    userId: auth.userDetails.userId,
    showSuborderPhoneList: distributor.showSuborderPhoneList,
    updatingSuborderAwb: distributor.updatingSuborderAwb,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSubOrderData,
            updateSubOrderAwb,
            handleSuborderPhone
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SubOrderList);

