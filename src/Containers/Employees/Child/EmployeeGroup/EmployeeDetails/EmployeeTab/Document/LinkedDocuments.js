import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../../../../../Config/Auth";
import {
  getEmployeeDocument,
  deleteDocument,
} from "../../../../../EmployeeAction";
import { elipsize } from "../../../../../../../Helpers/Function/Functions";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import { Tooltip } from "antd";

class LinkedDocuments extends Component {
  componentDidMount() {
    const { getEmployeeDocument, employeeId } = this.props;
    getEmployeeDocument(employeeId);
  }
  render() {
    const {
      documentsByEmployeeId,
      fetchingDocumentsByEmployeeId,
      fetchingDocumentsByEmployeeIdError,
      deleteDocument,
      user,
    } = this.props;
    // const {
    //   employee: { employeeId },
    //   getEmployeeDocument,
    // } = this.props;
  

    if (fetchingDocumentsByEmployeeIdError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        {true && (
            <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
            <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[6.5rem]">
          <FormattedMessage
                    id="app.date"
                    defaultMessage="Date"
                  /></div>
   
          <div className="md:w-[10.1rem]">
              <FormattedMessage id="app.name" defaultMessage=" Name" /></div>
                   <div className="md:w-[5.1rem]">
                   <FormattedMessage
            id="app.description"
            defaultMessage="Description"
          /></div>
                         <div className=" md:w-[8.1rem]">
                         <FormattedMessage id="app.uploadedBy" defaultMessage="Uploaded By" /></div>

         
          
          <div className="w-[10.2rem]"></div>
  
        </div>
     
          
        {documentsByEmployeeId.map((item) => { 
          
          
                      return (
                          <div>
                              <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                                  >
                                       
                                       <div className=" flex font-medium flex-col md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
  <div className="flex max-sm:w-full items-center"> 
  
            <div class="max-sm:w-full">
                                          <Tooltip>
                                            <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                            
                                              <div class="text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                  
                                              <span>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</span>
       
         
                                              </div>
                                              </div>
                                          </Tooltip>
                                          </div>
                                          </div>
                                  </div>
                                  <div class="flex">
  
                               
                                
                                  <div className=" flex font-medium flex-col md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                  
                                    <div class="text-sm  font-poppins">
                                    {item.documentName}
                                    </div>
                                </div>
  
                                <div className=" flex font-medium flex-col md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                  
                                  <div class="text-sm  font-poppins">
                                  <span>{elipsize(item.documentDescription || "", 15)}</span>
                                  </div>
                              </div>
                              <div className=" flex font-medium flex-col md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                     
                                     <div class="text-sm  font-poppins">
                   
                       <div className="font-normal text-sm  font-poppins">
                         <span>{item.uploadedBy}</span>
                       </div>
                   
                                     </div>
                                 </div>
  
                            
                                </div>
                                <div className=" flex  " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                     
                                <>
                                <a
            href={`${base_url}/document/${item.documentId}`}
          // target="_blank"
          >
            {user.userAccessInd === true ? (
            <DownloadIcon
              type="download"
              // onClick={() => startDownload()}
              style={{ cursor: "pointer" }}
            />
            ):null}
          </a>
            </>
                   
                    </div>
                               
  
                                
                               
                              </div>
                          </div>
  
  
                      )
                  })}
                      
        </div>
          // <StyledTable
          
          //   pagination={false}
          //   scroll={{ y: tableHeight }}
          //   expandedRowRender={(record) => {
             
          //     return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
          //   }}
          //   rowKey="EmployeeId"
          //   columns={columns}
          //   dataSource={documentsByEmployeeId}
          //   loading={
          //     fetchingDocumentsByEmployeeId ||
          //     fetchingDocumentsByEmployeeIdError
          //   }
          //   onChange={console.log("task onChangeHere...")}
          // />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ employee,auth }) => ({
  employee: employee.employee,
  user:auth.userDetails,
  employeeId: employee.singleEmployee.employeeId,
  fetchingDocumentsByEmployeeId: employee.fetchingDocumentsByEmployeeId,
  fetchingDocumentsByEmployeeIdError:
    employee.fetchingDocumentsByEmployeeIdError,
  documentsByEmployeeId: employee.documentsByEmployeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEmployeeDocument,
      deleteDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDocuments);

// function startDownload() {
//   var url =
//     "http://korero-env1.eba-sywkcsdt.eu-west-3.elasticbeanstalk.com/api/v2.0/Korero_logo1.png";
//   window.open(url, "Download");
// }
