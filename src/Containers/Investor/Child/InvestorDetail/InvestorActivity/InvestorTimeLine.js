import React, { useEffect } from 'react';
import { Timeline, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import {getInvestorTimeline,getInvestorActivityRecords} from "../../../InvestorAction";
import { BundleLoader } from '../../../../../Components/Placeholder';

const InvestorTimeline = (props) => {
  useEffect(() => {
     props.getInvestorTimeline(props.investorDetails.investorId);
     props.getInvestorActivityRecords(props.investorDetails.investorId);
  }, []);
 
  const { InvestorStatus, fetchingInvestStatus,ratingValue } = props;
  console.log(props.investorDetails.investorId)
  if (fetchingInvestStatus) return <BundleLoader/>;
  return (
    <>
      <div className="mt-4 ml-2">
        <Timeline>
          {InvestorStatus &&
            InvestorStatus.map((status, i) => (
              <Timeline.Item key={i}>
              <div>
              <div>{status.category} {status.activityType} {dayjs(status.endDate).format('ll')}</div>
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

const mapStateToProps = ({ mileage,investor, auth,pitch }) => ({
  userId: auth.userDetails.userId,
  InvestorStatus:investor.InvestorStatus,
  mileageStatus: mileage.mileageStatus,
  investorActivityCount:investor.investorActivityCount,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getInvestorTimeline,
        getInvestorActivityRecords
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorTimeline);

