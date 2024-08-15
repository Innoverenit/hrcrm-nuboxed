// import React, { useState,useEffect } from 'react';
// import { Tabs, Card } from 'antd';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { getDepartmentList,getDepartmentRoleData } from "../../../SettingsAction"
// import DepartmentRole from './DepartmentRole';
// // import MatrixData from './MatrixData';


// const { TabPane } = Tabs;


// const Access = (props) => {
//     const [activeTab, setActiveTab] = useState(props.departmentList.length > 0 ? props.departmentList[0].departmentId : null);
//   useEffect(() => {
//     props.getDepartmentList(props.orgId);
//      props.getDepartmentRoleData(activeTab);
//     console.log(activeTab)
//   },[activeTab]);

//   useEffect(() => {
   
//     props.getDepartmentRoleData(activeTab);
//     console.log(activeTab)
//   },[activeTab]);
 
//   console.log(activeTab)

//   const handleTabClick = (key) => {
//     console.log(key)
//     setActiveTab(key);
//     props.getDepartmentRoleData(key);
    
//   };

//   return (
//     <Tabs type="card" activeKey={activeTab} onChange={handleTabClick}>
//       {props.departmentList.map((item) => (
//         <TabPane key={item.departmentId
//         } tab={item.departmentName}>
//           {/* <Card>
//             <p>Country: {item.country_name}</p>
//             <p>ID: {item.country_id}</p>
//           </Card> */}
        
//           <DepartmentRole
//           activeTab={activeTab}
//           departmentRoleData={props.departmentRoleData}
//           />
//         </TabPane>
//       ))}
//     </Tabs>
//   );
// };

// const mapStateToProps = ({ settings, opportunity, auth }) => ({
//     departmentList: settings.departmentList,
//     orgId:auth.userDetails.organizationId,
//     departmentRoleData: settings.departmentRoleData,


// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({
//         getDepartmentList,
//         getDepartmentRoleData
//     }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Access);

import React, { PureComponent,lazy, Suspense, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { getDepartmentList } from "../../../SettingsAction"
const DepartmentRole = lazy(() => import("./DepartmentRole"));

const TabPane = StyledTabs.TabPane;
class Access extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            key: "",
            departmentData: {}
        }
    }

    componentDidMount() {
        this.props.getDepartmentList(this.props.orgId)
    }

    handleOnClick = (data) => {
        console.log(data);
        debugger;
        this.setState({
            departmentData: data,
        });

    };
    
 
    render() {
        if (this.props.fetchingDepartmentList) {
            return <BundleLoader />;
          }
        const { departmentList } = this.props;
        console.log(this.state.departmentData.departmentId)
      
        return (
            <>
                <TabsWrapper style={{height:"150vh" }}>
                    <StyledTabs type="card">
                        {departmentList.map((member, i) => {
                            return (
                                <TabPane
                                    key={i}
                                    tab={
                                        <span onClick={() => this.handleOnClick(member)}>
                                            {member.departmentName}
                                        </span>
                               
                                    }
                                    
                                >

                                    {this.state.departmentData.departmentId && (
                                        <Suspense fallback={"Loading..."}>
                                            <DepartmentRole 
                                     departmentId={this.state.departmentData.departmentId} 
                                                />
                                            {/* <AccessForm 
                                            departmentId={this.state.departmentData.departmentId} 
                                            /> */}
                                        </Suspense>
                                    )}

                                </TabPane>
                            );
                        })}

                    </StyledTabs>
                </TabsWrapper>
            </>
        )
    }
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
    departmentList: settings.departmentList,
    orgId:auth.userDetails.organizationId,
    fetchingDepartmentList:settings.fetchingDepartmentList,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getDepartmentList
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Access);













