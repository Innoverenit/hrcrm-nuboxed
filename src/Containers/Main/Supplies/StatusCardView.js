import React, { useEffect, useState } from 'react';
import { Timeline, Button, Popconfirm, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { getStatusTimeline } from './SuppliesAction';
import { BundleLoader } from '../../../Components/Placeholder';



const StatusCardView = (props) => {
   
  useEffect(() => {
      props.getStatusTimeline(props.customerId);
  }, []);

  const { statusActivityTimeline } = props;

  const currentDate = dayjs().format("DD/MM/YYYY");
  if (props.fetchingTimelineStatus) return <BundleLoader/>; 
  return (
    <div className="mt-4 ml-4 ">
      <Timeline>
        {statusActivityTimeline &&
          statusActivityTimeline.map((status, index) => ( 
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
                
              </div>
            </Timeline.Item>
          ))}
      </Timeline>
    </div>
  );
};

const mapStateToProps = ({ supplies, auth,customer }) => ({
  userId: auth.userDetails.userId,
  customerId: customer.customer.customerId,
  statusActivityTimeline: supplies.statusActivityTimeline,
  fetchingTimelineStatus: supplies.fetchingTimelineStatus
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getStatusTimeline,
        
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StatusCardView);
