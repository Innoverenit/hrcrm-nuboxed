
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import {  FileDoneOutlined, PhoneOutlined, ScheduleOutlined } from "@ant-design/icons";
import {
    getActivityListByDistributorId,
    handleUpdateEventModal,
    handleUpdateTaskModal,
    handleUpdateCallModal
} from "../../AccountAction";
import { BorderAllOutlined } from "@mui/icons-material";
import dayjs from "dayjs";

class DistributorActivityTable extends Component {
    componentDidMount() {
        this.props.getActivityListByDistributorId(this.props.distributorId);
        this.fetchMenuTranslations();
    }

    constructor(props) {
        super(props);
        this.state = {
          translatedMenuItems: [],
        };
      }
    
      
    
      componentDidUpdate(prevProps) {
        if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
          this.fetchMenuTranslations();
        }
      }
    
      fetchMenuTranslations = async () => {
        try {
          const itemsToTranslate = [
            
              
             
            "Type","Topic","Start","End"
            
            
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
            updateCallModal,
            handleUpdateTaskModal,
            updateTaskModal,
        } = this.props;
  

        return (
            <>
               <div className=' flex  sticky  z-auto'>
               <div class="rounded m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[0.5rem]"></div>
                        <div className=" md:w-[7.4rem]">{this.props.translatedMenuItems[0]}</div>
                        <div className=" md:w-[5.1rem]"> {this.props.translatedMenuItems[1]}</div>
                        <div className=" md:w-[8.8rem] "> {this.props.translatedMenuItems[2]}</div>
                        <div className="md:w-[3.8rem]"> {this.props.translatedMenuItems[3]}</div>
                        <div className="md:w-[6.12rem]"></div>
                     


                    </div>
                    <div class="overflow-x-auto h-[71vh]">
                        {this.props.activityDistributor.map((item) => {
                            
                            return (
                                <div >
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 ">
                                        <div class="flex w-3/4">
                                            <div className=" flex  md:w-[1.56rem] max-sm:w-full  ">


                                                <Tooltip>
                                                    <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                        <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                        {item.activity === "Call" && (
                                <PhoneOutlined />
                            )}
                            {item.activity === "Event" && (
                                <ScheduleOutlined />
                            )}
                            {item.activity === "Task" && (
                                <FileDoneOutlined />
                            )}

                                                        </div>
                                                    </div>
                                                </Tooltip>

                                            </div>

                                            <div className=" flex  md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            <div class=" text-xs  font-poppins text-center">
                                                    {item.type}
                                                </div>
                                            </div>



                                            <div className=" flex  md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {item.topic}
                                                </div>
                                            </div>
                                            <div className=" flex  md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center">
                                                {` ${dayjs(item.startDate).format('YYYY-MM-DD')}`}
                                                </div>
                                            </div>

                                            <div className=" flex  md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                               
                                                <div class=" text-xs  font-poppins text-center">
                                                {` ${dayjs(item.endDate).format("YYYY-MM-DD")}`}

                                                </div>
                                            </div>

                                            <div className=" flex   md:w-[7.3rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                <div class=" text-xs  font-poppins">
                                                   
                                                </div>

                                            </div>


                                            <div className=" flex  md:w-[3.5rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                                                <div class=" text-xs  font-poppins">
                                                    {item.expectedPrice}
                                                </div>

                                            </div>
                                            <div className=" flex  md:w-[4.7rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                {/* <div class=" text-xs  font-poppins max-sm:hidden"> Sector </div> */}
                                                <div class=" text-xs  font-poppins">
                                                    {item.suggestedPrice}
                                                </div>

                                            </div>
                                        </div>
                          
                                        <div className=" flex   md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs  font-poppins">
                                            <Tooltip title="Edit">
                            {item.activity === "Event" && (
                                <BorderAllOutlined
                                className="!text-icon cursor-pointer"
                                 
                                    onClick={() => {
                                        // this.props.setEditEvents(item);
                                        handleUpdateEventModal(true);
                                    }}
                                />
                            )}
                            {item.activity === "Call" && (
                                <BorderAllOutlined
                                className="!text-icon cursor-pointer"
                                    onClick={() => {
                                        // this.props.setEditCall(item);
                                        handleUpdateCallModal(true);

                                    }}
                                />
                            )}
                            {item.activity === "Task" && (
                                <BorderAllOutlined
                                className="!text-icon cursor-pointer"
                                    onClick={() => {
                                        // this.props.setEditTask(item);
                                        handleUpdateTaskModal(true);

                                    }}
                                />
                            )}
                        </Tooltip>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            )
                        })}
                    </div>
     
                </div>
            </div>
                
               
            </>
        );
    }
}

