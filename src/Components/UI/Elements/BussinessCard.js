import React, { lazy, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Button, Badge } from "antd";
import { handleUpdateCustomerModal } from "../../../Containers/Customer/CustomerAction";
import { MultiAvatar1 } from "../Elements";
import { Title,  } from "./";

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
       <div class="w-[20%] block box-border flex-col rounded">
        <div class="flex">
        <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
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
          </div>
        </div>
      </div>
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

