import React, { Component,lazy } from "react";
import { connect } from "react-redux";

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
import { Tooltip } from "antd";
import NodataFoundPage from "../../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
const UpdatePersonalDetailsModal =lazy(()=>import("./UpdatePersonalDetailsModal"));

class EducationTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  componentDidMount() {
    const { getDocumentDetails, employeeId } = this.props;
    this.fetchMenuTranslations();
    

    getDocumentDetails(this.props.employeeId);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }


  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "110",//0 "Name"
        "71",//1  type
        "1698",//2Document ID number
        "147",//3Description
       "1259" //  "Do you want to delete?"
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
      return <NodataFoundPage />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>

<div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
          <div className=" md:w-[6.5rem]"> {this.state.translatedMenuItems[0]}
        
                </div>
 
        <div className="md:w-[10.1rem]"> 
        {this.state.translatedMenuItems[1]} 
         </div>
                 <div className="md:w-[10.1rem]">
                 {this.state.translatedMenuItems[2]} 
        </div>
                       <div className=" md:w-[8.1rem]">
                       {this.state.translatedMenuItems[3]} 
                       </div>
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
            title={this.state.translatedmenuitems[4]}
            // "Do you want to delete?"
 
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
          translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
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
