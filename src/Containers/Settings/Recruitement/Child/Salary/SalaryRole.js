import React, {  PureComponent,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
 import { getDepartmentRoleData } from "../../../SettingsAction"
const SalaryCard = lazy(() => import("./SalaryCard"));

const TabPane = StyledTabs.TabPane;
class SalaryRole extends PureComponent {

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
        const { departmentRoleData } = this.props;
        // console.log(this.state.departmentData.roleTypeId)
        return (
            <>
                <TabsWrapper >
                  
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

        {this.state.departmentData.roleTypeId && (
            <Suspense fallback={"Loading..."}>
              
                <SalaryCard 
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
                </TabsWrapper>
            </>
        )
    }
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
    departmentRoleData: settings.departmentRoleData,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getDepartmentRoleData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SalaryRole);