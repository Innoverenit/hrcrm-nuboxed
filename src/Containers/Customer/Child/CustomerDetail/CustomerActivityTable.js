


import React, { useEffect,useState } from 'react';
import { Timeline,Button } from 'antd';
import { connect } from 'react-redux';
import AddCustomerNotesListDrawerModal from "../CustomerDetail/AddCustomerNotesListDrawerModal"
import { bindActionCreators } from 'redux';
import NotesProspectForm from "../CustomerDetail/NotesProspectForm"
import moment from 'moment';
 import { getCustomerActivityTimeline,getCustomerActivityRecords,handleCustomerNoteDrawerModal } from '../../CustomerAction';
import { BundleLoader } from '../../../../Components/Placeholder';

const CustomerActivityTable = (props) => {
  useEffect(() => {
      props.getCustomerActivityTimeline(props.customer.customerId);
      props.getCustomerActivityRecords(props.customer.customerId);
  }, []);

  const { customerActivityTimeline, ratingValue } = props;
  const [expandedRow, setExpandedRow] = useState(null);

  const handleEditClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  const currentDate = moment().format("DD/MM/YYYY");
  if (props.fetchingCusActivityTimelineStatus) return <BundleLoader/>;
  return (
    <>
        <div className="mt-4 ml-4">
        <Timeline>
          {customerActivityTimeline &&
            customerActivityTimeline.map((status, index) => ( 
              <React.Fragment key={status}>
              <>    
              <Timeline.Item key={index} style={{display:"flex"}}>               
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
                
                <Button
                  type="link"
                  style={{ margin: '0 8px', padding: 0 }}
                  onClick={() => {
                    props.handleCustomerNoteDrawerModal(true);
                    // handleSetTaskNameId(item);
                  }}
                >
                  Note
                </Button>
                 
                </div>
              </Timeline.Item>
              </> 
               















</React.Fragment>
       
            ))}
           
           
        </Timeline>
        {/* {expandedRow !== null && (
                //  <div>Hello</div>
                <NotesProspectForm/>
                )} */}
       <AddCustomerNotesListDrawerModal
       addCustomerNoteDrawerModal={props.addCustomerNoteDrawerModal}
       handleCustomerNoteDrawerModal={props.handleCustomerNoteDrawerModal}
       />
        
      </div>
    </>
  );
};

const mapStateToProps = ({ customer, auth }) => ({
  userId: auth.userDetails.userId,
  addCustomerNoteDrawerModal:customer.addCustomerNoteDrawerModal,
  customerActivityTimeline: customer.customerActivityTimeline,
  customerActivityCount:customer.customerActivityCount,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCustomerActivityTimeline,
        getCustomerActivityRecords,
        handleCustomerNoteDrawerModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerActivityTable);


