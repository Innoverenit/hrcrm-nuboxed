// import React, { Component } from 'react'

// export class ProspectQuotationSectorListData extends Component {
//   render() {
//     return (
//       <div>ProspectQuotationSectorListData</div>
//     )
//   }
// }

// export default ProspectQuotationSectorListData




import React, { useEffect,useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Highlighter from "react-highlight-words";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import InfoIcon from '@mui/icons-material/Info';
import {
  MultiAvatar,
} from "../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  SearchOutlined,
} from "@ant-design/icons";
import {getProspectSectorOpenData} from "./DataRoomAction"
import { CurrencySymbol } from "../../Components/Common";

import { Tooltip,Button,Input,Progress } from "antd";
import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../Components/Placeholder";
//const AddCustomerUpdateOpportunityModal =lazy(()=>import("../Customer/Child/CustomerDetail/CustomerTab/OpportunityTab/AddCustomerUpdateOpportunityModal")); 
function ProspectQuotationSectorListData(props) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  console.log(props.selectedPersonData)
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
              "213",  //  "Quotation",//0
              "176", //   "Start Date",//1
              "126",   //   "End Date",//2      
              "218", //   "Value",//3
              "142",//   "Status",//4
              "216",  //   "Sponsor",//5
                  "1305",    // Search
                  "1307",  // Reset
                  "1306",      // Filter
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  useEffect(() => {
    if(props.selectedPropsectSector){
        setPage(page + 1);
    props.getProspectSectorOpenData(
        // props.customer.customerId
    props.selectedPropsectSector.sectorId,page
    );
}
  }, [props.selectedPropsectSector]);
  const handleLoadMore = () => {
    const callPageMapd = props.prospectSectorOpen && props.prospectSectorOpen.length &&props.prospectSectorOpen[0].pageCount
    setTimeout(() => {  
      if  (props.prospectSectorOpen)
      {
        if (page < callPageMapd) {    
    setPage(page + 1);
    props.getProspectSectorOpenData( props.selectedPropsectSector.sectorId,page);
            }
              if (page === callPageMapd){
                setHasMore(false)
              }
            }
            }, 100);
  }
//   console.log(props.selectedPersonData.name);
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="p-8">
          <Input 
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />

          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            // icon="search"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
          {translatedMenuItems[6]}  {/* Search */}
          </Button>
          <Button className="w-[90%]"
            onClick={() => handleReset(clearFilters)}
            size="small"
            
          >
          {translatedMenuItems[7]}  {/* Reset */}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            {translatedMenuItems[8]}{/* Filter */}
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          type="search"
          style={{ color: filtered ? "#1890ff" : undefined }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
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
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
  
  function handleSetCurrentOpportunityId(opportunityId) {
    setCurrentOpportunityId(opportunityId);
    console.log(opportunityId);
  }
  const {
    // customer: { customerId, name },
    user,
    handleUpdateCustomerOpportunityModal,
    fetchingCustomerOpportunity,
    opportunityByCustomerId,
    fetchingCustomerOpportunityError,
    addUpdateCustomerOpportunityModal,
    setEditCustomerOpportunity,
  } = props;

if (props.fetchingProspectSectorOpen) return <BundleLoader/>;
  const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
   {/* <div className=' flex rounded w-[15%] h-[85vh] flex-col border border-[#0000001f] items-center justify-center  '> */}
     
   <div className="flex flex-wrap"> {/* Parent container with flex layout */}
  {props.prospectSectorOpen.length===0?<NodataFoundPage/>:props.prospectSectorOpen.map((item) => {
    return (
      <div className="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
                      text-[#444444] m-1 w-[11.5vw] max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100 
                      border-solid p-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]" 
           style={{ display: "flex" }}>
        <div className="flex items-center h-16">
          <div className="flex basis-[15%] mr-[0.2rem] h-15">
            <MultiAvatar
              primaryTitle={item.opportunityName}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
          </div>
          <div className="flex basis-[100%] overflow-hidden">
            <div className="font-semibold text-[#337df4] cursor-pointer text-xs">
              {item.opportunityName}
            </div>
          </div>
        </div>
        <div className="flex flex-col max-sm:justify-between">
          <div className="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center">
            {item.customer}
          </div>
          <div className="font-medium text-xs">
            <div className="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center"></div>
          </div>
        </div>
      </div>
    );
  })}
</div>

      
        {/* </div> */}
    </>
  );
}
// }
const mapStateToProps = ({ customer,auth,datRoom }) => ({
  user: auth.userDetails,
  prospectSectorOpen:datRoom.prospectSectorOpen,
  fetchingProspectSectorOpen:datRoom.fetchingProspectSectorOpen,
  fetchingCustomerOpportunity: customer.fetchingCustomerOpportunity,
  fetchingCustomerOpportunityError: customer.fetchingCustomerOpportunityError,
  //customerId: customer.customer.customerId,
  opportunityByCustomerId: customer.opportunityByCustomerId,
  addUpdateCustomerOpportunityModal:customer.addUpdateCustomerOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
  
        getProspectSectorOpenData,
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProspectQuotationSectorListData);
