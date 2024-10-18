import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import NodataFoundPage from "../../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { getSupplierContactList, handleUpdateSupplierContactModal, setEditSupplierContact,applyForLoginInContact } from "../../../../SuppliersAction";
import { Button } from "antd";

function SupplierContactTable(props) {

  useEffect(() => {
    props.getSupplierContactList(props.supplier.supplierId);
  }, []);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "110",//0 Name
          "140",//1 Email
          "546",//2 mobile
          "325",//3 Designation
          "326",//4 Department
    
         
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  const [currentSupplierId, setCurrentSupplierId] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  
  function handleSetCurrentSupplierId(supplierId) {
    setCurrentSupplierId(supplierId);
  }
  const { } = props;
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleChangeRow = (item) => {
    setCurrentSupplierId(item);
};

  return (
    <>
    <div className=' flex sticky  z-auto'>
        <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky font-poppins text-xs z-10">
            <div className=" w-[13.8rem] max-xl:text-[0.65rem]">{translatedMenuItems[0]}</div>
            {/* Name */}
            <div className=" w-[20.1rem] max-xl:text-[0.65rem]">{translatedMenuItems[1]}
             {/* Email */}
            </div>
            <div className=" w-[9.8rem] max-xl:text-[0.65rem] ">  {translatedMenuItems[2]}
              {/* mobile */}
            </div>
            <div className="w-[11.8rem] max-xl:text-[0.65rem]">{translatedMenuItems[3]}
            {/* Designation */}

            </div>
            <div className="w-[7.9rem] max-xl:text-[0.65rem]">{translatedMenuItems[4]}
             {/* Department */}

            </div>
            
          </div>
          <div class="overflow-x-auto h-[80vh]">
            <InfiniteScroll
              dataLength={props.contactSupplier.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingSupplierContactListById ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
              height={"79vh"}
              style={{scrollbarWidth:"thin"}}
            >
              {props.contactSupplier.length ?
                <>
                  {props.contactSupplier.map((item) => {
                     const data = {}
                    return (
                      <>
                        <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1"

                        >
                          <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                            <div className=" flex  font-bold border-l-2 h-8 border-green-500 bg-[#eef2f9] w-[13.1rem] max-sm:justify-between  max-sm:flex-row ">
                              <div class="flex items-center  font-normal text-xs font-poppins max-xl:text-[0.65rem]">
                               {` ${item.firstName || ""} ${item.middleName || ""} ${item.lastName || ""}`}
                              </div>
                            </div>

                            <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[19.2rem] max-sm:justify-between  max-sm:flex-row ">
                              <div class="flex items-center  text-xs  font-poppins max-xl:text-[0.65rem]">
                                {item.emailId}
                              </div>
                            </div>

                            <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[8.34rem] max-sm:justify-between  max-sm:flex-row ">
                              <div class="flex items-center   text-xs  font-poppins max-xl:text-[0.65rem]">
                                {item.dialCode1} {item.mobileNo}                             
                              </div>
                            </div>     

                            <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9]  w-[11.32rem] max-sm:justify-between  max-sm:flex-row ">
                              <div class="flex items-center   text-xs  font-poppins max-xl:text-[0.65rem]">
                                {item.designationName}
                              
                              </div>

                            </div>
                            <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[11.02rem] max-sm:justify-between  max-sm:flex-row ">

                              <div class=" flex items-center  text-xs  font-poppins max-xl:text-[0.65rem]">
                              {item.departmentName}
                             
                              </div>

                            </div>
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  md:w-[7.03rem] max-sm:flex-row w-9rem max-sm:justify-between  ">


{item.accessInd === 0 ? <div class=" text-xs  font-poppins">
    <Button
        type="primary"
        loading={currentSupplierId.contactPersonId === item.contactPersonId && props.applyingForLoginInContact}
        onClick={() => {
           handleChangeRow(item)
            props.setEditSupplierContact(item);
            props.applyForLoginInContact(
                data,
                item.contactPersonId,
                props.userId,
                "Supplier Contact To User",
                props.supplier.supplierId,
                props.distributorId,
              
            )
        }}
    ><FormattedMessage id="app.applyforlogin" defaultMessage="Apply For Login" /></Button>
</div> : item.accessInd === 2 ? <b>Login Applied</b> : <b className="text-[#32CD32] text-xs">Login Approved</b>

}

</div>
                            <div className=" flex font-medium  max-sm:justify-between  max-sm:flex-row ">
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

const mapStateToProps = ({ suppliers ,auth}) => ({
  contactSupplier: suppliers.contactSupplier,
  fetchingSupplierContactListById: suppliers.fetchingSupplierContactListById,
  updateSupplierContactModal: suppliers.updateSupplierContactModal,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSupplierContactList,
      handleUpdateSupplierContactModal,
      setEditSupplierContact,
      applyForLoginInContact
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierContactTable);
