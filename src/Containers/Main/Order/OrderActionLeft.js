import React, { useEffect,useState } from "react";
import { StyledRangePicker, StyledSelect } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { Button, Input, Badge,Tooltip } from "antd";
import { bindActionCreators } from "redux";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { TableOutlined,AudioOutlined } from "@ant-design/icons";
import { getOrderCount,getAllOrderCount } from "../Order/OrderAction";
import { FlexContainer } from "../../../Components/UI/Layout";

const { Search } = Input;
const Option = StyledSelect.Option;

const OrderActionLeft = ({ viewType,getOrderCount,allOrderCount,getAllOrderCount,orderCount, setOrderViewType, userId,user }) => {
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
    }, [ transcript]);
    const handleChange = (e) => {
        setCurrentData(e.target.value);
    
        if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search
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
      <Tooltip title="List View">
      <Badge
        size="small"
        count={(viewType === "list" && orderCount.order) || 0}
        
        overflowCount={999}
      >
        <TableOutlined
          onClick={() => setOrderViewType("list")}
          style={{
            marginRight: "0.5rem",
            color: viewType === "list" && "#1890ff",
            fontSize: "1em",
            cursor: "pointer",
          }}
        />
          </Badge>
      </Tooltip>

      <Tooltip title="ALL">
      <Badge
        size="small"
        count={(viewType === "all" && allOrderCount.order) || 0}
        
        overflowCount={999}
      >
        <span
          style={{
            marginRight: "0.5rem",
            color: viewType === "all" && "#1890ff",
            fontSize: "1em",
            cursor: "pointer",
          }}
          onClick={() => setOrderViewType("all")}
        >
          All
        </span>
        </Badge>
      </Tooltip>
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

const mapStateToProps = ({ auth,order }) => ({
  user: auth.userDetails,
  orderCount:order.orderCount,
  allOrderCount:order.allOrderCount,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getOrderCount,
  getAllOrderCount
}, dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(OrderActionLeft);
