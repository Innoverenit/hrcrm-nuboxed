import React, { useEffect,lazy,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm,Tooltip, Input } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../../Config/Auth";
import {
    getPayments,
    getPaymentCount,
    addPayment,
    searchPaymentName,
    ClearReducerDataOfPayment,
    removePayment,
    updatePayment
} from "../Payment/PaymentAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../../Components/UI/Layout";
const SinglePayment = lazy(() =>
  import("./SinglePayment")
);

const Payment = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [paymentsListData, setPaymentsData] = useState(props.paymentsListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newPaymentName, setPaymentName] = useState('');
  useEffect(() => {
      props.getPayments(props.orgId); 
      props.getPaymentCount(props.orgId) 
  }, [])

  const editRegion = (paymentCatagoryId, name) => {
    console.log(name)
    console.log(name)
      setEditingId(paymentCatagoryId);
      setPaymentName(name);
  };



  const handleAddPayment = () => {
      setAddingRegion(true);
      setPaymentName("")
  };

  const handleUpdatePayment=(region)=>{
      console.log(region)
      let data={
        paymentCatagoryId:region.paymentCatagoryId,
        name:newPaymentName
       
      }
props.updatePayment(data,region.paymentCatagoryId)
setEditingId(null);
  }

  const handlePayment = () => {
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
        name:newPaymentName,
        orgId:props.orgId,
      }
      props.addPayment(data,props.orgId)
      setAddingRegion(false)
  };
  const handleChange = (e) => {
      setCurrentData(e.target.value.trim());
    
  
      if (e.target.value.trim() === "") {
      //   setPage(pageNo + 1);
      props.getPayments(props.orgId);
      //   props.ClearReducerDataOfLoad()
      }
    };

    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.searchPaymentName(currentData);
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };

  const handleCancelAdd = () => {
    setPaymentName('');
      setAddingRegion(false);
  };
  const cancelEdit = () => {
      setEditingId(null);
  };
  useEffect(() => {
      
      if (props.paymentsListData.length > 0) {
        
        setPaymentsData(props.paymentsListData);
      }
    }, [props.paymentsListData]);

// console.log(regions)
if (props.fetchingPayment) {
return <div><BundleLoader/></div>;
}
  return (
      <div>
    <div class=" flex flex-row justify-end items-center">
    <div class=" flex w-[18vw] mr-2 mt-[7px]">
          <Input
       placeholder="Search by Name"
      style={{width:"100%",marginLeft:"0.5rem"}}
          // suffix={suffix}
          onPressEnter={handleSearch}  
          onChange={handleChange}
          // value={currentData}
        />
          </div>
          <div class="w-[2rem]">
  <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"payment"}`}>
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
                      style={{border:"2px solid black",width:"55%"}}
                          type="text" 
                          placeholder="Add Payment"
                          value={newPaymentName} 
                          onChange={(e) => setPaymentName(e.target.value)} 
                      />
                      <button 
                         loading={props.addingItemTask}
                      onClick={handlePayment}>Save</button>
                      <button  onClick={handleCancelAdd}>Cancel</button>
                  </div>
              ) : (
                  <button  style={{backgroundColor:"tomato",color:"white"}}
                  onClick={handleAddPayment}> Add More</button>
              )}
          </div>
          </div>
          <div class=" flex flex-col" >
         
         <MainWrapper className="!h-[69vh] !mt-2" >
          {!props.fetchingPayment && paymentsListData.length === 0 ? <NodataFoundPage /> : paymentsListData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region, index) => (
            <div className="flex rounded ml-1 font-bold  border-[#0000001f]  border  shadow-[#a3abb980] bg-white text-[#444] mt-1  p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" key={region.paymentCatagoryId}>
            {/* Region name display or input field */}
            
            {editingId === region.paymentCatagoryId ? (
                <input
                style={{border:"2px solid black"}}
                    type="text"
                    placeholder="Update Payment"
                    value={newPaymentName}
                    onChange={(e) => setPaymentName(e.target.value)}
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
                {editingId === region.paymentCatagoryId ? (
                    <div>
                        <button onClick={() => handleUpdatePayment(region)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon className=" !text-icon text-red-600 cursor-pointer" onClick={() => editRegion(region.paymentCatagoryId, region.name)} />
                )}

                {/* Delete button */}
                <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.removePayment(region.paymentCatagoryId,props.orgId)}
                      >
               <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                 </Popconfirm>
            </div>
        </div>
          ))}
          </MainWrapper>
            </div>
  <div class=" font-bold">Updated on {dayjs(props.paymentsListData && props.paymentsListData.length && props.paymentsListData[0].updationDate).format('YYYY-MM-DD')} by {props.paymentsListData && props.paymentsListData.length && props.paymentsListData[0].updatedBy}</div>
      </div>
  );
};

const mapStateToProps = ({ payments,auth }) => ({
    addingPayment: payments.addingPayment,
    paymentCount:payments.paymentCount,
    addingPaymentError: payments.addingPaymentError,
    paymentsListData: payments.paymentsListData,
orgId:auth.userDetails.organizationId,
userId:auth.userDetails.userId,
removingPayment: payments.removingPayment,
removingPaymentError: payments.removingPaymentError,
fetchingPayment: payments.fetchingPayment,
fetchingPaymentError: payments.fetchingPaymentError,

updatingPayment: payments.updatingPayment,
updatingPaymentError: payments.updatingPaymentError,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getPayments,
        getPaymentCount,
        ClearReducerDataOfPayment,
        searchPaymentName,
        addPayment,
        removePayment,
        updatePayment,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
