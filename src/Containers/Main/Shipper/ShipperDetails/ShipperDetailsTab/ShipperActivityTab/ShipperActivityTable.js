import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import {
  FileDoneOutlined,
  PhoneOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  getActivityListByShipperId,
  handleUpdateEventModal,
  handleUpdateTaskModal,
  handleUpdateCallModal,
} from "../../../ShipperAction";
import { setEditEvents } from "../../../../../Event/EventAction";
import { setEditTask } from "../../../../../Task/TaskAction";
import dayjs from "dayjs"
import { FormattedMessage } from "react-intl";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";

class ShipperActivityTable extends Component {
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
            <div className=' flex  sticky  z-auto'>
            <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
            <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[7.4rem]"><FormattedMessage id="app.type" defaultMessage="Type"/></div>
                        <div className=" md:w-[5.1rem]"><FormattedMessage id="app.topic" defaultMessage="Topic"/></div>
                        <div className=" md:w-[8.8rem] "><FormattedMessage id="app.start" defaultMessage="Start"/></div>
                        <div className="md:w-[3.8rem]"><FormattedMessage id="app.end" defaultMessage="End"/></div>
                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
                    <div class="overflow-x-auto h-[64vh]">
                    {this.props.activityShipper.length > 0 ? (
               this.props.activityShipper.map((item) => (
                            
                         
                <div key={item.id}>
                                      <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col ">
                                        <div class="flex w-3/4">
                                            <div className=" flex font-medium flex-col md:w-[1.56rem] max-sm:w-full  ">


                                                <Tooltip>
                                                    <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                        <h4 class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                        {item.activity === "Call" && <PhoneOutlined />}
              {item.activity === "Event" && <ScheduleOutlined />}
              {item.activity === "Task" && <FileDoneOutlined />}

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
               <ScheduleOutlined
               className=" !text-xl cursor-pointer "
                
                  onClick={() => {
                    // this.props.setEditEvents(item);
                    handleUpdateEventModal(true);
                  }}
                />
              )}
              {item.activity === "Call" && (
               <PhoneOutlined
               className=" !text-xl cursor-pointer "
                  onClick={() => {
                    // this.props.setEditCall(item);
                    handleUpdateCallModal(true);
                  }}
                />
              )}
              {item.activity === "Task" && (
               <FileDoneOutlined 
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
// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Tooltip } from "antd";
// import {
//   FileDoneOutlined,
//   PhoneOutlined,
//   ScheduleOutlined,
// } from "@ant-design/icons";
// import { StyledTable } from "../../../../../../Components/UI/Antd";
// import {
//   getActivityListByShipperId,
//   handleUpdateEventModal,
//   handleUpdateTaskModal,
//   handleUpdateCallModal,
// } from "../../../ShipperAction";
// import { setEditEvents } from "../../../../../Event/EventAction";
// import { setEditTask } from "../../../../../Task/TaskAction";
// import dayjs from "dayjs";

// class ShipperActivityTable extends Component {
//   componentDidMount() {
//     this.props.getActivityListByShipperId(this.props.shipperId);
//   }

//   render() {
//     const {
//       handleUpdateEventModal,
//       updateEventModal,
//       handleUpdateCallModal,
//       updateCallModal,
//       handleUpdateTaskModal,
//       updateTaskModal,
//     } = this.props;
//     const columns = [
//       {
//         title: "",
//         width: "1%",
//       },
//       {
//         title: "",
//         width: "8%",
//         dataIndex: "activity",
//         render: (name, item, i) => {
//           return (
//             <>
//               {item.activity === "Call" && <PhoneOutlined />}
//               {item.activity === "Event" && <ScheduleOutlined />}
//               {item.activity === "Task" && <FileDoneOutlined />}
//             </>
//           );
//         },
//       },
//       {
//         title: "Type",
//         width: "20%",
//         dataIndex: "type",
//       },
//       {
//         title: "Topic",
//         width: "20%",
//         dataIndex: "topic",
//       },

//       {
//         title: "Start",
//         width: "20%",
//         render: (name, item, i) => {
//           return <span>{` ${dayjs(item.startDate).format("lll")}`}</span>;
//         },
//       },

//       {
//         title: "End",
//         width: "20%",
//         render: (name, item, i) => {
//           return <span>{` ${dayjs(item.endDate).format("lll")}`}</span>;
//         },
//       },

//       {
//         title: "",
//         dataIndex: "activity",
//         width: "2%",
//         render: (name, item, i) => {
//           //debugger
//           return (
//             <Tooltip title="Edit">
//               {item.activity === "Event" && (
//                <ScheduleOutlined
//                   style={{ cursor: "pointer", fontSize: "12px" }}
//                   onClick={() => {
//                     // this.props.setEditEvents(item);
//                     handleUpdateEventModal(true);
//                   }}
//                 />
//               )}
//               {item.activity === "Call" && (
//                <PhoneOutlined
//                   style={{ cursor: "pointer", fontSize: "12px" }}
//                   onClick={() => {
//                     // this.props.setEditCall(item);
//                     handleUpdateCallModal(true);
//                   }}
//                 />
//               )}
//               {item.activity === "Task" && (
//                <FileDoneOutlined 
//                   style={{ cursor: "pointer", fontSize: "12px" }}
//                   onClick={() => {
//                     // this.props.setEditTask(item);
//                     handleUpdateTaskModal(true);
//                   }}
//                 />
//               )}
//             </Tooltip>
//           );
//         },
//       },
//     ];

//     return (
//       <>
//         {true && (
//           <StyledTable
//             rowKey=""
//             columns={columns}
//             dataSource={this.props.activityShipper}
//             loading={this.props.fetchingActivityShipper}
//             scroll={{ y: 320 }}
//             pagination={{
//               defaultPageSize: 15,
//               showSizeChanger: true,
//               pageSizeOptions: ["15", "25", "40", "50"],
//             }}
//             expandedRowRender={(record) => {
//               return (
//                 <>
//                   <div>{record.description || ""}</div>
//                 </>
//               );
//             }}
//           />
//         )}
//         {/* <ShipperEventUpdateModal
//           updateEventModal={updateEventModal}
//           handleUpdateEventModal={handleUpdateEventModal}
//         />

//         <ShipperCallUpdateModal
//           updateCallModal={updateCallModal}
//           handleUpdateCallModal={handleUpdateCallModal}
//         />

//         <ShipperTaskUpdateModal
//           updateTaskModal={updateTaskModal}
//           handleUpdateTaskModal={handleUpdateTaskModal}
//         /> */}
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ shipper, auth }) => ({
//   activityShipper: shipper.activityShipper,
//   fetchingActivityShipper: shipper.fetchingActivityShipper,
//   //  shippershipperId: shipper.shipperDetailsByShipperId.shipperId,
//   updateEventModal: shipper.updateEventModal,
//   updateCallModal: shipper.updateCallModal,
//   updateTaskModal: shipper.updateTaskModal,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getActivityListByShipperId,
//       handleUpdateEventModal,
//       handleUpdateCallModal,
//       handleUpdateTaskModal,
//     //   setEditCall,
//       setEditEvents,
//       setEditTask,
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ShipperActivityTable);
