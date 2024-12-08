import React, { useState,lazy,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dayjs from "dayjs";
import { Tooltip, Button,Popconfirm  } from "antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import {
    getStepperTaskList,
    deleteStepperTaskData,
    updateTaskStepperValue
} from "../../TaskAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const ButtonGroup = Button.Group;

const StepperTaskList = (props) => {
  const [editingId, setEditingId] = useState(null);
  const [newStepName, setStepName] = useState('');

  useEffect(() => {
 
    props.getStepperTaskList(props.currentNameId.taskId,);
  }, []);
  const editRegion = (id, name) => {
    console.log(name)
    console.log(name)
      setEditingId(id);
      setStepName(name);
  };
  const handleUpdateStepper=(item)=>{
    console.log(item)
    let data={
      id:item.id,
      step:newStepName
     
    }
props.updateTaskStepperValue(data,item.id)
setEditingId(null);
}
const cancelEdit = () => {
  setEditingId(null);
};

 
  
  const {
    fetchingStepperTaskList,
    taskCardList,
    userDetails: { employeeId },
  } = props;

  if (fetchingStepperTaskList) 
  {
   return <BundleLoader/>
  }

  return (
    <>
    
          <div className=' flex  sticky z-auto'>
          <div class="rounded max-sm:m-1 m-1 p-1 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky z-10">
        <div className=" w-[8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7rem] max-lg:w-[9rem]">Status</div>
                        <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] ">Step
                        </div>
             <div className=" w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[7.01rem] max-lg:w-[7.01rem] ">End Date</div>
             <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.13rem] max-lg:w-[5.13rem] "></div>


      </div>
  
    {!fetchingStepperTaskList && taskCardList.length === 0 ? (
    <NodataFoundPage />
) : (
    taskCardList.map((item, index) => {
        const currentDate = dayjs();
        const completionDate = dayjs(item.completionDate);
        const endDate = dayjs(item.endDate);
        return (
            <div key={index}>
                <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[8rem] max-sm:flex-col">
                    <div className="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className="flex flex-col w-[19.1rem] max-xl:w-[4.12rem] max-lg:w-[4.5rem] max-sm:w-auto">
                            <div>
                                <ButtonGroup>
                                    <StatusIcon
                                        type="To Start"
                                        iconType="fa-hourglass-start"
                                        tooltip="To Start"
                                        status={item.status}
                                    />
                                    <StatusIcon
                                        type="In Progress"
                                        iconType="fa-hourglass-half"
                                        tooltip="In Progress"
                                        status={item.status}
                                    />
                                    <StatusIcon
                                        type="Completed"
                                        iconType="fa-hourglass"
                                        tooltip="Completed"
                                        status={item.status}
                                    />
                                </ButtonGroup>
                                <div></div>
                            </div>
                        </div>
                        <div className="flex font-medium justify-center flex-col  w-[5.12rem] max-xl:w-[4.12rem] max-lg:w-[3.52rem] max-sm:flex-row max-sm:w-auto">
                            <div className="text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                            {editingId === item.id ? (
                <input
                placeholder="Update"
                style={{border:"2px solid black",width:"5rem"}}
                    type="text"
                    value={newStepName}
                    onChange={(e) => setStepName(e.target.value)}
                />
            ) : (
                <div className="region">{item.step}
               </div>
            )}
                            </div>
                        </div>
                    </div>
                    <div className="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className="flex font-medium flex-col w-[22.22rem] max-xl:w-[4.121rem] max-lg:w-[2.521rem] max-sm:flex-row  max-sm:w-auto">
                            <div className="text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                            {editingId === item.id ? (
                <input
                placeholder="Update"
                style={{border:"2px solid black",width:"5rem"}}
                    type="text"
                    value={newStepName}
                    onChange={(e) => setStepName(e.target.value)}
                />
            ) : (
                <div className="region">  {`${dayjs(item.endDate).format("YYYY/MM/DD")}`}
               </div>
            )}
                              
                            </div>
                        </div>
                    </div>
                    {/* <div className=" flex  " style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                    {editingId === item.id ? (
                    <div class=" w-[6rem]">
                        <button onClick={() => handleUpdateStepper(item)}>Save</button>
                        <button  className=" ml-4"  onClick={cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <BorderColorIcon   style={{fontSize:"1rem", cursor:"pointer"}} onClick={() => editRegion(item.id, item.step)} />
                )}
                </div> */}
                              <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                  <div class=" text-sm  font-poppins text-center">
                                  <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>  props.deleteStepperTaskData(item.id,)}
                      >
                <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                 </Popconfirm>

                                  </div>
                              </div>
                </div>
            </div>
        );
    })
)}

              
      </div>
</div>



      
    </>
  );
};
  const mapStateToProps = ({ auth, task, opportunity }) => ({
    userDetails: auth.userDetails,
    userId: auth.userDetails.userId,
    employeeId: auth.userDetails.employeeId,
    fetchingStepperTaskList: task.fetchingStepperTaskList,
    fetchingStepperTaskListError:task.fetchingStepperTaskListError,
    taskCardList: task.taskCardList,

  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getStepperTaskList,
        deleteStepperTaskData,
        updateTaskStepperValue
      
      },
      dispatch
    );
    export default connect(mapStateToProps, mapDispatchToProps)(StepperTaskList);
  
  
    function StatusIcon(props) {
      const { type, iconType, tooltip, status, onClick, } = props;
    
      let iconColor = status === type ? "rgb(251, 133, 0)" : "grey";
      let size = status === type ? "1.875em" : "1em";
    
      // Display the difference as a label next to the icon
    //   const daysLabel = difference > 0 ? `+${difference} days` : `${difference} days`;
    
      return (
        <Tooltip title={`${tooltip}`}>
          <Button
            ghost={status !== type}
            style={{
              padding: "0.375em",
              borderColor: "transparent",
              color: iconColor,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={onClick}
          >
            <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }} />
{/* 
            {status === type && <span style={{ fontSize: "0.82rem",display:"flex" }}>{daysLabel}</span>} */}
         
          </Button>
        </Tooltip>
      );
    }
    
    
      function overdue(pendingDays) {
        //debugger;
        if (pendingDays === -1) {
          //debugger;
          return <span style={{ color: "red", fontStyle: "italic" }}>1 Day</span>;
        }
        if (pendingDays < 0) {
          //debugger;
          return (
            <span style={{ color: "red", fontStyle: "italic" }}>{`${Math.abs(
              pendingDays
            )} Days`}</span>
          );
        }
        if (pendingDays === 1) {
          //debugger;
          return (
            <span
              style={{ color: "#21ce21", fontStyle: "italic" }}
            >{`${pendingDays} Day`}</span>
          );
        }
        if (pendingDays > 0) {
          //debugger;
          return (
            <span
              style={{ color: "#21ce21", fontStyle: "italic" }}
            >{`${pendingDays} Days`}</span>
          );
        }
      }