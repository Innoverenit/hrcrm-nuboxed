import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";

import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { getSupplierContactList, handleUpdateSupplierContactModal, setEditSupplierContact,applyForLoginInContact } from "../../../../SuppliersAction";
import { Button } from "antd";
import EmptyPage from "../../../../../EmptyPage";

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
          <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky font-poppins items-end text-xs z-10">
            <div className="text-[#00A2E8] text-base w-[14.8rem] truncate max-md:w-[14.8rem] max-xl:text-[0.65rem]">  <LocationCityIcon className='!text-icon  '  />{translatedMenuItems[0]}</div>
            {/* Name */}
            <div className=" w-[15.1rem] truncate max-md:w-[15.1rem] max-xl:text-[0.65rem]"><MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c] '  />{translatedMenuItems[1]}
             {/* Email */}
            </div>
            <div className=" w-[12.8rem] truncate max-md:w-[12.8rem] max-xl:text-[0.65rem] "><MobileFriendlyIcon className='!text-icon text-[#41ead4] '  />  {translatedMenuItems[2]}
              {/* mobile */}
            </div>
            <div className="w-[12.7rem] truncate max-md:w-[12.7rem] max-xl:text-[0.65rem]"><i className=" fab fa-artstation mr-1 text-[#b744b8]"></i>{translatedMenuItems[3]}
            {/* Designation */}

            </div>
            <div className="w-[31.9rem]  truncate max-md:w-[31.9rem] max-xl:text-[0.65rem]"><ApartmentIcon className='!text-icon text-[#f0386b] '  /> {translatedMenuItems[4]}
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
                        <div className="flex rounded justify-between mt-1 bg-white  items-center  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"

                        >
                          <div class=" flex flex-row  w-wk max-sm:flex-col ">
                            <div className=" flex  font-bold border-l-2 h-8 border-green-500 bg-[#eef2f9] w-[14.1rem] max-sm:justify-between  max-sm:flex-row  ">
                              <div class="flex items-center ml-gap font-normal text-xs font-poppins max-xl:text-[0.65rem]">
                               {` ${item.firstName || ""} ${item.middleName || ""} ${item.lastName || ""}`}
                              </div>
                            </div>

                            <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[14.2rem] max-sm:justify-between  max-sm:flex-row ">
                              <div class="flex items-center ml-gap  text-xs  font-poppins max-xl:text-[0.65rem]">
                                {item.emailId}
                              </div>
                            </div>

                            <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[11.34rem] max-sm:justify-between  max-sm:flex-row ">
                              <div class="flex items-center  ml-gap text-xs  font-poppins max-xl:text-[0.65rem]">
                                {item.dialCode1} {item.mobileNo}                             
                              </div>
                            </div>     

                            <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9]  w-[12.32rem] max-sm:justify-between  max-sm:flex-row ">
                              <div class="flex items-center ml-gap  text-xs  font-poppins max-xl:text-[0.65rem]">
                                {item.designationName}
                              
                              </div>

                            </div>
                            <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[11.02rem] max-sm:justify-between  max-sm:flex-row ">

                              <div class=" flex items-center ml-gap text-xs  font-poppins max-xl:text-[0.65rem]">
                              {item.departmentName}
                             
                              </div>

                            </div>
                            <div className=" flex items-center justify-end h-8 ml-gap bg-[#eef2f9]  md:w-[20.03rem] max-sm:flex-row w-9rem max-sm:justify-between  ">


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
    > Apply for log in
    </Button>
</div> : item.accessInd === 2 ? <b>Login Applied</b> : <b className="text-[#32CD32] text-xs">Login Approved</b>

}

</div>
                            <div className=" flex font-medium  max-sm:justify-between  max-sm:flex-row ">
                           
</div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </> :
                !props.contactSupplier.length &&
                  !props.fetchingSupplierContactListById ? <EmptyPage /> : null}
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
