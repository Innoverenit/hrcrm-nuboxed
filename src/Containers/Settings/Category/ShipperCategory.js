import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../Config/Auth";
import { Popconfirm, Input,Tooltip } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { DeleteOutlined } from "@ant-design/icons";
import {
  getShipperCategory,
  //getSectorCount,
  addShipperCategory,
  removeShipper,
  //updateSectors,
  //searchSectorName,
  //ClearReducerDataOfSupplierCategory
} from "../SettingsAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";


const ShipperCategory = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [shipperCategory, setshipperCategory] = useState(props.shipperCategory);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newCategoryName, setCategoryName] = useState('');
  useEffect(() => {
      props.getShipperCategory(); 
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

  const handleUpdateSector=(region)=>{
      console.log(region)
      let data={
        sectorId:region.sectorId,
        // sectorName:newSectorName
       
      }
props.updateSectors(data,region.sectorId)
setEditingId(null);
  }

  const handleSector = () => {
      let data={
        shipperCatName:newCategoryName,
        orgId:props.orgId,
      }
      props.addShipperCategory(data)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getShipperCategory();
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
      
      if (props.shipperCategory.length > 0) {
        
        setshipperCategory(props.shipperCategory);
      }
    }, [props.shipperCategory]);

// console.log(regions)
if (props.fetchingShipperCategory) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row  justify-end items-center">
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
                        placeholder="Add ShipperCategory"
                      style={{border:"2px solid black",width:"55%"}}
                          type="text" 
                          value={newCategoryName} 
                          onChange={(e) => setCategoryName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingShipperCategory}
                      onClick={handleSector}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button 
                  loading={props.addingShipperCategory}
                   style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddSector}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingShipperCategory && shipperCategory.length === 0 ? <NodataFoundPage /> : shipperCategory.slice().sort((a, b) => a.shipperCatName.localeCompare(b.shipperCatName)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.sectorId}>
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
                <div >{region.shipperCatName}&nbsp;&nbsp;&nbsp;
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
                        {/* <button onClick={() => handleUpdateSector(region)}>Save</button> */}
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                     <BorderColorIcon    className=" !text-icon text-red-600 cursor-pointer "
                      // onClick={() => editRegion(region.sectorId, region.sectorName)}
                       />
                    
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeShipper(region.shipperCategoryId)}
                      >
                <DeleteOutlined   className=" !text-icon text-red-600 cursor-pointer "/>
               
            
                
                 </Popconfirm>
            </div>
        </div>
        ))}
        </MainWrapper>
            </div>
      
  <div class=" font-bold">Updated on {dayjs(props.shipperCategory && props.shipperCategory.length && props.shipperCategory[0].updationDate).format('YYYY-MM-DD')} by {props.shipperCategory && props.shipperCategory.length && props.shipperCategory[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ sector,auth,settings }) => ({
    addingShipperCategory: settings.addingShipperCategory,
    addingShipperCategoryError: settings.addingShipperCategoryError,
  shipperCategory: settings.shipperCategory,
  sectorCount:sector.sectorCount,
  orgId: auth.userDetails.organizationId,
  removingSectors: sector.removingSectors,
  removingSectorsError: sector.removingSectorsError,
  fetchingShipperCategory: settings.fetchingShipperCategory,
  fetchingShipperCategoryError: settings.fetchingShipperCategoryError,

  updatingSectors: sector.updatingSectors,
  updatingSectorsError: sector.updatingSectorsError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //getSectorCount,
      getShipperCategory,
      addShipperCategory,
      removeShipper,
     // updateSectors,
      //searchSectorName,
      //ClearReducerDataOfSupplierCategory
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ShipperCategory);
