import React from "react";
import { Icon } from "antd";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import {
  EyeInvisibleOutlined,} from '@ant-design/icons';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { bindActionCreators } from "redux";
import RecruitCommunicationForm from "./RecruitCommunicationForm";

const TabPane = StyledTabs.TabPane;

function RecruitCommunicationTab(props) {
  return (
    <>
      <TabsWrapper>
        <StyledTabs defaultActiveKey="1" type="card">
          <TabPane
            tab={
              <MailOutlineIcon
                type="mail"
                style={{
                  marginTop: "0.375em",
                  fontSize: "1.125em",
                  paddingLeft: "0.625em",
                }}
              />
            }
            key="1"
          >
            <div style={{ marginTop: 10 }}>
              <RecruitCommunicationForm />
            </div>
          </TabPane>
          {/* <TabPane
            tab={
              <Icon
                type="bell"
                style={{
                  marginTop: "0.375em",
                  fontSize: "1.125em",
                  paddingLeft: "0.625em",
                }}
              />
            }
            key="2"
          >
            <div style={{ marginTop: 10 }}>
              <QuotationCommunicationFormForNotification />
            </div>
          </TabPane> */}
        </StyledTabs>
      </TabsWrapper>
    </>
  );
}

const mapStateToProps = ({ settings }) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruitCommunicationTab);