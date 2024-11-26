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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dayjs from "dayjs";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactPageIcon from '@mui/icons-material/ContactPage'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import EmptyPage from "../../../../../Main/EmptyPage";
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
         <div class="rounded m-1 p-1 w-[99%] h-[78vh] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%] font-poppins font-bold text-xs p-1 bg-transparent !text-lm items-end  sticky top-0 z-10">
          <div className="w-[11.9rem] text-[#00A2E8] truncate text-sm  max-md:w-[11.9rem]"> 
            <DateRangeIcon className='!text-icon  '  />
          {this.state.translatedMenuItems[0]} </div>
          {/* Date */}
        <div className=" w-[6.1rem] truncate max-md:w-[6.1rem]"> <LocationCityIcon className='!text-icon mr-1 '  /> 
         {this.state.translatedMenuItems[1]}      </div>
           {/* Name */}   
        <div className="w-[5.2rem] truncate max-md:w-[5.1rem]">
          < MergeTypeIcon className='!text-icon text-[#c42847] '  />
         {this.state.translatedMenuItems[2]}</div>
          {/* type */}          
        <div className=" w-[5.1rem] truncate max-md:w-[5.1rem]"> <ShowChartIcon className='!text-icon    text-[#776871]' />
           {this.state.translatedMenuItems[3]}</div>
          {/* Share */}      
        <div className=" w-[8.12rem] truncate max-md:w-[8.12rem]">     <DescriptionIcon className='!text-icon  '  /> 
        {this.state.translatedMenuItems[4]}</div>
          {/* Description */}    
        <div className="w-[7.1rem] truncate max-md:w-[7.1rem]"> <ContactPageIcon className='!text-icon text-[#ffb400]  '  /> 
         {this.state.translatedMenuItems[5]}</div>
          {/* UploadedBy */}       
        <div className="w-[4.2rem]"></div>

      </div>
      { !fetchingDocumentsByContactId && documentsByContactId.length === 0 ?<EmptyPage/>:documentsByContactId.map((item,index) =>  {
             
                    return (
                        <div>
                            <div className="flex rounded justify-between  bg-white mt-1  items-center py-ygap max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                     
                             <div className=" flex  md:w-[13rem] border-l-2 border-green-500 bg-[#eef2f9] h-8 max-sm:flex-row w-full max-sm:justify-between  ">
                                <div className="flex max-sm:w-full items-center"> 

                                      <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-xs  font-poppins ml-gap font-medium cursor-pointer">
                                                
                                            <span>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</span>
     
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">
                                <div className=" flex  w-[12.3rem] items-center justify-start  ml-gap bg-[#eef2f9] h-8  md:w-[11.3rem]  max-sm:flex-row  max-sm:justify-between">
                                
                                  <div class="text-xs ml-gap font-poppins">
                                  {item.documentTitle}
                                  </div>
                              </div>

                              <div className=" flex  md:w-[11.3rem] items-center justify-start  ml-gap bg-[#eef2f9] h-8  max-sm:flex-row w-[20.3] max-sm:justify-between">
                                
                                <div class="text-xs ml-gap font-poppins">
                                <span>{elipsize(item.documentDescription || "", 15)}</span>
                                </div>
                            </div>
                            <div className=" flex  md:w-[13.2rem] items-center justify-start  ml-gap bg-[#eef2f9] h-8 max-sm:flex-row w-[4.2rem] max-sm:justify-between ">
                                   
                                   <div class="text-xs  font-poppins">
                 
                     <div className="font-normal text-xs ml-gap font-poppins">
                       <span>{item.uploadedBy}</span>
                     </div>
                 
                                   </div>
                               </div>
                              </div>
                              <div className=" flex items-center justify-center w-[8rem] ml-gap bg-[#eef2f9] h-8  " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                   
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
                                <div className=" flex  ml-2 md:w-[2rem] max-sm:flex-row w-[2rem] max-sm:justify-between ">
                          
                                    <div class=" text-xs  font-poppins text-center">
                                    <a href={`${base_url}/download/${item.documentTypeId}`}></a>

                                    </div>
                                </div>
                                <div className=" flex ml-2 items-center justify-center  ml-gap bg-[#eef2f9] h-8 md:w-[2rem] max-sm:flex-row w-[2rem] max-sm:justify-between ">
                                    

                                    <div class=" text-xs  font-poppins text-center">
                                    <StyledPopconfirm
                                      title="Do you want to delete?"
                                        onConfirm={() => deleteDocument(item.documentId)}
                                             >
                                      <DeleteOutlineIcon type="delete" class="cursor-pointer !text-icon bg-red-600" />
                                        </StyledPopconfirm>

                                    </div>
                                </div>

                              
                             
                            </div>
                        </div>


                    )
                })}
                    
      </div>
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


