import React,{lazy } from "react";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const LocationCellForm=lazy(()=>import("./LocationCellForm"));
const UsersCellCard=lazy(()=>import("./UsersCellCard"));

const TabPane = StyledTabs.TabPane;

function LocationCellTab(props) {

    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Cell`} key="1">
                        <div>
                        <LocationCellForm storedLoc={props.storedLoc}/>
                        </div>
                    </TabPane>
                    <TabPane tab={`User`} key="2">
                       <UsersCellCard/>
                    </TabPane>
                </StyledTabs>
            </TabsWrapper>
        </>
    );
}

const mapStateToProps = ({ settings, auth }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({

    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LocationCellTab);


