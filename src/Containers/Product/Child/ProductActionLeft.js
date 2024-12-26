import React, { useEffect, useState,useRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip, Avatar,Badge,Input } from "antd";
import MicIcon from '@mui/icons-material/Mic';
import MenuIcon from '@mui/icons-material/Menu';
import { getRecords,getCategory,getDeletedProductRecords,
  catalogueCategorySearch,catalougeClear} from "../ProductAction";
import CategoryIcon from '@mui/icons-material/Category';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';

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
           
          // props.getProducts(0);
          props.catalougeClear()
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
        <MicIcon
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
          props.catalogueCategorySearch(transcript);
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
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
      <Tooltip title={props.translatedMenuItems[5]}>
      <Badge
          size="small"
           count={( props.recordData.product) || 0}
          overflowCount={999}
        >
        <div
          class=" mr-2 text-xs cursor-pointer"
          style={{

            color: props.viewType === "table" && "red",
          }}
          onClick={() => props.setProductViewType("table")}
        >
          <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#28a355",
                 boxShadow: props.viewType === "table" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "table" ? "scale(1.05)" : "scale(1)"
           }}>
            <MenuIcon className="text-white !text-icon" />
          </Avatar>

        </div>
        </Badge>
      </Tooltip>
    
      <Tooltip title={props.translatedMenuItems[6]}>
        <div
          class=" mr-2 text-xs cursor-pointer"
          style={{

            color: props.viewType === "category" && "red",
          }}
          onClick={() => props.setProductViewType("category")}
        >
          <Avatar style={{ background: props.viewType === "category" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "category" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "category" ? "scale(1.05)" : "scale(1)" }}>
            <CategoryIcon className="text-white cursor-pointer !text-icon" />
          </Avatar>

        </div>
      </Tooltip>

      <Tooltip title={props.translatedMenuItems[7]}>
        <div
          class=" mr-2 text-xs cursor-pointer"
          style={{

            color: props.viewType === "brandModel" && "red",
          }}
          onClick={() => props.setProductViewType("brandModel")}
        >
          <Avatar style={{ background: props.viewType === "brandModel" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "brandModel" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "brandModel" ? "scale(1.05)" : "scale(1)" }}>
            <ModelTrainingIcon className="text-white cursor-pointer !text-icon" />  
          </Avatar>

        </div>
      </Tooltip>

      <Tooltip title={props.translatedMenuItems[8]}>
<Badge
    size="small"
     count={( props.deletedProductCount.deletedProduct) || 0}
    overflowCount={999}
  >
  <Avatar style={{ background: props.viewType === "dashboard" ? "#f279ab" : "#28a355" ,
               boxShadow: props.viewType === "dashboard" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "dashboard" ? "scale(1.05)" : "scale(1)"}}>
      <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  
      style={{

        color: props.viewType === "dashboard" && "red",
      }}
      onClick={() => props.setProductViewType("dashboard")}
    />
  </Avatar>
  </Badge>
</Tooltip>

<Tooltip title={props.translatedMenuItems[9]}>
        <div
          class=" ml-2 text-xs cursor-pointer"
          style={{

            color: props.viewType === "brand" && "red",
          }}
          onClick={() => props.setProductViewType("brand")}
        >
          <Avatar style={{ background: props.viewType === "brand" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "brand" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "brand" ? "scale(1.05)" : "scale(1)" }}>
            <BrandingWatermarkIcon className="text-white cursor-pointer !text-icon" />
          </Avatar>

        </div>
      </Tooltip>


      {/* <Tooltip title={translatedMenuItems[2]}>
        <div
          class=" ml-2 text-xs cursor-pointer"
          style={{

            color: props.viewType === "brandModel" && "red",
          }}
          onClick={() => props.setProductViewType("brandModel")}
        >
          <Avatar style={{ background: props.viewType === "brandModel" ? "#f279ab" : "#28a355" }}>
            <BrandingWatermarkIcon className="text-white cursor-pointer !text-icon" />
          </Avatar>

        </div>
      </Tooltip> */}


      <Tooltip title={props.translatedMenuItems[10]}>
        <div
          class=" ml-2 text-xs cursor-pointer"
          style={{

          color: props.viewType === "instate" && "red",
          }}
          onClick={() => props.setProductViewType("instate")}
        >
          <Avatar style={{ background: props.viewType === "instate" ? "#f279ab" : "#28a355",
               boxShadow: props.viewType === "instate" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "instate" ? "scale(1.05)" : "scale(1)" }}>
            <BrandingWatermarkIcon className="text-white cursor-pointer !text-icon" />
          </Avatar>

        </div>
      </Tooltip>

      
<div class=" w-64 max-sm:w-24">
                
{/* {props.viewType === "category" && */}
<Input
          placeholder={props.translatedMenuItems[11]}
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleCatSearch}
          onChange={handleCatChange}
        value={currentCatData}
        />
         {/* } */}
            </div>
    </div>
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
      getCategory,
      catalougeClear
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionLeft);
