import React, { PureComponent,lazy, Suspense, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { StyledTabs } from "../../Components/UI/Antd";
import { TabsWrapper } from "../../Components/UI/Layout";
import DepartmentAsssessmentRole from "../AssessmentData/DepartmentAsssessmentRole"
import { getDepartmentList } from "../../Containers/Settings/SettingsAction"
//const DepartmentRole = lazy(() => import("./DepartmentRole"));

const TabPane = StyledTabs.TabPane;
class AssessmentData extends PureComponent {

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
                                            <DepartmentAsssessmentRole 
                                     departmentId={this.state.departmentData.departmentId} 
                                                />
                                          
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

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentData);