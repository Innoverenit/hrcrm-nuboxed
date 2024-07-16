import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button,Popconfirm,Tooltip, Input } from "antd";
import { base_url } from "../../../../Config/Auth";
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";
import {
    getBrandCategoryData,
    getBrandCategoryCount,
  addBrandCategory,
  ClearReducerDataOfBrandCategory,
  searchBrandCategoryName,
  removeBrandCategory,
  updateBrandCategory
} from "../BrandCategory/BrandCategoryAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const BrandCategory = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [BrandCategoryData, setBrandCategoryData] = useState(props.BrandCategoryData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newName, setName] = useState('');
  useEffect(() => {
      props.getBrandCategoryData(props.orgId); 
      props.getBrandCategoryCount(props.orgId) 
  }, [])

  const editRegion = (shipById, name) => {
    console.log(name)
    console.log(name)
      setEditingId(shipById);
      setName(name);
  };



  const handleAddCategory = () => {
      setAddingRegion(true);
      setName("")
  };

  const handleUpdateCategory=(region)=>{
      console.log(region)
      let data={
        shipById:region.shipById,
        name:newName
       
      }
props.updateBrandCategory(data,region.shipById)
setEditingId(null);
  }

  const handleCategory = () => {
      let data={
        name:newName,
        orgId:props.orgId,
      }
      props.addBrandCategory(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getBrandCategoryData(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchBrandCategoryName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.BrandCategoryData.length > 0) {
        
        setBrandCategoryData(props.BrandCategoryData);
      }
    }, [props.BrandCategoryData]);

// console.log(regions)
if (props.fetchingBrandCategory) {
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

            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black",width:"54%"}}
                          type="text" 
                          placeholder="Add Name"
                          value={newName} 
                          onChange={(e) => setName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingItemTask}
                      onClick={handleCategory}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddCategory}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingBrandCategory && BrandCategoryData.length === 0 ? <NodataFoundPage /> : BrandCategoryData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center  h-8" key={region.shipById}>
            {/* Region name display or input field */}
            
            {editingId === region.shipById ? (
                <input
                style={{border:"2px solid black"}}
                    type="text"
                    placeholder="Update Name"
                    value={newName}
                    onChange={(e) => setName(e.target.value)}
                />
            ) : (
                <div >{region.name}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div >
                {/* Edit button */}
                {editingId === region.shipById ? (
                    <div>
                        <button onClick={() => handleUpdateCategory(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon    className=" !text-icon text-red-600 cursor-pointer flex justify-center " onClick={() => editRegion(region.shipById, region.name)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeBrandCategory(region.shipById,props.orgId)}
                      >
                <DeleteOutlined 
                   className=" !text-icon text-red-600 cursor-pointer flex justify-center "
              // onClick={() => 
              //     props.removeServiceLine(item.shipById)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
          ))}
          </MainWrapper>
            </div>
  <div class=" font-bold">Updated on {dayjs(props.BrandCategoryData && props.BrandCategoryData.length && props.BrandCategoryData[0].updationDate).format('YYYY-MM-DD')} by {props.BrandCategoryData && props.BrandCategoryData.length && props.BrandCategoryData[0].updatedBy}</div>
      </div>
  );
};



const mapStateToProps = ({ brandCategory,auth }) => ({
  addingBrandCategory: brandCategory.addingBrandCategory,
  addingBrandCategoryError: brandCategory.addingBrandCategoryError,
  BrandCategoryData: brandCategory.BrandCategoryData,
  shipByCount:brandCategory.shipByCount,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingBrandCategory: brandCategory.removingBrandCategory,
removingBrandCategoryError: brandCategory.removingBrandCategoryError,
fetchingBrandCategory: brandCategory.fetchingBrandCategory,
fetchingBrandCategoryError: brandCategory.fetchingBrandCategoryError,

updatingBrandCategory: brandCategory.updatingBrandCategory,
updatingBrandCategoryError: brandCategory.updatingBrandCategoryError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getBrandCategoryData,
        getBrandCategoryCount,
      ClearReducerDataOfBrandCategory,
      searchBrandCategoryName,
      addBrandCategory,
      removeBrandCategory,
      updateBrandCategory,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(BrandCategory);
