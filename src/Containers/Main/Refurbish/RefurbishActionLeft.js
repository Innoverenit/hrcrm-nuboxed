import React,{useEffect,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Avatar, Tooltip,Badge } from "antd";
import {getRefurbishAllCount} from "../Refurbish/RefurbishAction"
import { FlexContainer } from "../../../Components/UI/Layout";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

function RefurbishActionLeft (props) {
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);

  useEffect(() => {
      if (props.viewType === "card") {
        props.getSupplierCount(props.userId);
      } else if (props.viewType === "all") {
        props.getRefurbishAllCount(props.userId);
      } 
   
    }, [props.viewType, props.userId, props.orgId]);
  
      const {
          user,
          viewType,
          setProductionViewType,
      } = props;


        return (
          <>
            <FlexContainer alignItems="center">
    
              {/* {user.designation === "Executive" && */}
    
    
              <Tooltip title="List">
                <span class=" text-sm cursor-pointer"
                  onClick={() => setProductionViewType("list")}
                  style={{
                    color: viewType === "list" && "#1890ff",
                  }}
                >
                  <Avatar style={{ background: viewType === "list" ? "#f279ab" : "#4bc076" }}>
                    <HomeRepairServiceIcon className="text-white cursor-pointer" /></Avatar>
    
                </span>
              </Tooltip>
              <Tooltip title="All List">
              <Badge
          size="small"
          count={(viewType === "all" && props.allCountRefurbish.allRefurbish) || 0}
          overflowCount={999}
        >
              <span class=" ml-2 text-sm cursor-pointer"
                onClick={() => setProductionViewType("all")}
                style={{
                  color: viewType === "all" && "#1890ff",
                }}
              >
                <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                  <div className="text-white">ALL</div></Avatar>
    
              </span>
              </Badge>
              </Tooltip>
            </FlexContainer>
    
          </>
        );
}
const mapStateToProps = ({ auth, refurbish }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  allCountRefurbish:refurbish.allCountRefurbish,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getRefurbishAllCount
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefurbishActionLeft);
