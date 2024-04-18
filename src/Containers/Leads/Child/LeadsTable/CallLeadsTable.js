import React, { useEffect,useState } from 'react';
import { Timeline, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { getCallTimeline,handleLeadsNoteDrawerModal,getNotesListOfLeads } from '../../LeadsAction';
import { Tooltip } from "antd";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import { BundleLoader } from '../../../../Components/Placeholder';
import AddLeadsNotesListDrawerModal from './AddLeadsNotesListDrawerModal';

const CallLeadsTable = (props) => {
  const [rowdata, setrowdata] = useState("");
  useEffect(() => {
    props.getCallTimeline(props.rowdata.leadsId);
  }, []);

  const { callTimeline, ratingValue } = props;
  const currentDate = moment().format("DD/MM/YYYY");
  if (props.fetchingCallTimelineStatus) return <BundleLoader/>;
  const handleRowData = (data) => {
    setrowdata(data);
  };
  return (
    <div className="mt-4">
      <Timeline>
        {callTimeline &&
          callTimeline.map((status, i) => (
            <Timeline.Item key={i}>
              <div className="flex flex-row justify-between items-center">
                <div>
                  {currentDate === moment(status.creationDate).format("DD/MM/YYYY") ? (
                    <span className="text-xs text-[tomato] font-bold">
                      New
                    </span>
                  ) : null} {status.category} - {status.activityType} on {moment.utc(status.startDate).format('DD/MM/YYYY')} - {status.woner !==props.fullName ?  
                    <Tooltip title={status.woner}> 
                      <MultiAvatar
                        primaryTitle={status.woner}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    </Tooltip> : null}
                </div>
                <div class=" w-[20rem]">
                  <label class=" cursor-pointer text-blue "
                    type="link"
                    style={{ margin: '0 8px', padding: 0 }}
                    onClick={() => {
                      props.handleLeadsNoteDrawerModal(true);
                      handleRowData(status);
                       props.getNotesListOfLeads(status.category,status.category==="Task"?status.taskId:status.category==="Event"?status.eventId:status.category==="Call"?status.callId:null)
                    }}
                  >
                    <u>Notes</u>
                  </label>
                </div>
              </div>
            </Timeline.Item>
          ))}
      </Timeline>
      <AddLeadsNotesListDrawerModal
    rowdata={rowdata}
    notesListOfLeads={props.notesListOfLeads}
       addLeadsNoteDrawerModal={props.addLeadsNoteDrawerModal}
       handleLeadsNoteDrawerModal={props.handleLeadsNoteDrawerModal
       }
       />
    </div>
  );
};

const mapStateToProps = ({ leads, auth }) => ({
  userId: auth.userDetails.userId,
  callTimeline: leads.callTimeline,
  notesListOfLeads: leads.notesListOfLeads,
  fetchingCallTimelineStatus:leads.fetchingCallTimelineStatus,
  fullName:auth.userDetails.fullName,
  addLeadsNoteDrawerModal:leads.addLeadsNoteDrawerModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCallTimeline,
      getNotesListOfLeads,
      handleLeadsNoteDrawerModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CallLeadsTable);
