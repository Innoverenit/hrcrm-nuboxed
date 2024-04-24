import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import NodataFoundPage from "../../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { getSupplierContactList, handleUpdateSupplierContactModal, setEditSupplierContact } from "../../../../SuppliersAction";
import { EditOutlined } from "@ant-design/icons";
// import UpdateSupplierContactModal from "./UpdateSupplierContactModal";

function SupplierContactTable(props) {

  useEffect(() => {
    props.getSupplierContactList(props.supplier.supplierId);
  }, []);

  const [currentSupplierId, setCurrentSupplierId] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  function handleSetCurrentSupplierId(supplierId) {
    setCurrentSupplierId(supplierId);
  }
  const { } = props;
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
    <div className=' flex justify-end sticky  z-auto'>
        <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[8.1rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="Name"
            /></div>
            <div className=" md:w-[5.1rem]">
              <FormattedMessage id="app.email" defaultMessage="Email" />
            </div>
            <div className=" md:w-[6.8rem] ">  <FormattedMessage id="app.mobile" defaultMessage="Mobile No" /></div>
            <div className="md:w-[7.8rem]">
              <FormattedMessage id="app.designation" defaultMessage="Designation" />

            </div>
            <div className="md:w-[7.9rem]">
              <FormattedMessage id="app.department" defaultMessage="Department" />

            </div>
            <div className="w-[3.8rem]">
            </div>
          </div>
          <div class="overflow-x-auto h-[64vh]">
            <InfiniteScroll
              dataLength={props.contactSupplier.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingSupplierContactListById ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
              height={"75vh"}
            >
              {props.contactSupplier.length ?
                <>
                  {props.contactSupplier.map((item) => {
                    return (
                      <>
                        <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3"

                        >
                          <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                               {` ${item.firstName || ""} ${item.middleName || ""} ${item.lastName || ""}`}

                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                {item.emailId}
                              </div>

                            </div>

                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                {item.dialCode1} {item.mobileNo}
                              </div>

                            </div>
                            


                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                {item.designationName}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                              {item.departmentName}
                              </div>

                            </div>
                       
                            <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                            {/* <Tooltip title="Edit">
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.setEditSupplierContact(item);
                props.handleUpdateSupplierContactModal(true);
              }}
            />
          </Tooltip> */}
</div>


                          </div>
                        </div>
                      </>
                    )
                  })}
                </> :
                !props.contactSupplier.length &&
                  !props.fetchingSupplierContactListById ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      
     
    </>
  );
}
// }

const mapStateToProps = ({ suppliers }) => ({
  contactSupplier: suppliers.contactSupplier,
  fetchingSupplierContactListById: suppliers.fetchingSupplierContactListById,
  updateSupplierContactModal: suppliers.updateSupplierContactModal,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSupplierContactList,
      handleUpdateSupplierContactModal,
      setEditSupplierContact,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierContactTable);
