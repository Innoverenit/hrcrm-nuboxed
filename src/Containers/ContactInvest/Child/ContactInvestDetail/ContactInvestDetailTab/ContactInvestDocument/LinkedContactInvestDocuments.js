

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { base_url } from "../../../../../../Config/Auth";
import {  StyledPopconfirm,} from "../../../../../../Components/UI/Antd";
import DownloadIcon from '@mui/icons-material/Download';
import {deleteDocument } from "../../../../../Contact/ContactAction";
import {  getContactDocument } from "../../../../../Customer/CustomerAction";
import { DeleteOutlined} from "@ant-design/icons";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import FileOpenIcon from '@mui/icons-material/FileOpen';
class LinkedContactInvestDocuments extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  componentDidMount() {
    const {
      contactInVestDetail: { contactId },
      getContactDocument,
    } = this.props;
    getContactDocument(contactId);
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }
  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
       '74', // 0 Date
'110', // 1 Name
'71', // 2Type
'1208', // 3File Name
'1207'//4Uploaded By
      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  render() {
   
    return (
      <>
          <div className=' flex sticky z-auto'>          
<div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                  <div className=" flex  w-[100%]  p-1 bg-transparent font-bold text-xs sticky items-end z-10">
                  
                  <div className="md:w-[9.7rem] text-[#00A2E8] text-base">
                  <DateRangeIcon className='!text-icon  '  /> {this.state.translatedMenuItems[0]}  
                  {/* Date */}
                    </div>
                      <div className=" md:w-[14.12rem]">
                      <LocationCityIcon className='!text-icon  '  />  {this.state.translatedMenuItems[1]}  
                      {/* Name */}
                        </div>
                      <div className=" md:w-[10.5rem]">
                      < MergeTypeIcon className='!text-icon text-[#c42847] '  />  {this.state.translatedMenuItems[2]}  
                      {/* type*/}
                        </div>
                      <div className=" md:w-[9.8rem] ">
                      <  FileOpenIcon className='!text-icon text-[#7fb800] '  /> 
                      {this.state.translatedMenuItems[3]}  
                      {/* filename */}
                        </div>
                     
                  </div>
                  <div class="overflow-y-auto h-[72vh]">
                  { !this.props.fetchingDocumentsByContactId && this.props.documentsByContactId.length === 0 ?<NodataFoundPage />:this.props.documentsByContactId.map((item,index) =>  {
                      
                      return (
                          <div >
                              <div
              className="flex rounded justify-between  bg-white mt-1 items-center py-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
            >
                                  <div class="flex">
                                      <div className=" flex  h-8 border-l-2 border-green-500 bg-[#eef2f9] md:w-[9.8rem] max-sm:w-full  ">
                                      <div>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</div>
                                      </div>

                                      <div className=" flex  h-8 ml-gap bg-[#eef2f9]    md:w-[14.2rem] max-sm:flex-row w-full max-sm:justify-between items-center  ">
                                          <div class=" text-xs  font-poppins">
                                             {item.documentTitle}
                                          </div>

                                      </div>
                                      <div className=" flex h-8 ml-gap bg-[#eef2f9]  justify-center  md:w-[10.8rem] max-sm:flex-row w-full max-sm:justify-between items-center ">
                                          <div class=" text-xs  font-poppins">
                                              {item.documentDescription}
                                          </div>
                                      </div>
                                  </div>
                                  <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center  md:w-[8.5rem] max-sm:flex-row w-full max-sm:justify-between ">


                                      <div class=" text-xs  font-poppins text-center">
                                      {item.uploadedBy}

                                      </div>
                                  </div>
                                  <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[2.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                      <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
              <DownloadIcon className=" !text-icon cursor-pointer"
                type="download"
              
              />
            </a>
                                      </div>
                                  </div>
                                  <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[2.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                      <a
              href={`${base_url}/download/${item.documentTypeId}`}
            >              
            </a>

                                      </div>
                                  </div>
                                  <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[5.23rem] max-sm:flex-row w-full max-sm:justify-between ">
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


