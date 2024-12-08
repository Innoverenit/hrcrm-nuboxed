import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Popconfirm,Tooltip, Input } from "antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from "dayjs";
import {
    getModels,
//   getRoleCount,
  addModel,
//   updateRoles,
//   searchRoleName,removeRole,ClearReducerDataOfRole
} from "../Brand&Model/BrandModelAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import * as Yup from "yup";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { getBrandModel } from "../Brand&Model/BrandModelAction";
import { Select } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const { Option } = Select;


const Model = (props) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [error, setError] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [modelList, setRoleData] = useState(props.modelList);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newModelName, setModelName] = useState('');
  useEffect(() => {
      props.getModels(props.organizationId); 
      props.getBrandModel();
    //   props.getRoleCount(props.orgId) 
  }, [])

  const editRegion = (roleTypeId, model,brand) => {
    // console.log(name)
    // console.log(name)
      setEditingId(roleTypeId);
      setModelName(model);
      setSelectedBrand(brand)
  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
    
  };

  const handleAddModel = () => {
      setAddingRegion(true);
      setModelName("")
  };

  const handleUpdateModel=(region)=>{
      console.log(region)
      let data={
        roleTypeId:region.roleTypeId,
        organizationId:props.organizationId,
        userId:props.userId,
        model:newModelName,
        brand:selectedBrand,
       
      }
// props.updateRoles(data,region.roleTypeId)
setEditingId(null);
  }

  const handleModel = () => {

      let data={
        model:newModelName,
        organizationId:props.organizationId,
        userId:props.userId,
        brand:selectedBrand,
       
      }
      props.addModel(data,props.organizationId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getModels(props.organizationId); 
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        // props.searchRoleName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setModelName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.modelList.length > 0) {
        
        setRoleData(props.modelList);
      }
    }, [props.modelList]);

// console.log(regions)
if (props.fetchingModels) {
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
          {/* <div class="w-[23rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"roleType"}`}>
    <div className="circle-icon !text-base cursor-pointer text-[green]">
      <Tooltip placement="top" title="Download XL">
        <DownloadIcon />
      </Tooltip>
    </div>
  </a>
</div> */}
            <div className="add-region">
              {addingRegion ? (
                  <div>
                    
                      
                      <select 
    className="customize-select"
    onChange={handleBrandChange}
>
    <option value="">Select Brand</option>
    {props.brandModel.map((item) => (
        <option 
            key={item.phoneMasterListId} value={item.phoneMasterListId}>
            {item.brand}
        </option>
    ))}
</select>
<input 
                        placeholder="Add Model"
                      style={{border:"2px solid black",width: "35%",marginLeft:"1rem"}}
                          type="text" 
                          value={newModelName} 
                          onChange={(e) => setModelName(e.target.value)} 
                      />
      
      {error && <p style={{ color: "red" }}>{error}</p>}
   
                      <button 
                      className=" ml-2"
                         loading={props.addingRoles}
                      onClick={handleModel}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddModel}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
          <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingModels && modelList.length === 0 ? <NodataFoundPage /> : modelList.slice().sort((a, b) => a.roleType.localeCompare(b.roleType)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt-1  p-2 justify-between items-center " key={region.roleTypeId}>
            {/* Region name display or input field */}
            
          

{editingId === region.roleTypeId ? (
                                  <select 
                                  className="customize-select"
                                  onChange={handleBrandChange}
                              >
                                  <option value="">Select Brand</option>
                                  {props.brandModel.map((item) => (
                                      <option 
                                          key={item.phoneMasterListId} value={item.phoneMasterListId}>
                                          {item.brand}
                                      </option>
                                  ))}
                              </select>
              ) : (

                  <div  style={{width:"39rem"}}>{region.brand}&nbsp;&nbsp;&nbsp;
                  {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                        >
                                          New
                                        </span> : null}</div>
              )}

{editingId === region.roleTypeId ? (
              <>
                <input
                placeholder="Update Model"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newModelName}
                    onChange={(e) => setModelName(e.target.value)}
                />
     
                </>
            ) : (
                <div style={{width:"8rem"}}>
                  {region.model}</div>
            )}

            {/* Action buttons */}
            <div >
                {/* Edit button */}
                {editingId === region.roleTypeId ? (
                    <div>
                        <button onClick={() => handleUpdateModel(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                  <>
                  {region.editInd ? (
                    <BorderColorIcon   style={{fontSize:"1rem",cursor:"pointer"}} onClick={() => editRegion(region.roleTypeId, region.brand,region.model)} />
                    ) : null}
                    </>
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        // onConfirm={() =>  props.removeRole(region.roleTypeId,props.orgId)}
                      >
                <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                 </Popconfirm>
            </div>
        </div>
        ))}
        </MainWrapper>
            </div>
      
  <div class=" font-bold">Updated on {dayjs(props.modelList && props.modelList.length && props.modelList[0].updationDate).format('YYYY-MM-DD')} by {props.modelList && props.modelList.length && props.modelList[0].name}</div>
      </div>
  );
};

const mapStateToProps = ({ role,brandmodel, auth, }) => ({
  addingRoles: role.addingRoles,
  addingRolesError: role.addingRolesError,
  modelList: brandmodel.modelList,
  brandModel: brandmodel.brandModel,
  updatinRoles: role.updatingRoles,
  userId: auth.userDetails.userId,
  updatingRolesError: role.updatingRolesError,
  fetchingModels: brandmodel.fetchingModels,
  fetchingModelsError: brandmodel.fetchingModelsError,
  orgId: auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getModels,
    //   getRoleCount,
      addModel,
    //   updateRoles,
      getBrandModel,
    //   searchRoleName,
    //   removeRole,
    //   ClearReducerDataOfRole
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Model);
