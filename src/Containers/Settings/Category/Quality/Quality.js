import React, { useEffect,lazy,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, message, Input } from "antd";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import {
  getQuality,
  addQuality,
  removeQuality,
  updateQuality,
  searchQualityName,
  getQualityCount,
} from "../Quality/QualityAction";
import dayjs from "dayjs"; 
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const Quality = (props) => {
    const [currentData, setCurrentData] = useState("");
    const [qualityList, setQualityListData] = useState(props.qualityList);
    const [editingId, setEditingId] = useState(null);
    const [addingRegion, setAddingRegion] = useState(false);
    const [newDescriptionName, setDescriptionName] = useState('');
    const [newCodeName, setCodeName] = useState('');
    const [newQualityName, setQualityName] = useState('');
    useEffect(() => {
        props.getQuality(); 
        props.getQualityCount(); 
    }, [])
  
    const editRegion = (qualityId,code,description) => {
      // console.log(name)
      // console.log(name)
        setEditingId(qualityId);
        setCodeName(code);
        setDescriptionName(description);
    };
  
  
  
    const handleAddQuality = () => {
        setAddingRegion(true);
      
        setCodeName("")
        setDescriptionName("")
    };
  
    const handleUpdateQuality=(region)=>{
        console.log(region)
        let data={
            qualityId:region.qualityId,
        
          code:newCodeName,
          description:newDescriptionName,
         
        }
  props.updateQuality(data,region.qualityId)
  setEditingId(null);
    }
  
    const handleQuality = () => {
        let data={
  
          code:newCodeName,
          description:newDescriptionName,
          orgId:props.orgId,
        }
        props.addQuality(data,)
        setAddingRegion(false)
    };
    const handleChange = (e) => {
        setCurrentData(e.target.value.trim());
      
    
        if (e.target.value.trim() === "") {
        //   setPage(pageNo + 1);
        props.getQuality();
        //   props.ClearReducerDataOfLoad()
        }
      };
  
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.searchQualityName(currentData);
        } else {
          console.error("Input is empty. Please provide a value.");
        }
      };
  
    const handleCancelAdd = () => {
    
      setCodeName("");
      setDescriptionName("");
        setAddingRegion(false);
    };
    const cancelEdit = () => {
        setEditingId(null);
    };
    useEffect(() => {
        
        if (props.qualityList.length > 0) {
          
          setQualityListData(props.qualityList);
        }
      }, [props.qualityList]);
  
  // console.log(regions)
  if (props.fetchingQuality) {
  return <div><BundleLoader/></div>;
  }
    return (
      <>
      <div class="" >
       
       <div class="flex flex-row justify-between">
             <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
            // value={currentData}
          />
            </div>
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
                            placeholder="Code"
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
                           loading={props.addingQuality}
                        onClick={handleQuality}>Save</button>
                        <button onClick={handleCancelAdd}>Cancel</button>
                    </div>
                ) : (
                    <button  style={{backgroundColor:"tomato",color:"white"}}
                    onClick={handleAddQuality}> Add More</button>
                )}
            </div>
            </div>

    
            

            <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
            {!props.fetchingQuality && qualityList.length === 0 ? <NodataFoundPage /> : qualityList.slice().sort((a, b) => a.code.localeCompare(b.code)).map((region, index) => (
     
              <div className="card9" key={region.qualityId}>
              {/* Region name display or input field */}
              
              {/* {editingId === region.qualityId ? (
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
               {editingId === region.qualityId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      placeholder="Code"
                      value={newCodeName}
                      onChange={(e) => setCodeName(e.target.value)}
                  />
              ) : (
                  <div className="region" style={{width:"29rem"}}>{region.code}&nbsp;&nbsp;&nbsp;
                   {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                        >
                                          New
                                        </span> : null}
                 </div>
              )}

{editingId === region.qualityId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      placeholder="Description"
                      value={newDescriptionName}
                      onChange={(e) => setDescriptionName(e.target.value)}
                  />
              ) : (
                  <div className="region" style={{width:"39rem"}}>{region.description}
                  </div>
              )}
  
              {/* Action buttons */}
              <div className="actions">
                  {/* Edit button */}
                  {editingId === region.qualityId ? (
                      <div>
                          <button onClick={() => handleUpdateQuality(region)}>Save</button>
                          <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                      </div>
                  ) : (
                      <BorderColorIcon   style={{fontSize:"1rem", cursor:"pointer"}} 
                      onClick={() => editRegion(region.qualityId,region.code,region.description)} 
                      />
                  )}
  
                  {/* Delete button */}
                  <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                           onConfirm={() =>  props.removeQuality(region.qualityId)}
                        >
                  <DeleteOutlined 
                    style={{
                    
                      color: "red",
                      cursor:"pointer"
                    }}
                // onClick={() => 
                //     props.removeServiceLine(item.qualityId)
                //  }
                   />
                   </Popconfirm>
              </div>
          </div>
         ))}
</MainWrapper>
            </div>
   
        </div>
         <div class=" font-bold">Updated on {dayjs(props.qualityList && props.qualityList.length && props.qualityList[0].updationDate).format('YYYY-MM-DD')} by {props.qualityList && props.qualityList.length && props.qualityList[0].updatedBy}</div>
    </>
         );
  };



const mapStateToProps = ({ quality, auth }) => ({
  addingQuality: quality.addingQuality,
  addingQualityError: quality.addingQualityError,
    qualityList: quality.qualityList,
    qualityCount:quality.qualityCount,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    fetchingQuality: quality.fetchingQuality,
    fetchingQualityError: quality.fetchingQualityError,
    updatingQuality: quality.updatingQuality
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
          getQuality,
          addQuality,
          removeQuality,
          updateQuality,
          searchQualityName,
          getQualityCount
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(Quality);
