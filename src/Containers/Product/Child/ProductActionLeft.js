import React, { useEffect, useState,useRef } from "react";
import { FlexContainer } from "../../../Components/UI/Layout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Avatar,Badge,Input } from "antd";
import { AudioOutlined } from '@ant-design/icons';
import MenuIcon from '@mui/icons-material/Menu';
import { getRecords,getCategory,getDeletedProductRecords,catalogueCategorySearch} from "../ProductAction";
import CategoryIcon from '@mui/icons-material/Category';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';

const ProductActionLeft = (props) => {

  const [searchOnEnter, setSearchOnEnter] = useState(false); 
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); 
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);

  const [currentCatData, setCurrentCatData] = useState("");

  useEffect(() => {
    if (props.viewType === "table") {
      props.getRecords();
    } else if (props.viewType === "dashboard") {
      props.getDeletedProductRecords();
    } 

  }, [props.viewType]);


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
        setCurrentCatData(transcript);
      }
      }, [ transcript]);

      const handleCatChange = (e) => {
        setCurrentCatData(e.target.value);
    
        if (searchOnEnter && e.target.value.trim() === "") {  //Code for Search
           
          props.getCategory();
          setSearchOnEnter(false);
        }
      };
      const handleCatSearch = () => {
        if (currentCatData.trim() !== "") {
          // Perform the search
          props.catalogueCategorySearch(currentCatData);
          setSearchOnEnter(true);  //Code for Search
        } else {
          console.error("Input is empty. Please provide a value.");
        }
      };

      const handleStartListening = () => {
        setStartTime(Date.now());
        setIsRecording(true);
        SpeechRecognition.startListening();
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          SpeechRecognition.stopListening();
          setIsRecording(false);
        }, minRecordingTime);
      };
      const suffix = (
        <AudioOutlined
          onClick={handleStartListening}
          style={{
            fontSize: 16,
            color: '#1890ff',
          }}
    
        />
      );
    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        setIsRecording(false);
        if (transcript.trim() !== "") {
          setCurrentCatData(transcript);
          props.catalogueCategorySearch(currentCatData);
          setSearchOnEnter(true);
        }
      };
      useEffect(() => {
        if (!listening && isRecording) {
          handleStopListening();
        }
      }, [listening]);
      useEffect(() => {
        if (isRecording && !listening) {
          // If recording was stopped but less than 5 seconds have passed, restart listening
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < minRecordingTime) {
            SpeechRecognition.startListening();
          } else {
            setIsRecording(false);
          }
        }
      }, [listening, isRecording, startTime]);
  return (
    <FlexContainer alignItems="center">
      <Tooltip title="Active Products">
      <Badge
          size="small"
           count={( props.recordData.product) || 0}
          overflowCount={999}
        >
        <div
          class=" mr-2 text-sm cursor-pointer"
          style={{

            color: props.viewType === "table" && "red",
          }}
          onClick={() => props.setProductViewType("table")}
        >
          <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#4bc076" }}>
            <MenuIcon className="text-white !text-icon" />
          </Avatar>

        </div>
        </Badge>
      </Tooltip>

      {/* <Tooltip
        title="Category"
      >
        <span className="mr-2 text-sm cursor-pointer">
          <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
            <AlipayOutlined
              className="!text-2xl cursor-pointer"
              onClick={() => setProductViewType("all")}
              style={{
                color: viewType === "all" && "#1890ff",
              }} />
          </Avatar>
        </span>
      </Tooltip> */}

     

      <Tooltip title="Category">
        <div
          class=" ml-2 text-sm cursor-pointer"
          style={{

            color: props.viewType === "category" && "red",
          }}
          onClick={() => props.setProductViewType("category")}
        >
          <Avatar style={{ background: props.viewType === "category" ? "#f279ab" : "#4bc076" }}>
            <CategoryIcon className="text-white cursor-pointer !text-icon" />
          </Avatar>

        </div>
      </Tooltip>

<Tooltip title="Suspended Products">
<Badge
    size="small"
     count={( props.deletedProductCount.deletedProduct) || 0}
    overflowCount={999}
  >
  <Avatar style={{ background: props.viewType === "dashboard" ? "#f279ab" : "#4bc076" }}>
    <DeleteOutlined
      className="!text-icon cursor-pointer "
      style={{

        color: props.viewType === "dashboard" && "red",
      }}
      onClick={() => props.setProductViewType("dashboard")}
    />
  </Avatar>
  </Badge>
</Tooltip>
<div class=" w-64 max-sm:w-24">
                
{props.viewType === "category" &&
<Input
          placeholder="Search by Category Name "
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleCatSearch}
          onChange={handleCatChange}
        value={currentCatData}
        />}
            </div>
    </FlexContainer>
  );

}
const mapStateToProps = ({ product, auth }) => ({
  user: auth.userDetails,
  deletedProductCount:product.deletedProductCount,
  recordData: product.recordData,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecords,
      getDeletedProductRecords,
      catalogueCategorySearch,
      getCategory
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionLeft);
