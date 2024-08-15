


import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';
import Highlighter from "react-highlight-words";
import { base_url } from "../../../../../../Config/Auth";
import { getDocuments } from "../../../../../Settings/Documents/DocumentsAction";
import {
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  Tooltip,
  Button,
  Input
} from "antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import {getInvestorDocument} from "../../../../InvestorAction"
import { DeleteOutlined } from "@ant-design/icons";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";

class InvestorLinkedDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      translatedMenuItems: [],
      loading: true
    };
  }
  componentDidMount() {
    const {
      getInvestorDocument,
    } = this.props;
    getInvestorDocument(this.props.investorDetails.investorId);
    this.props.getDocuments();
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
' Name', // 1
'Type', // 2
'Description', // 3
'Uploaded By', // 4
      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
  }


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
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
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
    if (this.props.fetchingDocumentsByInvestorId) return <BundleLoader/>;
    const {loading,translatedMenuItems } = this.state;
    if (loading) {
      return <div><BundleLoader/></div>;
    } 

    return (
      <>
          <div className=' flex  sticky  z-auto'>          
<div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                  <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                  
                  <div className="md:w-[9.7rem]">
                  {translatedMenuItems[0]}   
                    {/* Date */}
                  </div>
                      <div className=" md:w-[11.12rem]">
                      {translatedMenuItems[1]}   
                        {/* Name */}
                        </div>
                      <div className=" md:w-[12.122rem]">
                      {translatedMenuItems[2]}   
                        {/* Type */}
                        </div>
                      <div className=" md:w-[9.5rem]">
                      {translatedMenuItems[3]}   
                        {/* Description */}
                        </div>
                      <div className=" md:w-[9.81rem] ">
                      {translatedMenuItems[4]}   
                        {/* Uploaded By */}
                        </div>
                     
                  </div>
                  <div class="overflow-y-auto h-[69vh]">
                  { !this.props.fetchingDocumentsByInvestorId && this.props.documentsByInvestorId.length === 0 ?<NodataFoundPage />:this.props.documentsByInvestorId.map((item,index) =>  {
                      
                      return (
                          <div >
                                <div
              className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-colscale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
            >
                                  <div class="flex">
                                      <div className=" flex  md:w-[9.8rem] max-sm:w-full  ">
                                      <div>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</div>
                                      </div>

                                      <div className=" flex  md:w-[11.21rem] max-sm:flex-row w-full max-sm:justify-between items-center  ">
                                          <div class=" text-xs  font-poppins">
                                             {item.documentTitle}
                                          </div>

                                      </div>
                                      <div className=" flex  md:w-[12.2rem] max-sm:flex-row w-full max-sm:justify-between items-center ">
                                          <div class=" text-xs  font-poppins">
                                              {item.documentDescription}
                                          </div>
                                      </div>
                                  </div>
                                  <div className=" flex  md:w-[10.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                      <Tooltip title={item.uploadedBy}>
              <SubTitle>
                <MultiAvatar
                  primaryTitle={item.uploadedBy}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </SubTitle>
            </Tooltip>

                                      </div>
                                  </div>
                                  <div className=" flex  md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                      <a
              href={`${base_url}/document/${item.documentId}`}
            // target="_blank"
            >
              <DownloadIcon
                type="download"
               class=" cursor-pointer !text-icon bg-green-600"
              />
            </a>

                                      </div>
                                  </div>
                                 
                                  <div className=" flex   md:w-[5.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs  font-poppins text-center">
                                      <StyledPopconfirm
              title="Do you want to delete?"
            //   onConfirm={() => deleteDocument(item.documentId)}
           >
              <DeleteOutlined type="delete"
              class=" cursor-pointer !text-icon  bg-red-600 " />
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
const mapStateToProps = ({ customer,investor, document }) => ({
  customer: customer.customer,
  documents: document.documents,
  fetchingDocumentsByInvestorId: customer.fetchingDocumentsByInvestorId,
  fetchingDocumentsByInvestorIdError:
  customer.fetchingDocumentsByInvestorIdError,
  documentsByInvestorId: customer.documentsByInvestorId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorDocument,
      // deleteDocument,
      getDocuments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorLinkedDocuments);


