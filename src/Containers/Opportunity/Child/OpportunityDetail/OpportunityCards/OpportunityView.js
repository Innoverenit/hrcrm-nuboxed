import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, } from "antd";

import LinkTagCustomerModal from "./LinkTagCustomerModal"
import {
  StyledPopconfirm,
} from "../../../../../Components/UI/Antd";
import {MultiAvatar} from "../../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {linktagCustomer} from "../../../OpportunityAction";
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
        <div class="flex justify-between" >
        <div class=" flex flex-row flex-wrap  grow shrink w-full ">
        
            <div>
              <MultiAvatar
                primaryTitle={opportunity.opportunityName}
                imageId={imageId}
                imageURL={imageURL}
              />
              {/* )} */}
            </div>
            &nbsp;
            <div class=" flex  flex-wrap w-[78%]   grow shrink ">
              <div
                overflow="hidden"
                textOverflow="ellipsis"
                style={{fontSize:"0.85rem",lineHeight:"2rem"}}
         
              >
                {`${opportunityName || ""}`}
              </div>
              <div className="ml-[0.625rem]"
                overflow="hidden"
                textOverflow="ellipsis"
               
              >
                {accountName}
              </div>
            </div>
            <div class=" flex  flex-wrap  grow shrink  ">
            {this.props.partnerLogin === "Yes" &&
            this.props.department === "Partner" ? null : (
              <div class=" flex flex-row flex-wrap  justify-end grow shrink  ">
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
                      <LinkOutlined class="text-[#fb8500] text-[0.8rem]"
                        tooltipTitle="Tag Customer"
                        iconType="link"
                        onClick={this.handleLinkContactModalVisible}
                        size="16px"                   
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
                       <BorderColorIcon className="!text-icon"/>
              </span>
                </Tooltip>
              </div>
            )}
            </div>
          </div>

          
        </div>
        
        <LinkTagCustomerModal
        opportunityId={opportunityId}
        linkContactModalVisible={this.state.linkContactModalVisible}
        handleLinkContactModalVisible={this.handleLinkContactModalVisible}
         translateText={this.props.translateText}
          selectedLanguage={this.props.selectedLanguage}
          translatedMenuItems={this.props.translatedMenuItems}
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