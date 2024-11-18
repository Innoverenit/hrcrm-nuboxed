import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, Input } from "antd";
import dayjs from "dayjs";
import { MainWrapper, } from "../../../Components/UI/Layout";
import {
    getUOM,
    getUOMCount,
    addUOM,
    removeUOM,
    updateUOM
} from "../SettingsAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../Components/Placeholder";



const UOM = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [UOMListData, setUOMListData] = useState(props.UOMListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newName, setName] = useState('');
  const [newDescriptionName, setDescriptionName] = useState('');
  useEffect(() => {
      props.getUOM(); 
       props.getUOMCount() 
  }, [])

  const editRegion = (uomId, unitName,) => {
    console.log(unitName)
    console.log(unitName)
      setEditingId(uomId);
      setName(unitName);
  };



  const handleaddUOM = () => {
      setAddingRegion(true);
      setName("")
      setDescriptionName("")
  };

  const handleupdateUOM=(region)=>{
      console.log(region)
      let data={
        uomId:region.uomId,
        unitName:newName,
       
      }
props.updateUOM(data,region.uomId)
setEditingId(null);
  }

  const handleMachinary = () => {
 
      let data={
        unitName:newName,
        orgId:props.orgId,
      }
      props.addUOM(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getUOM();
      //   props.ClearReducerDataOfLoad()
      }
    };

    // const handleSearch = () => {
    //   if (currentData.trim() !== "") {
    //     // Perform the search
    //    props.searchMachinaryName(currentData);
    //   } else {
    //     console.error("Input is empty. Please provide a value.");
    //   }
    // };

  const handleCancelAdd = () => {
    setName('');
    setDescriptionName("");
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.UOMListData.length > 0) {
        
        setUOMListData(props.UOMListData);
      }
    }, [props.UOMListData]);

// console.log(regions)
if (props.fetchingUOM) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-end items-center">
    {/* <div class=" flex w-[18vw] mt-2 mr-2"  >
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div> */}
 
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black",width:"29%"}}
                          type="text" 
                          placeholder="Name"
                          value={newName} 
                          onChange={(e) => setName(e.target.value)} 
                      />
                    
                             {/* <input 
                            placeholder="Description"
                        style={{border:"2px solid black"}}
                            type="text" 
                            value={newDescriptionName} 
                            onChange={(e) => setDescriptionName(e.target.value)} 
                        /> */}
                      <button 
                    
                         loading={props.addingUOM}
                      onClick={handleMachinary}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleaddUOM}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingUOM && UOMListData.length === 0 ? <NodataFoundPage /> : UOMListData.slice().sort((a, b) => a.unitName.localeCompare(b.unitName)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center  h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.uomId}>
            {/* Region name display or input field */}
            {editingId === region.uomId ? (
                <input
                placeholder="Update Name"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newName}
                    onChange={(e) => setName(e.target.value)}
                />
            ) : (
                <div style={{width:"13rem"}}>{region.unitName}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}
            
            {/* {editingId === region.uomId ? (
                  <input
                  style={{border:"2px solid black"}}
                      type="text"
                      placeholder="Description"
                      value={newDescriptionName}
                      onChange={(e) => setDescriptionName(e.target.value)}
                  />
              ) : (
                  <div  style={{width:"39rem"}}>{region.description}
                  </div>
              )} */}

            {/* Action buttons */}
            <div >
              
                {editingId === region.uomId ? (
                    <div>
                        <button onClick={() => handleupdateUOM(region)}>Save</button>
                        <button className=" ml-4"   onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   className=" cursor-pointer !text-icon text-red-600" onClick={() => editRegion(region.uomId, region.unitName)} />
                )}

               
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeUOM(region.uomId,props.orgId)}
                      >
               <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  
              // onClick={() => 
              //     props.removeServiceLine(item.uomId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
          ))}
          </MainWrapper>
            </div>
           <div class=" font-bold">Updated on {dayjs(props.UOMListData && props.UOMListData.length && props.UOMListData[0].updationDate).format('YYYY-MM-DD')} by {props.UOMListData && props.UOMListData.length && props.UOMListData[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ settings,auth }) => ({
    addingUOM: settings.addingUOM,
    addingUOMError: settings.addingUOMError,
   UOMListData:settings.UOMListData,
   UOMCount:settings.UOMCount,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingUOM:settings.removingUOM,
removingUOMError:settings.removingUOMError,
fetchingUOM:settings.fetchingUOM,
fetchingUOMError:settings.fetchingUOMError,
updatingUOM:settings.updatingUOM,
updatingUOMError:settings.updatingUOMError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getUOM,
        getUOMCount,
        addUOM,
        removeUOM,
        updateUOM,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UOM);
