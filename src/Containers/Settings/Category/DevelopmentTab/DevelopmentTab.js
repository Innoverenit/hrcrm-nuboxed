import React, { Component,lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { getDepartmentList } from "../../SettingsAction"
import DevelopmentRole from "./DevelopmentRole";
// import KPIRole from "./KPIRole";


const TabPane = StyledTabs.TabPane;

class DevelopmentTab extends Component {
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
        const { departmentList } = this.props;
        console.log(this.state.departmentData.departmentId)
        return (
            <>
                <TabsWrapper style={{height:"100vh",overflowY: "scroll", }}>
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
                                            <DevelopmentRole 
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
const mapStateToProps = ({settings, opportunity, auth  }) => ({
    departmentList: settings.departmentList,
    orgId:auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDepartmentList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DevelopmentTab);
