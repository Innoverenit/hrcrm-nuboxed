import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, DatePicker } from "antd";
import dayjs from "dayjs";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  getMileageByVoucherId,
  handleUpdateMileageModal,
  updateMileage,
  deleteMileage,
  handleMileageNoteDrawer
} from "../MileageAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

const UpdateMileageModal = lazy(() => import("../Child/UpdateMileageModal"));
const MileageNoteDrawer=lazy(()=>import("./MileageNoteDrawer"));

function MileageDrawerCard(props) {

  const [data, setData] = useState(props.mileageVoucherId);
  const [editStates, setEditStates] = useState(props.mileageVoucherId.map(() => false));
 
  const [inputValues, setInputValues] = useState([]);
  useEffect(() => {
    const { voucherId } = props;
    props.getMileageByVoucherId(voucherId);
  }, []);

  const [ milaegeItems,setMileageItems]=useState({});
  function handleMileageItems(itc){
    setMileageItems(itc);
  }
  useEffect(() => { 
    setInputValues(props.mileageVoucherId);
  }, [props.mileageVoucherId]);


  const toggleEdit = (index) => {
    const newEditStates = [...editStates];
    newEditStates[index] = !newEditStates[index];
    setEditStates(newEditStates);
  };

  const handleInputChange = (index, field, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index][field] = value;
    setInputValues(newInputValues);
  };

  const handleSave = (index) => {
    const newData = [...data];
    newData[index] = { ...inputValues[index] };
      console.log('Previous Data:', data[index]);
  console.log('New Data:', newData[index]);
  console.log('New Data1:', newData);
    setData(newData);

    const newEditStates = [...editStates];
    newEditStates[index] = false;
    setEditStates(newEditStates);
    console.log(newData[index].clientName)
    let result={
      clientName:newData[index].clientName,
      distances:newData[index].distances,
      fromLocation:newData[index].fromLocation,
      mileageId:newData[index].mileageId,
      organizationId:newData[index].organizationId,
      remark:newData[index].remark,
      toLocation:newData[index].toLocation,
      unit:newData[index].unit,
      userId:newData[index].userId,
      mileageDate:`${newData[index].mileageDate}T20:00:00Z`
    }
    props.updateMileage(result)
  };


  const {
    mileageVoucherId,
    handleUpdateMileageModal,
    currentMileageId,
    noteMileageDrawer,
      handleMileageNoteDrawer
  } = props;

  return (
    <>
    <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
     <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[9.2rem]">ID</div>
        <div className="md:w-[6.8rem]">Cost Code</div>
        <div className=" md:w-[7.21rem] ">Date</div>
        <div className=" md:w-[7.1rem]">From</div>
        <div className=" md:w-[6.12rem]">To</div> 
        <div className="md:w-[6.5rem]">Distance</div>
        <div className="md:w-[4.8rem]">Remarks</div> 
      
        <div className="w-12"></div>

      </div>
        {inputValues.map((item,index) => {
          return (
            <div key={index}>
                        <div
                className="flex rounded-xl  bg-white mt-[0.5rem] h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                <div className="flex font-medium flex-col w-[9.7rem]">
                  
                  <div className="text-xs   font-poppins cursor-pointer">
                   
                    {item.mileageId}
                  </div>
                </div>
                <div className="flex font-medium flex-col w-[5.12rem] ">
       
                  {editStates[index] ? (
              <input
                type="text"
                value={item.clientName}
                onChange={(e) => handleInputChange(index, 'clientName', e.target.value)}
                   style={{border:"1px solid lightgrey"}}
              />
            ) : (
                  <div className="text-xs  font-poppins">
                    {item.clientName}
                  </div>
            )}
                </div>
                <div className="flex font-medium flex-col w-[7.8rem]">
                 
                  {editStates[index] ? (
  <DatePicker
    value={dayjs(item.mileageDate)} 
    onChange={(date, dateString) =>
      handleInputChange(index, "mileageDate", dateString)
    }
    style={{ border: "1px solid lightgrey",boxShadow:"0 0.01em 0.01em ",margin:"0.25rem",height:"1.4rem" }}
  />
) : (
  <div className="text-xs  font-poppins">
    {dayjs(item.mileageDate).format("MMM Do YY")}
  </div>
)}
                </div>
                <div className=" flex  w-[7.2rem] ">
                  {editStates[index] ? (
              <input
                type="text"
                value={item.fromLocation}
                   style={{border:"1px solid lightgrey",marginRight:"0.25rem"}}
                onChange={(e) => handleInputChange(index, 'fromLocation', e.target.value)}
              />
            ) : (
                  <div className="text-xs  font-poppins">
                    {item.fromLocation}
                  </div>
            )}
                </div>
                <div className=" flex  w-[7.23rem] ">
                
                  {editStates[index] ? (
              <input
                type="text"
                   style={{border:"1px solid lightgrey",marginRight:"0.25rem"}}
                value={item.toLocation}
                onChange={(e) => handleInputChange(index, 'toLocation', e.target.value)}
              />
            ) : (
                  <div className="text-xs  font-poppins">
                    {item.toLocation}
                  </div>
            )}
                </div>
                <div className=" flex  w-[6.5rem] ">
                  {editStates[index] ? (
              <input
                type="text"
                value={item.distances}
                   style={{border:"1px solid lightgrey",marginRight:"0.25rem"}}
                onChange={(e) => handleInputChange(index, 'distances', e.target.value)}
              />
            ) : (
                  <div className="text-xs  font-poppins">
                    {item.distances}
                  </div>
            )}
                </div>
                <div className="flex  w-[7.1rem]">
                  {editStates[index] ? (
              <input
                type="text"
                style={{border:"1px solid lightgrey",marginRight:"0.25rem"}}
                value={item.remark}
                onChange={(e) => handleInputChange(index, 'remark', e.target.value)}
              />
            ) : (
                  <div className="text-xs  font-poppins">
                    {item.remark}
                  </div>
            )}
                </div>

                <div className="flex  w-[5.5rem] justify-center">               
                    {/* Remarks */}
                 
                   {item.status !== 'Approved' && (
                  <div className="text-xs  font-poppins ml-[0.25rem]">
                  <button onClick={() => toggleEdit(index)} >
            {editStates[index] ? 'Cancel' : <BorderColorIcon   style={{
                              color: "grey",
                              cursor: "pointer",
                              fontSize: "1rem",
                            }}/>}
          </button>
          {editStates[index] && (
            <button onClick={() => handleSave(index)} className="ml-[0.25rem]">Save</button>
          )}
                  </div>
                   )}
                </div>
                <div class="flex flex-col items-center">
                <div className="flex   justify-center">
                <Tooltip title={"Note"}>
                    <NoteAltIcon 
                    style={{ cursor: "pointer",padding: "2px",fontSize:"1.2rem" }}
                    onClick={() => {
                      handleMileageNoteDrawer(true);
                      handleMileageItems(item);
                    }}
                    />
                  </Tooltip>
                  </div>
                  <div className="flex   justify-center">
                {item.status === "Pending" ? (
            <Tooltip title="Delete">
             <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  
                 onClick={() => {
                this.props.deleteMileage(item.mileageId);
                  
                 }}
               />
             </Tooltip>
             ):null}
             </div>
             </div>           
              </div>
            </div>
          );
        })}
      </div>

      <UpdateMileageModal
        mileageId={currentMileageId}
        updateMileageModal={props.updateMileageModal}
        handleUpdateMileageModal={handleUpdateMileageModal}
      />
<MileageNoteDrawer
      milaegeItems={milaegeItems}
      noteMileageDrawer={noteMileageDrawer}
      handleMileageNoteDrawer={handleMileageNoteDrawer}
     
      />
    </>
  );
}

const mapStateToProps = ({ auth, mileage }) => ({
  fetchingMileageByVoucherId: mileage.fetchingMileageByVoucherId,
  fetchingMileageByVoucherIdError: mileage.fetchingMileageByVoucherIdError,
  mileageVoucherId: mileage.mileageVoucherId,
  updateMileageModal: mileage.updateMileageModal,
  noteMileageDrawer:mileage.noteMileageDrawer
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByVoucherId,
      handleUpdateMileageModal,
      updateMileage,
      deleteMileage,
      handleMileageNoteDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MileageDrawerCard);