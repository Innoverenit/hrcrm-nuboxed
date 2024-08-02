import React, { lazy, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Button, Badge } from "antd";
import styled from "styled-components";
import { ResponsiveCard } from "../Layout";
import { handleUpdateCustomerModal } from "../../../Containers/Customer/CustomerAction";
import { MultiAvatar1 } from "../Elements";
import { Title,  } from "./";
const UpdateCustomerModal = lazy(() =>
  import(
    "../../../Containers/Customer/Child/UpdateCustomer/UpdateCustomerModal"
  )
);
const BussinessCard = (props) => {
  const {
    handleClick,
    handleSecondaryTitleClick,
    handlePreview,
    handlePreviewAdmin,
    imageId,
    imageURL,
    primaryTitle,
    url,
    onBoarded,
    position,
    handleEdit,
    customerId,
    secondaryTitle,
    secondaryImageId,
    secondaryImageURL,
    userType,
    handleUpdateCustomerModal,
    handleSetCurrentCustomerId,
    //item,
    UpdateCustomerModal,
    updateCustomerModal,
    currentCustomerId,
    setEditCustomer,
    subtitle1,
    subtitle2,
    hideSecondaryAvatar,
    subtitle1Icon,
    mainAvatarTitle,
    bottomBarComponent,
    department,
    currencyType,
    user,
    dropdownMenu,
    employee,
  } = props;
  console.log(props.role);
  return (
    <>
      <ResponsiveCard flexDirection="column" style={{ borderRadius: 3 }}>
        <div class="flex">
          <CardElement>
            <div class=" flex items-center flex-nowrap h-9">
              <div class=" basis-1/4">
                <MultiAvatar1
                  primaryTitle={primaryTitle}
                  imgHeight={40}
                  imgWidth={40}
                />
              </div>

              <div>
                <Title
                  fontSize="1.125em"
                  style={{
                    color: "#337df4",
                    cursor: "pointer",
                    display: "block",
                  }}
                  onClick={handleClick || null}
                >
                  {primaryTitle || ""}
                </Title>
              </div>
            </div>
            <div class=" flex w-full justify-around items-stretch mt-4">
              <div>
                <Button
                  style={{
                    color: " #df9697",
                    borderColor: "transparent",
                  }}
                  onClick={handlePreview}
                >
                  {user.pulseAccessInd === true && <MonitorHeartIcon />}
                </Button>
              </div>

              <div>
                <span
                  style={{
                    color: "black",
                    borderColor: "transparent",
                  }}
                >
                  <Badge count={onBoarded} style={{ right: "1px" }}>
                    <CardTravelIcon/>
                  </Badge>
                </span>
              </div>

              <div>
                <Button
                  style={{
                    borderColor: "transparent",
                    fontSize: "0.875rem",
                  }}
                >
                  Opportunity - {position}
                </Button>
              </div>
              <div>
                <Button
                  style={{
                    color: "#777777 ",
                    borderColor: "transparent",
                  }}
                  onClick={handleEdit}
                >
                  <BorderColorIcon style={{ fontSize: "1rem" }} /> {/* )} */}
                </Button>
              </div>
              
            </div>
            <div>
                <Button
                type="primary"
                  
                  // onClick={handleEdit}
                >
                  Convert to Account
                </Button>
              </div>
          </CardElement>
        </div>
      </ResponsiveCard>
    </>
  );
};

const mapStateToProps = ({ auth, customer }) => ({
  role: auth.userDetails.role,
  userId: auth.userDetails.userId,
  customerByUserId: customer.customerByUserId,
  customer: customer.customer,
  updateCustomerModal: customer.updateCustomerModal,
  addDrawerCustomerModal: customer.addDrawerCustomerModal,
  customerKeySkill: customer.customerKeySkill,
  user: auth.userDetails,
  documentsByCustomerId: customer.documentsByCustomerId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateCustomerModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(BussinessCard);
const AppIcon2 = (props) => <BorderColorIcon />;

const AppIcon = (props) => (
  <i
    className={`fas fa-heartbeat ${props.className}`}
    style={{ fontSize: "145%" }}
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
    background: yellow;
    color: blue;
  }
`;
const PulseIcon1 = styled(AppIcon1)`
  color: green;
  &:hover {
    background: yellow;
    color: blue;
  }
`;

const CardElement = styled.div`
  border-radius: 0.35rem;
  border: 3px solid #eeeeee;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.25em 0.62em #aaa;
  height: 7rem;
  color: rgb(68, 68, 68);
  margin: 1em;
  padding: 0.2rem;
  width: 16vw;
  margin-top: 1.5em;
  @media only screen and (max-width: 600px) {
    width: -webkit-fill-available;
  }
`;
