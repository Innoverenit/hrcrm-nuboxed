import React, { useEffect, Suspense,useState, lazy } from "react";
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
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.getCustomerDetailsById(customerId);
  }, [customerId]);

        useEffect(() => {
            const fetchMenuTranslations = async () => {
              try {
                setLoading(true); 
                const itemsToTranslate = [
                  "702",  // Tax Registration # 0
                  "278",    //Sector 1
                  "307",  //Registration 2 
                  "102", // Phone 3 
                  "302",  // URL 4 
                  "185",// Address 5
                 "186",//  street 6
                 "188",//  City 7
                 "1261",//  State 8
                 "1236",//  Pincode 9
                 "1109",//  Country 10 
                 "102",//  Phone 11
                 "140",//  Email13 12 
                 "891",//  "Ship By 13
                

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

  const { customer, fetchingCustomerDetailsById } = props;
  return (
    <>
      <CustomerDetailHeader
       customer={customer}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={translatedMenuItems}
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
                  translatedMenuItems={translatedMenuItems}
                />
              </div>
              <div className="w-3/4 max-sm:w-full">
                <CustomerDetailRight
                  customer={customer}
                  translateText={props.translateText}
                  selectedLanguage={props.selectedLanguage}
                  translatedMenuItems={translatedMenuItems}
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

