import React, { useEffect, useState } from "react";
import {  StyledSelect } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { Button, Input, Badge, Tooltip, Avatar } from "antd";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AudioOutlined, HistoryOutlined } from "@ant-design/icons";
import { getOrderCount, getAllOrderCount,inputOrderNoSearch,getAllHighOrderList,ClearSearchedOrder,
  getAllMediumOrderList,getAllLowOrderList, getCompletedHighOrderList,
  getCompletedMediumOrderList,
  getCompletedLowOrderList,
 } from "../Order/OrderAction";
import { FlexContainer } from "../../../Components/UI/Layout";

const { Search } = Input;
const Option = StyledSelect.Option;

function OrderActionLeft (props) {
 
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);


  useEffect(() => {
    if (props.viewType === "list") {
      props.getOrderCount(props.userId);
    } else if (props.viewType === "all") {
      props.getAllOrderCount();
    }
  }, [props.viewType, props.userId]);

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
      props.getAllHighOrderList(props.orgId,pageNo,"High");
      props.getAllMediumOrderList(props.orgId,pageNo,"Medium");
      props.getAllLowOrderList(props.orgId,pageNo,"Low");
      props.getCompletedHighOrderList(props.userId, pageNo,"High");
      props.getCompletedMediumOrderList(props.userId, pageNo,"Medium");
      props.getCompletedLowOrderList(props.userId, pageNo,"Low");
      props.ClearSearchedOrder();
      setSearchOnEnter(false);
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.inputOrderNoSearch(currentData);
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
      <>
      {props.user.productionInd === true && (
      <div className="">
        <Tooltip title="List View">
          <Badge
            size="small"
            count={(props.viewType === "production" && props.orderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setOrderViewType("production")}
              style={{
                color: props.viewType === "production" && "#1890ff",
              }}
            >
              
              <Button type={props.viewType === "production" ? "primary" : ""} style={{ backgroundColor: props.viewType === "production" ? "" : "tomato" }}>
             <div class="text-white">Production</div></Button>
            </span>
          </Badge>
        </Tooltip>
        <Tooltip title="Complete Orders">
          <Badge
            size="small"
            // count={(props.viewType === "complete" && orderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setOrderViewType("complete")}
              style={{
                color: props.viewType === "complete" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "complete" ? "#f279ab" : "#4bc076" }}>
                <HistoryOutlined fontSize="small" className="text-white" /></Avatar>

            </span>
          </Badge>
        </Tooltip>
        <Tooltip title="ALL">
          <Badge
            size="small"
            count={(props.viewType === "productionAll" && props.allOrderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setOrderViewType("productionAll")}
              style={{
                color: props.viewType === "productionAll" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "productionAll" ? "#f279ab" : "#4bc076" }}>
                <div className="text-white">ALL</div></Avatar>

            </span>
          </Badge>
        </Tooltip>
      </div>
     
     
)}
{props.user.repairInd === true && (
      <div className=" cursor-pointer">
        <Tooltip title="My Repair Orders">
          <Badge
            size="small"
            count={(props.viewType === "list" && props.orderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setOrderViewType("list")}
              style={{
                color: props.viewType === "list" && "#1890ff",
              }}
            >
              {/* <Avatar style={{ background: props.viewType === "list" ? "#f279ab" : "#4bc076" }}>
                <TocIcon className="text-white" /></Avatar> */}
<Button type={props.viewType === "list" ? "primary" : ""} style={{ backgroundColor: props.viewType === "list" ? "" : "tomato" }}>
                
                <div class="text-white">Repair</div></Button>
                
            </span>
          </Badge>
        </Tooltip>
        <Tooltip title="ALL">
          <Badge
            size="small"
            count={(props.viewType === "all" && props.allOrderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setOrderViewType("all")}
              style={{
                color: props.viewType === "all" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
                <div className="text-white">ALL</div></Avatar>

            </span>
          </Badge>
        </Tooltip>
        <Tooltip title="All Repair Orders-Completed">
          <Badge
            size="small"
            // count={(props.viewType === "allcomplete" && orderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setOrderViewType("allcomplete")}
              style={{
                color: props.viewType === "allcomplete" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "allcomplete" ? "#f279ab" : "#4bc076" }}>
                <HistoryOutlined fontSize="small" className="text-white" /></Avatar>

            </span>
          </Badge>
        </Tooltip>
        <Tooltip title=" All Repair Orders-Deleted">
                {/* <Badge
          size="small"
          count={(props.viewType === "delete" && props.deletedCountSupplier.deletedSupplier) || 0}
          overflowCount={999}
        > */}
                    <span class=" mr-2 text-sm cursor-pointer"
                        onClick={() => props.setOrderViewType("delete")}
                        style={{
                            color: props.viewType === "delete" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: props.viewType === "delete" ? "#f279ab" : "#4bc076" }}>
                        <DeleteOutlined className="text-white" /></Avatar>

                    </span>
                    {/* </Badge> */}
                </Tooltip>
        <Tooltip title="Prcoure">
          {/* <Badge
            size="small"
            count={(props.viewType === "list" && props.orderCount.order) || 0}

            overflowCount={999}
          > */}

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setOrderViewType("procure")}
              style={{
                color: props.viewType === "procure" && "#1890ff",
              }}
            >         
<Button type={props.viewType === "procure" ? "primary" : ""} style={{ backgroundColor: props.viewType === "procure" ? "" : "tomato" }}>
                
                <div class="text-white">Procure</div></Button>
                
            </span>
          {/* </Badge> */}
        </Tooltip>

        <Tooltip title="Completed Orders">
          {/* <Badge
            size="small"
            count={(props.viewType === "list" && props.orderCount.order) || 0}

            overflowCount={999}
          > */}

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setOrderViewType("completedorders")}
              style={{
                color: props.viewType === "completedorders" && "#1890ff",
              }}
            >         
<Button type={props.viewType === "completedorders" ? "primary" : ""} style={{ backgroundColor: props.viewType === "completedorders" ? "" : "tomato" }}>
                
                <div class="text-white">Completed Orders</div></Button>
                
            </span>
          {/* </Badge> */}
        </Tooltip>

        <Tooltip title="Cancelled Orders">
          {/* <Badge
            size="small"
            count={(props.viewType === "list" && props.orderCount.order) || 0}

            overflowCount={999}
          > */}

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setOrderViewType("cancelledorders")}
              style={{
                color: props.viewType === "cancelledorders" && "#1890ff",
              }}
            >         
<Button type={props.viewType === "cancelledorders" ? "primary" : ""} style={{ backgroundColor: props.viewType === "cancelledorders" ? "" : "tomato" }}>
                
                <div class="text-white">Cancelled Orders</div></Button>
                
            </span>
          {/* </Badge> */}
        </Tooltip>


      
      </div>
     
  
     
      )}
      <div class=" w-64 ml-2 max-sm:w-24">
        <Input
          placeholder="Search by Customer or Order ID"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
          value={currentData}
        /></div>
        </>
    </FlexContainer>
  );
};

const mapStateToProps = ({ auth, order }) => ({
  user: auth.userDetails,
  orderCount: order.orderCount,
  allOrderCount: order.allOrderCount,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getOrderCount,
  getAllOrderCount,
  inputOrderNoSearch,
  getAllHighOrderList,
  ClearSearchedOrder,
  getAllMediumOrderList,
  getAllLowOrderList,
  getCompletedHighOrderList,
  getCompletedMediumOrderList,
  getCompletedLowOrderList,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderActionLeft);
