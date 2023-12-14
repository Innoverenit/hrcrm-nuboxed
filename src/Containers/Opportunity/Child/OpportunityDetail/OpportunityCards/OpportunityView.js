import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, } from "antd";
import { FormattedMessage } from "react-intl";
import LinkTagCustomerModal from "./LinkTagCustomerModal"
import {
  StyledPopconfirm,
} from "../../../../../Components/UI/Antd";
import {
  Title,
  SubTitle,
  MultiAvatar,
} from "../../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {linktagCustomer} from "../../../OpportunityAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import {  LinkOutlined } from "@ant-design/icons";
import styled from "styled-components";

class OpportunityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkContactModalVisible: false,
    };
  }
  handleLinkContactModalVisible = () =>
    this.setState({
      linkContactModalVisible: !this.state.linkContactModalVisible,
    });

  unlinkCallback = () => this.props.updateAccount({});

  linkCallback = (accountId) => {
    console.log("inside link callback");
    this.setState({
      linkContactModalVisible: !this.state.linkContactModalVisible,
    });
    this.props.setAccount(accountId);
  };

  render() {
    
  

    console.log(this.props.account);
    const {
      opportunity: { opportunityName,opportunityId },
      account: { accountId, accountName, imageId, imageURL },
      opportunity,
      toggleViewType,
      linkContactModal,
      handleLinkContactModal,
      linkAction,
      linkType,
      unlinkAccountFromOpportunity,
      linkAccountToOpportunity,
    } = this.props;
    console.log("function",opportunityId)
    return (
      <>
        <FlexContainer justifyContent="space-between">
          <FlexContainer
            justifyContent="flex-start"
            flexWrap="nowrap"
            style={{ width: "85%",marginTop:"-8px" }}
          >
            <div style={{ width: "20%",marginTop:"4px"  }}>
              <MultiAvatar
                primaryTitle={opportunity.opportunityName}
                imageId={imageId}
                imageURL={imageURL}
              />
              {/* )} */}
            </div>
            &nbsp;
            <FlexContainer flexDirection="column" style={{ width: "80%" }}>
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                style={{fontSize:"0.85rem",lineHeight:"2rem"}}
                // style={{ marginLeft: "0.625em" }}
              >
                {`${opportunityName || ""}`}
              </Title>
              <SubTitle
                overflow="hidden"
                textOverflow="ellipsis"
                style={{ marginLeft: "0.625em" }}
              >
                {accountName}
              </SubTitle>
            </FlexContainer>
            <FlexContainer flexDirection="column" style={{ width: "20%" }}>
            {this.props.partnerLogin === "Yes" &&
            this.props.department === "Partner" ? null : (
              <FlexContainer style={{ placeItems: "center" }} justifyContent="flex-end">
                {this.props.account &&
                  this.props.account.hasOwnProperty("accountId") ? (
                    <StyledPopconfirm
                      placement="bottom"
                      title="Do you wish to detach?"
                    >
              
                    </StyledPopconfirm>
                  ) : (
                    <Tooltip //title="Tag Customer"
                      title={<FormattedMessage
                        id="app.tagcustomer"
                        defaultMessage="Tag Customer"
                      />}
                    >
                      <LinkOutlined
                        tooltipTitle="Tag Customer"
                        iconType="link"
                        onClick={this.handleLinkContactModalVisible}
                        size="16px"
                        style={{ color: "#fb8500",fontSize:"0.8rem" }}
                      />
                    </Tooltip>
                  )}
              &nbsp;
                <Tooltip 
                  title={<FormattedMessage
                    id="app.edit"
                    defaultMessage="Edit"
                  />}
                >
                 <span
                    tooltipTitle="Edit"
                    iconType="edit"
                    onClick={toggleViewType}
                    // size="16px"
                  >
                       <BorderColorIcon  style={{fontSize:"0.8rem"}}/>
              </span>
                </Tooltip>
              </FlexContainer>
            )}
            </FlexContainer>
          </FlexContainer>

          
        </FlexContainer>
        
        <LinkTagCustomerModal
        opportunityId={opportunityId}
        linkContactModalVisible={this.state.linkContactModalVisible}
        handleLinkContactModalVisible={this.handleLinkContactModalVisible}
        />
      </>
    );
  }
}

const mapStateToProps = ({ customer,auth,opportunity}) => ({
  customerByUserId:customer.customerByUserId,
  userId: auth.userDetails.userId,
  linkingtagCustomerOpportunity:opportunity.linkingtagCustomerOpportunity,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linktagCustomer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityView);
const AppIcon1 = (props) => (
  
  <BorderColorIcon
 

  />


);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;