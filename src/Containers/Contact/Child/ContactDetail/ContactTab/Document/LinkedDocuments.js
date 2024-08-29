import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
  
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    const {
      contact: { contactId },
      getContactDocument,
      
    } = this.props;
    this.fetchMenuTranslations();
    getContactDocument(contactId);
    
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  async fetchMenuTranslations() {
    try {
      this.setState({ loading: true });
      const itemsToTranslate = [
     "74" ,//  'Date' 0
   "110",// 'Name', // 1
       "71",// 'Type' 2
        "1158",//  'Share' 3
         "147",// 'Description'  4
          "1207",  //  'Uploaded By', // 5

      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
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
  const {loading,translatedMenuItems } = this.state;
  if (loading) {
    return <div><BundleLoader/></div>;
  } 
    return (
      <>
         <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[6.9rem]">{this.state.translatedMenuItems[0]} </div>
          {/* Date */}
        <div className="md:w-[11.1rem]"> {this.state.translatedMenuItems[1]}      </div>
           {/* Name */}   
        <div className="md:w-[11.1rem]"> {this.state.translatedMenuItems[2]}</div>
          {/* type */}          
        <div className="md:w-[11.1rem]"> {this.state.translatedMenuItems[3]}</div>
          {/* Share */}      
        <div className="md:w-[18.12rem]"> {this.state.translatedMenuItems[4]}</div>
          {/* Description */}    
        <div className=" md:w-[7.1rem]"> {this.state.translatedMenuItems[5]}</div>
          {/* UploadedBy */}       
        <div className="w-[4.2rem]"></div>

      </div>
      { !fetchingDocumentsByContactId && documentsByContactId.length === 0 ?<NodataFoundPage />:documentsByContactId.map((item,index) =>  {
             
                    return (
                        <div>
                            <div className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                     
                             <div className=" flex  md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                <div className="flex max-sm:w-full items-center"> 

                                      <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-xs  font-poppins  font-medium cursor-pointer">
                                                
                                            <span>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</span>
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex md:w-[13.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-xs  font-poppins">
                                  {item.documentTitle}
                                  </div>
                              </div>

                              <div className=" flex  md:w-[20.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-xs  font-poppins">
                                <span>{elipsize(item.documentDescription || "", 15)}</span>
                                </div>
                            </div>
                            <div className=" flex  md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class="text-xs  font-poppins">
                 
                     <div className="font-normal text-xs  font-poppins">
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
                                <div className=" flex  ml-2 md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-xs  font-poppins text-center">
                                    <a href={`${base_url}/download/${item.documentTypeId}`}></a>

                                    </div>
                                </div>
                                <div className=" flex ml-2  md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    

                                    <div class=" text-xs  font-poppins text-center">
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
              return <div>{record.documentDescription}</div>;
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


