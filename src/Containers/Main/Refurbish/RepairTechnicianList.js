
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RepairPhoneListByTechnician from './RepairPhoneListByTechnician'
import { getNoOfRepairTechnicianById } from "./RefurbishAction"
import { FormattedMessage } from 'react-intl'
import { BundleLoader } from '../../../Components/Placeholder'
import RemainingPhoneList from './ProductionTab/RemainingPhoneList'
import CompletedPhones from './ProductionTab/CompletedPhones'
import { Button } from 'antd'
import ReassignView from './ReassignView'

const RepairTechnicianList = (props) => {

    useEffect(() => {
        props.getNoOfRepairTechnicianById(props.rowData.orderPhoneId)
    }, [])
    const [row, setRow] = useState({})
    const [show, setShow] = useState(false)
    const [complete, setComplete] = useState(false)
    const [remaining, setRemaining] = useState(false)
    const [reassign, setReassign] = useState(false)
    const [reject, setReject] = useState(false)

    const handleComplete = () => {
        setComplete(!complete)
        setRemaining(false)
        setShow(false)
        setReassign(false)
    }
    const handleReassign = () => {
        setComplete(false)
        setRemaining(false)
        setShow(false)
        setReassign(!reassign)
        setReject(false)
    }
    const handleRejectReassign = () => {
        setComplete(false)
        setRemaining(false)
        setShow(false)
        setReject(!reject)
        setReassign(false)
    }
    const handleRemaining = () => {
        setComplete(false)
        setShow(false)
        setReject(false)
        setRemaining(!remaining)
        setReassign(false)
    }
    const handleShow = () => {
        setShow(!show)
        setRemaining(false)
        setComplete(false)
        setReject(false)
        setReassign(false)
    }
    const handleRowdata = (item) => {
        setRow(item)

    }

    if (props.fetchingNoOfRepairTechnicianById) {
        return <BundleLoader />
    }
    return (
        <>
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[12rem]"><FormattedMessage
                            id="app.name"
                            defaultMessage="Name"
                        />
                        </div>
                        <div className=" md:w-[8rem]">
                            <FormattedMessage
                                id="app.mobile"
                                defaultMessage="Mobile #"
                            />
                        </div>
                        <div className="md:w-[8rem]">
                            <FormattedMessage
                                id="app.totalUnit"
                                defaultMessage="Total Unit"
                            /></div>
                        <div className=" md:w-[8rem]">
                            <FormattedMessage
                                id="app.remaining"
                                defaultMessage="Remaining"
                            />
                        </div>
                        <div className=" md:w-[8rem]">

                            <FormattedMessage
                                id="app.InProgress"
                                defaultMessage="In Progress"
                            />
                        </div>
                        <div className="md:w-[8rem]">
                            <FormattedMessage
                                id="app.complete"
                                defaultMessage="Complete"
                            /></div>
                        <div className="md:w-[8rem]">
                            <FormattedMessage
                                id="app.rejected"
                                defaultMessage="Reject"
                            /></div>
                    </div>
                    {props.repairByTechnician.map((item) => {
                        let remain = Number(item.totalPhone) - Number(item.repairInProgressPhoneCount) - Number(item.repairCompletePhoneCount)
                        return (
                            <div>
                                <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[12rem] max-sm:w-full  ">
                                            <span
                                                onClick={() => {
                                                    handleShow()
                                                    handleRowdata(item)
                                                }}
                                                style={{
                                                    textDecoration: "underline",
                                                    color: show && item.technicianId === row.technicianId ? "rgb(225 158 14)" : "#0f6ace",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                {item.technicianName}
                                            </span>
                                        </div>

                                        <div className=" flex font-medium   md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.mobileNo}
                                            </div>

                                        </div>
                                        <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.totalPhone}
                                            </div>

                                        </div>
                                        <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins underline text-cyan-700 cursor-pointer">
                                                <span
                                                    style={{ color: remaining && item.technicianId === row.technicianId ? "rgb(225 158 14)" : "#0f6ace", }}
                                                    onClick={() => {
                                                        handleRemaining();
                                                        handleRowdata(item)
                                                    }}>
                                                    {remain || 0}
                                                </span>
                                            </div>

                                        </div>
                                        <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.repairInProgressPhoneCount || 0}
                                            </div>

                                        </div>
                                        <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins underline text-cyan-700 cursor-pointer">
                                                <span
                                                    style={{ color: complete && item.technicianId === row.technicianId ? "rgb(225 158 14)" : "#0f6ace", }}
                                                    onClick={() => {
                                                        handleComplete();
                                                        handleRowdata(item)
                                                    }}> {item.repairCompletePhoneCount || 0}
                                                </span>
                                            </div>
                                        </div>
                                        <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins underline text-cyan-700 cursor-pointer">
                                                {item.rejectedPhone || 0}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins underline text-cyan-700 cursor-pointer">
                                                <Button
                                                    onClick={() => {
                                                        handleReassign();
                                                        handleRowdata(item)
                                                    }}
                                                >Reassign</Button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
            {show && <RepairPhoneListByTechnician row={row} orderPhoneId={props.rowData.orderPhoneId} />}
            {remaining && <RemainingPhoneList
                row={row}
                rowData={props.rowData}
                orderPhoneId={props.rowData.orderPhoneId} />}
            {reassign && <ReassignView
                row={row}
                rowData={props.rowData}
                orderPhoneId={props.rowData.orderPhoneId} />}
            {complete && <CompletedPhones row={row} orderPhoneId={props.rowData.orderPhoneId} />}

        </>
    )
}


const mapStateToProps = ({ auth, refurbish }) => ({
    repairByTechnician: refurbish.repairByTechnician,
    fetchingNoOfRepairTechnicianById: refurbish.fetchingNoOfRepairTechnicianById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNoOfRepairTechnicianById
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepairTechnicianList);

