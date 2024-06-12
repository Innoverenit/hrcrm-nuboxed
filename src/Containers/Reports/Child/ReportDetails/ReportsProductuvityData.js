import React,{ useEffect, useState, lazy }  from 'react'
import { connect } from "react-redux";
import {getReportsProductivityData} from "../../ReportAction"
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";

function ReportsProductivityData(props) {
    useEffect(() => {
       props.getReportsProductivityData(props.userId,props.startDateData)
      }, []);
  return (
    <div className='flex justify-end sticky z-auto'>
            <div className="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                <div className="flex w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=""></div>
                    <div className="md:w-[22.12rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.starttime" defaultMessage="Start Time" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.endtime" defaultMessage="End Time" /></div>
                    <div className="md:w-[15.5rem]"><FormattedMessage id="app.totalTimeTaken" defaultMessage="Time Taken" /></div>
                    {/* <div className="md:w-[15.5rem]"><FormattedMessage id="app.totalTimeTaken" defaultMessage="Time Taken" /></div> */}
                    
                    <div className=""></div>
                    {/* <div className="md:w-[15.5rem]"><FormattedMessage id="app.tag" defaultMessage="Tag" /></div> */}
                </div>

                {props.reportsProductivityData.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex rounded-xl mt-2 bg-white h-12 items-center p-3">
                                <div className="flex font-medium flex-col md:w-[36.1rem] max-sm:w-full">
                                    <div className="flex justify-between text-sm text-cardBody font-semibold font-poppins">
                                        {item.productFullName}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem] text-cardBody font-poppins" style={{ marginLeft: "9em" }}>
                                        {item.startTime}
                                    </div>
                                </div>

                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem] text-cardBody font-poppins" style={{ marginLeft: "9em" }}>
                                        {item.endTime}
                                    </div>
                                </div>
                                <div className="flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row">
                                    <div className="font-normal text-[0.85rem] text-cardBody font-poppins" style={{ marginLeft: "9em" }}>
                                        {item.totalTimeTaken}
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
    report
  }) => ({
 
    // viewType: customer.viewType,
    reportsProductivityData:report.reportsProductivityData,
    //userId: auth.userDetails.userId,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getReportsProductivityData
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(ReportsProductivityData);