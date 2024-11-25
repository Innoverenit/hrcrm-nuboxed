import React, { useEffect, useState } from 'react';
import { Timeline, Button, Popconfirm, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { getStatusTimeline } from '../AccountAction';
import { BundleLoader } from '../../../../Components/Placeholder';
import EmptyPage from '../../EmptyPage';



function StatusCardView (props) {
   
  useEffect(() => {
      props.getStatusTimeline(props.particularRowData.orderPhoneId ? props.particularRowData.orderPhoneId:props.particularRowData.procureOrderInvoiceId);
     
  }, []);

  const { statusActivityTimeline } = props;

  const currentDate = dayjs().format("DD/MM/YYYY");
  if (props.fetchingTimelineStatus) return <BundleLoader/>; 
  console.log("INVSC",props.particularRowData)
  
  return (
    <div className="mt-4 ml-4 ">
      <Timeline>
        {!props.fetchingTimelineStatus && statusActivityTimeline.length === 0 ?<EmptyPage />:statusActivityTimeline &&
          statusActivityTimeline.map((status, index) => ( 
            <Timeline.Item key={index} > 
              <div className="flex flex-row justify-between items-center">           
                <div class="flex flex-col w-[30rem]">
                 <div> {dayjs(status.creationDate).format('DD/MM/YYYY')}  {currentDate === dayjs(status.creationDate).format("DD/MM/YYYY") ? (
                    <span className="text-xs text-[tomato] font-bold  mr-2">
                      New
                    </span>
                  ) : null} </div>
                <div class="flex flex-row"> 
                {status.approveByName ?
                  <div class="mr-2 bg-green-600 text-white">{status.transactionNumber} </div>:
                  <div class="mr-2">{status.transactionNumber} </div>}
                  {status.paymentModeName}</div>
                  {status.approveByName ?
                    `Approved by ${status.approveByName} - ${dayjs(status.approveDate).format('DD/MM/YYYY')} `:""}
               
                </div>
                
              </div>
            </Timeline.Item>
          ))}
      </Timeline>
    </div>
  );
};

const mapStateToProps = ({ distributor, auth,customer }) => ({
  userId: auth.userDetails.userId,
  statusActivityTimeline: distributor.statusActivityTimeline,
  fetchingTimelineStatus: distributor.fetchingTimelineStatus
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getStatusTimeline,
        
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StatusCardView);
