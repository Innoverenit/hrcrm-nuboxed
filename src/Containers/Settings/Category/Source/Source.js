import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Tooltip, Input } from "antd";
import dayjs from "dayjs";
import { Select } from "../../../../Components/UI/Elements";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import {
  getSources,
  getSourceCount,
  searchSourceName,
  ClearReducerDataOfSource,
  addSources,
  removeSource,
  updateSource
} from "./SourceAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
const SingleSource = lazy(() =>
  import("./SingleSource")
);

const Source = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [sources, setSourceData] = useState(props.sources);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newSourceName, setSourceName] = useState('');
  useEffect(() => {
      props.getSources(props.orgId); 
      props.getSourceCount(props.orgId) 
  }, [])

  const editRegion = (sourceId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(sourceId);
      setSourceName(name);
  };



  const handleAddSource = () => {
      setAddingRegion(true);
      setSourceName("")
  };

  const handleUpdateSource=(region)=>{
      console.log(region)
      let data={
        sourceId:region.sourceId,
        name:newSourceName
       
      }
props.updateSource(data,region.sourceId)
setEditingId(null);
  }

  const handleSource = () => {
      // if (newRegionName.trim() !== '') {
      //     console.log("New Region:", newRegionName);
      //     const newRegion = {
      //         id: Date.now(),
      //         item: newRegionName
      //     };
      //     setRegions([...regions, newRegion]);
      //     setNewRegionName('');
      //     setAddingRegion(false);
      // }
      let data={
        name:newSourceName,
        orgId:props.orgId,
      }
      props.addSources(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getSources(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchSourceName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setSourceName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.sources.length > 0) {
        
        setSourceData(props.sources);
      }
    }, [props.sources]);

// console.log(regions)
if (props.fetchingSources) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-between">
    <div class=" flex w-[18vw]" style={{marginTop:"12px"}} >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
          <div class="w-[18rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"source"}`}>
    <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
  </a>
</div>
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black"}}
                          type="text" 
                          placeholder="Add Source"
                          value={newSourceName} 
                          onChange={(e) => setSourceName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingItemTask}
                      onClick={handleSource}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddSource}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingSources && sources.length === 0 ? <NodataFoundPage /> : sources.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="card9" key={region.sourceId}>
            {/* Region name display or input field */}
            
            {editingId === region.sourceId ? (
                <input
                style={{border:"2px solid black"}}
                    type="text"
                    placeholder="Update Source"
                    value={newSourceName}
                    onChange={(e) => setSourceName(e.target.value)}
                />
            ) : (
                <div className="region">{region.name}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div className="actions">
                {/* Edit button */}
                {editingId === region.sourceId ? (
                    <div>
                        <button onClick={() => handleUpdateSource(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   style={{fontSize:"1rem"}} onClick={() => editRegion(region.sourceId, region.name)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeSource(region.sourceId,props.orgId)}
                      >
                <DeleteOutlined 
                  style={{
                  
                    color: "red",
                  }}
              // onClick={() => 
              //     props.removeServiceLine(item.sourceId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
          ))}
          </MainWrapper>
            </div>
  <div class=" font-bold">Updated on {dayjs(props.sources && props.sources.length && props.sources[0].updationDate).format('YYYY-MM-DD')} by {props.sources && props.sources.length && props.sources[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ source,auth }) => ({
  addingSources: source.addingSources,
  addingSourcesError: source.addingSourcesError,
sources: source.sources,
sourceCount:source.sourceCount,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingSources: source.removingSources,
removingSourcesError: source.removingSourcesError,
fetchingSources: source.fetchingSources,
fetchingSourcesError: source.fetchingSourcesError,

updatingSources: source.updatingSources,
updatingSourcesError: source.updatingSourcesError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSources,
      getSourceCount,
      addSources,
      removeSource,
      updateSource,
      ClearReducerDataOfSource,
      searchSourceName
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Source);
