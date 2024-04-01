import React, { useEffect, useState } from "react";
import { StyledRangePicker, StyledSelect } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { Button, Input, Badge, Tooltip, Avatar } from "antd";
import { bindActionCreators } from "redux";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AudioOutlined, HistoryOutlined } from "@ant-design/icons";
import { getOrderCount, getAllOrderCount } from "../Order/OrderAction";
import { FlexContainer } from "../../../Components/UI/Layout";
import TocIcon from '@mui/icons-material/Toc';
const { Search } = Input;
const Option = StyledSelect.Option;

const OrderActionLeft = ({ viewType, getOrderCount, allOrderCount, getAllOrderCount, orderCount, setOrderViewType, userId, user }) => {
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);

  useEffect(() => {
    if (viewType === "list") {
      getOrderCount(userId);
    } else if (viewType === "all") {
      getAllOrderCount();
    }
  }, [viewType, userId]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  useEffect(() => {
    // props.getCustomerRecords();
    if (transcript) {
      console.log(">>>>>>>", transcript);
      setCurrentData(transcript);
    }
  }, [transcript]);
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (searchOnEnter && e.target.value.trim() === "") {  //Code for Search
      setPage(pageNo + 1);
      //   props.getLeads(props.userId, pageNo, "creationdate");
      //   props.ClearReducerDataOfLead()
      setSearchOnEnter(false);
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      // props.inputDataSearch(currentData);
      setSearchOnEnter(true);  //Code for Search
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  const suffix = (
    <AudioOutlined
      onClick={SpeechRecognition.startListening}
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}

    />
  );

  return (
    <FlexContainer alignItems="center">
      <div className=" mr-4">
        <Tooltip title="List View">
          <Badge
            size="small"
            count={(viewType === "list" && orderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-2 text-sm cursor-pointer"
              onClick={() => setOrderViewType("list")}
              style={{
                color: viewType === "list" && "#1890ff",
              }}
            >
              <Avatar style={{ background: viewType === "list" ? "#f279ab" : "#4bc076" }}>
                <TocIcon className="text-white" /></Avatar>

            </span>
          </Badge>
        </Tooltip>
      </div>
      <div className=" mr-4">
        <Tooltip title="Complete Orders">
          <Badge
            size="small"
            // count={(viewType === "complete" && orderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-2 text-sm cursor-pointer"
              onClick={() => setOrderViewType("complete")}
              style={{
                color: viewType === "complete" && "#1890ff",
              }}
            >
              <Avatar style={{ background: viewType === "complete" ? "#f279ab" : "#4bc076" }}>
                <HistoryOutlined fontSize="small" className="text-white" /></Avatar>

            </span>
          </Badge>
        </Tooltip>
      </div>
      <div className=" mr-4">
        <Tooltip title="ALL">
          <Badge
            size="small"
            count={(viewType === "all" && allOrderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-2 text-sm cursor-pointer"
              onClick={() => setOrderViewType("all")}
              style={{
                color: viewType === "all" && "#1890ff",
              }}
            >
              <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                <div className="text-white">ALL</div></Avatar>

            </span>
          </Badge>
        </Tooltip>
      </div>
      <div className=" mr-4">
        <Tooltip title="All Complete Orders">
          <Badge
            size="small"
            // count={(viewType === "allcomplete" && orderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-2 text-sm cursor-pointer"
              onClick={() => setOrderViewType("allcomplete")}
              style={{
                color: viewType === "allcomplete" && "#1890ff",
              }}
            >
              <Avatar style={{ background: viewType === "allcomplete" ? "#f279ab" : "#4bc076" }}>
                <HistoryOutlined fontSize="small" className="text-white" /></Avatar>

            </span>
          </Badge>
        </Tooltip>
      </div>
      <div class=" w-64 max-sm:w-24">
        <Input
          placeholder="Search by Name or Sector"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
          value={currentData}
        /></div>
    </FlexContainer>
  );
};

const mapStateToProps = ({ auth, order }) => ({
  user: auth.userDetails,
  orderCount: order.orderCount,
  allOrderCount: order.allOrderCount,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getOrderCount,
  getAllOrderCount
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderActionLeft);
