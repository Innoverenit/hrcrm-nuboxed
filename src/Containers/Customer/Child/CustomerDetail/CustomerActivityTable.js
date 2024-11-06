import React, { useEffect, useState , lazy,} from 'react';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { Timeline, Button, Popconfirm, Tooltip } from 'antd';
import { connect } from 'react-redux';
import {linkTaskStatus} from "../../../Task/TaskAction"
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { getCustomerActivityTimeline,
  setEditActivityEvents,
   getCustomerNoteList, getCustomerActivityRecords, handleCustomerNoteDrawerModal, handleCustomerActivityModal } from '../../CustomerAction';
import { BundleLoader } from '../../../../Components/Placeholder';
import AddCustomerActivityDrawerModal from '../CustomerActivity/AddCustomerActivityDrawerModal';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmptyPage from '../../../Main/EmptyPage';


const ButtonGroup = Button.Group;
const CustomerActivityTable = (props) => {
  useEffect(() => {
      props.getCustomerActivityTimeline(props.customer.customerId);
      props.getCustomerActivityRecords(props.customer.customerId);
  }, []);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleEditClick = (status) => {
    setSelectedStatus(status);
    props.handleCustomerActivityModal(true);
  };

  const handleNotesClick = (status) => {
    setSelectedStatus(status);
    props.handleCustomerNoteDrawerModal(true);
    props.getCustomerNoteList(status.category,status.category==="Task"?status.taskId:status.category==="Event"?status.eventId:status.category==="Call"?status.callId:null);
  };

  const { customerActivityTimeline, ratingValue,fetchingCusActivityTimelineStatus  } = props;

  const currentDate = dayjs().format("DD/MM/YYYY");
  if (props.fetchingCusActivityTimelineStatus) return <BundleLoader/>;
  return (
    <div className="mt-4 ml-4 ">
      {/* scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] */}
      <Timeline>
         { ! fetchingCusActivityTimelineStatus && customerActivityTimeline.length ===0 ? <EmptyPage/>:customerActivityTimeline.map((status, index) => {
            const currentDate = dayjs();
        const completionDate = dayjs(status.completionDate);
        const endDate = dayjs(status.endDate);
        const difference = currentDate.diff(endDate, 'days');
            return(
            <Timeline.Item key={index} > 
              <div className="flex flex-row justify-between items-center">           
                <div class=" flex flex-col w-[30rem]">
                 <div> {dayjs(status.creationDate).format('DD/MM/YYYY')} </div>
                <div class="flex flex-row"> 
                  <div class="mr-2">{status.category} </div>
                  {currentDate === dayjs(status.creationDate).format("DD/MM/YYYY") ? (
                    <span className="text-xs text-[tomato] font-bold  mr-2">
                      New
                    </span>
                  ) : null}{status.activityType}</div>
                  Completion by {dayjs(status.endDate).format('DD/MM/YYYY')}
                  {status.category === 'Task' ? status.statusTask : null}
                </div>
          <div class="flex  items-end  justify-end">
          {(status.category === "Call" || status.category === "Event") && (
  <div class="">
    <Button
      style={{ margin: '0 8px', padding: 0 }}
      onClick={() => handleNotesClick(status)}
    >
      Complete
    </Button>
  </div>
)}
{status.category==="Task"&&(

<div class="">
                    <ButtonGroup >
         
          <StatusIcon class=" !text-icon"
  type="To Start"
  iconType={<HourglassEmptyIcon  className=" !text-icon" />} 
 // iconType="fa-hourglass-start"
  tooltip="To Start"
  status={status.taskStatus}
  difference={difference} 
  onClick={() =>
    props.linkTaskStatus(status.taskId, {
      taskStatus: "To Start",
    })
  }
/>
        
            <StatusIcon class=" !text-icon"
              type="In Progress"
             iconType={<HourglassTopIcon  className=" !text-icon"/>}
              tooltip="In Progress"
              status={status.taskStatus}
              difference={difference}
              onClick={() =>
                props.linkTaskStatus(status.taskId, {
                  //  ...item,
                   taskStatus: "In Progress",
                })
              }
            />
         
            <StatusIcon class=" !text-icon"
              type="Completed"
            iconType={<HourglassBottomIcon  className=" !text-icon"/>}
              tooltip="Completed"
              status={status.taskStatus}
              difference={difference}
              onClick={() =>
                props.linkTaskStatus(status.taskId, {
                  //  ...item,
                   taskStatus: "Completed",
                })
              }
            />
          
        </ButtonGroup>
        <div></div>
                        </div>
)}
          <div class="">
                  <div
                    type="link"
                    style={{ margin: '0 8px', padding: 0 }}
                    onClick={() => handleNotesClick(status)}
                  >
                    <NoteAltIcon className=' !text-icon  text-green-600 cursor-pointer'/>
                  </div>
                </div>
                <div >
                  <Tooltip title="Edit">
                    <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato]"
                      onClick={() => {handleEditClick(status)
                        props.setEditActivityEvents(status)
                      }}
                    />
                  </Tooltip>
                </div>
            </div>
                
              </div>
            </Timeline.Item>
            )
})}
      </Timeline>

      
      <AddCustomerActivityDrawerModal
       
        addCustomerActivityDrawerModal={props.addCustomerActivityDrawerModal}
        handleCustomerActivityModal={props.handleCustomerActivityModal}
        selectedStatus={selectedStatus}
        customer={props.customer}
      />
    </div>
  );
};

const mapStateToProps = ({ customer, auth }) => ({
  userId: auth.userDetails.userId,
  customerNoteList:customer.customerNoteList,
  addCustomerNoteDrawerModal:customer.addCustomerNoteDrawerModal,
  customerActivityTimeline: customer.customerActivityTimeline,
  customerActivityCount:customer.customerActivityCount,
  addCustomerActivityDrawerModal:customer.addCustomerActivityDrawerModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkTaskStatus,
        getCustomerActivityTimeline,
        getCustomerActivityRecords,
        handleCustomerNoteDrawerModal,
        handleCustomerActivityModal,
        getCustomerNoteList,
        setEditActivityEvents
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerActivityTable);
function StatusIcon(props) {
  const { type, iconType, tooltip, status, onClick, difference } = props;

  let iconColor = status === type ? "rgb(251, 133, 0)" : "grey";
  let size = status === type ? "1.875em" : "1em";

  // Display the difference as a label next to the icon
  const daysLabel = difference > 0 ? `+${difference} days` : `${difference} days`;

  return (
    <Tooltip title={`${tooltip} (${daysLabel})`}>
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
        {/* <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }} /> */}
        {iconType}
        {/* <HourglassEmptyIcon/> */}
{/* 
        {status === type && <span style={{ fontSize: "0.82rem",display:"flex" }}>{daysLabel}</span>} */}
     
      </Button>
    </Tooltip>
  );
}