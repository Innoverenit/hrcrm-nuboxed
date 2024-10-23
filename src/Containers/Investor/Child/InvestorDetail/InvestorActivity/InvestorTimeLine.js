import React, { useEffect } from 'react';
import { Timeline, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import { MultiAvatar } from "../../../../../Components/UI/Elements";
import {getInvestorTimeline,getInvestorActivityRecords} from "../../../InvestorAction";
import { BundleLoader } from '../../../../../Components/Placeholder';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const InvestorTimeline = (props) => {
  useEffect(() => {
     props.getInvestorTimeline(props.investorDetails.investorId);
     props.getInvestorActivityRecords(props.investorDetails.investorId);
  }, []);
 
  const { InvestorStatus, fetchingInvestStatus,ratingValue } = props;
  console.log(props.investorDetails.investorId)
  const currentDate = dayjs().format("DD/MM/YYYY");
  if (fetchingInvestStatus) return <BundleLoader/>;
  console.log()
  return (
    <>
      <div className="mt-4 ml-2">
        <Timeline>
          {InvestorStatus &&
            InvestorStatus.map((status, i) => (
              <Timeline.Item key={i}>
              <div className='flex flex-row justify-between items-center'>
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
              {/* <div className=' flex flex-row'>
              <div>{status.category}</div><div> {status.activityType}</div> {dayjs(status.endDate).format('MMMM D, YYYY h:mm A')} </div> */}
              {/* <div class=" ml-2">
              {dayjs().format("DD/MM/YYYY") === dayjs(status.creationDate).format("DD/MM/YYYY") ? (
                                                <span class="text-[tomato] text-[0.65rem] mt-[0.4rem] font-bold">
                                                  New
                                                </span>
                                              ) : null}
                                              </div> */}
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
                   <div class="flex  items-end  justify-end">
          <div class="">
                  <div
                    type="link"
                    style={{ margin: '0 8px', padding: 0 }}
                    // onClick={() => handleNotesClick(status)}
                  >
                    <NoteAltIcon className=' !text-icon  text-green-600 cursor-pointer'/>
                  </div>
                </div>
                <div >
                  <Tooltip title="Edit">
                    <BorderColorIcon
                      className="!text-icon cursor-pointer text-[tomato]"
                      // onClick={() => {handleEditClick(status)
                      //   props.setEditActivityEvents(status)
                      // }}
                    />
                  </Tooltip>
                </div>
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

