import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNoOfphoneInRepair } from "./RefurbishAction"
import { FormattedMessage } from 'react-intl'

const RepairPhoneListByTechnician = (props) => {

    useEffect(() => {
        props.getNoOfphoneInRepair(props.orderPhoneId, props.row.technicianId)
    }, [])
    const [row, setRow] = useState({})
    const [show, setShow] = useState(false)


    return (
        <>
            <div className=' flex sticky z-auto h-60'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky z-10">
                        <div className=" md:w-[8.1rem]"><FormattedMessage
                            id="app.brand"
                            defaultMessage="Brand"
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
                    {props.repairPhoneByTechId.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                    <div class="flex">
                                        <div className=" flex md:w-[7.6rem] max-sm:w-full  ">
                                            {item.company}
                                        </div>

                                        <div className=" flex  md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.model}
                                            </div>

                                        </div>
                                        <div className=" flex md:w-[8.4rem] max-sm:flex-row w-full max-sm:justify-between ">



                                            <div class=" text-xs  font-poppins">

                                                {item.imei}
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" flex md:w-[4.52rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">

                                            {item.os}


                                        </div>
                                    </div>

                                    <div className=" flex md:w-[6.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.gb}
                                        </div>
                                    </div>
                                    <div className=" flex md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.color}
                                        </div>
                                    </div>
                                    <div className=" flex md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.conditions}
                                        </div>
                                    </div>
                                  

                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}


const mapStateToProps = ({ auth, refurbish }) => ({
    repairPhoneByTechId: refurbish.repairPhoneByTechId,
    fetchingNoOfPhoneInRepair: refurbish.fetchingNoOfPhoneInRepair
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNoOfphoneInRepair
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepairPhoneListByTechnician);
