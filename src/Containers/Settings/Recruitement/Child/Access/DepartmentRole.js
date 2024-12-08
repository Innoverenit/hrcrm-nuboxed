import React, {  PureComponent,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
 import { getDepartmentRoleData } from "../../../SettingsAction"
const AccessForm = lazy(() => import("./AccessForm"));

const TabPane = StyledTabs.TabPane;
class DepartmentRole extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            key: "",
            departmentData: {}
        }
    }

    // componentDidMount() {
    //     this.props.getDepartmentRoleData(this.props.departmentId)
    // }
    componentDidMount() {
      this.props.getDepartmentRoleData(this.props.departmentId)
    
      // Set the initial club data when departmentRoleData is available
      if (this.props.departmentRoleData && this.props.departmentRoleData.length > 0) {
        this.setState({
          departmentData: this.props.departmentRoleData[0],
        });
      }
    }
    
    componentDidUpdate(prevProps) {
      // Check if departmentRoleData has changed and set the initial state
      if (prevProps.departmentRoleData !== this.props.departmentRoleData) {
        if (this.props.departmentRoleData && this.props.departmentRoleData.length > 0) {
          this.setState({
            departmentData: this.props.departmentRoleData[0],
          });
        }
      }
    }

    handleOnClick = (data) => {
        console.log(data);
        debugger;
        this.setState({
            departmentData: data,
        });

    };
    render() {
      if (this.props.fetchingDepartmentRoleData) {
        return <BundleLoader />;
      }
        const { departmentRoleData } = this.props;
        // console.log(this.state.departmentData.roleTypeId)
        return (
            <>
                <div className="h-[83vh] border-2 bg-white shadow-2xl" >
                  
                    <StyledTabs type="card">
  {departmentRoleData ? (
    Array.isArray(departmentRoleData) && departmentRoleData.length > 0 ? (
      departmentRoleData.map((member, i) => (
        <TabPane
          key={i}
          tab={
            <span onClick={() => this.handleOnClick(member)}>
              {member.roleType}
            </span>
          }
        >
         {/* hello */}
        {this.state.departmentData.roleTypeId && (
            <Suspense fallback={"Loading..."}>
              
                <AccessForm 
                departmentId={this.props.departmentId}
                departmentData={this.state.departmentData}
                roleTypeId={this.state.departmentData.roleTypeId} 

                />
            </Suspense>
        )}
        </TabPane>
      ))
    ) : (
      <div class=" flex items-center">{departmentRoleData.message || 'None available'}</div>
    )
  ) : (
    <div>None available</div>
  )}
</StyledTabs>
                </div>
            </>
        )
    }
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
    departmentRoleData: settings.departmentRoleData,
    fetchingDepartmentRoleData:settings.fetchingDepartmentRoleData,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getDepartmentRoleData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentRole);


















// import React, {  PureComponent,lazy, Suspense } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTabs } from "../../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../../Components/UI/Layout";
// //  import { getDepartmentAccess } from "../../../SettingsAction"
// const AccessForm = lazy(() => import("./AccessForm"));

// const TabPane = StyledTabs.TabPane;
// class DepartmentRole extends PureComponent {

//     constructor(props) {
//         super(props)

//         this.state = {
//             key: "",
//             departmentData: {}
//         }
//     }

//     // componentDidMount() {
//     //     this.props.getDepartmentAccess(this.state.departmentData.departmentId)
//     // }

//     handleOnClick = (data) => {
//         console.log(data);
//         debugger;
//         this.setState({
//             departmentData: data,
//         });

//     };
//     render() {
//         const { departmentRoleData } = this.props;
//         // console.log(this.state.departmentData.roleTypeId)
//         return (
//             <>
//                 <TabsWrapper >
                  
//                     <StyledTabs type="card">
//   {departmentRoleData ? (
//     Array.isArray(departmentRoleData) && departmentRoleData.length > 0 ? (
//       departmentRoleData.map((member, i) => (
//         <TabPane
//           key={i}
//           tab={
//             <span onClick={() => this.handleOnClick(member)}>
//               {member.roleType}
//             </span>
//           }
//         >
      
//         {this.state.departmentData.roleTypeId && (
//             <Suspense fallback={"Loading..."}>
              
//                 <AccessForm 
//                 departmentId={this.props.departmentId}
//                 departmentData={this.state.departmentData}
//                 roleTypeId={this.state.departmentData.roleTypeId} 

//                 />
//             </Suspense>
//         )}
//         </TabPane>
//       ))
//     ) : (
//       <div class=" flex items-center">{departmentRoleData.message || 'None available'}</div>
//     )
//   ) : (
//     <div>None available</div>
//   )}
// </StyledTabs>
//                 </TabsWrapper>
//             </>
//         )
//     }
// }

// const mapStateToProps = ({ settings, opportunity, auth }) => ({
//     // departmentRoleData: settings.departmentRoleData,

// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({
//         // getDepartmentRoleData
//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(DepartmentRole);




















// import React, { useState,useEffect } from 'react';
// import { Tabs, Card } from 'antd';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {getDepartmentAccess} from "../../../SettingsAction"
// // import {getCountries} from "../../../../Auth/AuthAction"
// // import MatrixData from './MatrixData';


// const { TabPane } = Tabs;

// const DepartmentRole = (props) => {
//   useEffect(() => {
//     props.getDepartmentAccess(activeTab1);
//     console.log(activeTab1)
//   },[activeTab1,props.departmentRoleData]);

//   useEffect(() => {
//     // props.getDepartmentAccess(activeTab1);
//     // console.log(activeTab1)
//   },[props.departmentRoleData]);

//   // useEffect(() => {
   
//   //   props.getDepartmentAccess(activeTab,props.organizationId);
//   //   console.log(activeTab)
//   // },[activeTab]);
 
//   const [activeTab1, setActiveTab1] = useState(props.departmentRoleData.length > 0 ? props.departmentRoleData[0].roleTypeId : null);

//   const handleTabClick = (key) => {
//     console.log(key)
//     setActiveTab1(key);
//     props.getDepartmentAccess(key);
//   };

//   return (
//     <Tabs type="card" activeKey={activeTab1} onChange={handleTabClick}>
//       {props.departmentRoleData && props.departmentRoleData.map((item) => (
//         <TabPane key={item.roleTypeId
//         } tab={item.roleType}>
//           {/* <Card>
//             <p>Country: {item.country_name}</p>
//             <p>ID: {item.country_id}</p>
//           </Card> */}
//           hello
//           {/* <MatrixData
//           activeTab={activeTab}
//           matrixData={props.matrixData}
//           /> */}
//         </TabPane>
//       ))}
//     </Tabs>
//   );
// };

// const mapStateToProps = ({ settings, opportunity, auth }) => ({
//     organizationId: auth.userDetails.organizationId,
//     departmentAcces: settings.departmentAcces,
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({
//       getDepartmentAccess
//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(DepartmentRole);



