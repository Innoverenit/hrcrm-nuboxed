import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../Config/Auth";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
import { MainWrapper } from "../../../Components/UI/Layout";


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
    <div class=" flex flex-row items-center justify-end">
    <div class=" flex w-[18vw] mr-2 mt-[7px]"  >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
          <div class="w-[2rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"sector"}`}>
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
                        placeholder="Add Sector"
                      style={{border:"2px solid black",width:"55%"}}
                          type="text" 
                          value={newSectorName} 
                          onChange={(e) => setSectorName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingSectors}
                      onClick={handleSector}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button 
                  loading={props.addingSectors}
                   style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddSector}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingSectors && sectors.length === 0 ? <NodataFoundPage /> : sectors.map((region, index) => (
            <div className="flex rounded ml-1 font-bold  border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.sectorId}>
            {/* Region name display or input field */}
            
            {editingId === region.sectorId ? (
                <input
                placeholder="Update Sector"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newSectorName}
                    onChange={(e) => setSectorName(e.target.value)}
                />
            ) : (
                <div >{region.sectorName}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div >
                {/* Edit button */}
                {editingId === region.sectorId ? (
                    <div>
                        <button onClick={() => handleUpdateSector(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon className=" !text-icon text-red-600 cursor-pointer"   onClick={() => editRegion(region.sectorId, region.sectorName)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeSectors(region.sectorId,props.orgId)}
                      >
             <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  

              // onClick={() => 
              //     props.removeServiceLine(item.sectorId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
        ))}
        </MainWrapper>
            </div>
      
  <div class=" font-bold">Updated on {dayjs(props.sectors && props.sectors.length && props.sectors[0].updationDate).format('YYYY-MM-DD')} by {props.sectors && props.sectors.length && props.sectors[0].name}</div>
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
