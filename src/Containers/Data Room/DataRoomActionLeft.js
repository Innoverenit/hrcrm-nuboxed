import React,{useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Avatar, Tooltip } from "antd";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AcUnitIcon from '@mui/icons-material/AcUnit';

function RefurbishActionLeft (props) {
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);

//   useEffect(() => {
//       if (props.viewType === "card") {
//         props.getSupplierCount(props.userId);
//       } else if (props.viewType === "all") {
//         props.getRefurbishAllCount(props.userId);
//       } 
   
//     }, [props.viewType, props.userId, props.orgId]);

      // const {
      //     user,
      //     viewType,
      //     setDataRoomViewType,
      // } = props;
        return (
          <>
            <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto " >                  
              <Tooltip title="Prospect">
                <span class=" text-sm cursor-pointer"
                  onClick={() => props.setSelectedTab('prospect')}
                  style={{
                    color: props. selectedTab === "prospect" && "#1890ff",
                  }}
                >
                  <Avatar style={{ background: props.selectedTab === "prospect" ? "#f279ab" : "#28a355" }}>
                    <HomeRepairServiceIcon className="!text-icon cursor-pointer" /></Avatar>  
                </span>
              </Tooltip> 
              <Tooltip title="customer">
                <span class=" text-sm cursor-pointer"
                    onClick={() => props.setSelectedTab('customer')}
                  style={{
                    color: props.selectedTab === "customer" && "#1890ff",
                  }}
                >
                  
                    <AcUnitIcon className="!text-icon cursor-pointer" /> 
                </span>
              </Tooltip>
              <Tooltip title="Investor">
                <span class=" text-sm cursor-pointer"
                 onClick={() => props.setSelectedTab('list')}
                 style={{
                  color: props.selectedTab === "list" && "#1890ff",
                }}
                >
                  
                    <ApartmentIcon className="!text-icon cursor-pointer" />
                </span>
              </Tooltip>            
            </div>   
          </>
        );
}
const mapStateToProps = ({ auth, refurbish }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  allCountRefurbish:refurbish.allCountRefurbish,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
 // getRefurbishAllCount
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefurbishActionLeft);
