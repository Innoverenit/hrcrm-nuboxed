import React, { useEffect, useState } from 'react';
import { Timeline, Button, Popconfirm, Tooltip } from 'antd';
import { connect } from 'react-redux';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddCustomerNotesListDrawerModal from "../CustomerDetail/AddCustomerNotesListDrawerModal"
import { bindActionCreators } from 'redux';
import { DeleteOutlined } from "@ant-design/icons";
import NotesProspectForm from "../CustomerDetail/NotesProspectForm"
import moment from 'moment';
import { getCustomerActivityTimeline, getCustomerNoteList, getCustomerActivityRecords, handleCustomerNoteDrawerModal, handleCustomerActivityModal } from '../../CustomerAction';
import { BundleLoader } from '../../../../Components/Placeholder';
import AddCustomerActivityDrawerModal from '../CustomerActivity/AddCustomerActivityDrawerModal';

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

  const currentDate = moment().format("DD/MM/YYYY");
  if (props.fetchingCusActivityTimelineStatus) return <BundleLoader/>;
  return (
    <div className="mt-4 ml-4">
      <Timeline>
        {customerActivityTimeline &&
          customerActivityTimeline.map((status, index) => ( 
            <Timeline.Item key={index} > 
              <div className="flex flex-row justify-between items-center">           
                <div class="w-[30rem]">
                  {moment(status.creationDate).format('DD/MM/YYYY')} {status.category} &nbsp;
                  {currentDate === moment(status.creationDate).format("DD/MM/YYYY") ? (
                    <span className="text-xs text-[tomato] font-bold">
                      New
                    </span>
                  ) : null} 
                  &nbsp;{status.activityType}, completion By {moment(status.endDate).format('DD/MM/YYYY')}
                  {status.category === 'Task' ? status.statusTask : null}
                </div>

                <div class="w-[13rem]">
                  <Button
                    type="link"
                    style={{ margin: '0 8px', padding: 0 }}
                    onClick={() => handleNotesClick(status)}
                  >
                    Notes
                  </Button>
                </div>
                <div class="w-[13rem]">
                  <Tooltip title="Edit">
                    <BorderColorIcon
                      className="!text-xl cursor-pointer text-[tomato]"
                      onClick={() => handleEditClick(status)}
                    />
                  </Tooltip>
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
        getCustomerNoteList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerActivityTable);
