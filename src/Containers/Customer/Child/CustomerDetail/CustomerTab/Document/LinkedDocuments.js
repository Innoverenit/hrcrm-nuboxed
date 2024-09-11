import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import { DeleteOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { base_url } from "../../../../../../Config/Auth";
import { SearchOutlined } from "@ant-design/icons";
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
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";
const ContractToggle =lazy(()=>import("./ContractToggle")); 

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
          icon={<SearchOutlined />}
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
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
        <div class="rounded m-1 p-1 w-[100%]    shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
          
        <div className="font-bold font-poppins text-xs md:w-[6rem]">
        {this.state.translatedMenuItems[0]}</div>
        {/* Date */}
                <div className="font-bold font-poppins text-xs  md:w-[8.1rem]">{this.state.translatedMenuItems[1]}</div>
                {/* Name */}
        <div className="font-bold font-poppins text-xs  md:w-[9.13rem]">{this.state.translatedMenuItems[2]}</div>
        {/* Description */}
        <div className="font-bold font-poppins text-xs  md:w-[5.1rem]">{this.state.translatedMenuItems[3]}</div>
        {/* uploadedBy */}
        <div className="font-bold font-poppins text-xs  md:w-[10.2rem]">{this.state.translatedMenuItems[4]}</div>
        {/* fileName */}
                     <div className="font-bold font-poppins text-xs  md:w-[8.2rem]">{this.state.translatedMenuItems[5]}</div>
                     {/* Contract */}
        
        
      </div>
   
        
      { !fetchingDocumentsByCustomerId && documentsByCustomerId.length === 0 ?<NodataFoundPage />:documentsByCustomerId.map((item,index) =>  {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
        
                    return (
                      <div>
                       <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                               
                          <div className=" flex  md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

    <div class="max-sm:w-full">
    <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-xs   font-poppins   cursor-pointer">
                                                
                                            <span>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</span>
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                  </div>
                                  </div>
                          </div>
                          <div class="flex">

                       
                          <div className=" flex  md:w-[10.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                             
                              <div class="text-xs  font-poppins">
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
                          <div className=" flex   md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                          
                            <div class="text-xs  font-poppins">
                            {elipsize(item.documentDescription || "", 15)}
                            </div>
                        </div>
                        </div>
                        <div className="flex   md:w-[3rem] max-sm:flex-row w-full max-sm:justify-between ">

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
<div className=" flex   md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                              <div class=" text-xs  font-poppins text-center">
                              {item.fileName}

                              </div>
                          </div>
                          <div className=" flex   md:w-[4.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                              <div class=" text-xs  font-poppins text-center">
                              <ContractToggle
          contractInd={item.contractInd}
          documentId={item.documentId}
        />

                              </div>
                          </div>
                       
                              

                              <div>
                              <a
            href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
          > <Tooltip title= {this.state.translatedMenuItems[9]}>
            <DownloadIcon
            className="cursor-pointer !text-icon"
            /></Tooltip>
          </a>  
                 </div>
          <div>
            
          <Popconfirm
                        title= {this.state.translatedMenuItems[10]}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteDocument(item.documentId)}
                      >
                         <Tooltip title= {this.state.translatedMenuItems[11]}>
      
            <DeleteOutlined
className="cursor-pointer !text-icon text-[red]"
            />
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



