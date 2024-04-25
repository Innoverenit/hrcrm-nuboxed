import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import {
  FileDoneOutlined,
  PhoneOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import {
  getActivityListByShipperId,
  handleUpdateEventModal,
  handleUpdateTaskModal,
  handleUpdateCallModal,
} from "../../../Shipper/ShipperAction";
// import { setEditEvents } from "../../../../../Event/EventAction";
// import { setEditTask } from "../../../../../Task/TaskAction";
import moment from "moment";
import { OnlyWrapCard } from '../../../../../Components/UI/Layout';
import { FormattedMessage } from "react-intl";

class CustomerProcurementTable extends Component {
//   componentDidMount() {
//     this.props.getActivityListByShipperId(this.props.shipperId);
//   }

  render() {
    const {
      handleUpdateEventModal,
      updateEventModal,
      handleUpdateCallModal,
      updateCallModal,
      handleUpdateTaskModal,
      updateTaskModal,
    } = this.props;


    return (
      <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                    <div className=" flex justify-between w-[80%] pl-9 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[7.4rem]"><FormattedMessage id="app.orderNo" defaultMessage="Order No"/></div>
                        <div className=" md:w-[7.1rem]"><FormattedMessage id="app.deliveryDate" defaultMessage="Delivery Date"/></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.location" defaultMessage="Location"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.budget" defaultMessage="Budget"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.priority" defaultMessage="Priority"/></div>
                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
                    <div class="overflow-x-auto h-[64vh]">
                        {this.props.activityShipper.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded-xl  mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                        <div class="flex w-3/4">
                                            <div className=" flex font-medium flex-col md:w-[1.56rem] max-sm:w-full  ">


                                                <Tooltip>
                                                    <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                        <h4 class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                        {item.activity === "Call" && <PhoneOutlined />}
              {item.activity === "Event" && <ScheduleOutlined />}
              {item.activity === "Task" && <FileDoneOutlined />}

                                                        </h4>
                                                    </div>
                                                </Tooltip>

                                            </div>

                                            <div className=" flex font-medium flex-col  md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.type}
                                                </div>
                                            </div>



                                            <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.topic}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                {` ${moment(item.startDate).format("lll")}`}
                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                               
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                {` ${moment(item.endDate).format("lll")}`}

                                                </div>
                                            </div>
                                        </div>
                          
                                        <div className=" flex font-medium flex-col  md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                            <Tooltip title="Edit">
              {item.activity === "Event" && (
               <ScheduleOutlined
                  style={{ cursor: "pointer", fontSize: "12px" }}
                  onClick={() => {
                    // this.props.setEditEvents(item);
                    handleUpdateEventModal(true);
                  }}
                />
              )}
              {item.activity === "Call" && (
               <PhoneOutlined
                  style={{ cursor: "pointer", fontSize: "12px" }}
                  onClick={() => {
                    // this.props.setEditCall(item);
                    handleUpdateCallModal(true);
                  }}
                />
              )}
              {item.activity === "Task" && (
               <FileDoneOutlined 
                  style={{ cursor: "pointer", fontSize: "12px" }}
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


                            )
                        })}
                    </div>
     
                </OnlyWrapCard>
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
    //   setEditEvents,
    //   setEditTask,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerProcurementTable);
