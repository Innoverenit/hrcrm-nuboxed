import React from "react";
import { Button, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import { PlusOutlined,} from '@ant-design/icons';
import styled from "styled-components";
import { FlexContainer, MainWrapper, ResponsiveCard } from "../../Components/UI/Layout";
import { MultiAvatar } from "../../Components/UI/Elements";
import { Title} from "../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const CustomerBusinessCard = (props) => {
  const {
    handleClick,
    handleSecondaryTitleClick,
    handlePreview,
    opportunityId,
    handlePreviewAdmin,
    imageId,
    imageURL,
    primaryTitle,
    secondaryTitle,
    secondaryImageId,
    secondaryImageURL,
    userType,
    subtitle1,
    subtitle2,
    hideSecondaryAvatar,
    subtitle1Icon,
    mainAvatarTitle,
    bottomBarComponent,
    department,
    currencyType,
    dropdownMenu,
    handleOpportunityModal,
    handleContactModal,
    handlePlaybookModal,
    AccountIcon,
    addPlaybookModal,
    handleCurrentPlaybook,
    user,
  } = props;
  console.log("AccountIcon", AccountIcon);
  return (
    <ResponsiveCard flexDirection="column" style={{ borderRadius: 3 }}>
      <MainWrapper>
        <FlexContainer
          alignItems="center"
          flexWrap="no-wrap"
          style={{ height: "2.81em" }}
        >
          <FlexContainer style={{ flexBasis: "25%", marginRight: "0.2rem" }}>
            <MultiAvatar
              primaryTitle={primaryTitle}
             
              imgHeight={40}
              imgWidth={40}
            />
          </FlexContainer>
          &nbsp;
          <FlexContainer
            flexDirection="column"
            style={{ flexBasis: "65%", overflow: "hidden" }}
          >
            <Title
              fontSize="1em"
              overflow="hidden"
              textOverflow="ellipsis"
              style={{ color: "#337df4", cursor: "pointer", fontSize: "1em" }}
           
            >
              {primaryTitle || ""}
            </Title>




          </FlexContainer>

        </FlexContainer>


        <FlexContainer
          style={{
            width: "100%",
            paddingLeft: "0.5rem",
            justifyContent: "space-evenly",
            marginTop: "-0.62em",
            marginBottom: "0.31em",
          }}
        >
          <Tooltip placement="right" title={<FormattedMessage
            id="app.pulse"
            defaultMessage="Pulse"
          />}>

            <div style={{ marginTop: "6%" }}>
              <Button
                className="hover:bg-black"
                size={"small"}
                type="ghost"
                style={{
                  color: " #B01E28",
                  borderColor: "transparent",
                  alignSelf: "flex-end",
                }}
          
              > {user.pulseAccessInd === true && (
                <MonitorHeartIcon
               
                />
              )}
              
              </Button>
            </div>
          </Tooltip>


          <div style={{ marginTop: "4%" }}>
            {/* <Tooltip placement="right" title="Contact"> */}
            <Tooltip placement="right" title={<FormattedMessage
              id="app.contacts"
              defaultMessage="Contact"
            />}>
              {/* <i class="far fa-address-book"></i> */}


              <PlusOutlined
                style={{ fontSize: "0.56em", cursor: "pointer" }}
              // type="plus"
              //onClick={handleContactModal}
              // handleIconClick={handleContactModal}
              />
            </Tooltip>
          </div>
        </FlexContainer>


      </MainWrapper>
    </ResponsiveCard>
  );
};
const mapStateToProps = ({ opportunity, auth }) => ({
  // addPlaybookModal: opportunity.addPlaybookModal,
  user: auth.userDetails,
  // subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerBusinessCard);

const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "123%" }}
  ></i>
);

const AppIcon1 = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "145%" }}
  ></i>
);

const PulseIcon = styled(AppIcon)`
  color: #df9697;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
const PulseIcon1 = styled(AppIcon1)`
  color: green;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
