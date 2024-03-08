import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Badge, Avatar } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import { inputDataSearch, getRecords, getAccountRecords, getAllRecords, getDistributorCount } from "./AccountAction";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const AccountActionLeft = (props) => {
    const { user, } = props;
    useEffect(() => {
        if (props.viewType === "list") {
            props.getRecords(props.userId);
        } else if (props.viewType === "card") {
            props.getDistributorCount(props.userId);
        }
        else if (props.viewType === "all") {
            props.getAccountRecords();
        }
    }, [props.viewType, props.userId]);

    return (
        <div class="flex items-center" >
            <div class="max-sm:hidden">
                {user.functionName !== "Customer Care" && (

                    <Tooltip title="List View">
                        <Badge size="small"
                            count={props.accountRecordData.distributor || 0}
                        >
                            <span class=" md:mr-2 text-sm cursor-pointer"
                                onClick={() => props.setDistributorViewType("list")}
                                style={{
                                    color: props.viewType === "list" && "#1890ff",
                                }}
                            >
                                <Avatar style={{ background: props.viewType === "list" ? "#f279ab" : "#4bc076" }}>
                                    <TocIcon className="text-white" /></Avatar>

                            </span>
                        </Badge>
                    </Tooltip>

                )}
            </div>

            {user.accountFullListInd === true && user.erpInd === true && (
                <Tooltip title="All Customers">
                    <Badge size="small"
                        count={props.accountRecordData.distributor || 0}
                    >
                        <span class=" md:mr-2 text-sm cursor-pointer"
                            onClick={() => props.setDistributorViewType("all")}
                            style={{
                                color: props.viewType === "all" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
                                <div className="text-white">ALL</div></Avatar>

                        </span>
                    </Badge>
                </Tooltip>
            )}
            <Tooltip title="Deleted Distributor">
                <Badge size="small"
                // count={props.accountRecordData.distributor || 0}
                >
                    <span class=" md:mr-2 text-sm cursor-pointer"
                        onClick={() => props.setDistributorViewType("dashboard")}
                        style={{
                            color: props.viewType === "dashboard" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: props.viewType === "dashboard" ? "#f279ab" : "#4bc076" }}>
                            <DeleteOutlined className="text-white" /></Avatar>

                    </span>
                </Badge>
            </Tooltip>


            {/* &nbsp; &nbsp;
            {props.viewType === "table" ?
                (
                    <div style={{ fontSize: "0.9375em", fontWeight: "bold", color: "tomato" }}>
                        # Records -{" "}{props.recordData.distributor || 0}{" "}
                    </div>
                )
                : props.viewType === "all" ?
                    (
                        <div style={{ fontSize: "0.9375em", fontWeight: "bold", color: "tomato" }}>
                            # Records -{" "}{props.recordAllData.distributor || 0}{" "}
                        </div>
                    ) : null} */}

            {/* &nbsp;&nbsp;
            {props.viewType === "table" ?
                (
                    <div>
                        <>
                            <b> {dayjs().format("ll")}  </b>
                            &nbsp;&nbsp;
                            <b>||&nbsp;&nbsp;Balance : ₹ {`${cost}`}  </b>
                            &nbsp;&nbsp;
                            <b>||&nbsp;&nbsp;Outstanding : ₹ {`${costA}`}</b>
                            &nbsp;&nbsp;
                        </>
                    </div>
                )
                : props.viewType === "all" ?
                    (

                        <div>
                            <>
                                <b> {dayjs().format("ll")}  </b>
                                &nbsp;&nbsp;
                                <b>||&nbsp;&nbsp;Balance : ₹ {`${cost1}`}  </b>
                                &nbsp;&nbsp;
                                <b>||&nbsp;&nbsp;Outstanding : ₹ {`${costB}`}</b>
                                &nbsp;&nbsp;
                            </>
                        </div>
                    ) : null} */}
        </div>
    );
};

const mapStateToProps = ({ auth, distributor }) => ({
    user: auth.userDetails,
    allDistributorCount: distributor.allDistributorCount,
    accountRecordData: distributor.accountRecordData,
    recordData: distributor.recordData,
    recordAllData: distributor.recordAllData,
    userId: auth.userDetails.userId,
    distributorsByUserId: distributor.distributorsByUserId,
    allDistributors: distributor.allDistributors,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            inputDataSearch,
            getRecords,
            getAccountRecords,
            getAllRecords,
            getDistributorCount,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountActionLeft);
