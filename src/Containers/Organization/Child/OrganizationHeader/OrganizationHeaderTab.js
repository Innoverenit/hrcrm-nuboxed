// import React, { Component, } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTabs } from "../../../../Components/UI/Antd";
// import {getOrganizationList} from "../../../Auth/AuthAction"

// const TabPane = StyledTabs.TabPane;
// // function handleRefreshPage() {
// //   window.location.reload();
// // }
// class OrganizationHeaderTab extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeKey: "1",
//       contactPopover: false,
//       partnerPopover: false,
//       quotProPopover: false,
//       deliveryProPopover: false,
//       breadCumb: false,
//       visibleModal: false,
//       recriutmentdashboard: false,
//       currentTabName: "",
//       currentTabId: "",
//       customField: [],
//       ganttChart: false,
//       costId: "",
//       file: false,
//     };
//   }


//   handleRecruitClick = () => {
//     this.setState({ file: true });
//   };

//   componentDidMount() {
//   this.props.getOrganizationList();
//   }

//   componentWillUnmount() {
//     this.setState({ breadCumb: false });
//   }
//   handleContactPopoverVisibleChange = () =>
//     this.setState({ contactPopover: !this.state.contactPopover });
//   handlepartnerPopoverVisibleChange = () =>
//     this.setState({ partnerPopover: !this.state.partnerPopover });
//   handleTabChange = (key) => {
//     this.setState({ activeKey: key });

//   };
//   render() {
//     const { activeKey } = this.state;

//     return (
//       <>
//         {/* <TabsWrapper style={{display:"flex",flexDirection:"row"}}> */}
//           <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
//             {this.props.organizationDetailsList.map((item,index)=>{
// return (
//   <TabPane
//               tab={
//                 <>
//                   <span class=" mt-4">
//                     <span onClick={() => this.props.handleOnClick(item)} class=" ml-1">
//                       {item.organizationName}
//                     </span>
//                   </span>
             
//                 </>
//               }
//               key={index}
//             >
//                 {/* <Suspense >
             
//                 <Organization  />
//               </Suspense> */}
//             </TabPane>
// )
//             })}
          
        
         

//             {/* <TabPane
//               tab={
//                 <>
//                   <MonetizationOnIcon 
//                  style={{fontSize:"1.1rem"}}
//                   />
//                   <span class=" ml-1">Commercials</span>
//                 </>
//               }
//               key="9"
//             >
//               <CommercialsForm />
//             </TabPane> */}

       
           
           
//           </StyledTabs>
//         {/* </TabsWrapper> */}
  
//       </>
//     );
//   }
// }
// const mapStateToProps = ({ auth, customer, contact, opportunity }) => ({
//   organizationDetailsList:auth.organizationDetailsList,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         getOrganizationList
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(OrganizationHeaderTab);
import React, { Component, } from "react";
import { connect } from "react-redux";
import { Tabs, Card } from 'antd';
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import {getOrganizationList} from "../../../Auth/AuthAction"
import { GlobalOutlined } from "@ant-design/icons";

// const TabPane = StyledTabs.TabPane;
const { TabPane } = Tabs;
// function handleRefreshPage() {
//   window.location.reload();
// }
class OrganizationHeaderTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
      file: false,
    };
  }


  handleRecruitClick = () => {
    this.setState({ file: true });
  };

  componentDidMount() {
  this.props.getOrganizationList();
  }

  componentWillUnmount() {
    this.setState({ breadCumb: false });
  }
  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });

  };
  render() {
    const { activeKey } = this.state;

    return (
      <Tabs type="card" 
       activeKey={this.props.activeTab} 
       onChange={this.props.handleOnClick}
      >
        {this.props.organizationDetailsList.map((item) => (
          <TabPane key={item.organizationId
          } 
          tab={
            <>
            {item.organizationName}
            {item.type==="Parent" && <GlobalOutlined style={{ marginLeft: 8 }} />}
            </>
            }>
            {/* <Card>
              <p>Country: {item.country_name}</p>
              <p>ID: {item.country_id}</p>
            </Card> */}
           
          </TabPane>
        ))}
      </Tabs>
    );
  }
}
const mapStateToProps = ({ auth, customer, contact, opportunity }) => ({
  // organizationDetailsList:auth.organizationDetailsList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getOrganizationList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationHeaderTab);
