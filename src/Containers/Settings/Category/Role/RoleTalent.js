import React, {useEffect,lazy,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Popconfirm,Input,Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
 import { BundleLoader } from "../../../../Components/Placeholder";
import {
    getTalentRoles,
    getExternalRoleCount,
    addTalentRoles,
    ClearReducerDataOfRoleTalent,
    searchRoleTalentName,
    updateTalentRoles,
    removeTalentRole
} from "./RoleAction";
import { Select } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../../Components/UI/Layout";

const { Option } = Select;

const RoleTalent = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [talentRoles, setRoteTalentData] = useState(props.talentRoles);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newRoleExternalName, setRoleExternalName] = useState('');
  useEffect(() => {
      props.getTalentRoles(props.orgId); 
      props.getExternalRoleCount(props.orgId) 
  }, [])

  const editRegion = (roleTypeExternalId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(roleTypeExternalId);
      setRoleExternalName(name);
  };



  const handleAddRoleExt = () => {
      setAddingRegion(true);
      setRoleExternalName("")
  };

  const handleUpdateRoleExt=(region)=>{
      console.log(region)
      let data={
        roleTypeExternalId:region.roleTypeExternalId,
        roleType:newRoleExternalName
       
      }
props.updateTalentRoles(data,region.roleTypeExternalId)
setEditingId(null);
  }

  const handleRoleExt = () => {
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
        roleType:newRoleExternalName,
        orgId:props.orgId,
      }
      props.addTalentRoles(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getTalentRoles(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchRoleTalentName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setRoleExternalName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.talentRoles.length > 0) {
        
        setRoteTalentData(props.talentRoles);
      }
    }, [props.talentRoles]);

// console.log(regions)
if (props.fetchingTalentRoles) {
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
          <div class="w-[38rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"roleTypeExternal"}`}>
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
                        placeholder="Add Role"
                      style={{border:"2px solid black"}}
                          type="text" 
                          value={newRoleExternalName} 
                          onChange={(e) => setRoleExternalName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingTalentRoles}
                      onClick={handleRoleExt}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddRoleExt}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingTalentRoles && talentRoles.length === 0 ? <NodataFoundPage /> : talentRoles.slice().sort((a, b) => a.roleType.localeCompare(b.roleType)).map((region, index) => (
            <div className="card h-8" key={region.roleTypeExternalId}>
            {/* Region name display or input field */}
            
            {editingId === region.roleTypeExternalId ? (
                <input
                placeholder="Update Role"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newRoleExternalName}
                    onChange={(e) => setRoleExternalName(e.target.value)}
                />
            ) : (
                <div className="region">{region.roleType}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div className="actions">
                {/* Edit button */}
                {editingId === region.roleTypeExternalId ? (
                    <div>
                        <button onClick={() => handleUpdateRoleExt(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon     className=" !text-icon text-red-600 cursor-pointer "  onClick={() => editRegion(region.roleTypeExternalId, region.roleType)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeTalentRole(region.roleTypeExternalId,props.orgId)}
                      >
                <DeleteOutlined 
                  className=" !text-icon text-red-600 cursor-pointer " 
              // onClick={() => 
              //     props.removeServiceLine(item.roleTypeExternalId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
        ))}
        </MainWrapper>
            </div>
      
  <div class=" font-bold">Updated on {dayjs(props.talentRoles && props.talentRoles.length && props.talentRoles[0].updationDate).format('YYYY-MM-DD')} by {props.talentRoles && props.talentRoles.length && props.talentRoles[0].name}</div>
      </div>
  );
};

const mapStateToProps = ({ role ,auth,departments}) => ({
    addingTalentRoles:role.addingTalentRoles,
    addingTalentRolesError: role.addingTalentRolesError,
    talentRoles: role.talentRoles,
fetchingTalentRoles: role.fetchingTalentRoles,
    fetchingRolesError:role.fetchingRolesError,
    orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTalentRoles,
        getExternalRoleCount,
        addTalentRoles,
        ClearReducerDataOfRoleTalent,
        searchRoleTalentName,
        updateTalentRoles,
         removeTalentRole,
       
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RoleTalent);
