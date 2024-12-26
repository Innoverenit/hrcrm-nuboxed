import React, { useEffect, useState,useRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip, Badge, Avatar,Input } from "antd";
import MicIcon from '@mui/icons-material/Mic';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {materialCategorySearch,getMaterialCategory, getSuppliesCount,getSuppliesDeletedCount,getSuppliesList,ClearReducerDataOfMaterial,inputSuppliesDataSearch } from "./SuppliesAction";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

function SuppliesActionLeft (props) {

  useEffect(() => {
    if (props.viewType === "all") {
      props.getSuppliesCount();
    } else if (props.viewType === "dashboard") {
      props.getSuppliesDeletedCount(props.userId);
    }
  }, [props.viewType, props.userId]);

   
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false); 
    const [pageNo, setPage] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isRecording, setIsRecording] = useState(false); 
    const minRecordingTime = 3000; // 3 seconds
    const timerRef = useRef(null);
    const dummy = ["cloud", "azure", "fgfdg"];
    // const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [currentCatData, setCurrentCatData] = useState("");

    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useEffect(() => {
      // props.getCustomerRecords();
      if (transcript) {
        console.log(">>>>>>>", transcript);
        setCurrentData(transcript);
      }
      }, [ transcript]);

        const {
            viewType,
            setSuppliesViewType,
            suppliesCount,
            suppliesDeletedCount,
        } = props;

     
          const handleChange = (e) => {
            setCurrentData(e.target.value);
        
            if (searchOnEnter && e.target.value.trim() === "") {
              setPage(pageNo + 1);
              props.getSuppliesList(pageNo);
              props.ClearReducerDataOfMaterial()
              setSearchOnEnter(false);
            }
          };
          const handleSearch = () => {
            if (currentData.trim() !== "") {
              props.inputSuppliesDataSearch(currentData);
              setSearchOnEnter(true);  // Code for Search
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
              setCurrentData(transcript);
              props.inputSuppliesDataSearch(transcript);
              setSearchOnEnter(true);
            }
          };


          const handleCatChange = (e) => {
            setCurrentCatData(e.target.value);
        
            if (searchOnEnter && e.target.value.trim() === "") {  //Code for Search
               
              props.getMaterialCategory();
              setSearchOnEnter(false);
            }
          };
          const handleCatSearch = () => {
            if (currentCatData.trim() !== "") {
              // Perform the search
              props.materialCategorySearch(currentCatData);
              setSearchOnEnter(true);  //Code for Search
            } else {
              console.error("Input is empty. Please provide a value.");
            }
          };

       
       
        // const handleStopListening = () => {
        //     SpeechRecognition.stopListening();
        //     setIsRecording(false);
        //     if (transcript.trim() !== "") {
        //       setCurrentData(transcript);
        //       props.inputSuppliesDataSearch(transcript);
        //       setCurrentCatData(transcript);
        //       props.materialCategorySearch(transcript);
        //       setSearchOnEnter(true);
        //     }
        //   };
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


          // useEffect(() => {
          //   const fetchMenuTranslations = async () => {
          //     try {
          //       const itemsToTranslate = [
          //        "1237",//0
          //         "228",//1
          //         "14",//2
          //         "798",//3
          //         "264",// Brand
          //        "1607", // Brand Model
                 
        
          //       ];
        
          //       const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          //       setTranslatedMenuItems(translations);
          //     } catch (error) {
          //       console.error('Error translating menu items:', error);
          //     }
          //   };
        
          //   fetchMenuTranslations();
          // }, [props.selectedLanguage]);

        return (
            <>
         
            <div class="flex items-center">

                         {/* All Materials  */}
                <Tooltip title={props.translatedMenuItems[0]}>
               
                        <div class="  text-sm cursor-pointer"
                            onClick={() => setSuppliesViewType("all")}
                            style={{

                                color: viewType === "all" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#28a355",
 boxShadow: props.viewType === "all" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "all" ? "scale(1.05)" : "scale(1)"

                             }}>
                                <div className="text-white cursor-pointer">{props.translatedMenuItems[1]}</div></Avatar>
                                <Badge size="small"
                        count={(viewType === "all" && suppliesCount.count) || 0}
                        overflowCount={999}
                        offset={[ -10, -16]}
                    >
                    </Badge>

                        </div>
                        
                      
                </Tooltip>
                <Tooltip title={props.translatedMenuItems[2]}>
        <div
          class="  text-sm cursor-pointer"
          style={{

            color: viewType === "category" && "red",
          }}
          onClick={() => setSuppliesViewType("category")}
        >
          <Avatar style={{ background: viewType === "category" ? "#f279ab" : "#28a355",

             boxShadow: props.viewType === "category" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "category" ? "scale(1.05)" : "scale(1)"
           }}>
            <WidgetsIcon className="text-white cursor-pointer !text-icon" /> 
          </Avatar>

        </div>
      </Tooltip>

                


        {/* Brand */}       <Tooltip title={props.translatedMenuItems[4]}> 
        <div
          class="  text-xs cursor-pointer"
          style={{

            color: viewType === "brand" && "red",
          }}
          onClick={() => setSuppliesViewType("brand")}
        >
          <Avatar style={{ background: viewType === "brand" ? "#f279ab" : "#28a355",
             boxShadow: props.viewType === "brand" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "brand" ? "scale(1.05)" : "scale(1)"
           }}>
            <BrandingWatermarkIcon className="text-white cursor-pointer !text-icon" />
          </Avatar>

        </div>
      </Tooltip>


      <Tooltip title={props.translatedMenuItems[5]}>
        <div
          class="  text-xs cursor-pointer"
          style={{

            color: viewType === "brandModel" && "red",
          }}
          onClick={() => setSuppliesViewType("brandModel")}
        >
          <Avatar style={{ background: viewType === "brandModel" ? "#f279ab" : "#28a355",
             boxShadow: props.viewType === "brandModel" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "brandModel" ? "scale(1.05)" : "scale(1)"
           }}>
          <ModelTrainingIcon className="text-white cursor-pointer !text-icon" />
          </Avatar>
       
        </div>
      </Tooltip>

     
      <Tooltip title={props.translatedMenuItems[3]}>
                <Badge size="small"
                        count={(viewType === "dashboard" && suppliesDeletedCount.deleteCount) || 0}
                        overflowCount={999}
                    >
                        <span class="  text-sm cursor-pointer"
                            onClick={() => setSuppliesViewType("dashboard")}
                            style={{
                                color: viewType === "dashboard" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "dashboard" ? "#f279ab" : "#28a355" ,
                               boxShadow: props.viewType === "dashboard" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "dashboard" ? "scale(1.05)" : "scale(1)"
                            }}>
                                <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  /></Avatar>

                        </span>
                    </Badge>
                </Tooltip>



                <Tooltip 
                title="Inventory"
                >
                <Badge size="small"
                        //count={(viewType === "dashboard" && suppliesDeletedCount.deleteCount) || 0}
                        //overflowCount={999}
                    >
                        <span class="  text-sm cursor-pointer"
                            onClick={() => setSuppliesViewType("suppliesLocation")}
                            style={{
                                color: "blue",
                            }}
                        >
                            <Avatar style={{ background: viewType === "suppliesLocation" ? "#f279ab" : "#28a355",
                               boxShadow: props.viewType === "suppliesLocation" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "suppliesLocation" ? "scale(1.05)" : "scale(1)"
                             }}>
                                <LocationOnIcon 
                                className="text-white cursor-pointer !text-icon"
                                />
                                </Avatar>

                        </span>
                    </Badge>
                </Tooltip>
                <Tooltip 
                title="Updates"
                >
               
                        <span class="  text-sm cursor-pointer"
                            onClick={() => setSuppliesViewType("newList")}
                            style={{
                                color: "blue",
                            }}
                        >
                            <Avatar style={{ background: viewType === "newList" ? "#f279ab" : "#28a355",
                               boxShadow: props.viewType === "newList" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "newList" ? "scale(1.05)" : "scale(1)"
                             }}>
                                <AccountTreeIcon 
                                className="text-white cursor-pointer !text-icon"
                                />
                                </Avatar>

                        </span>
                   
                </Tooltip>
                <div class=" w-64 max-sm:w-24">
                {viewType === "all" &&         
         <Input
         placeholder="Search by All"
         class="w-96"
         suffix={suffix}
         onPressEnter={handleSearch}
         onChange={handleChange}
         value={currentData}
       />
        
        }
{viewType === "category" &&
<Input
          placeholder=""
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleCatSearch}
          onChange={handleCatChange}
        value={currentCatData}
        />}
            </div>
            </div> 
</>
        );
}
const mapStateToProps = ({ supplies }) => ({
    suppliesCount: supplies.suppliesCount,
    suppliesDeletedCount:supplies.suppliesDeletedCount,
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSuppliesCount,
            getSuppliesDeletedCount,
            inputSuppliesDataSearch,
            ClearReducerDataOfMaterial,
            getSuppliesList,
            getMaterialCategory,
            materialCategorySearch
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesActionLeft);
