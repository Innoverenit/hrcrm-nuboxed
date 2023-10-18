import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip, Icon } from "antd";
import { FormattedMessage } from "react-intl";
// import LinkTagCustomerModal from "./LinkTagCustomerModal"
import { Formik, Form, Field } from "formik";
import {
  StyledModal,
  StyledPopconfirm,
} from "../../../../../Components/UI/Antd";
import {
  Title,
  SubTitle,
  MultiAvatar,
} from "../../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {linktagCustomer} from "../../../../Opportunity/OpportunityAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../../Components/Utils";
import { EditOutlined, LinkOutlined } from "@ant-design/icons";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import styled from "styled-components";

class DealView extends Component {
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
      dealDetailsbyID: { opportunityName,invOpportunityId },
      account: { accountId, accountName, imageId, imageURL },
      dealDetailsbyID,
      toggleViewType,

    } = this.props;
 
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
                primaryTitle={dealDetailsbyID.opportunityName}
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
                fontSize={"1.375em"}
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
        
        {/* <LinkTagCustomerModal
        invOpportunityId={invOpportunityId}
        linkContactModalVisible={this.state.linkContactModalVisible}
        handleLinkContactModalVisible={this.handleLinkContactModalVisible}
        /> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(DealView);
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