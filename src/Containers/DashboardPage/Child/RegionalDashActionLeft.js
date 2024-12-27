import React, { useEffect,useState } from "react";
import {setSelectedRegionalTimeIntervalReport} from "../RegionalDashAction"
import { StyledSelect } from "../../../Components/UI/Antd";
import TimeInterval from "../../../Utils/TimeInterval";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Input,Tabs } from "antd";
const { TabPane } = Tabs;
const Option = StyledSelect.Option;
const { Search } = Input;

const RegionalDashActionLeft = (props) => {
  const tab=[
    "Q1","Q2","Q3","Q4"
  ]
  const [activeTab, setActiveTab] = useState("");
  const[filter,setFilter]=useState("creationdate")
  const [page, setPage] = useState(0);
  const [searchOnEnter, setSearchOnEnter] = useState(false); 
  const [currentData, setCurrentData] = useState("");
  const dummy = ["cloud", "azure", "fgfdg"];

  const suffix = (
    <MicIcon
      onClick={SpeechRecognition.startListening}
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );


  // const handleTabClick = async (key) => {
  //   setActiveTab(key);
  //   setLoading(true); 
  //   await loadKPIsForTab(selectedYear, key);
  
  //   setLoading(false); 
  // };
  
  // const loadKPIsForTab = async (year, tabKey) => {
  //   // await props.getKpilist(props.rowdata.departmentId);
  // };

   
  const {user,setSelectedRegionalTimeIntervalReport,dateRangeList}=props;
  return (
    <div class=" flex items-center"
    >
      {/* <Button>EnterPrise</Button> */}
   
   <div class="ml-[4rem] mt-[0.75rem] max-sm:hidden" >
   <Tabs type="card" 
           activeKey={activeTab} 
          // onChange={handleTabClick}
           >
      {tab.map((tabs) => (
        <TabPane key={tabs} tab={tabs}>
       
       
       
        </TabPane>
      ))}
    </Tabs>
    {/* <TimeInterval
    style={{fontSize:"0.67"}}
          times={dateRangeList}
          handleClick={setSelectedRegionalTimeIntervalReport}
        /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegionalDashActionLeft)

