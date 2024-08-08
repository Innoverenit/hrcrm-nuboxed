import React, { useState, lazy, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Button, Badge } from "antd";
import {
    updateOwnercustomerById,
    handleCustomerDrawerModal,
    getCustomerDetailsById,
    getCustomerKeySkill,
    handleCustomerEmailDrawerModal,
    getCustomerById,
  } from "../../../Customer/CustomerAction";
import { Title,MultiAvatar1 } from "../../../../Components/UI/Elements";
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
    <div class="w-[20%] block box-border flex-col rounded">
      {investorsbyId.map((item) => { 
        
        return (
          <div class="flex"> 
           <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
            <div class=" flex items-center flex-nowrap h-9">
              <div class=" basis-1/4">
                <MultiAvatar1
                  primaryTitle={item.name}
                  imgHeight={"1.8rem"}
                  imgWidth={"1.8rem"}
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
          </div>
        </div>
              )
            })}
      </div>
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