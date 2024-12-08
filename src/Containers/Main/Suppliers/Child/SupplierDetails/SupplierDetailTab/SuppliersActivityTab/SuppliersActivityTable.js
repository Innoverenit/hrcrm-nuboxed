import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import TaskIcon from '@mui/icons-material/Task';
import CallIcon from '@mui/icons-material/Call';
import {  StyledTable } from "../../../../../../../Components/UI/Antd";
import dayjs from "dayjs";
import {getActivityListBySupplierId} from "../../../../SuppliersAction";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChecklistIcon from '@mui/icons-material/Checklist';
class SuppliersActivityTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
          activeKey: "1",
          translatedMenuItems: [],
        };
      }
    
      handleTabChange = (key) => this.setState({ activeKey: key });
    
      componentDidMount() {
        this.props.getTodayPurchaseOrder(this.props.supplier.supplierId)
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
           
           "831", // "Purchase Order", 0
           "880",// "Inventory",1
           "1235",// "Materials",2
           "73",  // "Contact",3
           "138",  // "Document",4
           "1165", // "Activity" 5
                ];
    
          const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
          this.setState({ translatedMenuItems: translations });
        } catch (error) {
          console.error('Error translating menu items:', error);
        }
      }; 

    componentDidMount() {
        this.props.getActivityListBySupplierId(this.props.supplierId);
    }
    render() {
        const {
            handleUpdateEventModal,
            updateEventModal,
            handleUpdateCallModal,
            updateCallModal,
            handleUpdateTaskModal,
            updateTaskModal,
        } = this.props;
        console.log(this.props.supplier)
        const columns = [
            {
                title: "",
                width: "1%",
            },
            {
                title: "",
                width: "8%",
                dataIndex: "activity",
                render: (name, item, i) => {
                    return (
                        <>
                            {item.activity === "Call" && (
                                // <Icon type="phone" />
                                <CallIcon className=""/>
                            )}
                            {item.activity === "Event" && (
                                // <Icon type="schedule" />
                                <ChecklistIcon/>
                            )}
                            {item.activity === "Task" && (
                                // <Icon type="file-done" />
                                <TaskIcon/>
                            )}
                        </>
                    )
                }
            },
            {
                title: "Type",
                width: "20%",
                dataIndex: "type",
            },
            {
                title: "Topic",
                width: "20%",
                dataIndex: "topic",
            },


            {
                title: "Start",
                width: "20%",
                render: (name, item, i) => {
                    return <span>{` ${dayjs(item.startDate).format("lll")}`}</span>;
                },
            },

            {
                title: "End",
                width: "20%",
                render: (name, item, i) => {
                    return <span>{` ${dayjs(item.endDate).format("lll")}`}</span>;
                },
            },

            {
                title: "",
                dataIndex: "activity",
                width: "2%",
                render: (name, item, i) => {
                    //debugger
                    return (
                        <Tooltip title="Edit">
                            {item.activity === "Event" && (
                                <VisibilityIcon className="cursor-pointer text-12px"
                                    // type="edit"                                
                                    onClick={() => {
                                        // this.props.setEditEvents(item);
                                        // handleUpdateEventModal(true);
                                    }}
                                />
                            )}
                            {item.activity === "Call" && (
                                <VisibilityIcon className="cursor-pointer text-12px"
                                    // type="edit"                                
                                    onClick={() => {
                                        // this.props.setEditCall(item);
                                        // handleUpdateCallModal(true);

                                    }}
                                />
                            )}
                            {item.activity === "Task" && (
                                <VisibilityIcon className="cursor-pointer text-12px"
                                    // type="edit"                               
                                    onClick={() => {
                                        // this.props.setEditTask(item);
                                        // handleUpdateTaskModal(true);

                                    }}
                                />
                            )}
                        </Tooltip>
                    );
                },
            },
        ];

        return (
            <>
                {true && (
                    <StyledTable
                        rowKey=""
                        columns={columns}
                        dataSource={this.props.activitySupplier}
                        loading={this.props.fetchingActivitySupplier}
                        scroll={{ y: 320 }}
                        pagination={{
                            defaultPageSize: 15,
                            showSizeChanger: true,
                            pageSizeOptions: ["15", "25", "40", "50"],
                        }}
                        expandedRowRender={(record) => {
                            return (
                                <>
                                    <div>
                                        {record.description || ""}
                                    </div>
                                </>
                            );
                        }}

                    />
                )}
                {/* <DistributorEventUpdateModal
                    updateEventModal={updateEventModal}
                    handleUpdateEventModal={handleUpdateEventModal}
                />

                <DistributorCallUpdateModal
                    updateCallModal={updateCallModal}
                    handleUpdateCallModal={handleUpdateCallModal}
                />

                <DistributorTaskUpdateModal
                    updateTaskModal={updateTaskModal}
                    handleUpdateTaskModal={handleUpdateTaskModal}
                /> */}
            </>
        );
    }
}

const mapStateToProps = ({ suppliers, auth }) => ({
    activitySupplier: suppliers.activitySupplier,
    fetchingActivitySupplier: suppliers.fetchingActivitySupplier,
   
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getActivityListBySupplierId
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SuppliersActivityTable);
