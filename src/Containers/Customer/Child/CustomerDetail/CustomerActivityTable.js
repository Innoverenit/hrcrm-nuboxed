import React, { useEffect, useState } from 'react';
import { Timeline, Button, Popconfirm, Tooltip } from 'antd';
import { connect } from 'react-redux';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddCustomerNotesListDrawerModal from "../CustomerDetail/AddCustomerNotesListDrawerModal"
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { getCustomerActivityTimeline,
  setEditActivityEvents,
   getCustomerNoteList, getCustomerActivityRecords, handleCustomerNoteDrawerModal, handleCustomerActivityModal } from '../../CustomerAction';
import { BundleLoader } from '../../../../Components/Placeholder';
import AddCustomerActivityDrawerModal from '../CustomerActivity/AddCustomerActivityDrawerModal';
import NoteAltIcon from "@mui/icons-material/NoteAlt";

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

  const { customerActivityTimeline, ratingValue } = props;

  const currentDate = dayjs().format("DD/MM/YYYY");
  if (props.fetchingCusActivityTimelineStatus) return <BundleLoader/>;
  return (
    <div className="mt-4 ml-4 ">
      {/* scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] */}
      <Timeline>
        {customerActivityTimeline &&
          customerActivityTimeline.map((status, index) => ( 
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
          ))}
      </Timeline>

      <AddCustomerNotesListDrawerModal
        customerNoteList={props.customerNoteList}
        addCustomerNoteDrawerModal={props.addCustomerNoteDrawerModal}
        handleCustomerNoteDrawerModal={props.handleCustomerNoteDrawerModal}
      />
      
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
