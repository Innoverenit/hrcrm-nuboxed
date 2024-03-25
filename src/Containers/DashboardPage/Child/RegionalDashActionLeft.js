import React, { useEffect,useState } from "react";
import {setSelectedRegionalTimeIntervalReport} from "../RegionalDashAction"
import { StyledSelect } from "../../../Components/UI/Antd";
import TimeInterval from "../../../Utils/TimeInterval";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const RegionalDashActionLeft = (props) => {
  const[filter,setFilter]=useState("creationdate")
  const [page, setPage] = useState(0);
  const [searchOnEnter, setSearchOnEnter] = useState(false); 
  const [currentData, setCurrentData] = useState("");
  const dummy = ["cloud", "azure", "fgfdg"];

  const suffix = (
    <AudioOutlined
      onClick={SpeechRecognition.startListening}
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );




   
  const {user,setSelectedRegionalTimeIntervalReport,dateRangeList}=props;
  return (
    <div class=" flex items-center"
    >
   
   <div class="ml-[4rem] max-sm:hidden" >
    <TimeInterval
    style={{fontSize:"0.67"}}
          times={dateRangeList}
          handleClick={setSelectedRegionalTimeIntervalReport}
        />
        </div>
          
  
        
     
    </div>
  );
};
const mapStateToProps = ({ customer, auth, dashboardRegional }) => ({
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    dateRangeList: dashboardRegional.dateRangeList,
    viewType:dashboardRegional.viewType,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        setSelectedRegionalTimeIntervalReport
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegionalDashActionLeft)
);
