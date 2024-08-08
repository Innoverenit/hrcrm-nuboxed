import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "antd";

import dayjs from "dayjs";
import HistoryIcon from '@mui/icons-material/History';
import {
  getActionNotifications,
  addActionNotification,
  getStageActionNotifications,
  handleActionDrawerModal,
  getActionSteps
  
} from "../Dashboard/DashboardAction";
import AddActionDrawerModal from "../Dashboard/AddActionDrawerModal"
import { Divider, List, Typography } from 'antd';

const { Option } = Select;

// const data = [
//   'Racing car sprays burning fuel into crowd.',
//   'Japanese princess to wed commoner.',
//   'Australian walks 100km after outback crash.',
//   'Man charged over missing wedding girl.',
//   'Los Angeles battles huge wildfires.',
// ];

class ActionNotification extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isViewAll: false,
    //   itemsToShow: 6,
    //   expanded: false
    // };
  }
//   showMore = () => {
//     this.state.itemsToShow === 6
//       ? this.setState({
//         itemsToShow: this.props.presentNotifications.length,
//         expanded: true
//       })
//       : this.setState({ itemsToShow: 6, expanded: false });
//   };
  componentDidMount = () => {
    const { userId, getActionNotifications,orgId,department,getStageActionNotifications } = this.props;
    // console.log("]______++++++++++", user);
    if (userId) {
      console.log("]______++++++++++");
      getActionNotifications(userId,department);
      //setTimeout(getActionNotifications(userId,department), 30000);
    }
    getStageActionNotifications(orgId)
  };

   handleChange(data,profileId,opportunityId) {
    
    this.props.addActionNotification(
      profileId,
      {
      actionType:data,
      opportunityId:opportunityId,
    },
   
      );
   
    
  }
  handleIconClick = (message, candidateId, stageList,candidateName) => {
    debugger;
    this.setState({ 

      message ,


    });

  };
//   componentWillReceiveProps(nextProps) {
//     const { user, getPresentNotifications } = nextProps;
//     console.log("getPresentNotifications]______++++++++++");
//     if (user.userId !== this.props.user.userId) {
//       console.log("]______++++++++++");
//       getPresentNotifications(user.userId);
//       setTimeout(getPresentNotifications(user.userId), 30000);
//     }
//   }
//   handleCallback(status, data) {
//     if (status === "success") {
//       ////debugger;
//       const { presentNotifications, getPastNotifications } = this.props;
//       console.log("getPastNotifications]______++++++++++");
//       for (let i = 0; i <= presentNotifications.length; i++) {
//         ////debugger;
//         if (presentNotifications[i].notificationId === data.notificationId) {
//           ////debugger;
//           presentNotifications[i] = data;
//         }
//       }
//     }
//   }
//   handleClick = item => {
//     const Id = item.notificationId;
//     // alert("item.notificationId");
//     this.props.updateNotifcation(Id, item,this.handleCallback);
//   };

  render() {
    // const data=this.props.actionNotifications
    const data=this.props.actionNotifications
    
    console.log("Data5",data)
    return (
      <>

   <div>
      {/* <Divider orientation="left">Small Size</Divider> */}
      <List
        size="small"
        // style={{display:"flex"}}
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={data}
        loading={this.props.fetchingActionNotifications }
        renderItem={(item) => <List.Item
        
          style={{
            // backgroundColor:
            //     "#40A9FF",
            display:"flex"
            
          }}
        >
                    <div style={{width:"45rem"}}>
        
        <HistoryIcon 
onClick={() => {
this.props.handleActionDrawerModal(true);
this.props.getActionSteps(this.props.userId,this.props.department)
this.handleIconClick(
  item.message
  )
}}
/>

          {/* <div> */}
          {item.message}
          {/* </div> */}
          </div>
         
<div style ={{width:"45%"}}>
          <Select
  onChange={(e) => this.handleChange(e,item.profileId,item.opportunityId)}
 
  placeholder="Select"
 
>

  
{this.props.stageactionNotifications.map((item, i) => {
                          return (
                            <Option value={item.actionName}>{item.actionName}</Option>
                          )
                        })}
   
  
</Select>
</div>


  

          </List.Item>
         
          }
               
      />
      </div>
    <AddActionDrawerModal
    actionSteps={this.props.actionSteps}
    // message={this.state.message}
    handleActionDrawerModal={this.props.handleActionDrawerModal}
    addDrawerActionModal={this.props.addDrawerActionModal}
    />
    
      </>
     );
  }
}
const mapStateToProps = ({ auth, dashboard }) => ({
  // user: auth.userDetails,
  userId:auth.userDetails.userId,
  actionSteps:dashboard.actionSteps,
  addDrawerActionModal:dashboard.addDrawerActionModal,
  orgId:auth.userDetails.organizationId,
  actionNotifications:dashboard.actionNotifications,
  fetchingActionNotifications:dashboard.fetchingActionNotifications,
  department:auth.userDetails.department,
  stageactionNotifications:dashboard.stageactionNotifications
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getActionNotifications,
      handleActionDrawerModal,
      addActionNotification,
      getStageActionNotifications,
      getActionSteps
    //   getPresentNotifications,
    //   updateNotifcation
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionNotification);
