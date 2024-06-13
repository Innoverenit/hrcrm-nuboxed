import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { base_url } from "../../../../../../Config/Auth";
import {
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import { Tooltip } from "antd";
import DownloadIcon from '@mui/icons-material/Download';
import {
  getContactDocument,
} from "../../../../../Customer/CustomerAction";
import {
  deleteDocument 
} from "../../../../ContactAction";
import { elipsize } from "../../../../../../Helpers/Function/Functions";
import { DeleteOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";

class LinkedDocuments extends Component {
  componentDidMount() {
    const {
      contact: { contactId },
      getContactDocument,
    } = this.props;
    getContactDocument(contactId);
  }
  render() {
    const {
      documentsByContactId,
      fetchingDocumentsByContactId,
      fetchingDocumentsByContactIdError,
        deleteDocument,
    } = this.props;
  

    const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
  if (fetchingDocumentsByContactId) return <BundleLoader/>;
    return (
      <>
         <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[6.9rem]">
        <FormattedMessage
                  id="app.date"
                  defaultMessage="Date"
                /></div>
 
        <div className="md:w-[11.1rem]">  <FormattedMessage id="app.name" defaultMessage="Name" /></div>
                 <div className="md:w-[18.12rem]">
                 <FormattedMessage
          id="app.description"
          defaultMessage="Description"
        /></div>
                       <div className=" md:w-[7.1rem]">
                       <FormattedMessage id="app.uploadedBy" defaultMessage="Uploaded By" /></div>

                      
       
        
        <div className="w-[4.2rem]"></div>

      </div>
   
        
      { !fetchingDocumentsByContactId && documentsByContactId.length === 0 ?<NodataFoundPage />:documentsByContactId.map((item,index) =>  {
        
        
                    return (
                        <div>
                            <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col"
              >
                                     
                                     <div className=" flex font-medium flex-col md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-sm  text-cardBody font-poppins  font-medium cursor-pointer">
                                                
                                            <span>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</span>
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex font-medium flex-col md:w-[13.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-sm text-cardBody font-poppins">
                                  {item.documentTitle}
                                  </div>
                              </div>

                              <div className=" flex font-medium flex-col md:w-[20.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-sm text-cardBody font-poppins">
                                <span>{elipsize(item.documentDescription || "", 15)}</span>
                                </div>
                            </div>
                            <div className=" flex font-medium flex-col md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class="text-sm text-cardBody font-poppins">
                 
                     <div className="font-normal text-sm text-cardBody font-poppins">
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
            <DownloadIcon
              type="download" class=" cursor-pointer !text-icon bg-green-500"/>
          </a>
          </>
                 
                  </div>
                                <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm text-cardBody font-poppins text-center">
                                    <a href={`${base_url}/download/${item.documentTypeId}`}></a>

                                    </div>
                                </div>
                                <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-sm text-cardBody font-poppins text-center">
                                    <StyledPopconfirm
                                      title="Do you want to delete?"
                                        onConfirm={() => deleteDocument(item.documentId)}
                                             >
                                      <DeleteOutlined type="delete" class="cursor-pointer !text-icon bg-red-600" />
                                        </StyledPopconfirm>

                                    </div>
                                </div>

                              
                             
                            </div>
                        </div>


                    )
                })}
                    
      </div>
        {/* {true && (
          <StyledTable
            pagination={false}
            scroll={{ y: tableHeight }}
            expandedRowRender={(record) => {
              //debugger;
              return <p style={{ margin: 0 }}>{record.documentDescription}</p>;
            }}
            rowKey="ContactId"
            columns={columns}
            dataSource={documentsByContactId}
            Loading={
              fetchingDocumentsByContactId || fetchingDocumentsByContactIdError
            }
            onChange={console.log("task onChangeHere...")}
          />
        )} */}
      </>
    );
  }
}

const mapStateToProps = ({ contact,customer }) => ({
  contact: contact.contact,
  fetchingDocumentsByContactId: customer.fetchingDocumentsByContactId,
  fetchingDocumentsByContactIdError: customer.fetchingDocumentsByContactIdError,
  documentsByContactId: customer.documentsByContactId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactDocument,
        deleteDocument,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDocuments);