const mapStateToProps = ({ distributor, auth }) => ({
    activityDistributor: distributor.activityDistributor,
    fetchingActivityDistributor: distributor.fetchingActivityDistributor,
    updateEventModal: distributor.updateEventModal,
    updateCallModal: distributor.updateCallModal,
    updateTaskModal: distributor.updateTaskModal,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getActivityListByDistributorId,
            handleUpdateEventModal,
            handleUpdateCallModal,
            handleUpdateTaskModal,
            // setEditCall,
            // setEditEvents,
            // setEditTask
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DistributorActivityTable);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Tooltip } from "antd";
// import {  FileDoneOutlined, PhoneOutlined, ScheduleOutlined } from "@ant-design/icons";
// import { StyledTable } from "../../../../../Components/UI/Antd";
// import {
//     getActivityListByDistributorId,
//     handleUpdateEventModal,
//     handleUpdateTaskModal,
//     handleUpdateCallModal
// } from "../../AccountAction";
// import moment from "moment";
// import { BorderAllOutlined } from "@mui/icons-material";
// class DistributorActivityTable extends Component {
//     componentDidMount() {
//         this.props.getActivityListByDistributorId(this.props.distributorId);
//     }

//     render() {
//         const {
//             handleUpdateEventModal,
//             updateEventModal,
//             handleUpdateCallModal,
//             updateCallModal,
//             handleUpdateTaskModal,
//             updateTaskModal,
//         } = this.props;
//         const columns = [
//             {
//                 title: "",
//                 width: "1%",
//             },
//             {
//                 title: "",
//                 width: "8%",
//                 dataIndex: "activity",
//                 render: (name, item, i) => {
//                     return (
//                         <>
//                             {item.activity === "Call" && (
//                                 <PhoneOutlined />
//                             )}
//                             {item.activity === "Event" && (
//                                 <ScheduleOutlined />
//                             )}
//                             {item.activity === "Task" && (
//                                 <FileDoneOutlined />
//                             )}
//                         </>
//                     )
//                 }
//             },
//             {
//                 title: "Type",
//                 width: "20%",
//                 dataIndex: "type",
//             },
//             {
//                 title: "Topic",
//                 width: "20%",
//                 dataIndex: "topic",
//             },


//             {
//                 title: "Start",
//                 width: "20%",
//                 render: (name, item, i) => {
//                     return <span>{` ${moment(item.startDate).format("lll")}`}</span>;
//                 },
//             },

//             {
//                 title: "End",
//                 width: "20%",
//                 render: (name, item, i) => {
//                     return <span>{` ${moment(item.endDate).format("lll")}`}</span>;
//                 },
//             },

//             {
//                 title: "",
//                 dataIndex: "activity",
//                 width: "2%",
//                 render: (name, item, i) => {
//                     //debugger
//                     return (
//                         <Tooltip title="Edit">
//                             {item.activity === "Event" && (
//                                 <BorderAllOutlined

//                                     style={{ cursor: "pointer", fontSize: "12px" }}
//                                     onClick={() => {
//                                         // this.props.setEditEvents(item);
//                                         handleUpdateEventModal(true);
//                                     }}
//                                 />
//                             )}
//                             {item.activity === "Call" && (
//                                 <BorderAllOutlined

//                                     style={{ cursor: "pointer", fontSize: "12px" }}
//                                     onClick={() => {
//                                         // this.props.setEditCall(item);
//                                         handleUpdateCallModal(true);

//                                     }}
//                                 />
//                             )}
//                             {item.activity === "Task" && (
//                                 <BorderAllOutlined

//                                     style={{ cursor: "pointer", fontSize: "12px" }}
//                                     onClick={() => {
//                                         // this.props.setEditTask(item);
//                                         handleUpdateTaskModal(true);

//                                     }}
//                                 />
//                             )}
//                         </Tooltip>
//                     );
//                 },
//             },
//         ];

//         return (
//             <>
//                 {true && (
//                     <StyledTable
//                         rowKey=""
//                         columns={columns}
//                         dataSource={this.props.activityDistributor}
//                         loading={this.props.fetchingActivityDistributor}
//                         scroll={{ y: 320 }}
//                         pagination={false}
//                         expandedRowRender={(record) => {
//                             return (
//                                 <>
//                                     <div>

//                                         {record.description || ""}
//                                     </div>
//                                 </>
//                             );
//                         }}

//                     />
//                 )}
//                 {/* <DistributorEventUpdateModal
//                     updateEventModal={updateEventModal}
//                     handleUpdateEventModal={handleUpdateEventModal}
//                 />

//                 <DistributorCallUpdateModal
//                     updateCallModal={updateCallModal}
//                     handleUpdateCallModal={handleUpdateCallModal}
//                 />

//                 <DistributorTaskUpdateModal
//                     updateTaskModal={updateTaskModal}
//                     handleUpdateTaskModal={handleUpdateTaskModal}
//                 /> */}
//             </>
//         );
//     }
// }

// const mapStateToProps = ({ distributor, auth }) => ({
//     activityDistributor: distributor.activityDistributor,
//     fetchingActivityDistributor: distributor.fetchingActivityDistributor,
//     updateEventModal: distributor.updateEventModal,
//     updateCallModal: distributor.updateCallModal,
//     updateTaskModal: distributor.updateTaskModal,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getActivityListByDistributorId,
//             handleUpdateEventModal,
//             handleUpdateCallModal,
//             handleUpdateTaskModal,
//             // setEditCall,
//             // setEditEvents,
//             // setEditTask
//         },
//         dispatch
//     );

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(DistributorActivityTable);
