import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { getCallTimeline } from '../../LeadsAction';
import { Tooltip } from "antd";
import { MultiAvatar } from "../../../../Components/UI/Elements";
import { BundleLoader } from '../../../../Components/Placeholder';

const CallLeadsTable = (props) => {
  useEffect(() => {
      props.getCallTimeline(props.rowdata.leadsId);
  }, []);

  const { callTimeline, ratingValue } = props;
  const currentDate = moment().format("DD/MM/YYYY");
  if (props.fetchingCallTimelineStatus) return <BundleLoader/>;
  return (
    <>
        <div className="mt-4">
        <Timeline>
          {callTimeline &&
            callTimeline.map((status, i) => (
              <Timeline.Item key={i}>
                <div>
                <div>{currentDate === moment(status.creationDate).format("DD/MM/YYYY") ? (
                      <span className="text-xs text-[tomato] font-bold">
                        New
                      </span>
                    ) : null} {status.category} - {status.activityType} on {moment.utc(status.startDate).format('DD/MM/YYYY')} - {status.woner !==props.fullName ?  <Tooltip title={status.woner}> 
                            <MultiAvatar
                              primaryTitle={status.woner}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                            </Tooltip>:null}  </div>
           
                </div>
                <div>
                
                 
                 
                </div>
              </Timeline.Item>
       
            ))}
        </Timeline>
        
      </div>
    </>
  );
};

const mapStateToProps = ({ leads, auth }) => ({
  userId: auth.userDetails.userId,
  callTimeline: leads.callTimeline,
  fetchingCallTimelineStatus:leads.fetchingCallTimelineStatus,
  fullName:auth.userDetails.fullName
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCallTimeline,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CallLeadsTable);






















