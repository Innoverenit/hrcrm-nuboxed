import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GridViewIcon from '@mui/icons-material/GridView';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import MicIcon from '@mui/icons-material/Mic';
import {Input, Tooltip, Avatar } from "antd";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  getExpenseById,
  searchExpenseList
} from "../ExpenseAction";

const { Search } = Input;
const ExpenseActionLeft = (props) => {

  const [currentData, setCurrentData] = useState("");
  const [pageNo, setPage] = useState(0);
  const [searchOnEnter, setSearchOnEnter] = useState(false);

  const handleChange = (e) => {
    setCurrentData(e.target.value);
    if (searchOnEnter && e.target.value.trim() === "") {
      setPage(pageNo + 1);
      if (props.viewType === "card") {
        props.getExpenseById(props.userId);
      }
      // props.ClearReducerDataOfContact()
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      if (props.viewType === "card") {
      props.searchExpenseList(currentData,"card");
      }
setSearchOnEnter(true);  
    } 
    else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const suffix = (
    <MicIcon
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
    }, [props.viewType, props.employeeId, transcript]);


  return (
    <div class=" flex items-center" >
      <Tooltip
        title="My Expense Vouchers" 
      >

        <span class=" mr-1 cursor-pointer text-[1rem]"
          onClick={() => props.setExpenseViewType("card")}
          style={{
            color: props.viewType === "card" && "#1890ff",
          }}
        >
          <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#28a355" }}>
            <GridViewIcon className='text-white !text-icon'/>
          </Avatar>
        </span>

      </Tooltip>

      
      <Tooltip
        title="Category"
      >

        <span class=" mr-1 cursor-pointer text-[1rem]"
          onClick={() => props.setExpenseViewType("list")}
          style={{
            color: props.viewType === "list" && "#1890ff",
          }}
        >
          <Avatar style={{ background: props.viewType === "list" ? "#f279ab" : "#28a355" }}>
            <ViewWeekIcon className='text-white !text-icon'
            // icon={solid('users')}
            />
          </Avatar>
        </span>

      </Tooltip>
      {props.user.expenseFullListInd === true && (
        <Tooltip
          title="All"
        >

          <span class=" mr-1 cursor-pointer !text-icon"
            onClick={() => props.setExpenseViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
              cursor: 'pointer',
            }}
          >
            <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#28a355" }}>
         ALL

            </Avatar>
          </span>

        </Tooltip>
      )}
        <div class=" w-72 md:ml-4 max-sm:w-36 ml-0">
        <Input
         placeholder="Search by Voucher ID"
         class="w-96"
              suffix={suffix}
              onPressEnter={handleSearch}  
              onChange={handleChange}
               value={currentData}
            />
   
        </div>
    </div>
  )
}

const mapStateToProps = ({ customer, auth, candidate }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchExpenseList,
      getExpenseById
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseActionLeft)
