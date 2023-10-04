import React, { useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { getMileageStatusByMileageId } from '../MileageAction';

const StatusMileageForm = (props) => {
  useEffect(() => {
    props.getMileageStatusByMileageId(props.voucherId);
  }, []);

  const { mileageStatus, ratingValue } = props;
  return (
    <>
      <div className="mt-4">
        <Timeline>
          {mileageStatus &&
            mileageStatus.map((status, i) => (
              <Timeline.Item key={i}>
                {status.approvedStatus === 'Approved' ? (
                  `Approved By ${status.employeeName} on ${moment(status.approvedDate).format('ll')}`
                ) : status.approvedStatus === 'Pending' ? (
                  `Pending On ${status.employeeName} level.`
                ) : null}
              </Timeline.Item>
            ))}
          {/* <Timeline.Item
            dot={<ClockCircleOutlined className="timeline-clock-icon" style={{ color: 'red' }} />}
            color="red"
          >
        
          </Timeline.Item>
          <Timeline.Item>
            Network problems being solved 2015-09-01
            </Timeline.Item> */}
        </Timeline>
      </div>
    </>
  );
};

const mapStateToProps = ({ mileage, auth }) => ({
  userId: auth.userDetails.userId,
  mileageStatus: mileage.mileageStatus,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageStatusByMileageId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StatusMileageForm);

{/* <Timeline
items={[
  {
    children: 'Create a services site 2015-09-01',
  },
  {
    children: 'Solve initial network problems 2015-09-01',
  },
  {
    dot: <ClockCircleOutlined className="timeline-clock-icon" style={{color:"red"}} />,
    color: 'red',
    children: 'Technical testing 2015-09-01',
  },
  {
    children: 'Network problems being solved 2015-09-01',
  },
]}
/> */}