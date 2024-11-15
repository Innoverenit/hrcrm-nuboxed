import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  handleUpdateShipperContactModal,
  setEditShipperContact,
} from "../../../ShipperAction";
import { getContactShipperList } from "../../../../Suppliers/SuppliersAction"
import { Tooltip } from "antd";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import UpdateShipperContactModal from "./UpdateShipperContactModal";
import { OnlyWrapCard } from '../../../../../../Components/UI/Layout';
import CategoryIcon from '@mui/icons-material/Category'
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import ApartmentIcon from '@mui/icons-material/Apartment';
class ShipperContactTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      breadCumb: false,
      breadCumb1: false,
      value: 1,
      dailyCustomInd: 1,
      showDel: false,
      translatedMenuItems: [],
    };
  }
  componentDidMount() {
    this.props.getContactShipperList(this.props.shipperId);
    this.fetchMenuTranslations();
  }
 
  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
       
       "110",//Name 0
       "140",//Email 1
       "546",// "Mobile no" 2
       "325",  // Designation 3
       "326",  // Department 4
       
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  }; 


  render() {

    return (
      <>
        <div className=' flex  sticky h-[83vh]  z-auto'>
          <OnlyWrapCard style={{ backgroundColor: "#eaedf1" }}>
            <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky items-end z-10">
              <div className="font-bold font-poppins text-[#00A2E8] truncate text-base w-[10.1rem] max-md:w-[7.1rem]">
              <CategoryIcon className='!text-base '
              /> {this.state.translatedMenuItems[0]}</div>
              <div className="font-bold font-poppins text-xs w-[10.9rem] truncate max-md:w-[11.12rem]">
              <MarkEmailUnreadIcon className='!text-icon  text-[#ff9f1c] '  /> {this.state.translatedMenuItems[1]}</div>
              <div className="font-bold font-poppins text-xs w-[12.6rem] truncate max-md:w-[4.8rem] ">
              <MobileFriendlyIcon className='!text-icon text-[#41ead4] '  /> {this.state.translatedMenuItems[2]}</div>
              <div className="font-bold font-poppins text-xs w-[11.6rem] truncate max-md:w-[4.9rem]">
          <i className=" fab fa-artstation  text-[#b744b8]"></i>   {this.state.translatedMenuItems[3]}</div>
              <div className="font-bold font-poppins text-xs w-[11.8rem] truncate max-md:w-[7.8rem]">
              <ApartmentIcon className='!text-icon text-[#f0386b] '  />    {this.state.translatedMenuItems[4]}</div>
              <div className=" w-[4.1rem] truncate max-md:w-[3.1rem]"></div>

            </div>
            {/* <InfiniteScroll
        dataLength={customerByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCustomers?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      > */}

            {this.props.contactShipper.map((item) => {
              return (
                <div>
                  <div className="flex rounded justify-between py-ygap mt-1 bg-white  items-center hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                  >
                    <div class="flex ">

                    <div className=" flex   items-center border-l-2 border-green-500 bg-[#eef2f9] justify-start  md:w-[10rem]  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[5.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                    <div class="flex  text-xs ml-gap  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          
                          {`${item.salutation || ""} ${item.firstName || ""} ${item.middleName || ""
                            } ${item.lastName || ""}`}
                        </div>
                      </div>
                      <div className=" flex   w-[11.1rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[5.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                      <div class="flex  text-xs ml-gap  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                          {item.emailId}
                        </div>

                      </div>
                   
                    </div>

                    <div className=" flex      md:w-[27rem] items-center justify-start  h-8 ml-gap  bg-[#eef2f9] max-xl:w-[7.5rem] max-lg:w-[5.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row ">
                    <div class="flex  text-xs ml-gap  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                        {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}

                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[24rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-xs ml-gap font-poppins text-center">
                        {item.designationName}

                      </div>
                    </div>

                    <div className=" flex font-medium flex-col md:w-[30rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-xs  font-poppins text-center">
                        {item.departmentName}

                      </div>
                    </div>

                    <div class="flex md:items-center justify-end">
                      <div class="flex">

                        <div className=" flex font-medium flex-col items-center justify-center h-8   bg-[#eef2f9] md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between  ">


                          <div class=" text-xs  font-poppins">
                            <Tooltip title="Edit">
                              <BorderColorIcon
                                 className=" !text-xl cursor-pointer text-[orange]"
                                onClick={() => {
                                  this.props.setEditShipperContact(item);
                                  this.props.handleUpdateShipperContactModal(true);
                                }}
                              />
                            </Tooltip>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>


              )
            })}

          </OnlyWrapCard>
        </div>
        <UpdateShipperContactModal
          handleUpdateShipperContactModal={
            this.props.handleUpdateShipperContactModal
          }
          updateShipperContactModal={this.props.updateShipperContactModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ shipper, suppliers }) => ({
  contactShipper: suppliers.contactShipper,
  fetchingContactShipperById: shipper.fetchingContactShipperById,
  updateShipperContactModal: shipper.updateShipperContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactShipperList,
      handleUpdateShipperContactModal,
      setEditShipperContact,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperContactTable);

