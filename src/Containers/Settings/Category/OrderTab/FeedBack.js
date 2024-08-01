import React, { useEffect,lazy,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, message, Input } from "antd";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import {
  getFeedback,
  addFeedBack,
  removeFeedBack,
  updateFeedBack,
  getFeedBackCount,
} from "../../SettingsAction";
import dayjs from "dayjs"; 
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const FeedBack = (props) => {
    const [currentData, setCurrentData] = useState("");
    const [feedBack, setfeedBack] = useState(props.feedBackList);
    const [editingId, setEditingId] = useState(null);
    const [addingRegion, setAddingRegion] = useState(false);
    const [newDescriptionName, setDescriptionName] = useState('');
    const [newCodeName, setCodeName] = useState('');
    const [newQualityName, setQualityName] = useState('');
    useEffect(() => {
        props.getFeedback(); 
        props.getFeedBackCount(); 
    }, [])
  
    const editRegion = (feedbackId,name,description) => {
      // console.log(name)
      // console.log(name)
        setEditingId(feedbackId);
        setCodeName(name);
        setDescriptionName(description);
    };
  
  
  
    const handleaddFeedBack = () => {
        setAddingRegion(true);
      
        setCodeName("")
        setDescriptionName("")
    };
  
    const handleupdateFeedBack=(region)=>{
        console.log(region)
        let data={
            feedbackId:region.feedbackId,
        
            name:newCodeName,
          description:newDescriptionName,
         
        }
  props.updateFeedBack(data,region.feedbackId)
  setEditingId(null);
    }
  
    const handleQuality = () => {
        let data={
  
            name:newCodeName,
          description:newDescriptionName,
          orgId:props.orgId,
        }
        props.addFeedBack(data,)
        setAddingRegion(false)
    };
    const handleChange = (e) => {
        setCurrentData(e.target.value.trim());
      
    
        if (e.target.value.trim() === "") {
        //   setPage(pageNo + 1);
        props.getFeedback();
        //   props.ClearReducerDataOfLoad()
        }
      };
  
    //   const handleSearch = () => {
    //     if (currentData.trim() !== "") {
    //       // Perform the search
    //       props.searchQualityName(currentData);
    //     } else {
    //       console.error("Input is empty. Please provide a value.");
    //     }
    //   };
  
    const handleCancelAdd = () => {
    
      setCodeName("");
      setDescriptionName("");
        setAddingRegion(false);
    };
    const cancelEdit = () => {
        setEditingId(null);
    };
    useEffect(() => {
        
        if (props.feedBackList.length > 0) {
          
            setfeedBack(props.feedBackList);
        }
      }, [props.feedBackList]);
  
  // console.log(regions)
  if (props.fetchingFeedback) {
  return <div><BundleLoader/></div>;
  }
    return (
      <>
      <div class="" >
       
       <div class="flex flex-row justify-between">
             {/* <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
            // value={currentData}
          />
            </div> */}
            <div className="add-region">
                {addingRegion ? (
                    <div>
                        {/* <input 
                        style={{border:"2px solid black"}}
                            type="text" 
                            placeholder="Quality"
                            value={newQualityName} 
                            onChange={(e) => setQualityName(e.target.value)} 
                        /> */}
                          <input 
                            placeholder="Name"
                        style={{border:"2px solid black"}}
                            type="text" 
                            value={newCodeName} 
                            onChange={(e) => setCodeName(e.target.value)} 
                        />
                            <input 
                            placeholder="Description"
                        style={{border:"2px solid black"}}
                            type="text" 
                            value={newDescriptionName} 
                            onChange={(e) => setDescriptionName(e.target.value)} 
                        />
                        <button 
                           loading={props.addingFeedBack}
                        onClick={handleQuality}>Save</button>
                        <button onClick={handleCancelAdd}>Cancel</button>
                    </div>
                ) : (
                    <button  style={{backgroundColor:"tomato",color:"white"}}
                    onClick={handleaddFeedBack}> Add More</button>
                )}
            </div>
            </div>

    
            

            <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
            {!props.fetchingFeedback && feedBack.length === 0 ? <NodataFoundPage /> : feedBack.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
     
              <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.feedbackId}>
              {/* Region name display or input field */}
              
              {/* {editingId === region.feedbackId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      placeholder="Quality"
                      value={newQualityName}
                      onChange={(e) => setQualityName(e.target.value)}
                  />
              ) : (
                  <div className="region" style={{width:"16rem"}}>{region.qualityName}&nbsp;&nbsp;&nbsp;
                 </div>
              )} */}
               {editingId === region.feedbackId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      placeholder="Name"
                      value={newCodeName}
                      onChange={(e) => setCodeName(e.target.value)}
                  />
              ) : (
                  <div style={{width:"29rem"}}>{region.name}&nbsp;&nbsp;&nbsp;
                   {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                        >
                                          New
                                        </span> : null}
                 </div>
              )}

{editingId === region.feedbackId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      placeholder="Description"
                      value={newDescriptionName}
                      onChange={(e) => setDescriptionName(e.target.value)}
                  />
              ) : (
                  <div  style={{width:"39rem"}}>{region.description}
                  </div>
              )}
  
              {/* Action buttons */}
              <div >
                  {/* Edit button */}
                  {editingId === region.feedbackId ? (
                      <div>
                          <button onClick={() => handleupdateFeedBack(region)}>Save</button>
                          <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                      </div>
                  ) : (
                      <BorderColorIcon   style={{fontSize:"1rem", cursor:"pointer"}} 
                      onClick={() => editRegion(region.feedbackId,region.name,region.description)} 
                      />
                  )}
  
                  {/* Delete button */}
                  <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                           onConfirm={() =>  props.removeFeedBack(region.feedbackId)}
                        >
                  <DeleteOutlined 
                      className=" !text-icon text-red-600 cursor-pointer flex justify-center "
                // onClick={() => 
                //     props.removeServiceLine(item.feedbackId)
                //  }
                   />
                   </Popconfirm>
              </div>
          </div>
         ))}
</MainWrapper>
            </div>
   
        </div>
         <div class=" font-bold">Updated on {dayjs(props.feedBackList && props.feedBackList.length && props.feedBackList[0].updationDate).format('YYYY-MM-DD')} by {props.feedBackList && props.feedBackList.length && props.feedBackList[0].updatedBy}</div>
    </>
         );
  };



const mapStateToProps = ({  auth,settings }) => ({
    addingFeedBack: settings.addingFeedBack,
    addingFeedBackError: settings.addingFeedBackError,
  feedBackList: settings.feedBackList,
  feedBackCount:settings.feedBackCount,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    fetchingFeedback: settings.fetchingFeedback,
    fetchingFeedbackError: settings.fetchingFeedbackError,
    updatingFeedBack: settings.updatingFeedBack
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getFeedback,
          addFeedBack,
          removeFeedBack,
          updateFeedBack,
          getFeedBackCount
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
