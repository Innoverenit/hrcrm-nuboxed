import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, Input } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper, } from "../../../../Components/UI/Layout";
import {
    getMachinary,
    getMachinaryCount,
    addMachinary,
    searchMachinaryName,
    ClearReducerDataOfMachinary,
    removeMachinary,
    updateMachinary
} from "../Machinary/MachinaryAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";


const Machinary = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [machinaryListData, setMachinaryListData] = useState(props.machinaryListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newName, setName] = useState('');
  const [newDescriptionName, setDescriptionName] = useState('');
  useEffect(() => {
      props.getMachinary(); 
       props.getMachinaryCount() 
  }, [])

  const editRegion = (machinaryId, name,description) => {
    console.log(name)
    console.log(name)
      setEditingId(machinaryId);
      setName(name);
      setDescriptionName(description);
  };



  const handleAddMachinary = () => {
      setAddingRegion(true);
      setName("")
      setDescriptionName("")
  };

  const handleUpdateMachinary=(region)=>{
      console.log(region)
      let data={
        machinaryId:region.machinaryId,
        name:newName,
        description:newDescriptionName,
       
      }
props.updateMachinary(data,region.machinaryId)
setEditingId(null);
  }

  const handleMachinary = () => {
 
      let data={
        name:newName,
        description:newDescriptionName,
        orgId:props.orgId,
      }
      props.addMachinary(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getMachinary();
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
       props.searchMachinaryName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setName('');
    setDescriptionName("");
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.machinaryListData.length > 0) {
        
        setMachinaryListData(props.machinaryListData);
      }
    }, [props.machinaryListData]);

// console.log(regions)
if (props.fetchingMachinary) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-between">
    <div class=" flex w-[18vw] mt-3"  >
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
                      style={{border:"2px solid black",width:"29%"}}
                          type="text" 
                          placeholder="Name"
                          value={newName} 
                          onChange={(e) => setName(e.target.value)} 
                      />
                    
                             <input 
                            placeholder="Description"
                        style={{border:"2px solid black"}}
                            type="text" 
                            value={newDescriptionName} 
                            onChange={(e) => setDescriptionName(e.target.value)} 
                        />
                      <button 
                    
                         loading={props.addingMachinary}
                      onClick={handleMachinary}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddMachinary}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingMachinary && machinaryListData.length === 0 ? <NodataFoundPage /> : machinaryListData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold shadow shadow-gray-300  shadow-[0em 0.25em 0.625em -0.125em] bg-white text-[#444] mt-1  p-2 justify-between items-center  h-8" key={region.machinaryId}>
            {/* Region name display or input field */}
            {editingId === region.machinaryId ? (
                <input
                placeholder="Update Name"
                style={{border:"2px solid black"}}
                    type="text"
                    value={newName}
                    onChange={(e) => setName(e.target.value)}
                />
            ) : (
                <div style={{width:"13rem"}}>{region.name}&nbsp;&nbsp;&nbsp;
                {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ?<span class="text-xs text-[tomato] font-bold"
                                      >
                                        New
                                      </span> : null}</div>
            )}
            
            {editingId === region.machinaryId ? (
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
              )}

            {/* Action buttons */}
            <div >
              
                {editingId === region.machinaryId ? (
                    <div>
                        <button onClick={() => handleUpdateMachinary(region)}>Save</button>
                        <button className=" ml-4"   onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   className=" cursor-pointer !text-icon text-red-600" onClick={() => editRegion(region.machinaryId, region.name,region.description)} />
                )}

               
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeMachinary(region.machinaryId,props.orgId)}
                      >
                <DeleteOutlined className=" cursor-pointer !text-icon text-red-600"
              // onClick={() => 
              //     props.removeServiceLine(item.machinaryId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
          ))}
          </MainWrapper>
            </div>
           <div class=" font-bold">Updated on {dayjs(props.machinaryListData && props.machinaryListData.length && props.machinaryListData[0].updationDate).format('YYYY-MM-DD')} by {props.machinaryListData && props.machinaryListData.length && props.machinaryListData[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ machinary,auth }) => ({
    addingMachinary: machinary.addingMachinary,
    addingMachinaryError: machinary.addingMachinaryError,
   machinaryListData:machinary.machinaryListData,
   machinaryCount:machinary.machinaryCount,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingMachinary:machinary.removingMachinary,
removingMachinaryError:machinary.removingMachinaryError,
fetchingMachinary:machinary.fetchingMachinary,
fetchingMachinaryError:machinary.fetchingMachinaryError,

updatingMachinary:machinary.updatingMachinary,
updatingMachinaryError:machinary.updatingMachinaryError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getMachinary,
        getMachinaryCount,
        ClearReducerDataOfMachinary,
        searchMachinaryName,
        addMachinary,
        removeMachinary,
        updateMachinary,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Machinary);
