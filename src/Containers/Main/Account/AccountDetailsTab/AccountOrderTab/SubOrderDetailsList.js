import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCodeModal from "../../../../../Components/UI/Elements/QRCodeModal";
import { getSubOrderPhone } from "../../AccountAction"
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../../../Components/Placeholder";

function SubOrderDetailsList(props) {
    useEffect(() => {
        props.getSubOrderPhone(props.subRow.orderPhoneAwbId)
    }, [])

    return (
        <>
            {props.fetchingSuborderPhone ? <BundleLoader /> :
                <div className='flex sticky z-auto'>
                    <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                            <div className=" md:w-[7rem]">OEM
                           </div>
                            <div className=" md:w-[7rem]">Model</div>
                            <div className="md:w-[7rem]">IMEI
                        </div>
                            <div className=" md:w-[7rem]">OS</div>
                            <div className=" md:w-[7rem]">GB</div>
                            <div className=" md:w-[7rem]">Color</div>
                            <div className=" md:w-[7rem]">Condition</div>

                            <div className=" md:w-[2rem]"></div>

                        </div>
                        <InfiniteScroll
                            dataLength={props.subOrderPhoneList.length}
                            // loader={props.fetchingSuborderPhone ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.subOrderPhoneList.map((item) => {
                                return (
                                    <div>
                                        <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                            <div class="flex">
                                                <div className=" flex md:w-[7rem] border-l-2  h-8 border-green-500 bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                        {item.company}
                                                    </div>
                                                </div>

                                                <div className=" flex items-center justify-end h-8 ml-gap bg-[#eef2f9]  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                        {item.model}
                                                    </div>

                                                </div>
                                                <div className=" flex  items-center justify-end h-8 ml-gap bg-[#eef2f9]  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                        {item.imei}
                                                    </div>
                                                </div>
                                                <div className=" flex items-center justify-end h-8 ml-gap bg-[#eef2f9]  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                        {item.os}
                                                    </div>
                                                </div>
                                                <div className=" flex items-center justify-end h-8 ml-gap bg-[#eef2f9]  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                        {item.gb}
                                                    </div>
                                                </div>
                                                <div className=" flex items-center justify-end h-8 ml-gap bg-[#eef2f9]  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                        {item.color}
                                                    </div>
                                                </div>
                                                <div className=" flex items-center justify-end h-8 ml-gap bg-[#eef2f9]  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                        {item.condition}
                                                    </div>
                                                </div>
                                                <div className=" flex items-center justify-end h-8 ml-gap bg-[#eef2f9]  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">
                                                        <div>
                                                            {item.qrCodeId ? (
                                                                <QRCodeModal
                                                                    qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                                                    imgHeight={"2.8em"}
                                                                    imgWidth={"2.8em"}
                                                                    imgRadius={20}
                                                                />
                                                            ) : (
                                                                <span class="text-xs font-bold">
                                                                    No QR
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}
                        </InfiniteScroll>
                    </div>
                </div>}

        </>
    );
}

const mapStateToProps = ({ distributor, auth }) => ({
    subOrderPhoneList: distributor.subOrderPhoneList,
    fetchingSuborderPhone: distributor.fetchingSuborderPhone
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSubOrderPhone
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SubOrderDetailsList);

