import { Button, Tooltip } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { base_url, base_url2 } from "../../../../Config/Auth";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

class ReportDocumentsView extends Component {
  render() {
    // console.log(this.props.customer);
    // const {
    //   customer: { url, phoneNumber,address },
    // } = this.props;


    return (
      <>
        
        {/* <div class=" flex items-center w-[90%] justify-between flex-no-wrap m-2"> */}

    
        {/* <div class=" flex justify-end mt-3" */}
                        
                    {/* > */}
                        <Tooltip title={"Generate PDF"}>
                            {/* <Button > */}
                            <a
              href={`${base_url2}/customer/pdf/${"id"}`}
            target="_blank"
            >
                                 <PictureAsPdfIcon className=" !text-xl !text-red !text-tab"/>
                                 </a>
                            {/* </Button> */}
                        </Tooltip>
                     
                        <Tooltip title={"Generate XL"}>
                          <a href={`${base_url}/excel/export/user/${this.props.userId
                                    }?type=${"expense"}&startDate=${this.props.startDate}&endDate=${this.props.endDate
                                    }=${this.props.userId}
                `}> <DownloadForOfflineIcon className="!text-xl text-green-500"/></a>
                       
                         
    
                            {/* <Button
                                icon="file-excel"
                                // type="primary"
                                href={`${base_url}/excel/export/user/${this.props.userId
                                    }?type=${"expense"}&startDate=${this.props.startDate}&endDate=${this.props.endDate
                                    }=${this.props.userId}
                `}
                className="!text-green-600 !text-tab" 
                  // style={{
                  //                   color: "white",
                  //                   border: "0.125em solid green",
                  //                   fontSize: "1.125em",
                  //                   marginLeft:"1rem",
                  //                   // padding: "0.4375em",
                  //                   backgroundColor: "green",
                  //               }}
                            ></Button> */}
                        </Tooltip>
                    
                        <Tooltip title={"Generate CSV"}> 
                        <SimCardDownloadIcon className=" !text-xl text-blue-500"/>
                            {/* <Button
                                icon="file-text"
                                target="blank"
                                className="!text-blue-600 !text-tab" 
                                // style={{
                                //     color: "white",
                                //     marginLeft:"1rem",
                                //     border: "0.125em solid green",
                                //     fontSize: "1.125em",
                                //     // padding: "0.4375em",
                                //     backgroundColor: "blue",
                                // }}
                            ></Button> */}
                        </Tooltip>
                    {/* </div> */}

         {/* </div> */}

      </>
    );
  }
}
const mapStateToProps = ({ auth, report }) => ({
    reportViewType: report.reportViewType,
    orgId:auth.userDetails.organizationId,
    allReportInvestors:report.allReportInvestors,
    selectedReportType: report.selectedReportType,
    fiscalStartDate: auth.userDetails.fiscalMapper.fiscalStartDate,
    fiscalEndDate: auth.userDetails.fiscalMapper.fiscalEndDate,
    selectedSubReportType: report.selectedSubReportType
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        // setTimeRangeReport,
        // getAllReportInvestors,
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(ReportDocumentsView);
  

const ReportItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[95%] justify-between flex-no-wrap m-2">
     <div class=" text-[#444] font-semibold" >{label}</div>
     <div className="overflow-hidden truncate ml-8">
       {value}
   </div>
    </div>
  );
};