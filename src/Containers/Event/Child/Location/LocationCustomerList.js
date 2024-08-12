import React, {  useEffect,lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Input, Button, Space, } from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getDistributorsByUserId,
  setEditDistributor,
  handleUpdateDistributorModal,
  handleDistributorOrderModal,
  handleDistributorActivityTableModal,
  deleteDistributorData,
  handleBillingAddressModal
} from "../../../Main/Account/AccountAction";
import Highlighter from "react-highlight-words";
import { OnlyWrapCard } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
const AccountDetailsView = lazy(() => import("../../../Main/Account/AccountDetailsView"));

function LocationCustomerList(props) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getDistributorsByUserId(props.userId,page);
    setPage(page + 1);
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getDistributorsByUserId(props.currentUser?props.currentUser:props.userId,page,


      );
}

  const { handleUpdateDistributorModal, updateDistributorModal, addBillToAddress, handleBillingAddressModal } = props;

  const [currentDistributorId, setCurrentDistributorId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [show, setshow] = useState(false);

  function handleSetCurrentDistributorId(distributorId) {
    setCurrentDistributorId(distributorId);
  }
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
            // ref={node => {
            //   this.searchInput = node;
            // }}
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
  return (
    <>
      <OnlyWrapCard style={{ height: "80vh" }}>
      <InfiniteScroll
        dataLength={props.distributorsByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingDistributorsByUserId?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        style={{ scrollbarWidth:"thin"}}
        height={"75vh"}
      >
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
                  <div className=" flex  md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-xs  font-poppins">

                      Name

                    </div>


                    <div class=" text-[0.82rem]  font-poppins">
                      <AccountDetailsView
                        distributorId={item.distributorId}
                        name={item.name}
                      />
                    </div>

                  </div>
                  <div className=" flex  md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-xs  font-poppins">

                      Work

                    </div>


                    <div class=" text-[0.82rem]  font-poppins">
                      {item.dialCode} {item.phoneNo}
                    </div>

                  </div>
                  <div className=" flex  md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-xs  font-poppins">

                      Website

                    </div>


                    <div class=" text-[0.82rem]  font-poppins">
                      {item.url}
                    </div>

                  </div>

                  <div className=" flex  md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-xs  font-poppins">

                      Type

                    </div>


                    <div class=" text-[0.82rem]  font-poppins">
                      {item.clientName}
                    </div>

                  </div>
          
                  <div className=" flex  md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-xs  font-poppins">

                      Invoice Address

                    </div>


                    <div class=" text-[0.82rem]  font-poppins">
                      {/* {item.addresses[0].address1 || ""} ${item.addresses[0]
                        .address2 || ""} ${item.addresses[0].street || ""} ${item.addresses[0].city || ""}`; */}

                    </div>

                  </div>
                  <div className=" flex  md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-xs  font-poppins">

                      Pin Code

                    </div>


                    <div class=" text-[0.82rem]  font-poppins">
                      {/* {item.addresses[0].pinCode || ""} */}
                    </div>

                  </div>
                  <div className=" flex  md:w-42 max-sm:justify-between  max-sm:flex-row ">

                  <Button type="primary">
                     <span class="text-sm" >
                     <FormattedMessage
                        id="app.add"
                        defaultMessage="Add"
                      />
                     
                      
                      </span>
                        </Button>




</div>
                

                </div>




              </div>
            </>
          )
        })}
   </InfiniteScroll>
      </OnlyWrapCard>
      {/* <UpdateAccountModal
        distributorId={currentDistributorId}
        updateDistributorModal={updateDistributorModal}
        handleSetCurrentDistributorId={handleSetCurrentDistributorId}
        handleUpdateDistributorModal={handleUpdateDistributorModal}
      /> */}

      {/* <AddAccountActivityModal
        addDistributorActivityTableModal={
          props.addDistributorActivityTableModal
        }
        handleDistributorActivityTableModal={
          props.handleDistributorActivityTableModal
        }
        distributorId={currentDistributorId}
        handleSetCurrentDistributorId={handleSetCurrentDistributorId}
      /> */}
    </>
  )
}
const mapStateToProps = ({ distributor, auth }) => ({
  distributorsByUserId: distributor.distributorsByUserId,
  fetchingDistributorsByUserId: distributor.fetchingDistributorsByUserId,
  fetchingDistributorsByUserIdError:
    distributor.fetchingDistributorsByUserIdError,
  userId: auth.userDetails.userId,
  updateDistributorModal: distributor.updateDistributorModal,
  addDistributorOrderModal: distributor.addDistributorOrderModal,
  addDistributorActivityTableModal:
    distributor.addDistributorActivityTableModal,
  addBillToAddress: distributor.addBillToAddress
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateDistributorModal,
      getDistributorsByUserId,
      setEditDistributor,
      handleDistributorOrderModal,
      handleDistributorActivityTableModal,
      deleteDistributorData,
      handleBillingAddressModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationCustomerList);
