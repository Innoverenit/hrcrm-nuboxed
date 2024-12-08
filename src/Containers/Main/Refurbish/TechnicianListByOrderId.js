import React, { useEffect, useState, lazy } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNoOfTechnicianById } from "./RefurbishAction";
import { BundleLoader } from '../../../Components/Placeholder';
const QCPhoneListByTechnician = lazy(() => import('./QCPhoneListByTechnician'));

const TechnicianListByOrderId = (props) => {
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
            <div className=' flex  sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[rgba(163,171,185,0.5)] bg-[white]">
                    <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky z-10">
                        <div className=" md:w-[12rem]">
                            {translatedMenuItems[0]}
                        </div>
                        <div className=" md:w-[8rem]">
                        {translatedMenuItems[1]} 
                        </div>
                        <div className="md:w-[8rem]">
                        {translatedMenuItems[2]} 
                            </div>
                        <div className=" md:w-[8rem]">
                        {translatedMenuItems[3]}
                        </div>
                        <div className=" md:w-[8rem]">

                        {translatedMenuItems[4]}
                        </div>
                        <div className="md:w-[8rem]">
                        {translatedMenuItems[5]}
                            </div>

                    </div>
                    {props.technicianByID.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                    <div class="flex">
                                        <div className=" flex   md:w-[12rem] max-sm:w-full  ">
                                            <span
                                                onClick={() => handleRowdata(item)}
                                                style={{
                                                    textDecoration: "underline", fontWeight:"bold",
                                                    color: show && item.technicianId === row.technicianId ? "rgb(225 158 14)" : "#0f6ace",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                {item.technicianName}
                                            </span>
                                        </div>

                                        <div className=" flex    md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.mobileNo}
                                            </div>

                                        </div>
                                        <div className=" flex    md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.totalPhone}
                                            </div>

                                        </div>
                                        <div className=" flex    md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.qcToStartPhoneCount}
                                            </div>

                                        </div>
                                        <div className=" flex    md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                                {item.qcInProgressPhoneCount}
                                            </div>

                                        </div>
                                        <div className=" flex    md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
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


