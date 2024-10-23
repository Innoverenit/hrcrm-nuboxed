import React, { PureComponent,lazy, Suspense, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { getDepartmentList } from "../../../SettingsAction"
 const SalaryRole = lazy(() => import("./SalaryRole"));

const TabPane = StyledTabs.TabPane;
class SalaryTab extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            key: "",
            departmentData: {}
        }
    }
    componentDidMount() {
        this.props.getDepartmentList(this.props.orgId)
      
        // Set the initial club data when departmentList is available
        if (this.props.departmentList && this.props.departmentList.length > 0) {
          this.setState({
            departmentData: this.props.departmentList[0],
          });
        }
      }
      
      componentDidUpdate(prevProps) {
        // Check if departmentList has changed and set the initial state
        if (prevProps.departmentList !== this.props.departmentList) {
          if (this.props.departmentList && this.props.departmentList.length > 0) {
            this.setState({
              departmentData: this.props.departmentList[0],
            });
          }
        }
      }
    // componentDidMount() {
    //     this.props.getDepartmentList(this.props.orgId)
    // }

    handleOnClick = (data) => {
        console.log(data);
        debugger;
        this.setState({
            departmentData: data,
        });

    };
    render() {
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
                                            <SalaryRole 
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

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getDepartmentList
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SalaryTab);













