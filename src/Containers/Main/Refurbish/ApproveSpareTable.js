import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllSpareList } from "./RefurbishAction"
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import ApprovedSpareToggle from "./ApprovedSpareToggle";
import { BundleLoader } from '../../../Components/Placeholder';

const ApproveSpareTable = (props) => {

    useEffect(() => {
        props.getAllSpareList(props.rowData.orderPhoneId)
    }, [])
    const [selectedRow, setselectedRow] = useState([]);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setselectedRow(selectedRows);
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };

if (props.fetchingALlSPareList){
    return <BundleLoader/>
}

    return (
        <>
         <div className='flex justify-end sticky top-0 z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "#eaedf1" }}>
                    <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[8.1rem]"><FormattedMessage
                        id="app.sparename"
                        defaultMessage="Spare Name"
                      /></div>
                        <div className=" md:w-[10.1rem]"><FormattedMessage
                        id="app.phoneimei"
                        defaultMessage="Phone imei"
                      /></div>
                        <div className=" md:w-[5.8rem] "><FormattedMessage
                        id="app.phonemodel"
                        defaultMessage="Phone Model"
                      /></div>
                        <div className="md:w-[4.6rem]"><FormattedMessage
                        id="app.oem"
                        defaultMessage="OEM"
                      /></div>
                       
                        <div className="md:w-[7.2rem]"></div>
                    </div>
                    {props.allSpareById.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded-xl  mt-4 bg-white h-10 items-center p-3 " >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
                                                {item.suppliesName}
                                        </div>

                                        <div className=" flex font-medium   md:w-[10.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs  font-poppins">
                                                {item.phoneIMEI}
                                            </h4>

                                        </div>
                                        <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-sm  font-poppins">
                                                {item.model}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className=" flex font-medium  md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.company}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                           <ApprovedSpareToggle phoneSpareId={item.phoneSpareId}/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </OnlyWrapCard>
            </div>

        </>
    )
}
const mapStateToProps = ({ refurbish, auth }) => ({
    allSpareById: refurbish.allSpareById,
    fetchingALlSPareList: refurbish.fetchingALlSPareList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllSpareList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ApproveSpareTable);
