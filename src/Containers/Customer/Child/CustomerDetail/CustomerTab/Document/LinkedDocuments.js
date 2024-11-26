import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Highlighter from "react-highlight-words";
import { base_url } from "../../../../../../Config/Auth";
import SearchIcon from '@mui/icons-material/Search';
import {
  Tooltip,
  Button,
  Input,
  Popconfirm
} from "antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import {
  getCustomerDocument,
  deleteDocument,
} from "../../../../CustomerAction";
import { elipsize } from "../../../../../../Helpers/Function/Functions";
import dayjs from "dayjs";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { BundleLoader } from "../../../../../../Components/Placeholder";
import FileOpenIcon from '@mui/icons-material/FileOpen';
const ContractToggle =lazy(()=>import("./ContractToggle")); 
const EmptyPage = lazy(() => import("../../../../../Main/EmptyPage"));
class LinkedDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
       translatedMenuItems: [],
    };
  }
  componentDidMount() {
    const {
      customer: { customerId },
      getCustomerDocument,
    } = this.props;
    this.fetchMenuTranslations();
    getCustomerDocument(customerId);
    // this.props.getDocuments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        
           "74" ,  // "Date",//0
           "110" , // "Name",//1
           "147" ,   // "Description",//2
           "1207" ,   // "Uploaded By",//3
          "1208" , // "File Name",//4
          "1205" , // "Contract",//5
          "1305" ,  // Search  6
           "1307" ,   // Reset 7   
          "100" ,  // New8
           "1351" , // "Download"9
           "1259" ,  // Do you want to delete?10
            "84" , // "Delete"11
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button className="w-[90%] mr-8"
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchIcon />}
          size="small"
        
        >
          {this.state.translatedMenuItems[6]} {/* Search */}
        </Button>
        <Button className="w-[90%]"
          onClick={() => this.handleReset(clearFilters)}
          size="small"
     
        >
         {this.state.translatedMenuItems[7]}  {/* Reset */}
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchIcon style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const {
      documentsByCustomerId,
      fetchingDocumentsByCustomerId,
      fetchingDocumentsByCustomerIdError,
      deleteDocument,
    } = this.props;
    console.log(documentsByCustomerId)

    const documentTypeOption = this.props.documents.map((item) => {
      return {
        text: item.documentTypeName,
        value: item.documentTypeName,
      };
    });

    if (fetchingDocumentsByCustomerId) return <BundleLoader/>;
    // if (fetchingDocumentsByCustomerIdError) {
    //   return <APIFailed />;
    // }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
    return (
      <>
        <div class="rounded m-1 p-1 w-[100%]  ">
          <div className=" flex justify-between w-[100%]  p-1 sticky font-bold font-poppins !text-lm items-end z-10">
          
        <div className=" text-[#00A2E8] truncate w-[10.8rem] text-sm max-md:w-[16.1rem]">
        <DateRangeIcon className='!text-icon  '  />  {this.state.translatedMenuItems[0]}</div>
        {/* Date */}
                <div className=" w-[15.2rem] truncate max-md:w-[16.2rem]">
                <ArticleIcon className='!text-icon text-[#a379c9] '  />{this.state.translatedMenuItems[1]}</div>
                {/* Name */}
        <div className=" w-[15.4rem] truncate max-md:w-[13.13rem]">
        <DescriptionIcon className='!text-icon text-[#9ad5ca] '  /> {this.state.translatedMenuItems[2]}</div>
       
        <div className=" w-[10.7rem] truncate max-md:w-[15.1rem]">
        <AccountCircleIcon className="!text-icon  text-[#f28482]"/> {this.state.translatedMenuItems[3]}</div>
     
        <div className=" w-[14.2rem] truncate max-md:w-[12.2rem]">
        <  FileOpenIcon className='!text-icon text-[#7fb800] '  />  {this.state.translatedMenuItems[4]}</div>
          {/* fileName */}
        
                     <div className=" w-[9.5rem] truncate ">
                      {this.state.translatedMenuItems[5]}</div>
                     {/* Contract */}
        
        
      </div>
   
        
      { !fetchingDocumentsByCustomerId && documentsByCustomerId.length === 0 ?<EmptyPage className=" overflow-hidden"/>: documentsByCustomerId.map((item,index) =>  {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        
                    return (
                      <div>
                       <div
                className="flex rounded justify-between  bg-white mt-1  items-center  max-sm:h-[9.1rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                               
                          <div className=" flex w-[9rem] maax-md:w-[9rem] h-8 border-l-2 border-green-500 bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
<div className="flex  items-center"> 

    <div class="">
    <Tooltip>
                                          <div class=" flex  justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="flex text-xs ml-gap items-center   font-poppins   cursor-pointer">
                                                
                                            <span>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</span>
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                  </div>
                                  </div>
                          </div>
                          <div class="flex">

                       
                          <div className=" flex w-[12.3rem] max-md:w-[12.3rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                             
                              <div class="flex text-xs ml-gap items-center  font-poppins">
                                   {item.documentTitle}
                                   &nbsp;&nbsp;
        {date === currentdate ? (
    <span class="text-xs text-[tomato] font-bold"
    >
             {this.state.translatedMenuItems[8]}{/* New */}
          </span>
        ) : null} 
                              </div>
                          </div>
                          <div className=" flex w-[12.4rem]  max-md:w-[12.4rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row  max-sm:justify-between">
                          
                            <div class="text-xs  font-poppins">
                            {elipsize(item.documentDescription || "", 15)}
                            </div>
                        </div>
                        </div>
                        <div className="flex  w-[9.1rem] max-md:w-[9.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">

<div className="text-xs  font-poppins text-center">
<div className="font-normal text-xs font-poppins">
                     <Tooltip title={item.uploadedBy}>
            <SubTitle>
              <MultiAvatar
                primaryTitle={item.uploadedBy}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </SubTitle>
          </Tooltip>
                     </div>
</div>
</div>
<div className=" flex w-[12.1rem]  max-md:w-[12.1rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                              <div class="flex text-xs truncate ml-gap items-center font-poppins text-center">
                              {item.fileName}

                              </div>
                          </div>
                          <div className=" flex w-[5.22rem]  max-md:w-[5.22rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                              <div class=" text-xs  font-poppins text-center">
                              <ContractToggle
          contractInd={item.contractInd}
          documentId={item.documentId}
        />

                              </div>
                          </div>
                       
                              

                              <div class="flex items-center justify-center h-8 bg-[#eef2f9]">
                              <a
            href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
          > <Tooltip title= {this.state.translatedMenuItems[9]}>
            <DownloadIcon
            className="cursor-pointer !text-icon"
            /></Tooltip>
          </a>  
                 </div>
                 <div class="flex items-center justify-center h-8 bg-[#eef2f9]">
            
          <Popconfirm
                        title= {this.state.translatedMenuItems[10]}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteDocument(item.documentId)}
                      >
                         <Tooltip title= {this.state.translatedMenuItems[11]}>
      
                         <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
            </Tooltip>
          </Popconfirm>
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

const mapStateToProps = ({ customer, document }) => ({
  customer: customer.customer,
  documents: document.documents,
  fetchingDocumentsByCustomerId: customer.fetchingDocumentsByCustomerId,
  fetchingDocumentsByCustomerIdError:
    customer.fetchingDocumentsByCustomerIdError,
    documentsByCustomerId: customer.documentsByCustomerId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerDocument,
      deleteDocument,
      // getDocuments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDocuments);



