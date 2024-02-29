import React, { useEffect } from 'react';
import { Timeline, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import {getContactInvestTimeline} from "../../../ContactInvestAction";

const ContactInvestTimeline = (props) => {
  useEffect(() => {
    props.getContactInvestTimeline(props.contactInVestDetail.contactId);
  }, []);

  const { contactInvestStatus, ratingValue } = props;
  console.log(props.contactInVestDetail.investorLeadsId)
  return (
    <>
      <div className="mt-4">
        <Timeline>
          {contactInvestStatus &&
            contactInvestStatus.map((status, i) => (
              <Timeline.Item key={i}>
              <div>
              <div>{status.category} {status.activityType} {moment.utc(status.endDate).format('ll')}</div>
              <span class=" ml-2">
             
             <>
             {props.userId !== status.userId ? (
               
               <Tooltip title={status.woner}> 
                       <MultiAvatar
                         primaryTitle={status.woner}
                         imgWidth={"1.8rem"}
                         imgHeight={"1.8rem"}
                       />
                       </Tooltip>
             ) : (
              null
                     )}
                     </>
         
                   </span>
         
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

const mapStateToProps = ({ mileage,contactinvest, auth,pitch }) => ({
  userId: auth.userDetails.userId,
  contactInvestStatus:contactinvest.contactInvestStatus,
  mileageStatus: mileage.mileageStatus,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getContactInvestTimeline,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestTimeline);

