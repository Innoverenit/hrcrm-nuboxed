


import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
 import { getCustomerActivityTimeline,getCustomerActivityRecords } from '../../CustomerAction';
import { BundleLoader } from '../../../../Components/Placeholder';

const CustomerActivityTable = (props) => {
  useEffect(() => {
      props.getCustomerActivityTimeline(props.customer.customerId);
      props.getCustomerActivityRecords(props.customer.customerId);
  }, []);

  const { customerActivityTimeline, ratingValue } = props;
  const currentDate = moment().format("DD/MM/YYYY");
  if (props.fetchingCusActivityTimelineStatus) return <BundleLoader/>;
  return (
    <>
        <div className="mt-4 ml-4">
        <Timeline>
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
        </Timeline>
        
      </div>
    </>
  );
};

const mapStateToProps = ({ customer, auth }) => ({
  userId: auth.userDetails.userId,
  customerActivityTimeline: customer.customerActivityTimeline,
  customerActivityCount:customer.customerActivityCount,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCustomerActivityTimeline,
        getCustomerActivityRecords
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerActivityTable);


