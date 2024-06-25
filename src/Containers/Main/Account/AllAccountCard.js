import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { getAllDistributorsList } from "./AccountAction";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { CurrencySymbol } from "../../../Components/Common";
import moment from "moment";
import AccountDetailsView from "./AccountDetailsView";
import { OnlyWrapCard } from "../../../Components/UI/Layout";

function AllAccountList(props) {
  useEffect(() => {
    props.getAllDistributorsList();
   // props.getAllSalesUser();
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRow, setselectedRow] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setselectedRow(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
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
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
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
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
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

  const salesOption = useMemo(() => {
    if (!props.allSalesUsers) return [];
    return (
      props.allSalesUsers.length &&
      props.allSalesUsers
        .sort(function (a, b) {
          var nameA = a.salesExecutive.toUpperCase(); // ignore upper and lowercase
          var nameB = b.salesExecutive.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        })
        .map((allSalesUsers) => {
          return {
            text: allSalesUsers.salesExecutive || "",
            value: allSalesUsers.salesExecutive,
          };
        })
    );
  }, [props.allSalesUsers]);

  function handleDistributorCheck() {
    setselectedRow([]);
  }

  const result = selectedRow.reduce((acc, item) => {
    acc = acc + item.totalPayableAmount;
    return acc;
  }, 0);
  return(
    <>
    <OnlyWrapCard style={{height:"80vh"}}>
    {props.distributorsByUserId.map((item) => {
      return (
        <>
         <div className="flex justify-between mt-2 "
                      // style={hrStyle}
                      style={{
                        borderBottom: "3px dotted #515050"
                      }}
                    >
     <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
     <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm  font-medium font-poppins">
    
    Name
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem]  font-poppins">
    <AccountDetailsView
              distributorId={item.distributorId}
              name={item.name}
            />
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm  font-medium font-poppins">
    
    Mobile
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem]  font-poppins">
    {item.dialCode} {item.phoneNo}
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm  font-medium font-poppins">
    
    Website
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem]  font-poppins">
    {item.url} 
    </div>
    
    </div>
    
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm  font-medium font-poppins">
    
    Address
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem]  font-poppins">
    {item.addresses[0].address1 || ""} ${item.addresses[0]
          .address2 || ""} ${item.addresses[0].street || ""} ${item.addresses[0].city || ""}`;
      
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm  font-medium font-poppins">
    
    City
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem]  font-poppins">
    <span>
              {item.addresses[0].city || ""}
            </span>
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm  font-medium font-poppins">
    
    Pin Code
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem]  font-poppins">
    {item.addresses[0].pinCode || ""}
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm  font-medium font-poppins">
    
    Balance
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem]  font-poppins">
    <span>
            <CurrencySymbol currencyType={"INR"} />
            {item.totalPayableAmount.toFixed(2)}
          </span>
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm  font-medium font-poppins">
    
    Previous
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem]  font-poppins">
    <span>
            <CurrencySymbol currencyType={"INR"} />
            {item.totalPayablePrev.toFixed(2)}
          </span>
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm  font-medium font-poppins">
    
    Owner
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem]  font-poppins">
    <span>{item.salesExecutive}</span>
    </div>
    
    </div>
    <div class="flex"> 
    <Tooltip title={item.salesExecutiveMobileNo}>
              <span>
                <i class="fas fa-phone"></i>
              </span>
            </Tooltip>
            <Tooltip title={item.salesExecutiveEmail}>
              <span>
                <i class="far fa-envelope"></i>
              </span>
            </Tooltip>


    </div>
     </div>
    
    
    
    
                    </div>
        </>
      )
    })}
    
      </OnlyWrapCard>
     
    </>
    )
  }

  const mapStateToProps = ({ distributor, auth, leads }) => ({
    allDistributors: distributor.allDistributors,
    fetchingAllDistributors: distributor.fetchingAllDistributors,
    fetchingAllDistributorsError: distributor.fetchingAllDistributorsError,
    userId: auth.userDetails.userId,
    allSalesUsers: leads.allSalesUsers,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getAllDistributorsList,
        //getAllSalesUser,
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(AllAccountList);
  