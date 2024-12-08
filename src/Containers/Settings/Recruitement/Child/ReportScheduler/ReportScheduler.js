
import React, {  PureComponent,lazy, Suspense,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { getDepartmentList } from "../../../SettingsAction";
 const AllCustomerListTable = lazy(() =>
  import("../ReportScheduler/AllCustomerListTable")
);
const AllCustomerForm = lazy(() =>
import("../ReportScheduler/AllCustomerForm")
);

const TabPane = StyledTabs.TabPane;
class SchedulerTab extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            key: "",
            departmentData: {},
            departmentId:"",
        }
    }

    componentDidMount() {
        this.props.getDepartmentList(this.props.orgId)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.departmentList !== this.props.departmentList && this.props.departmentList.length > 0) {
          // Set the default departmentId to the first item in the list after loading
          this.setState({ departmentId: this.props.departmentList[0].departmentId });
        }
      }

    handleOnClick = (departmentId) => {
        console.log(departmentId);
        debugger;
        this.setState({
            departmentId: departmentId,
        });

    };
    render() {
        const { departmentList } = this.props;
        // console.log(this.state.departmentData.departmentId)
        return (
            <>
                <TabsWrapper>
                    <StyledTabs type="card">
                        {departmentList.map((member, i) => {
                            return (
                                <TabPane
                                    key={i}
                                    tab={
                                        <span onClick={() => this.handleOnClick(member.departmentId)}>
                                            {member.departmentName}
                                        </span>
                                    }
                                >

{this.state.departmentId && (
                                        <Suspense fallback={"Loading..."}>
                                           
                                        <AllCustomerForm
                                         departmentList={this.props.departmentList} 
                                         departmentId={this.state.departmentId}/>
                             <AllCustomerListTable 
                             departmentList={this.props.departmentList} departmentId={this.state.departmentId}/>
                            
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

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getDepartmentList
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerTab);













