import React, { useEffect, useState , lazy,} from 'react';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';  
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { Timeline, Button, Popconfirm, Tooltip,message } from 'antd';
import { connect } from 'react-redux';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import UpdateActivityModal from "./UpdateActivityModal"
import AddActivityNotesDrawerModal from "./AddActivityNotesDrawerModal"
import { getActivityTimeline,
  addeventLocation,
  handleActivityNoteModal,
  handleActivityUpdateModal,
  linkTaskStatus
   } from './ActivityAction';
import { BundleLoader } from '../../Components/Placeholder';
//import AddCustomerActivityDrawerModal from '../CustomerActivity/AddCustomerActivityDrawerModal';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmptyPage from '../Main/EmptyPage';



const ButtonGroup = Button.Group;
const ActivityListData = (props) => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  useEffect(() => {
      props.getActivityTimeline(props.uniqueId,props.type);
     // props.getCustomerActivityRecords(props.customer.customerId);
  }, []);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleEditClick = (status) => {
    setSelectedStatus(status);
    // props.handleCustomerActivityModal(true);
  };

  const handleNotesClick = (status) => {
    setSelectedStatus(status);
    props.handleCustomerNoteDrawerModal(true);
    props.getCustomerNoteList(status.category,status.category==="Task"?status.taskId:status.category==="Event"?status.eventId:status.category==="Call"?status.callId:null);
  };

  const getLocation = (item) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          let data={
            complitionInd:item.complitionInd===false?true:false,
            latitude:latitude,
            longitude:longitude,
  
          }

          let data1={
            complitionInd:item.complitionInd===false?true:false,
            // latitude:latitude,
            // longitude:longitude,
  
          }
          props.addeventLocation(item.category==="Event"?data:data1,item.category==="Event"?item.eventId:item.callId,item.category)
          
          message.success(item.category==="Event"?'Location fetched successfully!':null);
        },
        (error) => {
          //props.addeventLocation()
          console.error('Error fetching location:', error);
          // message.error('Error fetching location. Please try again.');
        }
      );
    } else {
      message.error('Geolocation is not supported by your browser.');
    }
  };

  const { activityTimeline, ratingValue,fetchingActivityTimelineStatus  } = props;

  const currentDate = dayjs().format("DD/MM/YYYY");
  if (props.fetchingCusActivityTimelineStatus) return <BundleLoader/>;
  return (
    <div className="mt-4 ml-4 ">
      {/* scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] */}
      <Timeline>
         { ! fetchingActivityTimelineStatus && activityTimeline.length ===0 ? <EmptyPage/>:activityTimeline.map((status, index) => {
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
                {status.complitionInd===true&&status.category === 'Event'&&(
                        <div>
                        {/* {item.completionInd === false ? (
                <CheckCircleIcon 
                className="!text-icon cursor-pointer text-[#eeeedd]"
                  />
              ) : (
                <span><CheckCircleIcon 
                className="!text-icon cursor-pointer text-[#67d239]"
                 />
                </span>
              )} */}
              

{Math.round(status.compDistance)}km
           
        
                        </div>
                        )}
          <div class="flex    justify-end">
           {(status.category === "Call" || status.category === "Event") && (
        
  <div class="">
  
     {status.complitionInd===false&&(
   <Button type="primary"
   onClick={() => getLocation(status)}
   >
        Complete</Button>
                )}
                              {status.complitionInd===true&&(
   <CheckCircleIcon className='!text-icon text-[green]'
   onClick={() => getLocation(status)}
  
   />
       
                )}
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
    props.linkTaskStatus(status.taskId,"To Start"
      
    )
  }
/>
        
            <StatusIcon class=" !text-icon"
              type="In Progress"
             iconType={<HourglassTopIcon  className=" !text-icon"/>}
              tooltip="In Progress"
              status={status.taskStatus}
              difference={difference}
              onClick={() =>
                props.linkTaskStatus(status.taskId,"In Progress"
                  //  ...item,
                  )
              }
            />
         
            <StatusIcon class=" !text-icon"
              type="Completed"
            iconType={<HourglassBottomIcon  className=" !text-icon"/>}
              tooltip="Completed"
              status={status.taskStatus}
              difference={difference}
              onClick={() =>
                props.linkTaskStatus(status.taskId,"Completed"
                  //  ...item,
                  
                )
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
                  onClick={() => props.handleActivityNoteModal(true)}
                  >
                    <NoteAltIcon className=' !text-icon  text-green-600 cursor-pointer'/>
                  </div>
                </div>
                <div >
                  <Tooltip title="Edit">
                    <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato]"
                      onClick={() => {
                        handleEditClick(status)
                        props.handleActivityUpdateModal(true)
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

      
      <AddActivityNotesDrawerModal
       type={props.type}
       uniqueId={props.uniqueId}
      handleActivityNoteModal={props.handleActivityNoteModal}
      addActivityNotesModal={props.addActivityNotesModal}
       
      
      />
      <UpdateActivityModal
      selectedStatus={selectedStatus}
      uniqueId={props.uniqueId}
      type={props.type}
      translateText={props.translateText}
      selectedLanguage={props.selectedLanguage}
      handleActivityUpdateModal={props.handleActivityUpdateModal}
      addActivityUpdateModal={props.addActivityUpdateModal}
      />
    </div>
  );
};

const mapStateToProps = ({ customer,activity, auth }) => ({
  userId: auth.userDetails.userId,
  customerNoteList:customer.customerNoteList,
  fetchingActivityTimelineStatus:activity.fetchingActivityTimelineStatus,
  addCustomerNoteDrawerModal:customer.addCustomerNoteDrawerModal,
  activityTimeline: activity.activityTimeline,
  addActivityUpdateModal:activity.addActivityUpdateModal,
  addActivityNotesModal:activity.addActivityNotesModal,
  customerActivityCount:customer.customerActivityCount,
  addCustomerActivityDrawerModal:customer.addCustomerActivityDrawerModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   linkTaskStatus,
    getActivityTimeline,
    handleActivityUpdateModal,
    addeventLocation,
    handleActivityNoteModal,
    linkTaskStatus
        // getCustomerActivityRecords,
        // handleCustomerNoteDrawerModal,
        // handleCustomerActivityModal,
        // getCustomerNoteList,
        // setEditActivityEvents
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ActivityListData);
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