import React, { useEffect,lazy,useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Tooltip, Input } from "antd";
import { base_url } from "../../../../Config/Auth";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import DownloadIcon from '@mui/icons-material/Download';
import {
    getCustomer,
    getCustomerCount,
    addCustomer,
    searchCustomerName,
    ClearReducerDataOfCustomer,
  removeCustomer,
  updateCustomer
} from "./CustomerAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";



const Customer = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [customerListData, setCustomerData] = useState(props.customerListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newCustomerName, setCustomerName] = useState('');
  useEffect(() => {
      props.getCustomer(props.orgId); 
      props.getCustomerCount(props.orgId) 
  }, [])

  const editRegion = (customerTypeId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(customerTypeId);
      setCustomerName(name);
  };



  const handleAddCustomer = () => {
      setAddingRegion(true);
      setCustomerName("")
  };

  const handleUpdateCustomer=(region)=>{
      console.log(region)
      let data={
        customerTypeId:region.customerTypeId,
        name:newCustomerName
       
      }
props.updateCustomer(data,region.customerTypeId)
setEditingId(null);
  }

  const handleCustomer = () => {
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
        name:newCustomerName,
        orgId:props.orgId,
      }
      props.addCustomer(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getCustomer(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchCustomerName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setCustomerName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.customerListData.length > 0) {
        
        setCustomerData(props.customerListData);
      }
    }, [props.customerListData]);

// console.log(regions)
if (props.fetchingCustomer) {
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
          <Tooltip placement="left" title="XL">

<a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"customerType"}`}>
<DownloadIcon 
className=" !text-base cursor-pointer text-[green]"/>
</a>

</Tooltip>
            <div className="add-region">
              {addingRegion ? (
                  <div>
                      <input 
                      style={{border:"2px solid black"}}
                          type="text" 
                          placeholder="Add Type"
                          value={newCustomerName} 
                          onChange={(e) => setCustomerName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingItemTask}
                      onClick={handleCustomer}>Save</button>
                      <button onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddCustomer}> Add More</button>
              )}
          </div>
          </div>
          {!props.fetchingCustomer && customerListData.length === 0 ? <NodataFoundPage /> : customerListData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="card9" key={region.customerTypeId}>
            {/* Region name display or input field */}
            
            {editingId === region.customerTypeId ? (
                <input
                style={{border:"2px solid black"}}
                    type="text"
                    value={newCustomerName}
                    placeholder="Update Type"
                    onChange={(e) => setCustomerName(e.target.value)}
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
                {editingId === region.customerTypeId ? (
                    <div>
                        <button onClick={() => handleUpdateCustomer(region)}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   style={{fontSize:"1rem"}} onClick={() => editRegion(region.customerTypeId, region.name)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removeCustomer(region.customerTypeId)}
                      >
                <DeleteOutlined 
                  style={{
                  
                    color: "red",
                  }}
              // onClick={() => 
              //     props.removeServiceLine(item.customerTypeId)
              //  }
                 />
                 </Popconfirm>
            </div>
        </div>
          ))}
  <div class=" font-bold">Updated on {dayjs(props.customerListData && props.customerListData.length && props.customerListData[0].updationDate).format('YYYY-MM-DD')} by {props.customerListData && props.customerListData.length && props.customerListData[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ catgCustomer,auth }) => ({
  addingCustomer: catgCustomer.addingCustomer,
  addingCustomerError: catgCustomer.addingCustomerError,
  customerListData: catgCustomer.customerListData,
orgId:auth.userDetails.organizationId,
customerCount:catgCustomer.customerCount,
userId:auth.userDetails.userId,
removingCustomer: catgCustomer.removingCustomer,
removingCustomerError: catgCustomer.removingCustomerError,
fetchingCustomer: catgCustomer.fetchingCustomer,
fetchingCustomerError: catgCustomer.fetchingCustomerError,

updatingCustomer: catgCustomer.updatingCustomer,
updatingCustomerError: catgCustomer.updatingCustomerError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCustomer,
        getCustomerCount,
        ClearReducerDataOfCustomer,
        searchCustomerName,
        addCustomer,
      removeCustomer,
      updateCustomer,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
