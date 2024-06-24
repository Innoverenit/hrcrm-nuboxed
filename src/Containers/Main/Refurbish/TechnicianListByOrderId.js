import React, { useEffect, useState, lazy } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNoOfTechnicianById } from "./RefurbishAction";
import { FormattedMessage } from 'react-intl';
import { BundleLoader } from '../../../Components/Placeholder';
const QCPhoneListByTechnician = lazy(() => import('./QCPhoneListByTechnician'));

const TechnicianListByOrderId = (props) => {

    useEffect(() => {
        props.getNoOfTechnicianById(props.rowData.orderPhoneId)
    }, [])
    const [row, setRow] = useState({})
    const [show, setShow] = useState(false)

    const handleRowdata = (item) => {
        setRow(item)
        setShow(!show)
    }

    if (props.fetchingNoofTecnician) {
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

                    </div>
                    {props.technicianByID.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[12rem] max-sm:w-full  ">
                                            <span
                                                onClick={() => handleRowdata(item)}
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
                                            <div class=" text-xs  font-poppins">
                                                {item.mobileNo}
                                            </div>

                                        </div>
                                        <div className=" flex font-medium   md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.totalPhone}
                                            </div>

                                        </div>
                                        <div className=" flex font-medium   md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.qcToStartPhoneCount}
                                            </div>

                                        </div>
                                        <div className=" flex font-medium   md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.qcInProgressPhoneCount}
                                            </div>

                                        </div>
                                        <div className=" flex font-medium   md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.qcCompletePhoneCount}
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
            {show && <QCPhoneListByTechnician row={row} orderPhoneId={props.rowData.orderPhoneId} />}
        </>
    )
}


const mapStateToProps = ({ auth, refurbish }) => ({
    technicianByID: refurbish.technicianByID,
    fetchingNoofTecnician: refurbish.fetchingNoofTecnician
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNoOfTechnicianById
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TechnicianListByOrderId);


