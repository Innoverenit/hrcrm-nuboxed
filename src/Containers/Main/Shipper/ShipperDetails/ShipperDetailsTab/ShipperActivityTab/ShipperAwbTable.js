import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAwbListByShipperId,
  handleUpdateEventModal,
  handleUpdateTaskModal,
  handleUpdateCallModal,
} from "../../../ShipperAction";
import { setEditEvents } from "../../../../../Event/EventAction";
import { setEditTask } from "../../../../../Task/TaskAction";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

class ShipperAwbTable extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      translatedMenuItems: [],
    };
  }

  handleTabChange = (key) => this.setState({ activeKey: key });

  componentDidMount() {
    this.props.getAwbListByShipperId(this.props.shipperId);
  } 
  componentDidMount() {
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
       
       "1377", // "Ship Id",
       "679",// "Created",
       "1378",// Pick up",
       "772",  // "Delivery",
    
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  }; 
  render() {
    const {
      handleUpdateEventModal,
      updateEventModal,
      handleUpdateCallModal,
      fetchingAwbShipper,
      handleUpdateTaskModal,
      updateTaskModal,
    } = this.props;

  if (fetchingAwbShipper) {
    return <BundleLoader />;
  }

    return (
      <>
            <div className=' flex  sticky h-[78vh]  z-auto'>
            <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
            <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs items-end sticky  z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className=" text-[#00A2E8] text-base w-[7.4rem] max-md:w-[7.4rem]">  
                        <RocketLaunchIcon className=" !text-tab text-[#bdd358] mr-2"/>  {this.state.translatedMenuItems[0]}</div>
                        {/* AWB# */}
                        <div className="w-[10.1rem] max-md:w-[10.1rem]"> 
                        <DateRangeIcon className="!text-icon "/> {this.state.translatedMenuItems[1]}</div>
                        {/* Created */}
                        <div className="w-[8.8rem] max-md:w-[8.8rem] ">  {this.state.translatedMenuItems[2]}</div>
                        {/* pickUp */}
                        <div className="w-[4.8rem] max-md:w-[4.8rem]"> 
                        <LocalShippingIcon className='!text-base  text-[#e4eb2f]'
              /> {this.state.translatedMenuItems[3]}</div>
                        {/* Delivery */}
                        <div className="w-[6.12rem] max-md:w-[6.12rem]"></div>                     
                    </div>
                   
                    {this.props.awbShipper.length > 0 ? (
               this.props.awbShipper.map((item) => (
                            
                            <div key={item.id}>
                                     <div className="flex rounded  mt-1 bg-white h-8 items-center  max-sm:h-[7rem] max-sm:flex-col ">
                                        <div class="flex w-3/4 ">
                                            <div className=" flex font-medium flex-col md:w-[14.56rem] border-l-2 border-green-500 bg-[#eef2f9] max-sm:w-full  ">
                                            <div class=" text-xs  font-poppins text-center">
                                                    {item.newAwbNo}
                                                </div>

                                            </div>

                                            <div className=" flex font-medium flex-col  md:w-[9.4rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins text-center">
                                                   
                                                    {` ${dayjs(item.createAt).format("lll")}`}
                                                </div>
                                            </div>



                                            <div className=" flex font-medium flex-col md:w-[6.2rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {item.topic}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-[10.1rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {` ${dayjs(item.pickUp).format("lll")}`}
                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-[11.5rem] items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between ">
                                               
                                                <div class=" text-xs  font-poppins text-center">
                                                {/* {` ${dayjs(item.endDate).format("lll")}`} */}

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                                   
))
) : (
  <div className="text-center p-5">
    <NodataFoundPage />
  </div>
)}
                    </div>
     
                </div>
           

      </>
    );
  }
}

const mapStateToProps = ({ shipper }) => ({
  awbShipper: shipper.awbShipper,
  fetchingAwbShipper: shipper.fetchingAwbShipper,
  updateEventModal: shipper.updateEventModal,
  updateCallModal: shipper.updateCallModal,
  updateTaskModal: shipper.updateTaskModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAwbListByShipperId,
      handleUpdateEventModal,
      handleUpdateCallModal,
      handleUpdateTaskModal,
      setEditEvents,
      setEditTask,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperAwbTable);
