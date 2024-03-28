import React, {  PureComponent,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
 import { getDepartmentRoleData } from "../../SettingsAction"
import KPIList from "../KPI/KPIList";


const TabPane = StyledTabs.TabPane;
class KPIRole extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            key: "",
            departmentData: {}
        }
    }

    componentDidMount() {
        this.props.getDepartmentRoleData(this.props.departmentId)
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
         {/* hello */}
        {this.state.departmentData.roleTypeId && (
            <Suspense fallback={"Loading..."}>
              
                <KPIList 
                departmentId={this.props.departmentId}
                departmentData={this.state.departmentData}
                roleTypeId={this.state.departmentData.roleTypeId} 

                />
            </Suspense>
        )}
        </TabPane>
      ))
    ) : (
      <div class=" flex items-center">{departmentRoleData.message || 'No data available'}</div>
    )
  ) : (
    <div>No data available</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(KPIRole);
