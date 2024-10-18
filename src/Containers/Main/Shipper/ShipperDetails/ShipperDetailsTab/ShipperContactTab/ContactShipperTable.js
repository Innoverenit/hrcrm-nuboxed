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
        <div className=' flex  sticky h-[78vh]  z-auto'>
          <OnlyWrapCard style={{ backgroundColor: "#eaedf1" }}>
            <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
              <div className="font-bold font-poppins text-[#00A2E8] text-base md:w-[7.1rem]">{this.state.translatedMenuItems[0]}</div>
              <div className="font-bold font-poppins text-xs md:w-[11.12rem]">{this.state.translatedMenuItems[1]}</div>
              <div className="font-bold font-poppins text-xs md:w-[4.8rem] ">{this.state.translatedMenuItems[2]}</div>
              <div className="font-bold font-poppins text-xs md:w-[2.9rem]">{this.state.translatedMenuItems[3]}</div>
              <div className="font-bold font-poppins text-xs md:w-[7.8rem]">{this.state.translatedMenuItems[4]}</div>
              <div className=" md:w-[3.1rem]"></div>

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
                  <div className="flex rounded justify-between  mt-1 bg-white h-8 items-center"
                  >
                    <div class="flex ">

                      <div className=" flex font-medium flex-col border-l-2 border-green-500 bg-[#eef2f9]   md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between  ">

                        <h4 class=" text-xs  font-poppins">
                          {`${item.salutation || ""} ${item.firstName || ""} ${item.middleName || ""
                            } ${item.lastName || ""}`}
                        </h4>

                      </div>


                      <div className=" flex font-medium flex-col items-center justify-center h-8 ml-gap  bg-[#eef2f9] md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between  ">


                        <h4 class=" text-xs  font-poppins">
                          {item.emailId}
                        </h4>

                      </div>

                    </div>

                    <div className=" flex font-medium flex-col md:w-[27rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">

                      <div class=" text-xs  font-poppins text-center">
                        {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}

                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[24rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">


                      <div class=" text-xs  font-poppins text-center">
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

