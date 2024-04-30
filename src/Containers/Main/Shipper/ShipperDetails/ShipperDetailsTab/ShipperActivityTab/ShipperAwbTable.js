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
  getAwbListByShipperId,
  handleUpdateEventModal,
  handleUpdateTaskModal,
  handleUpdateCallModal,
} from "../../../ShipperAction";
import { setEditEvents } from "../../../../../Event/EventAction";
import { setEditTask } from "../../../../../Task/TaskAction";
import moment from "moment";
import { OnlyWrapCard } from '../../../../../../Components/UI/Layout';
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../../../Components/Placeholder";

class ShipperAwbTable extends Component {
  componentDidMount() {
    this.props.getAwbListByShipperId(this.props.shipperId);
  }

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
            <div className=' flex justify-end sticky top-28 z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                    <div className=" flex justify-between w-[80%] pl-9 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[7.4rem]"><FormattedMessage id="app.awb#" defaultMessage="AWB #"/></div>
                        <div className=" md:w-[10.1rem]"><FormattedMessage id="app.created" defaultMessage="Created"/></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.pickUp" defaultMessage="Pick Up"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.delivery" defaultMessage="Delivery"/></div>
                        <div className="md:w-[6.12rem]"></div>
                      
                     


                    </div>
                    <div class="overflow-x-auto h-[64vh]">
                        {this.props.awbShipper.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded-xl  mt-2 bg-white h-[2.75rem] items-center p-3 ">
                                        <div class="flex w-3/4">
                                            <div className=" flex font-medium flex-col md:w-[14.56rem] max-sm:w-full  ">
                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.newAwbNo}
                                                </div>

                                            </div>

                                            <div className=" flex font-medium flex-col  md:w-[9.4rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs text-cardBody font-poppins text-center">
                                                   
                                                    {` ${moment(item.createAt).format("lll")}`}
                                                </div>
                                            </div>



                                            <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                {item.topic}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                {` ${moment(item.pickUp).format("lll")}`}
                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                               
                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                {/* {` ${moment(item.endDate).format("lll")}`} */}

                                                </div>
                                            </div>
                                        </div>
{/*                           
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

                                        </div> */}
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
