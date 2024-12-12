import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, Input } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper, } from "../../../../Components/UI/Layout";
import {
    getCategory,
    getCategoryCount,
    addCategory,
    searchCategoryName,
    ClearReducerDataOfCategory,
    removeCategory,
    updateCategory
} from "../CategoryList/CategoryListAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";


const CategoryList = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [categoryListData, setCategoryListData] = useState(props.categoryListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newCategoryName, setCategoryName] = useState('');
  useEffect(() => {
      props.getCategory(props.orgId); 
      props.getCategoryCount(props.orgId) 
  }, [])

  const editRegion = (categoryId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(categoryId);
      setCategoryName(name);
  };



  const handleAddCategory = () => {
      setAddingRegion(true);
      setCategoryName("")
  };

  const handleUpdateCategory=(region)=>{
      console.log(region)
      let data={
        categoryId:region.categoryId,
        name:newCategoryName
       
      }
props.updateCategory(data,region.categoryId)
setEditingId(null);
  }

  const handleCategory = () => {
 
      let data={
        name:newCategoryName,
        orgId:props.orgId,
      }
      props.addCategory(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getCategory(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchCategoryName(currentData);
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
      
      if (props.categoryListData.length > 0) {
        
        setCategoryListData(props.categoryListData);
      }
    }, [props.categoryListData]);

// console.log(regions)
if (props.fetchingCategory) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-end items-center">
    <div class=" flex w-[18vw] mt-[7px] mr-2"  >
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
                      style={{border:"2px solid black",width:"53%"}}
                          type="text" 
                          placeholder="Add Category"
                          value={newCategoryName} 
                          onChange={(e) => setCategoryName(e.target.value)} 
                      />
                      <button 
                    
                         loading={props.addingCategory}
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
          {!props.fetchingCategory && categoryListData.length === 0 ? <NodataFoundPage /> : categoryListData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold   border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt-1  p-2 justify-between items-center  h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.categoryId}>
            {/* Region name display or input field */}
            {editingId === region.categoryId ? (
                <input
                placeholder="Update Category"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            ) : (
                <div className="region">{region.name}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}

            {/* Action buttons */}
            <div className="actions">
                {/* Edit button */}
                {editingId === region.categoryId ? (
                    <div>
                        <button onClick={() => handleUpdateCategory(region)}>Save</button>
                        <button className=" ml-4"   onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon  className=" !text-icon text-red-600 cursor-pointer" onClick={() => editRegion(region.categoryId, region.name)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeCategory(region.categoryId,props.orgId)}
                      >
               <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  
              // onClick={() => 
              //     props.removeServiceLine(item.categoryId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
          ))}
          </MainWrapper>
            </div>
           <div class=" font-bold">Updated on {dayjs(props.categoryListData && props.categoryListData.length && props.categoryListData[0].updationDate).format('YYYY-MM-DD')} by {props.categoryListData && props.categoryListData.length && props.categoryListData[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ categoryList,auth }) => ({
    addingCategory: categoryList.addingCategory,
    addingCategoryError: categoryList.addingCategoryError,
    categoryListData: categoryList.categoryListData,
    categoryCount:categoryList.categoryCount,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingCategory: categoryList.removingCategory,
removingCategoryError: categoryList.removingCategoryError,
fetchingCategory: categoryList.fetchingCategory,
fetchingCategoryError: categoryList.fetchingCategoryError,

updatingCategory: categoryList.updatingCategory,
updatingCategoryError: categoryList.updatingCategoryError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCategory,
        getCategoryCount,
        ClearReducerDataOfCategory,
        searchCategoryName,
        addCategory,
        removeCategory,
        updateCategory,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
