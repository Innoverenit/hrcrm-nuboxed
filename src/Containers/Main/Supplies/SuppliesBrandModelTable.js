import React, { useEffect,lazy,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, message, Input } from "antd";
import { MainWrapper } from "../../../Components/UI/Layout";
import { BundleLoader } from "../../../Components/Placeholder";
import {
    getBrandModel,
    addBrandModel,
} from "../../Settings/Category/Brand&Model/BrandModelAction";
import dayjs from "dayjs"; 
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";

const SuppliesBrandModelList = (props) => {
    const [currentData, setCurrentData] = useState("");
    const [brandModel, setBrandModelData] = useState(props.brandModel);
    const [editingId, setEditingId] = useState(null);
    const [addingRegion, setAddingRegion] = useState(false);
    
    const [newModelName, setModelName] = useState('');
    const [newBrandModelName, setBrandModelName] = useState('');
    useEffect(() => {
        props.getBrandModel(props.orgId); 
        // props.getShipByCount(props.orgId) 
    }, [])
  
    const editRegion = (phoneMasterListId, name) => {
      console.log(name)
      console.log(name)
        setEditingId(phoneMasterListId);
        setBrandModelName(name);
    };
  
  
  
    const handleAddBrandModel = () => {
        setAddingRegion(true);
        setBrandModelName("")
        setModelName("")
    };
  
    const handleUpdateBrandModel=(region)=>{
        console.log(region)
        let data={
            phoneMasterListId:region.phoneMasterListId,
          brand:newBrandModelName,
          model:newModelName,
         
        }
  props.updateShipBy(data,region.phoneMasterListId)
  setEditingId(null);
    }
  
    const handleBrandModel = () => {
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
          brand:newBrandModelName,
          model:newModelName,
          orgId:props.orgId,
        }
        props.addBrandModel(data,props.orgId)
        setAddingRegion(false)
    };
    const handleChange = (e) => {
        setCurrentData(e.target.value.trim());
      
    
        if (e.target.value.trim() === "") {
        //   setPage(pageNo + 1);
        props.getShipByData(props.orgId);
        //   props.ClearReducerDataOfLoad()
        }
      };
  
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.searchShipByName(currentData);
        } else {
          console.error("Input is empty. Please provide a value.");
        }
      };
  
    const handleCancelAdd = () => {
        setBrandModelName('');
        setModelName("");
        setAddingRegion(false);
    };
    const cancelEdit = () => {
        setEditingId(null);
    };
    useEffect(() => {
        
        if (props.brandModel.length > 0) {
          
            setBrandModelData(props.brandModel);
        }
      }, [props.brandModel]);
  
  // console.log(regions)
  if (props.fetchingBrandModel) {
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
                        <input 
                        style={{border:"2px solid black"}}
                            type="text" 
                            placeholder="brand"
                            value={newBrandModelName} 
                            onChange={(e) => setBrandModelName(e.target.value)} 
                        />
                          <input 
                            placeholder="model"
                        style={{border:"2px solid black"}}
                            type="text" 
                            value={newModelName} 
                            onChange={(e) => setModelName(e.target.value)} 
                        />
                        <button 
                           loading={props.addingItemTask}
                        onClick={handleBrandModel}>Save</button>
                        <button onClick={handleCancelAdd}>Cancel</button>
                    </div>
                ) : (
                    <button  style={{backgroundColor:"tomato",color:"white"}}
                    onClick={handleAddBrandModel}> Add More</button>
                )}
            </div>
            </div>

    
            

            <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
            {!props.fetchingBrandModel && brandModel.length === 0 ? <NodataFoundPage /> : brandModel.map((region, index) => (
     
              <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center  h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.phoneMasterListId}>
              {/* Region name display or input field */}
              
              {editingId === region.phoneMasterListId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      value={newBrandModelName}
                      onChange={(e) => setBrandModelName(e.target.value)}
                  />
              ) : (
                  <div >{region.brand}</div>
              )}
               {editingId === region.phoneMasterListId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      value={newModelName}
                      onChange={(e) => setModelName(e.target.value)}
                  />
              ) : (
                  <div style={{width:"39rem"}}>{region.model}&nbsp;&nbsp;&nbsp;
                  {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                        >
                                          New
                                        </span> : null}</div>
              )}
  
              {/* Action buttons */}
              <div >
                  {/* Edit button */}
                  {/* {editingId === region.phoneMasterListId ? (
                      <div>
                          <button onClick={() => handleUpdateBrandModel(region)}>Save</button>
                          <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                      </div>
                  ) : (
                      <BorderColorIcon   style={{fontSize:"1rem"}} 
                    //   onClick={() => editRegion(region.phoneMasterListId, region.name)} 
                      />
                  )} */}
  
                  {/* Delete button */}
                  {/* <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                        //   onConfirm={() =>  props.removeShipBy(region.phoneMasterListId)}
                        >
                  <DeleteOutlined 
                    style={{
                    
                      color: "red",
                    }}
                // onClick={() => 
                //     props.removeServiceLine(item.phoneMasterListId)
                //  }
                   />
                   </Popconfirm> */}
              </div>
          </div>
         ))}
</MainWrapper>
            </div>
   
        </div>
         <div class=" font-bold">Updated on {dayjs(props.brandModel && props.brandModel.length && props.brandModel[0].updationDate).format('YYYY-MM-DD')} by {props.brandModel && props.brandModel.length && props.brandModel[0].updatedBy}</div>
    </>
         );
  };



const mapStateToProps = ({ brandmodel, auth }) => ({
    addingBrandModel: brandmodel.addingBrandModel,
    addingBrandModelError: brandmodel.addingBrandModelError,
    brandModel: brandmodel.brandModel,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    fetchingBrandModel: brandmodel.fetchingBrandModel,
    fetchingBrandModelError: brandmodel.fetchingBrandModelError,
    updatingBrandModel: brandmodel.updatingBrandModel
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getBrandModel,
            addBrandModel,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(SuppliesBrandModelList);
