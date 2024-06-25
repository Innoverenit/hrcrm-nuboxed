import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSpareListByPhoneId } from "../../AccountAction";
import { FormattedMessage } from 'react-intl';

function SpareListTable(props) {
    useEffect(() => {
        props.getSpareListByPhoneId(props.RowData.phoneId)
    }, [])



    return (
        <>
            <div className='flex justify-end sticky top-0 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[8.1rem]"><FormattedMessage
                            id="app.spare"
                            defaultMessage="Spare"
                        /></div>
                        <div className=" md:w-[8.1rem]"><FormattedMessage
                            id="app.category"
                            defaultMessage="category"
                        /></div>
                        <div className=" md:w-[8.1rem]"><FormattedMessage
                            id="app.attribute"
                            defaultMessage="attribute"
                        /></div>
                        <div className=" md:w-[10.1rem]"><FormattedMessage
                            id="app.units"
                            defaultMessage="Units"
                        /></div>
                        <div className=" md:w-[5.8rem] "><FormattedMessage
                            id="app.hours"
                            defaultMessage="Hours"
                        /></div>
                        <div className="md:w-[4.6rem]"><FormattedMessage
                            id="app.cost"
                            defaultMessage="Cost"
                        /></div>
                        <div className="md:w-[4.6rem]"><FormattedMessage
                            id="app.total"
                            defaultMessage="Total"
                        /></div>

                    </div>
                    {props.spareList.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded-xl  mt-4 bg-white h-10 items-center p-3 " >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
                                            {item.suppliesName}
                                        </div>
                                        <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs  font-poppins">
                                                {item.categoryName} {item.subCategoryName}
                                            </h4>

                                        </div>
                                        <div className=" flex font-medium  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-sm  font-poppins">
                                                {item.attribute} {item.subAttribute}
                                            </h4>
                                        </div>
                                        <div className=" flex font-medium   md:w-[10.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs  font-poppins">
                                                {item.noOfSpare}
                                            </h4>

                                        </div>
                                        <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-sm  font-poppins">
                                                {item.hours}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className=" flex font-medium  md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.extraCost}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.total}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    );
}

const mapStateToProps = ({ distributor }) => ({
    fetchingSpareListByPhoneId: distributor.fetchingSpareListByPhoneId,
    spareList: distributor.spareList,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSpareListByPhoneId
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SpareListTable);


// import React, { useState, useEffect, useMemo } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../../../Components/UI/Antd";
// import { getSpareListByPhoneId } from "../../AccountAction";

// function SpareListTable(props) {
//     useEffect(() => {
//         props.getSpareListByPhoneId(props.RowData.phoneId)
//     }, [])

//     const columns = [
//         {
//             title: "",
//             dataIndex: "",
//             width: "1%",
//         },
//         {
//             title: "Spare",
//             dataIndex: "suppliesName",

//         },
//         {
//             title: "Units",
//             dataIndex: "noOfSpare",

//         },
//         {
//             title: "Hours",
//             dataIndex: "hours",

//         },
//         {
//             title: "Cost",
//             dataIndex: "extraCost",
//             render: (text, item) => {
//                 return (
//                     <>{item.extraCost} {item.spareCurrency}</>
//                 )
//             }
//         },
//         {
//             title: "Total",
//             dataIndex: "total",
//             render: (text, item) => {
//                 return (
//                     <>{item.total} {item.spareCurrency}</>
//                 )
//             }
//         },

//     ];

//     return (
//         <>
//             <StyledTable
//                 columns={columns}
//                 dataSource={props.spareList}
//                 pagination={false}
//                 loading={props.fetchingSpareListByPhoneId}
//             />

//         </>
//     );
// }

// const mapStateToProps = ({ distributor }) => ({
//     fetchingSpareListByPhoneId: distributor.fetchingSpareListByPhoneId,
//     spareList: distributor.spareList,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getSpareListByPhoneId
//         },
//         dispatch
//     );

// export default connect(mapStateToProps, mapDispatchToProps)(SpareListTable);
