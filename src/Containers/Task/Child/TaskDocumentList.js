


import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
 import { getTaskTimeline } from '../TaskAction';
//import { BundleLoader } from '../../../../Components/Placeholder';

const TaskDocumentList = (props) => {
  useEffect(() => {
      props.getTaskTimeline(props.currentNameId.taskId);
     
  }, []);
console.log(props.currentNameId)
 const { customerActivityTimeline, ratingValue } = props;
   const currentDate = moment().format("DD/MM/YYYY");
//   if (props.fetchingCusActivityTimelineStatus) return <BundleLoader/>;
  return (
    <>
        <div className="mt-4 ml-4">
            Hello
        {/* <Timeline>
          {customerActivityTimeline &&
            customerActivityTimeline.map((status, i) => (       
              <Timeline.Item key={i}>               
                <div>               
                <div>                
                
{currentDate === moment(status.creationDate).format("DD/MM/YYYY") ? (
                      <span className="text-xs text-[tomato] font-bold">
                        New
                      </span>
                    ) : null}    {status.category} {status.activityType} Completed by {moment(status.endDate).format('DD/MM/YYYY')}
                  </div>
           
                </div>
                <div>
                
                 
                 
                </div>
              </Timeline.Item>
       
            ))}
        </Timeline> */}
        
      </div>
    </>
  );
};

const mapStateToProps = ({ customer,task, auth }) => ({
  userId: auth.userDetails.userId,
  taskTimeline:task.taskTimeline,
  customerActivityTimeline: customer.customerActivityTimeline,
  customerActivityCount:customer.customerActivityCount,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTaskTimeline,
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskDocumentList);


