import React, { useState, lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Button, Badge } from "antd";
import moment from "moment";
import styled from "styled-components";
import {
    updateOwnercustomerById,
    handleCustomerDrawerModal,
    getCustomerDetailsById,
    getCustomerKeySkill,
    handleCustomerEmailDrawerModal,
    getCustomerById,
  } from "../../../Customer/CustomerAction";
import { ResponsiveCard } from "../../../../Components/UI/Layout";
import { BussinessCard,Title,MultiAvatar1 } from "../../../../Components/UI/Elements";
import {getInvestorsbyId,emptyInvestor,handleUpdateInvestorModal} from "../../InvestorAction";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateInvestorModal = lazy(() =>
  import("../UpdateInvestor/UpdateInvestorModal")
);
function InvestorCardView (props)  {
    const [page, setPage] = useState(0);
    useEffect(() => {
        props.getInvestorsbyId(props.userId, page);
        setPage(page + 1);
        // props.getSectors();
        // props.getCountries();
        // props.getAllCustomerEmployeelist();
      }, []);

      const [RowData, setRowData] = useState("");

      function handleCurrentRowData(datas) {
        setRowData(datas);
      }
    const {
    handleClick,
    handlePreview,

    primaryTitle,

    onBoarded,
    position,
    handleEdit,

    user,
   fetchingInvestors,
    investorsbyId,
    handleUpdateInvestorModal,
    updateInvestorModal,
  } = props;

  if (fetchingInvestors) {
    return <BundleLoader />;
  }
  return (
    <>
    <div>
    
      <ResponsiveCard flexDirection="column" style={{ borderRadius: 3 }}>
      {investorsbyId.map((item) => { 
        
        return (
          <div class="flex"> 
          <CardElement>
            <div class=" flex items-center flex-nowrap h-9">
              <div class=" basis-1/4">
                <MultiAvatar1
                  primaryTitle={item.name}
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
                  {item.name || ""}
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
                  Opportunity - {item.oppNo}
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
              )
            })}
      </ResponsiveCard>
 
      </div>

      <UpdateInvestorModal
        RowData={RowData}
        updateInvestorModal={updateInvestorModal}
        handleUpdateInvestorModal={handleUpdateInvestorModal}
        handleCurrentRowData={handleCurrentRowData}
      />
    </>
  );
};

const mapStateToProps = ({ auth, customer,investor }) => ({
  role: auth.userDetails.role,
  userId: auth.userDetails.userId,
  customerByUserId: customer.customerByUserId,
  customer: customer.customer,
  updateCustomerModal: customer.updateCustomerModal,
  addDrawerCustomerModal: customer.addDrawerCustomerModal,
  customerKeySkill: customer.customerKeySkill,
  user: auth.userDetails,
  documentsByCustomerId: customer.documentsByCustomerId,
  investorsbyId:investor.investorsbyId,
  fetchingInvestors: investor.fetchingInvestors,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  updateInvestorModal: investor.updateInvestorModal,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorsbyId,
      handleUpdateInvestorModal,
      emptyInvestor,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      getCustomerById,
      
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorCardView);
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
    width: 100%;
  }
`;
