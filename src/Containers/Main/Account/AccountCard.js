import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getDistributorsByUserId,
  setEditDistributor,
  handleUpdateDistributorModal,
  handleDistributorOrderModal,
  handleDistributorActivityTableModal,
  deleteDistributorData,
  handleBillingAddressModal
} from "./AccountAction";
import AccountDetailsView from "./AccountDetailsView";
import UpdateAccountModal from "./UpdateAccountModal";
import AddAccountActivityModal from "./AddAccountActivityModal";
import { OnlyWrapCard } from "../../../Components/UI/Layout";


function AccountTable(props) {
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


  return (
    <>
      <OnlyWrapCard style={{ height: "80vh" }}>
      <InfiniteScroll
        dataLength={props.distributorsByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingDistributorsByUserId?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"80vh"}
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
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                      Name

                    </div>


                    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      <AccountDetailsView
                        distributorId={item.distributorId}
                        name={item.name}
                      />
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                      Work

                    </div>


                    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      {item.dialCode} {item.phoneNo}
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                      Website

                    </div>


                    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      {item.url}
                    </div>

                  </div>

                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                      Type

                    </div>


                    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      {item.clientName}
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                      Payment

                    </div>


                    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      {item.payment}
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                      VAT

                    </div>


                    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      {item.countryName}
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                      Invoice Address

                    </div>


                    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      {/* {item.addresses[0].address1 || ""} ${item.addresses[0]
                        .address2 || ""} ${item.addresses[0].street || ""} ${item.addresses[0].city || ""}`; */}

                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                      Pin Code

                    </div>


                    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      {/* {item.addresses[0].pinCode || ""} */}
                    </div>

                  </div>
                  {/* <div class="flex flex-col">
                    <Tooltip title="Contacts">
                      <div
                        onClick={() => {
                          handleBillingAddressModal(true)
                          handleSetCurrentDistributorId(item.distributorId);
                        }}>
                      </div>
                    </Tooltip>
                    <Tooltip title="Order">

                      <div
                        onClick={() => {
                          props.handleDistributorOrderModal(true);
                          handleSetCurrentDistributorId(item.distributorId);
                        }}
                      />
                    </Tooltip>

                  </div>
                  <div class="flex flex-col">
                    <Tooltip title="Activity">
                      <span>
                        <i
                          class="fab fa-connectdevelop"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            props.handleDistributorActivityTableModal(true);
                            handleSetCurrentDistributorId(item.distributorId);
                          }}
                        ></i>
                      </span>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          props.setEditDistributor(item);
                          handleUpdateDistributorModal(true);
                          handleSetCurrentDistributorId(item.distributorId);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete Client">
                      <Popconfirm
                        title="Do you want to delete?"
                        onConfirm={() => props.deleteDistributorData(item.distributorId)}
                      >
                        <DeleteOutlined

                          style={{ cursor: "pointer", color: "red" }}
                        />
                      </Popconfirm>
                    </Tooltip>
                  </div> */}

                </div>




              </div>
            </>
          )
        })}
   </InfiniteScroll>
      </OnlyWrapCard>
      <UpdateAccountModal
        distributorId={currentDistributorId}
        updateDistributorModal={updateDistributorModal}
        handleSetCurrentDistributorId={handleSetCurrentDistributorId}
        handleUpdateDistributorModal={handleUpdateDistributorModal}
      />

      <AddAccountActivityModal
        addDistributorActivityTableModal={
          props.addDistributorActivityTableModal
        }
        handleDistributorActivityTableModal={
          props.handleDistributorActivityTableModal
        }
        distributorId={currentDistributorId}
        handleSetCurrentDistributorId={handleSetCurrentDistributorId}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);
