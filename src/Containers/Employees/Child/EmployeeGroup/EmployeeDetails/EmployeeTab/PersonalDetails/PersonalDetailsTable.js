import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import {
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DownloadIcon from '@mui/icons-material/Download';
import {
  handleUpdatePersonalDetailsModal,
  getDocumentDetails,
  setEditDocument,
  deletePersonalTable,
} from "../../../../../../Profile/ProfileAction";
import { base_url } from "../../../../../../../Config/Auth";
import APIFailed from "../../../../../../../Helpers/ErrorBoundary/APIFailed";
import { Tooltip } from "antd";
const UpdatePersonalDetailsModal =lazy(()=>import("./UpdatePersonalDetailsModal"));

class EducationTable extends Component {
  componentDidMount() {
    const { getDocumentDetails, employeeId } = this.props;

    getDocumentDetails(this.props.employeeId);
  }
  // }
  render() {
    const {
      documentDetails,
      fetchingDocumentDetails,
      fetchingDocumentDetailsError,
      handleUpdatePersonalDetailsModal,
      updatePersonalDetailsModal,
      setEditDocument,
      deletePersonalTable,
    } = this.props;

 
    if (fetchingDocumentDetailsError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>

<div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
          <div className=" md:w-[6.5rem]">
        <FormattedMessage
                  id="app.name"
                  defaultMessage="Name"
                /></div>
 
        <div className="md:w-[10.1rem]"> 
         <FormattedMessage id="app.type" defaultMessage="Type" /></div>
                 <div className="md:w-[10.1rem]">
                 <FormattedMessage
          id="app.idNo"
          defaultMessage="Document ID number"
        /></div>
                       <div className=" md:w-[8.1rem]">
                       <FormattedMessage id="app.description" defaultMessage="Description" /></div>

                      
       
        
        <div className="w-[10.2rem]"></div>

      </div>
   
        
      {documentDetails.map((item) => { 
        
        
                    return (
                        <div>
                            <div className="flex rounded justify-between bg-white mt-[0.5rem] h-8 items-center p-1"
                                >
                                     
                                     <div className=" flex md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex w-[8rem] max-sm:w-full justify-between flex-row md:flex-col ">
                                          
                                            <div class="text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                
      {item.documentName}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex  md:w-[15.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-xs  font-poppins">
                                  {item.idType}
                                  </div>
                              </div>

                              <div className=" flex  md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-xs  font-poppins">
                                {item.idNo}
                                </div>
                            </div>
                            <div className=" flex  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class="text-xs  font-poppins">
                 
                     <div className="text-xs  font-poppins">
                       <span>{item.description}</span>
                     </div>
                 
                                   </div>
                               </div>

                           
                              </div>
                              <div className=" flex  " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                   
                              <>
                              {item.documentId ? (
              <a
                href={`${base_url}/document/${item.documentId}`}
                target="_blank"
              >
                <DownloadIcon 
                  type="download"
                  // onClick={() => startDownload()}
                  style={{ cursor: "pointer" }}
                />
              </a>
            ) : null}
          </>
                 
                  </div>
                                <div className=" flex ml-2 md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-xs  font-poppins text-center">
                                    <BorderColorIcon className=" cursor-pointer !text-icon"
           
            onClick={() => {
              setEditDocument(item);
              handleUpdatePersonalDetailsModal(true);
            }}
          />

                                    </div>
                                </div>
                                <div className=" flex  ml-2 md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-xs  font-poppins text-center">
                                    <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deletePersonalTable(item.id)}
          >
            <DeleteIcon className=" cursor-pointer !text-icon text-red-600"
              type="delete"
      
            />
          </StyledPopconfirm>

                                    </div>
                                </div>

                              
                             
                            </div>
                        </div>


                    )
                })}
                    
      </div>
        {/* {emailCredential && ( */}
        {/* <StyledTable
          // rowKey="opportunityId"
          columns={columns}
          dataSource={documentDetails}
          Loading={fetchingDocumentDetails || fetchingDocumentDetailsError}
          onChange={console.log("task onChangeHere...")}
          scroll={{ y: tableHeight }}
          pagination={false}
        /> */}

        <UpdatePersonalDetailsModal
          updatePersonalDetailsModal={updatePersonalDetailsModal}
          handleUpdatePersonalDetailsModal={handleUpdatePersonalDetailsModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ profile, employee }) => ({
  documentDetails: profile.documentDetails,
  fetchingDocumentDetails: profile.fetchingDocumentDetails,
  fetchingDocumentDetailsError: profile.fetchingDocumentDetailsError,
  employeeId: employee.singleEmployee.employeeId,
  updatePersonalDetailsModal: profile.updatePersonalDetailsModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDocumentDetails,
      setEditDocument,
      handleUpdatePersonalDetailsModal,
      deletePersonalTable,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EducationTable);
