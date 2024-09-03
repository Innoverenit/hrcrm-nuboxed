import React, { useEffect, useState} from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import {
  getJumpFinanceDetail
} from "../../DashboardAction";
import { BundleLoader } from "../../../../Components/Placeholder";

function DashOrderJumpstart(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "", //          "Receivables Added", // 0
          "1233",// "Receivables Closed", // 1
          "1234",// "Receivables Cancelled" // 2
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);


  useEffect(() => {
    props.getJumpFinanceDetail(props.orgId,props.timeRangeType, "Catalog")
  }, [props.timeRangeType]);

  if (loading) {
    return <div><BundleLoader/></div>;
  }

  return (
    <>
   
      <div class=" flex flex-row w-full"  >
        <div class=" flex w-full max-sm:flex-col" >
          <div class="flex w-wk">
            <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title= {translatedMenuItems[0]}
              // {<FormattedMessage
              //   id="app.financeadded"
              //   defaultMessage="Receivables Added"
              // />}
            // jumpstartClick={()=>handlePitchQualifiedDrawer(true)}
            cursorData={"pointer"}
            value={props.financeDetail.totalPayableAmount}
            isLoading={props.fetchingJumpstartFinanceDetail}
            />

           
          </div>
          <div class="flex w-wk">
            <JumpStartBox
 bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title= {translatedMenuItems[1]}
              // {<FormattedMessage
              //   id="app.financeclosed"
              //   defaultMessage="Receivables Closed"
              // />}
            // jumpstartClick={()=>handleDealAddedDrawer(true)}
            cursorData={"pointer"}
            value={props.financeDetail.outstanding}
            isLoading={props.fetchingJumpstartFinanceDetail}
            />
            <JumpStartBox
                         bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title= {translatedMenuItems[3]}
              // {<FormattedMessage
              //   id="app.financecancelled"
              //   defaultMessage="Receivables Cancelled"
              // />}
            // jumpstartClick={()=>handleDealClosedDrawer(true)}
            cursorData={"pointer"}
            value={ props.financeDetail.orderValue}
            isLoading={props.fetchingJumpstartFinanceDetail}
            />
          </div>
        </div>
       
      </div>
      
    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  financeDetail: dashboard.financeDetail,
  orgId: auth.userDetails.organizationId,
  fetchingJumpstartFinanceDetail: dashboard.fetchingJumpstartFinanceDetail,
  userId: auth.userDetails.employeeId,
  timeRangeType: dashboard.timeRangeType,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpFinanceDetail
      //   getJumpInvestor2list,
      //   getJumpInvestor3list,
      //   getJumpInvestor4list,
      //   handlePitchQualifiedDrawer,
      //   handlePitchAddedDrawer,
      //   handleDealAddedDrawer,
      //   handleDealClosedDrawer

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashOrderJumpstart);
