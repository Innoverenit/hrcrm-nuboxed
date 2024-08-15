import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AudioOutlined } from "@ant-design/icons";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Input, Tooltip,Avatar } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { Badge } from "antd";
import {
    getEventListRangeByUserId,
    searchEventList
} from "../EventAction";


const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;


const EventActionLeft = (props) => {

    const [currentData, setCurrentData] = useState("");
    const [pageNo, setPage] = useState(0);
    const [searchOnEnter, setSearchOnEnter] = useState(false);

    const handleChange = (e) => {
      setCurrentData(e.target.value);
  
      if (searchOnEnter && e.target.value.trim() === "") {
        setPage(pageNo + 1);
        if (props.clickView === "table") {
        props.getEventListRangeByUserId(pageNo,props.employeeId);
        }
       
        // props.ClearReducerDataOfContact()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        if (props.clickView === "table") {
        props.searchEventList(currentData,"table");
        }
        
        setSearchOnEnter(true);  
      } 
      
      
      else {
        console.error("Input is empty. Please provide a value.");
      }
    };
    const suffix = (
      <AudioOutlined
        onClick={SpeechRecognition.startListening}
        style={{
          fontSize: 16,
          color: "#1890ff",
        }}
      />
    );

    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
      if (transcript) {
        console.log(">>>>>>>", transcript);
        setCurrentData(transcript);
      }
      }, [ transcript]);


   


      useEffect(() => {
        if (transcript) {
          console.log(">>>>>>>", transcript);
          props.setCurrentData(transcript);
        }
      }, [props.clickView, props.employeeId, transcript]);


  
 

     
    return (
      <div class=" flex  items-center">
        <Tooltip
          title="Table View"
        >
          <Badge
            size="small"
            // count={
            //   (props.viewType === "table" &&
            //     props.contactRecord.customerContactCount) ||
            //   0
            // }
            overflowCount={5000}
          >
            <span
              class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setclickView("table")}
              style={{
                color: props.clickView === "table" && "#1890ff",
              }}
            >
             <Avatar style={{ background: props.clickView === "table" ? "#f279ab" : "#4bc076" }}>
               <AccountBalanceIcon className="text-white !text-icon" /></Avatar>
            </span>
          </Badge>
        </Tooltip>

        <Tooltip
        title="All"
      >
        <Badge
          size="small"
        //   count={
        //     (props.viewType === "all" &&
        //       props.contactAllRecord.contact) ||
        //     0
        //   }
        //   overflowCount={5000}
        >
          <span
            class=" mr-1 !text-icon cursor-pointer"
            onClick={() => props.setclickView("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
            }}
          >
             <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
          <div className="text-white "> ALL</div>
           </Avatar>
          </span>
        </Badge>
      </Tooltip>
    
        <div class=" w-72 md:ml-4 max-sm:w-36 ml-0">
        <Input
         placeholder="Search by Name, Company"
         class="w-96"
              suffix={suffix}
              onPressEnter={handleSearch}  
              onChange={handleChange}
               value={currentData}
            />
   
        </div>
      
  
  
      
      </div>
    );
  };
  
  const mapStateToProps = ({ auth,event }) => ({
    userId: auth.userDetails.userId,
    employeeId: auth.userDetails.employeeId,
    user: auth.userDetails,
    orgId: auth.userDetails.organizationId,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getEventListRangeByUserId,
        searchEventList
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(EventActionLeft);
  