import React, { useState, useEffect, useRef } from "react";
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
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Tooltip,
  Button,
  Input
} from "antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import { getInvestorDocument } from "../../../../InvestorAction";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";

const InvestorLinkedDocuments = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInput = useRef(null);

  useEffect(() => {
    props.getInvestorDocument(props.investorDetails.investorId);
    props.getDocuments();
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "74",  // 'Date'
          "110", // 'Name'
          "71",  // 'Type'
          "147", // 'Description'
          "1207", // 'Uploaded By'
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
 

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
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
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  if (loading || props.fetchingDocumentsByInvestorId) {
    return <BundleLoader />;
  }

  return (
    <>
        <div className=' flex  sticky  z-auto'>          
<div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
                
                <div className="md:w-[15.7rem]">
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
                { !props.fetchingDocumentsByInvestorId && props.documentsByInvestorId.length === 0 ?<NodataFoundPage />:props.documentsByInvestorId.map((item,index) =>  {
                    
                    return (
                        <div >
                              <div
            className="flex rounded justify-between  bg-white mt-1 h-[2.15rem] items-center max-sm:h-[9rem] max-sm:flex-colscale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
          >
                                <div class="flex">
                                    <div className=" flex  md:w-[10.8rem] items-center h-8 border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                                    <div>{` ${dayjs(item.creationDate).format("DD/MM/YYYY")}`}</div>
                                    </div>

                                    <div className=" flex ml-gap bg-[#eef2f9]  md:w-[12.21rem] max-sm:flex-row w-full max-sm:justify-between items-center  ">
                                        <div class=" text-xs h-8 items-center font-poppins">
                                           {item.documentTitle}
                                        </div>

                                    </div>
                                    <div className=" flex h-8 ml-gap bg-[#eef2f9]  md:w-[12.22rem] max-sm:flex-row w-full max-sm:justify-between items-center  ">
                                        <div class=" text-xs  font-poppins">
                                           {item.userType}
                                        </div>

                                    </div>
                                    <div className=" flex h-8 ml-gap bg-[#eef2f9]  md:w-[12.2rem] max-sm:flex-row w-full max-sm:justify-between items-center ">
                                        <div class=" text-xs  font-poppins">
                                            {item.documentDescription}
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex h-8 ml-gap bg-[#eef2f9] justify-center items-center enter md:w-[10.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    <div class=" text-xs  font-poppins text-center">
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
                                <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    <div class=" text-xs  font-poppins text-center">
                                    <a
            href={`${base_url}/document/${item.documentId}`}
          // target="_blank"
          >
            <DownloadIcon  className=" cursor-pointer !text-icon "
              type="download"
            
            />
          </a>

                                    </div>
                                </div>
                               
                                <div className=" flex h-8 ml-gap bg-[#eef2f9] items-center justify-center  md:w-[5.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    <div class=" text-xs  font-poppins text-center">
                                    <StyledPopconfirm
            title="Do you want to delete?"
          //   onConfirm={() => deleteDocument(item.documentId)}
         >
            <DeleteOutlined className="!text-icon text-[red] cursor-pointer"
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
            </div>                          
        </div>
    </>
) 
};

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

