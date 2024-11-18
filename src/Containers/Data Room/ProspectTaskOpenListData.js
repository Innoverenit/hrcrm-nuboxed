import React, { useEffect,useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Highlighter from "react-highlight-words";
import {getProspectOpenTask} from "../Data Room/DataRoomAction"
import SearchIcon from '@mui/icons-material/Search';
import { getOpportunityListByCustomerId,handleUpdateCustomerOpportunityModal,
  setEditCustomerOpportunity} from "../Customer/CustomerAction";
import { Button,Input} from "antd";
const AddCustomerUpdateOpportunityModal =lazy(()=>import("../Customer/Child/CustomerDetail/CustomerTab/OpportunityTab/AddCustomerUpdateOpportunityModal")); 
function ProspectTaskOpenListData(props) {
  const [loading, setLoading] = useState(true);
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
    if(props.selectedPersonData){
    props.getProspectOpenTask(
        // props.customer.customerId
        props.selectedPersonData.customerId
    );
}
  }, [props.selectedPersonData]);
  console.log(props.selectedPersonData.name);
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
            icon={<SearchIcon />}
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
        <SearchIcon
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
 
  }

// if (fetchingCustomerOpportunity) return <BundleLoader/>;

  return (
    <>
   {/* <div className=' flex rounded w-[15%] h-[85vh] flex-col border border-[#0000001f] items-center justify-center  '> */}
     
   <div className="flex flex-wrap"> {/* Parent container with flex layout */}
  Hello World
</div>

      
        {/* </div> */}
    </>
  );
}
// }
const mapStateToProps = ({ customer,auth ,datRoom}) => ({
  user: auth.userDetails,
  prospectOpenTask:datRoom.prospectOpenTask,
  fetchingCustomerOpportunity: customer.fetchingCustomerOpportunity,
  fetchingCustomerOpportunityError: customer.fetchingCustomerOpportunityError,
  //customerId: customer.customer.customerId,
  opportunityByCustomerId: customer.opportunityByCustomerId,
  addUpdateCustomerOpportunityModal:customer.addUpdateCustomerOpportunityModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByCustomerId,
      handleUpdateCustomerOpportunityModal,
      setEditCustomerOpportunity,
      getProspectOpenTask
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProspectTaskOpenListData);
