import React, { useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { getCustomerDetailsById } from "../../CustomerAction";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";

const CustomerDetailRight = lazy(() => import("./CustomerDetailRight"));
const CustomerDetailLeft = lazy(() => import("./CustomerDetailLeft"));
const CustomerDetailHeader = lazy(() => import("./CustomerDetailHeader"));

function CustomerDetail (props)  {

  const { customerId } = useParams();
  useEffect(() => {
    props.getCustomerDetailsById(customerId);
  }, [customerId]);
  const { customer, fetchingCustomerDetailsById } = props;
  return (
    <>
      <CustomerDetailHeader
       customer={customer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
      />
      {fetchingCustomerDetailsById ? (
        <MainWrapper>
          <BundleLoader />
        </MainWrapper>
      ) : (
        <div>
          <Suspense fallback={"Loading..."}>
            <div className="flex flex-nowrap w-full max-sm:flex-col max-sm:overflow-x-auto max-sm:h-[63vh]">
              <div className="w-1/4 max-sm:w-full">
                <CustomerDetailLeft
                  customer={customer}
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                  translatedMenuItems={props.translatedMenuItems}
                />
              </div>
              <div className="w-3/4 max-sm:w-full">
                <CustomerDetailRight
                  customer={customer}
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                  translatedMenuItems={props.translatedMenuItems}
                />
              </div>
            </div>
          </Suspense>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ customer }) => ({
  fetchingCustomerDetailsById: customer.fetchingCustomerDetailsById,
  customer: customer.customer,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerDetailsById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail)

