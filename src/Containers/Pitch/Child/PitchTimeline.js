import React, { useEffect } from 'react';
import { Timeline, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { MultiAvatar } from "../../../Components/UI/Elements";
import {getpichTimeline} from "../PitchAction";

const PitchTimeline = (props) => {
  useEffect(() => {
    props.getpichTimeline(props.rowdata.investorLeadsId);
  }, []);

  const { pitchStatus, ratingValue } = props;
  console.log(props.rowdata.investorLeadsId)
  return (
    <>
      <div className="mt-4">
        <Timeline>
          {pitchStatus &&
            pitchStatus.map((status, i) => (
              
              <Timeline.Item key={i}>
                
              <div>
                
              <div>{status.category} {status.activityType} {dayjs(status.endDate).format('ll')}



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
              
                        </span></div>
         
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

const mapStateToProps = ({ mileage, auth,pitch }) => ({
  userId: auth.userDetails.userId,
  pitchStatus:pitch.pitchStatus,
  mileageStatus: mileage.mileageStatus,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getpichTimeline,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PitchTimeline);

