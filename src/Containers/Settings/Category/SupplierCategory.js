import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { base_url } from "../../../Config/Auth";
import { Tooltip,Popconfirm } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getSupplierCategory,

  addSupplierCategory,
  removeSuppliers,
  updateSuppliers,
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
  const handleUpdateSupplier=(region)=>{
    console.log(region)
    let data={
      supplierCategoryId:region.supplierCategoryId,
      name:newCategoryName
     
    }
props.updateSuppliers(data,region.categoryId)
setEditingId(null);
}



  const handleAddSector = () => {
      setAddingRegion(true);
      setCategoryName("")
  };

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
    <div class=" flex flex-row justify-end items-center">
  
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
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.sectorId}>
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
                <div >{region.supplierCatName}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div >
                {/* Edit button */}
                {editingId === region.supplierCategoryId ? (
                    <div>
                        <button onClick={() => handleUpdateSupplier(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                      <BorderColorIcon   className=" !text-icon text-red-600 cursor-pointer "
                       onClick={() => editRegion(region.supplierCategoryId, region.supplierCatName)}
                        />                   
                )}
                {/* Delete button */}
                <Popconfirm
          title="Do you want to delete?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => props.removeSuppliers(region.supplierCategoryId)}
        >
          <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
        </Popconfirm>

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
      removeSuppliers,
      updateSuppliers,
      //searchSectorName,
      ClearReducerDataOfSupplierCategory
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SupplierCategory);
