// import React, { useState, useEffect, useMemo } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../Components/UI/Antd";
// import * as Yup from "yup";
// import { Button, Tooltip } from "antd";
// import { getDispatchUpdateList } from "../Inventory/InventoryAction"
// import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";
// import QRCodeModal from "../../../Components/UI/Elements/QRCodeModal";

// function InspectedPhoneByOrder(props) {
//     useEffect(() => {
//         props.getDispatchUpdateList(props.rowData.orderPhoneId)
//     }, [props.rowData.orderPhoneId])

//     const columns = [
//         {
//             title: "",
//             dataIndex: "",
//             width: "1%",
//         },
//         {
//             title: "Company",
//             dataIndex: "company",
//             width: "10%",

//         },
//         {
//             title: "Model",
//             dataIndex: "model",
//             width: "9%",
//         },
//         {
//             title: "IMEI",
//             dataIndex: "imei",
//             width: "10%",
//         },
//         {
//             title: "OS",
//             dataIndex: "os",
//             width: "10%",

//         },
//         {
//             title: "GB",
//             dataIndex: "gb",
//             width: "9%",
//         },
//         {
//             title: "Color",
//             dataIndex: "color",
//             width: "9%",
//         },
//         {
//             title: "Condition",
//             dataIndex: "conditions",
//             width: "10%",
//         },

//         {
//             title: "QR",
//             width: "5%",
//             render: (name, item, i) => {
//                 return (
//                     <SubTitle>
//                         {item.qrCodeId ? (
//                             <QRCodeModal
//                                 qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
//                                 imgHeight={"2.8em"}
//                                 imgWidth={"2.8em"}
//                                 imgRadius={20}
//                             />
//                         ) : (
//                             <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
//                                 No QR
//                             </span>
//                         )}
//                     </SubTitle>
//                 );
//             },
//         },



//     ];

//     return (
//         <>
//             <StyledTable
//                 columns={columns}
//                 dataSource={props.updateDispatchList}
//                 pagination={false}
//                 scroll={{ y: 200 }}
//             />

//         </>
//     );
// }

// const mapStateToProps = ({ inventory }) => ({
//     updateDispatchList: inventory.updateDispatchList,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getDispatchUpdateList
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(InspectedPhoneByOrder);


import React, {useEffect,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDispatchUpdateList } from "../Inventory/InventoryAction"
import { SubTitle } from "../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

const QRCodeModal =lazy(()=>import("../../../Components/UI/Elements/QRCodeModal"));

function InspectedPhoneByOrder(props) {
    useEffect(() => {
        props.getDispatchUpdateList(props.rowData.orderPhoneId)
    }, [props.rowData.orderPhoneId])

    return (
        <>
            <div className='flex justify-end sticky ticky top-0 z-10 '>
            <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[8.1rem]"><FormattedMessage
                        id="app.oem"
                        defaultMessage="OEM"
                      /></div>
                        <div className=" md:w-[8.1rem]"><FormattedMessage
                        id="app.model"
                        defaultMessage="model"
                      /></div>
                        <div className=" md:w-[7.8rem] "><FormattedMessage
                        id="app.imei"
                        defaultMessage="imei"
                      /></div>
                        <div className="md:w-[4.6rem]"><FormattedMessage
                        id="app.os"
                        defaultMessage="os"
                      /> </div>
                        <div className="md:w-[5.8rem]"><FormattedMessage
                        id="app.gb"
                        defaultMessage="gb"
                      /></div>
                        <div className="md:w-[7.7rem]"><FormattedMessage
                        id="app.color"
                        defaultMessage="color"
                      /></div>
                        <div className="md:w-[5.9rem]"><FormattedMessage
                        id="app.conditions"
                        defaultMessage="conditions"
                      /></div>
                        <div className="md:w-[7.2rem]"></div>
                    </div>
                    <div class="overflow-y-auto h-[30vh]">
                    {props.updateDispatchList.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
                                           {item.company}
                                        </div>

                                        <div className=" flex font-medium   md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.model}
                                            </div>

                                        </div>
                                        <div className=" flex font-medium  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">



                                            <div class=" text-sm text-cardBody font-poppins">
                                                
                                            {item.imei}
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" flex font-medium  md:w-[4.52rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                           
                                            {item.os}
                                           

                                        </div>
                                    </div>

                                    <div className=" flex font-medium  md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {item.gb}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {item.color}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                        {item.conditions}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                        <SubTitle>
                        {item.qrCodeId ? (
                         <QRCodeModal
                                 qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                 imgHeight={"2.8rem"}
                                imgWidth={"2.8rem"}
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
                        )
                    })}
                    </div>
                </div>
                
            </div>
        </>
    )
}

const mapStateToProps = ({ inventory }) => ({
    updateDispatchList: inventory.updateDispatchList,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDispatchUpdateList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InspectedPhoneByOrder);
