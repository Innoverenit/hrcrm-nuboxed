import React,{ useEffect, useState, lazy }  from 'react'
import { connect } from "react-redux";
import moment from "moment";
//import {getReportsProductivityData} from "../../ReportAction"
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {getManufactureLinkData} from "../ProductionAction"

function ProductionManufactureCard(props) {
    useEffect(() => {
       props.getManufactureLinkData(props.productionProductId)
      }, []);
  return (
    <div className='flex justify-end sticky z-auto'>
            <div className="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                <div className="flex w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]"><FormattedMessage id="app.partname" defaultMessage="Part Name" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.partno" defaultMessage="Part No" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.user" defaultMessage="User" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.date" defaultMessage="Date" /></div>
                    {/* <div className="md:w-[15.5rem]"><FormattedMessage id="app.totalTimeTaken" defaultMessage="Time Taken" /></div> */}
                    
                    <div className=""></div>
                    {/* <div className="md:w-[15.5rem]"><FormattedMessage id="app.tag" defaultMessage="Tag" /></div> */}
                </div>

                {props.manufactureLinkData.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded-xl mt-2 bg-white h-12 items-center p-3">
                                <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                                    <div className="flex justify-between text-sm text-cardBody font-semibold font-poppins">
                                        {item.suppliesName}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem] text-cardBody font-poppins" style={{ marginLeft: "9em" }}>
                                        {item.partNumber}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem] text-cardBody font-poppins" style={{ marginLeft: "9em" }}>
                                        {item.createdBy}
                                    </div>
                                </div>
                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem] text-cardBody font-poppins" style={{ marginLeft: "9em" }}>
                                        
                                        {`${moment.utc(item.creationDate).format("YYYY/MM/DD")}`}
                                    </div>
                                </div>

                               
                            
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
  )
}

const mapStateToProps = ({
    auth,
    customer,
    sector,
    opportunity,
    employee,
    report,
    production
  }) => ({
 
    // viewType: customer.viewType,
    manufactureLinkData:production.manufactureLinkData,
  
    //userId: auth.userDetails.userId,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getManufactureLinkData
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(ProductionManufactureCard);