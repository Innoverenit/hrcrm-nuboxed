import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCodeModal from "../../../../../Components/UI/Elements/QRCodeModal";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { getSubOrderPhone } from "../../AccountAction"
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../../../Components/Placeholder";

function SubOrderDetailsList(props) {
    useEffect(() => {
        props.getSubOrderPhone(props.subRow.orderPhoneAwbId)
    }, [])

    return (
        <>
            {props.fetchingSuborderPhone ? <BundleLoader /> :
                <div className='flex justify-end sticky top-0 z-auto'>
                    <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                        <div className=" flex  w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
                            <div className=" md:w-[7rem]"><FormattedMessage
                                id="app.OEM"
                                defaultMessage="OEM"
                            /></div>
                            <div className=" md:w-[7rem]"><FormattedMessage
                                id="app.model"
                                defaultMessage="Model"
                            /></div>
                            <div className="md:w-[7rem]"><FormattedMessage
                                id="app.IMEI"
                                defaultMessage="IMEI"
                            /></div>
                            <div className=" md:w-[7rem]"><FormattedMessage
                                id="app.os"
                                defaultMessage="OS"
                            /></div>
                            <div className=" md:w-[7rem]"><FormattedMessage
                                id="app.gb"
                                defaultMessage="GB"
                            /></div>
                            <div className=" md:w-[7rem]"><FormattedMessage
                                id="app.color"
                                defaultMessage="Color"
                            /></div>
                            <div className=" md:w-[7rem]"><FormattedMessage
                                id="app.condition"
                                defaultMessage="Condition"
                            /></div>

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
                                        <div className="flex rounded-xl  mt-4 bg-white h-10 items-center p-3 " >
                                            <div class="flex">
                                                <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.company}
                                                    </div>
                                                </div>

                                                <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.model}
                                                    </div>

                                                </div>
                                                <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.imei}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.os}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.gb}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.color}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.condition}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium   md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        <SubTitle>
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
                                                        </SubTitle>
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

