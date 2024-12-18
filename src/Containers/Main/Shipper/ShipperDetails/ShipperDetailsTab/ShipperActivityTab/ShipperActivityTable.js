import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import TaskIcon from '@mui/icons-material/Task';
import CallIcon from '@mui/icons-material/Call';
import ChecklistIcon from '@mui/icons-material/Checklist';
import {
  getActivityListByShipperId,
  handleUpdateEventModal,
  handleUpdateTaskModal,
  handleUpdateCallModal,
} from "../../../ShipperAction";
import { setEditEvents } from "../../../../../Event/EventAction";
import { setEditTask } from "../../../../../Task/TaskAction";
import dayjs from "dayjs"
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";

class ShipperActivityTable extends Component {

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
       
       "71",//Type 0
       "1228",// "Topic 1
       "158",// start
       "111",  // end
    
       
            ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  }; 

  componentDidMount() {
    this.props.getActivityListByShipperId(this.props.shipperId);
  }

  render() {
    const {
      handleUpdateEventModal,
      updateEventModal,
      fetchingActivityShipper,
      handleUpdateCallModal,
      updateCallModal,
      handleUpdateTaskModal,
      updateTaskModal,
    } = this.props;

    if (fetchingActivityShipper) {
      return <BundleLoader />;
    }
  
    return (
      <>
            <div className=' flex  sticky h-[78vh]  z-auto'>
            <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[7.4rem]">      {this.state.translatedMenuItems[0]}</div>
                        {/* Type */}
                        <div className=" md:w-[5.1rem]">      {this.state.translatedMenuItems[1]}</div>
                        {/* Topic */}
                        <div className=" md:w-[8.8rem] ">      {this.state.translatedMenuItems[2]}</div>
                        {/* Start */}
                        <div className="md:w-[3.8rem]">      {this.state.translatedMenuItems[3]}</div>
                        {/* End */}
                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
                    <div class="overflow-x-auto h-[72vh]">
                    {this.props.activityShipper.length > 0 ? (
               this.props.activityShipper.map((item) => (
                            
                         
                <div key={item.id}>
                                      <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col ">
                                        <div class="flex w-3/4">
                                            <div className=" flex font-medium flex-col md:w-[1.56rem] max-sm:w-full  ">


                                                <Tooltip>
                                                    <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                        <h4 class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                        {item.activity === "Call" && <CallIcon />}
              {item.activity === "Event" && <ChecklistIcon />}
              {item.activity === "Task" && <TaskIcon />}

                                                        </h4>
                                                    </div>
                                                </Tooltip>

                                            </div>

                                            <div className=" flex font-medium flex-col  md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins text-center">
                                                    {item.type}
                                                </div>
                                            </div>



                                            <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {item.topic}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {` ${dayjs(item.startDate).format("lll")}`}
                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                               
                                                <div class=" text-xs  font-poppins text-center">
                                                {` ${dayjs(item.endDate).format("lll")}`}

                                                </div>
                                            </div>
                                        </div>
                          
                                        <div className=" flex font-medium flex-col  md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs  font-poppins">
                                            <Tooltip title="Edit">
              {item.activity === "Event" && (
               <ChecklistIcon
               className=" !text-xl cursor-pointer "
                
                  onClick={() => {
                    // this.props.setEditEvents(item);
                    handleUpdateEventModal(true);
                  }}
                />
              )}
              {item.activity === "Call" && (
               <CallIcon
               className=" !text-xl cursor-pointer "
                  onClick={() => {
                    // this.props.setEditCall(item);
                    handleUpdateCallModal(true);
                  }}
                />
              )}
              {item.activity === "Task" && (
               <TaskIcon 
               className=" !text-xl cursor-pointer "
                  onClick={() => {
                    // this.props.setEditTask(item);
                    handleUpdateTaskModal(true);
                  }}
                />
              )}
            </Tooltip>
                                            </h4>

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
            </div>

      </>
    );
  }
}

const mapStateToProps = ({ shipper }) => ({
  activityShipper: shipper.activityShipper,
  fetchingActivityShipper: shipper.fetchingActivityShipper,
  updateEventModal: shipper.updateEventModal,
  updateCallModal: shipper.updateCallModal,
  updateTaskModal: shipper.updateTaskModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getActivityListByShipperId,
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
)(ShipperActivityTable);
