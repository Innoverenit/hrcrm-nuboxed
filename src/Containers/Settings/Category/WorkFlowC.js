import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Popconfirm,Switch, message,Select,Button } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import dayjs from "dayjs";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getWorkFlowCategory,
  updateGlobalWorkflow,
  //getSectorCount,
  addWorkFlowCategory,
  addGloalType,
  //removeSectors,
  //updateSectors,
  //searchSectorName,
  //ClearReducerDataOfSupplierCategory
} from "../SettingsAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";

const { Option } = Select;  
const optionsData = [
  "Production",
  "Quotation",
  "Repair",
  "Supplier-Onboarding",
  "Task",
  "User-Onboarding",
  "Deals",
  "Others",
];
const WorkFlowC = (props) => {
  const [touched, setTouched] = useState(false);
  const [type, setType] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [currentData, setCurrentData] = useState("");
  const [workFlowCategory, setworkFlowCategory] = useState(props.workFlowCategory);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newCategoryName, setCategoryName] = useState('');
  useEffect(() => {
      props.getWorkFlowCategory(); 
   
  }, [])

  const editRegion = (sectorId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(sectorId);
      setCategoryName(name);
  };

  const handleSelectType = (value) => {
    setSelectedValue(value);
   
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
        name:newCategoryName,
        orgId:props.orgId,
        navType:selectedValue
      }
      props.addWorkFlowCategory(data)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getWorkFlowCategory();
     
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
    setSelectedValue(null);
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };


  const handleSelectChange = (value) => {
    setSelectedType(value)

    const selectedTypedata = type.find(type => type.workflowCategoryId === value);
    if (selectedTypedata) {
       let data={
      name:selectedTypedata.name,
      workflowCategoryId:selectedTypedata.workflowCategoryId
    }
    props.addGloalType(data)
      console.log('Selected Department ID:', selectedTypedata.workflowCategoryId);
      console.log('Selected Department Name:', selectedTypedata.name);
    }

    // let data={
    //   name:value
    // }
    // props.addGloalType()
    // console.log('Selected user:', value);
  };

  const handleSelectFocus = () => {
    if (!touched) {
      fetchType();
      // fetchSector();

      setTouched(true);
    }
  };


  const fetchType = async () => {
    setIsLoading(true);
    try {
      const apiEndpoint = `${base_url}/workflowCategory/get/All/globalInd`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setType(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const SwitchWithConfirm = ({ checked, onChange }) => (
    <Popconfirm
      title={`Are you sure you want to turn ${checked ? 'off' : 'on'} the switch?`}
      onConfirm={() => onChange(!checked)}
      okText="Yes"
      cancelText="No"
    >
      <Switch 
       checkedChildren="Yes"
                        unCheckedChildren="No"
      checked={checked} />
    </Popconfirm>
  );

  const handleSwitchChange = (key, checked) => {
    
    let data={
      globalInd:checked,
    }
    props.updateGlobalWorkflow(data,key)
    console.log(`Row ${key} switch is now ${checked}`);
  };


  const renderOptions = () => {
    return optionsData.map((option) => {
      const isDisabled = workFlowCategory.some((item) => item.name === option);
      return (
        <Option
          key={option}
          value={option}
          disabled={isDisabled}
          onClick={() => {
            if (isDisabled) {
              message.info(`${option} has already been selected.`);
            }
          }}
        >
          {option}
        </Option>
      );
    });
  };
  useEffect(() => {
      
      if (props.workFlowCategory.length > 0) {
        
        setworkFlowCategory(props.workFlowCategory);
      }
    }, [props.workFlowCategory]);

// console.log(regions)
if (props.fetchingWorkflowCategory) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-end items-center">
 
            <div className="add-region">
              {addingRegion ? (
                  <div style={{display:"flex"}}>
                      <input 
                        placeholder="Add workFlowCategory"
                      style={{border:"2px solid black",width:"55%"}}
                          type="text" 
                          value={newCategoryName} 
                          onChange={(e) => setCategoryName(e.target.value)} 
                      />
                        <Select
        style={{ width: '55%' }}
        placeholder="Select workFlowCategory"
        onChange={handleSelectType}
        disabled={!newCategoryName}
        value={selectedValue}
      >
       
           
            {renderOptions()}
           
          
        
      </Select>
                      <Button 
                        disabled={!selectedValue}
                         loading={props.addingWorkflowCategory}
                      onClick={handleSector}>Save</Button>
                      <Button onClick={handleCancelAdd}>Cancel</Button>
                  </div>

                  
              ) : (
                  <button 
                  loading={props.addingWorkflowCategory}
                  type="Primary"  
                  onClick={handleAddSector}><DataSaverOnIcon className=" !text-icon"/>Add More</button>
              )}
  {props.primaryOrgType === 'Child' && (
<Select
        showSearch
        style={{ width: 200,marginLeft:'20px' }}
        placeholder="Search or select type"
        optionFilterProp="children"
        loading={isLoading}
        onFocus={handleSelectFocus}
        onChange={handleSelectChange}
      >
        {type.map(sources => (
          <Option key={sources.workflowCategoryId} value={sources.workflowCategoryId}>
            {sources.name}
          </Option>
        ))}
      </Select>
   )} 
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingWorkflowCategory && workFlowCategory.length === 0 ? <NodataFoundPage /> : workFlowCategory.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
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
                <div >{region.name}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}
<div>
  <VisibilityIcon/>
</div>
           
            <div>
            {props.primaryOrgType === 'Parent' && (
                <SwitchWithConfirm
          checked={region.globalInd}
          onChange={checked => handleSwitchChange(region.workflowCategoryId, checked)}
        />
            )}             
            </div>
        </div>
        ))}
        </MainWrapper>
            </div>
      
  <div class=" font-bold">Updated on {dayjs(props.workFlowCategory && props.workFlowCategory.length && props.workFlowCategory[0].updationDate).format('YYYY-MM-DD')} by {props.workFlowCategory && props.workFlowCategory.length && props.workFlowCategory[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ sector,auth,settings }) => ({
    addingWorkflowCategory: settings.addingWorkflowCategory,
    addingWorkflowCategoryError: settings.addingWorkflowCategoryError,
  workFlowCategory: settings.workFlowCategory,
  primaryOrgType:auth.userDetails.primaryOrgType,
  sectorCount:sector.sectorCount,
  orgId: auth.userDetails.organizationId,
  removingSectors: sector.removingSectors,
  removingSectorsError: sector.removingSectorsError,
  fetchingWorkflowCategory: settings.fetchingWorkflowCategory,
  fetchingWorkflowCategoryError: settings.fetchingWorkflowCategoryError,

  updatingSectors: sector.updatingSectors,
  token: auth.token,
  orgId: auth.userDetails.organizationId,
  updatingSectorsError: sector.updatingSectorsError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //getSectorCount,
      getWorkFlowCategory,
      addWorkFlowCategory,
      updateGlobalWorkflow,
      addGloalType
      //removeSectors,
     // updateSectors,
      //searchSectorName,
      //ClearReducerDataOfSupplierCategory
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(WorkFlowC);
