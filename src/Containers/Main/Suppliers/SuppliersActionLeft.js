import React,{useEffect} from "react";
import TocIcon from '@mui/icons-material/Toc';
import { StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import {
    inputDataSearch, setSuppliersDashboardType, setSelectedTimeInterval,
    setTimeRange,getSupplierCount,getSupplierAllCount

} from "./SuppliersAction";
import { connect } from "react-redux";
import { Avatar, Input, Tooltip,Badge } from "antd";
import { FormattedMessage } from "react-intl";

const Option = StyledSelect.Option;

function SuppliersActionLeft (props) {

    useEffect(() => {
        if (props.viewType === "card") {
          props.getSupplierCount(props.userId);
        } else if (props.viewType === "all") {
          props.getSupplierAllCount(props.orgId);
        } 
      }, [props.viewType, props.userId, props.orgId]);
    
        const {
            user,
            viewType,
            setSuppliersViewType,
        } = props;

        return (
            <div class="flex items-center">

                <Tooltip
                    title={<FormattedMessage id="app.cardview" defaultMessage="Card View" />}>
<Badge
          size="small"
          count={(props.viewType === "card" && props.countSupplier.supplierCount) || 0}
          overflowCount={999}
        >
                    <span class=" md:mr-2 text-sm cursor-pointer"
                        onClick={() => setSuppliersViewType("card")}
                        style={{
                            color: viewType === "card" && "#1890ff",
                        }}
                    >

                        <Avatar style={{ background: viewType === "card" ? "#f279ab" : "#4bc076" }}>
                            <TocIcon className="text-white" /></Avatar>

                    </span></Badge>
                </Tooltip>

                <Tooltip title="ALL Suppliers">
                <Badge
          size="small"
          count={(props.viewType === "all" && props.allCountSupplier.supplierCount) || 0}
          overflowCount={999}
        >
                    <span class=" md:mr-2 text-sm cursor-pointer"
                        onClick={() => setSuppliersViewType("all")}
                        style={{
                            color: viewType === "all" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                            <div className="text-white">ALL</div></Avatar>

                    </span>
                    </Badge>
                </Tooltip>

                &nbsp;&nbsp;
                <div class=" ml-6 h-6 w-60">
                    <Input
                        //   placeholder={<FormattedMessage id="app.searchByname" defaultMessage="Search By Name" />}
                        placeholder="Search By Name"
                        width={"100%"}
                    // suffix={suffix}
                    // onPressEnter={handleSearch}  
                    // onChange={handleChange}
                    // value={currentData}
                    />

                </div>

            </div>
        );
}

const mapStateToProps = ({ auth, suppliers }) => ({
    user: auth.userDetails,
    dateRangeList: suppliers.dateRangeList,
    startDate: suppliers.startDate,
    endDate: suppliers.endDate,
    userId: auth.userDetails.userId,
    orgId:auth.userDetails.organizationId,
    countSupplier:suppliers.countSupplier,
    allCountSupplier:suppliers.allCountSupplier
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            inputDataSearch,
            setSuppliersDashboardType,
            setSelectedTimeInterval,
            setTimeRange,
            getSupplierCount,
            getSupplierAllCount
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliersActionLeft);
