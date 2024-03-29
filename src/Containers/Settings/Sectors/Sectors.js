import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../Config/Auth";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, Input,Tooltip } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getSectors,
  getSectorCount,
  addSectors,
  removeSectors,
  updateSectors,
  searchSectorName,
  ClearReducerDataOfSector
} from "./SectorsAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";


const Sectors = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [sectors, setSectorData] = useState(props.sectors);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newSectorName, setSectorName] = useState('');
  useEffect(() => {
      props.getSectors(); 
      props.getSectorCount(props.orgId) 
  }, [])

  const editRegion = (sectorId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(sectorId);
      setSectorName(name);
  };



  const handleAddSector = () => {
      setAddingRegion(true);
      setSectorName("")
  };

  const handleUpdateSector=(region)=>{
      console.log(region)
      let data={
        sectorId:region.sectorId,
        sectorName:newSectorName
       
      }
props.updateSectors(data,region.sectorId)
setEditingId(null);
  }

  const handleSector = () => {
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
        sectorName:newSectorName,
        orgId:props.orgId,
      }
      props.addSectors(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getSectors();
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchSectorName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setSectorName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.sectors.length > 0) {
        
        setSectorData(props.sectors);
      }
    }, [props.sectors]);

// console.log(regions)
if (props.fetchingSectors) {
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
          <Tooltip placement="left" title="XL">

<a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"sector"}`}>
<DownloadIcon 
className=" !text-base cursor-pointer text-[green]"/>
</a>

</Tooltip>
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black"}}
                          type="text" 
                          value={newSectorName} 
                          onChange={(e) => setSectorName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingItemTask}
                      onClick={handleSector}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddSector}> Add More</button>
              )}
          </div>
          </div>
          {!props.fetchingSectors && sectors.length === 0 ? <NodataFoundPage /> : sectors.slice().sort((a, b) => a.sectorName.localeCompare(b.sectorName)).map((region, index) => (
            <div className="card9" key={region.sectorId}>
            {/* Region name display or input field */}
            
            {editingId === region.sectorId ? (
                <input
                style={{border:"2px solid black"}}
                    type="text"
                    value={newSectorName}
                    onChange={(e) => setSectorName(e.target.value)}
                />
            ) : (
                <div className="region">{region.sectorName}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div className="actions">
                {/* Edit button */}
                {editingId === region.sectorId ? (
                    <div>
                        <button onClick={() => handleUpdateSector(region)}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   style={{fontSize:"1rem"}} onClick={() => editRegion(region.sectorId, region.sectorName)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeSectors(region.sectorId)}
                      >
                <DeleteOutlined 
                  style={{
                  
                    color: "red",
                  }}
              // onClick={() => 
              //     props.removeServiceLine(item.sectorId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
        ))}
      
  <div class=" font-bold">Updated on {dayjs(props.sectors && props.sectors.length && props.sectors[0].updationDate).format('YYYY-MM-DD')} by {props.sectors && props.sectors.length && props.sectors[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ sector,auth }) => ({
  addingSectors: sector.addingSectors,
  addingSectorsError: sector.addingSectorsError,
  sectors: sector.sectors,
  sectorCount:sector.sectorCount,
  orgId: auth.userDetails.organizationId,
  removingSectors: sector.removingSectors,
  removingSectorsError: sector.removingSectorsError,
  fetchingSectors: sector.fetchingSectors,
  fetchingSectorsError: sector.fetchingSectorsError,

  updatingSectors: sector.updatingSectors,
  updatingSectorsError: sector.updatingSectorsError,
  // fetchingDocuments: document.fetchingDocuments,
  // fetchingDocumentsError: document.fetchingDocumentsError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSectorCount,
      getSectors,
      addSectors,
      removeSectors,
      updateSectors,
      searchSectorName,
      ClearReducerDataOfSector
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Sectors);
