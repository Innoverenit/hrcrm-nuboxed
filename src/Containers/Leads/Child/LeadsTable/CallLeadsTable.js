import React, { useEffect,useState } from 'react';
import { Timeline,Avatar } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { getCallTimeline,handleLeadsNoteDrawerModal,getNotesListOfLeads } from '../../LeadsAction';
import { Tooltip } from "antd";
import { BundleLoader } from '../../../../Components/Placeholder';


const CallLeadsTable = (props) => {
  const [rowdata, setrowdata] = useState("");
  useEffect(() => {
    props.getCallTimeline(props.rowdata.leadsId);
  }, []);

  const { callTimeline, ratingValue } = props;
  const currentDate = dayjs().format("DD/MM/YYYY");
  if (props.fetchingCallTimelineStatus) return <BundleLoader/>;
  const handleRowData = (status) => {
    setrowdata(status);
  };
  console.log(props.rowdata.leadsId)
  return (
    <div className="mt-4">
      <Timeline>
        {callTimeline &&
          callTimeline.map((status, i) => (
            <Timeline.Item key={i}>
              <div className="flex flex-row justify-between items-center">
                <div>
                  {currentDate === dayjs(status.creationDate).format("DD/MM/YYYY") ? (
                    <span className="text-xs text-[tomato] font-bold">
                      New
                    </span>
                  ) : null} {status.category} - {status.activityType} on <span class=" font-bold">{dayjs.utc(status.startDate).format('DD/MM/YYYY')}</span>  
                  
                  <span class=" ml-2">
                     <Avatar.Group
                     maxCount={7}
                    maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                      {status.included &&
                   status.included.map((candidate, i) => {
                     
                     const data1 = candidate.empName ? candidate.empName.slice(0, 2).toUpperCase() : "None"
                     return (
                       <Tooltip title={candidate.empName} key={i}>
                       <Avatar style={{ backgroundColor: "#f56a00" }}>
                       {data1}
                     
                     </Avatar>
                     </Tooltip>
                                        
                     );
                   })}
 
              </Avatar.Group> 
              </span>
                </div>
                <div class=" w-[20rem]">
                  <div class=" cursor-pointer text-blue "
                    type="link"
                    style={{ margin: '0 8px', padding: 0 }}
                    onClick={() => {
                      props.handleLeadsNoteDrawerModal(true);
                       handleRowData(status);
                       props.getNotesListOfLeads(status.category,status.category==="Task"?status.taskId:status.category==="Event"?status.eventId:status.category==="Call"?status.callId:null)
                    }}
                  >
                    <u>Notes</u>
                  </div>
                </div>
              </div>
            </Timeline.Item>
          ))}
      </Timeline>
      
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
