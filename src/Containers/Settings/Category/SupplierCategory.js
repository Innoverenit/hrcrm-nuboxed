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
  getSupplierCategory,
  //getSectorCount,
  addSupplierCategory,
  //removeSectors,
  //updateSectors,
  //searchSectorName,
  ClearReducerDataOfSupplierCategory
} from "../SettingsAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";


const SupplierCategory = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [supplyategory, setSupplyategory] = useState(props.supplyCategory);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newCategoryName, setCategoryName] = useState('');
  useEffect(() => {
      props.getSupplierCategory(); 
    //  props.getSectorCount(props.orgId) 
  }, [])

  const editRegion = (sectorId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(sectorId);
      setCategoryName(name);
  };



  const handleAddSector = () => {
      setAddingRegion(true);
      setCategoryName("")
  };

//   const handleUpdateSector=(region)=>{
//       console.log(region)
//       let data={
//         sectorId:region.sectorId,
//         sectorName:newSectorName
       
//       }
// props.updateSectors(data,region.sectorId)
// setEditingId(null);
//   }

  const handleSector = () => {
      let data={
        supplierCatName:newCategoryName,
        orgId:props.orgId,
      }
      props.addSupplierCategory(data)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getSupplierCategory();
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
    setCategoryName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.supplyCategory.length > 0) {
        
        setSupplyategory(props.supplyCategory);
      }
    }, [props.supplyCategory]);

// console.log(regions)
if (props.fetchingSupplyCategory) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-between">
    {/* <div class=" flex w-[18vw]" style={{marginTop:"12px"}} >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div> */}
          <div class="w-[18rem]">
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
                        placeholder="Add SupplierCategory"
                      style={{border:"2px solid black",width:"55%"}}
                          type="text" 
                          value={newCategoryName} 
                          onChange={(e) => setCategoryName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingSupplyCategory}
                      onClick={handleSector}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button 
                  loading={props.addingSupplyCategory}
                   style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddSector}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingSupplyCategory && supplyategory.length === 0 ? <NodataFoundPage /> : supplyategory.slice().sort((a, b) => a.supplierCatName.localeCompare(b.supplierCatName)).map((region, index) => (
            <div className="card9" key={region.sectorId}>
            {/* Region name display or input field */}
            
            {editingId === region.sectorId ? (
                <input
                placeholder="Update Sector"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            ) : (
                <div className="region">{region.supplierCatName}&nbsp;&nbsp;&nbsp;
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
                        {/* <button onClick={() => handleUpdateSector(region)}>Save</button> */}
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    // <BorderColorIcon   style={{fontSize:"1rem", cursor:"pointer"}} onClick={() => editRegion(region.sectorId, region.sectorName)} />
                    <></>
                )}

                {/* Delete button */}
                {/* <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeSectors(region.sectorId,props.orgId)}
                      >
                <DeleteOutlined 
                  style={{
                  
                    color: "red",
                    cursor:"pointer"
                  }}
            
                 />
                 </Popconfirm> */}
            </div>
        </div>
        ))}
        </MainWrapper>
            </div>
      
  <div class=" font-bold">Updated on {dayjs(props.supplyCategory && props.supplyCategory.length && props.supplyCategory[0].updationDate).format('YYYY-MM-DD')} by {props.supplyCategory && props.supplyCategory.length && props.supplyCategory[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ sector,auth,settings }) => ({
    addingSupplyCategory: settings.addingSupplyCategory,
    addingSupplyCategoryError: settings.addingSupplyCategoryError,
  supplyCategory: settings.supplyCategory,
  sectorCount:sector.sectorCount,
  orgId: auth.userDetails.organizationId,
  removingSectors: sector.removingSectors,
  removingSectorsError: sector.removingSectorsError,
  fetchingSupplyCategory: settings.fetchingSupplyCategory,
  fetchingSupplyCategoryError: settings.fetchingSupplyCategoryError,

  updatingSectors: sector.updatingSectors,
  updatingSectorsError: sector.updatingSectorsError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //getSectorCount,
      getSupplierCategory,
      addSupplierCategory,
      //removeSectors,
     // updateSectors,
      //searchSectorName,
      ClearReducerDataOfSupplierCategory
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SupplierCategory);
