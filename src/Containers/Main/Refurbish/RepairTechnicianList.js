
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RepairPhoneListByTechnician from './RepairPhoneListByTechnician'
import { getNoOfRepairTechnicianById } from "./RefurbishAction"
import { BundleLoader } from '../../../Components/Placeholder'
import RemainingPhoneList from './ProductionTab/RemainingPhoneList'
import CompletedPhones from './ProductionTab/CompletedPhones'
import { Button } from 'antd'
import ReassignView from './ReassignView'

const RepairTechnicianList = (props) => {

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
              "110",  // "Name"
              "299",  // "Mobile #"
              "1309", // "Total Unit"
              "1310",// "Remaining"
              "144", // "In Progress"
              "268", // "Complete"
              "117",  //   reject
               "1311" ,// Reassign
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
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
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" w-[8rem] md:w-[8rem]">
                     
                        </div>
                        <div className=" md:w-[8rem]">
                          
                        </div>
                        <div className="md:w-[7rem]">
                           
                            </div>
                        <div className=" md:w-[8rem]">
                           
                        </div>
                        <div className=" md:w-[8rem]">

                        
                        </div>
                        <div className="md:w-[8rem]">
                           
                            </div>
                        <div className="md:w-[8rem]">
                           
                            </div>
                    </div>
                    {props.repairByTechnician.map((item) => {
                        let remain = Number(item.totalPhone) - Number(item.repairInProgressPhoneCount) - Number(item.repairCompletePhoneCount)
                        return (
                            <div>
                                <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                    <div class="flex">
                                        <div className=" flex w-[8rem]  md:w-[8rem] max-sm:w-full  ">
                                            <span
                                                onClick={() => {
                                                    handleShow()
                                                    handleRowdata(item)
                                                }}
                                                style={{
                                                    textDecoration: "underline", fontWeight: "bold",
                                                    color: show && item.technicianId === row.technicianId ? "rgb(225 158 14)" : "#0f6ace",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                {item.technicianName}
                                            </span>
                                        </div>

                                        <div className=" flex w-[7rem]   md:w-[7rem] max-sm:flex-row  max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.mobileNo}
                                            </div>

                                        </div>
                                        <div className=" flex    md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.totalPhone}
                                            </div>

                                        </div>
                                        <div className=" flex    md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-bold font-poppins underline text-cyan-700 cursor-pointer">
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
                                        <div className=" flex    md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.repairInProgressPhoneCount || 0}
                                            </div>

                                        </div>
                                        <div className=" flex    md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins font-bold underline text-cyan-700 cursor-pointer">
                                                <span
                                                    style={{ color: complete && item.technicianId === row.technicianId ? "rgb(225 158 14)" : "#0f6ace", }}
                                                    onClick={() => {
                                                        handleComplete();
                                                        handleRowdata(item)
                                                    }}> {item.repairCompletePhoneCount || 0}
                                                </span>
                                            </div>
                                        </div>
                                        <div className=" flex    md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins font-bold underline text-cyan-700 cursor-pointer">
                                                {item.rejectedPhone || 0}
                                            </div>
                                        </div>
                                        <div className=" flex    md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins font-bold underline text-cyan-700 cursor-pointer">
                                                <Button
                                                    onClick={() => {
                                                        handleReassign();
                                                        handleRowdata(item)
                                                    }}
                                                >
                                                 {translatedMenuItems[7]}   {/* Reassign */}
                                                    </Button>
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

