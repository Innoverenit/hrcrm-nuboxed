

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { base_url } from "../../../../../../Config/Auth";
import {
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import DownloadIcon from '@mui/icons-material/Download';
import {
  deleteDocument 
} from "../../../../../Contact/ContactAction";
import {
  getContactDocument 
} from "../../../../../Customer/CustomerAction";
import { DeleteOutlined} from "@ant-design/icons";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";

class LinkedContactInvestDocuments extends Component {
  
  componentDidMount() {
    const {
      contactInVestDetail: { contactId },
      getContactDocument,
    } = this.props;
    getContactDocument(contactId);
  }
  componentDidMount() {
    this.props.getCustomerData(this.props.userId);
    this.props.getDepartments();
    
  }
  componentDidMount() {
    this.fetchMenuTranslations();
    this.props.getCustomerConfigure(this.props.orgId,"add","contact")
  }
  async fetchMenuTranslations() {
    try {
      this.setState({ loading: true });
      const itemsToTranslate = [
       'Date', // 0
'Name', // 1
'Type', // 2
'File Name', // 3
'Uploaded By'//4
      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
  }
  render() {
    const { loading, translatedMenuItems } = this.state; 
    return (
      <>
          <div className=' flex sticky z-auto'>          
<div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                  <div className=" flex  w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                  
                  <div className="md:w-[9.7rem]">
                  {translatedMenuItems[0]}  
                  {/* Date */}
                    </div>
                      <div className=" md:w-[14.12rem]">
                      {translatedMenuItems[1]}  
                      {/* Name */}
                        </div>
                      <div className=" md:w-[10.5rem]">
                      {translatedMenuItems[2]}  
                      {/* Description*/}
                        </div>
                      <div className=" md:w-[9.8rem] ">
                      {translatedMenuItems[3]}  
                      {/* Uploaded By */}
                        </div>
                     
                  </div>
                  <div class="overflow-y-auto h-[72vh]">
                  { !this.props.fetchingDocumentsByContactId && this.props.documentsByContactId.length === 0 ?<NodataFoundPage />:this.props.documentsByContactId.map((item,index) =>  {
                      
                      return (
                          <div >
                              <div
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
            >
                                  <div class="flex">
                                      <div className=" flex  md:w-[9.8rem] max-sm:w-full  ">
                                      <div>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</div>
                                      </div>

                                      <div className=" flex    md:w-[14.2rem] max-sm:flex-row w-full max-sm:justify-between items-center  ">
                                          <div class=" text-xs  font-poppins">
                                             {item.documentTitle}
                                          </div>

                                      </div>
                                      <div className=" flex  md:w-[10.8rem] max-sm:flex-row w-full max-sm:justify-between items-center ">
                                          <div class=" text-xs  font-poppins">
                                              {item.documentDescription}
                                          </div>
                                      </div>
                                  </div>
                                  <div className=" flex  md:w-[8.5rem] max-sm:flex-row w-full max-sm:justify-between ">


                                      <div class=" text-xs  font-poppins text-center">
                                      {item.uploadedBy}

                                      </div>
                                  </div>
                                  <div className=" flex  md:w-[2.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                      <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
              <DownloadIcon
                type="download"
                style={{ cursor: "pointer" ,fontSize:"1.25rem"}}
              />
            </a>

                                      </div>
                                  </div>
                                  <div className=" flex  md:w-[2.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                      <a
              href={`${base_url}/download/${item.documentTypeId}`}
            >              
            </a>

                                      </div>
                                  </div>
                                  <div className=" flex  md:w-[5.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                      <StyledPopconfirm
              title="Do you want to delete?"
           >
            <DeleteOutlined type="delete" style={{ cursor: "pointer", fontSize:"1.25rem",color: "red" }} />
            </StyledPopconfirm>

                                      </div>
                                  </div>                               
                              </div>
                          </div>
                      )
                  })}
                  </div>
              </div>                         
          </div>
      </>
  )
  }
}

const mapStateToProps = ({ contact,contactinvest,customer }) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(LinkedContactInvestDocuments);


