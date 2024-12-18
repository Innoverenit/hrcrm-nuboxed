


import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { base_url } from "../../../Config/Auth";
import dayjs from 'dayjs';
 import { getTaskTimeline } from '../TaskAction';

const TaskDocumentList = (props) => {
  useEffect(() => {
      props.getTaskTimeline(props.currentNameId.taskId);
     
  }, []);
console.log(props.currentNameId)
 const { customerActivityTimeline, ratingValue } = props;
   const currentDate = dayjs().format("DD/MM/YYYY");
//   if (props.fetchingCusActivityTimelineStatus) return <BundleLoader/>;
  return (
    <>
        <div className="mt-4 ml-4">
          
        <Timeline>
          {props.taskTimeline &&
            props.taskTimeline.map((status, i) => (       
              <Timeline.Item key={i}>               
                <div>               
                <div>                
                
{currentDate === dayjs(status.creationDate).format("DD/MM/YYYY") ? (
                      <span className="text-xs text-[tomato] font-bold">
                        New
                      </span>
                    ) : null}  
                                        <a
            href={`${base_url}/document/${status.documentId}`}
            // target="_blank"
          >  
                    {status.documentName}  Uploaded by {status.uploadedBy} on {`${dayjs(status.creationDate).format("YYYY/MM/DD")}`}
                    </a>
                  </div>
           
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


