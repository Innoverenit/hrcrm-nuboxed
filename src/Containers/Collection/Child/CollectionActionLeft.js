import React, {useState,  useEffect} from "react";
import { Tooltip, Avatar } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  inputCustomerAllDataSearch,
  inputCustomerReceivableDataSearch,
  inputDistributorAllDataSearch,
  inputDistributorReceivableDataSearch,
} from "../CollectionAction";

const CollectionActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];
  const { user } = props;
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "1360",  // My Collections
        "228",//  All
        "1358",// Outstanding Opening
        "1359",// Outstanding Closing
  
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
  const { allCustomers } = props;
  console.log(allCustomers);
  var total =
    allCustomers &&
    allCustomers.reduce((a, item) => {
      return (a += item.totalPayableAmount) || 0;
    }, 0);
  var cost = `${Number(total).toFixed(2)}`;

  var totalA =
    allCustomers &&
    allCustomers.reduce((a, item) => {
      return (a += item.totalPayablePrev) || 0;
    }, 0);
  var costA = `${Number(totalA).toFixed(2)}`;

  const { allDistributors } = props;
  var total1 =
    allDistributors &&
    allDistributors.reduce((a, item) => {
      return (a += item.totalPayableAmount) || 0;
    }, 0);
  var cost1 = `${Number(total1).toFixed(2)}`;

  var totalB =
    allDistributors &&
    allDistributors.reduce((a, item) => {
      return (a += item.totalPayablePrev) || 0;
    }, 0);
  var costB = `${Number(totalB).toFixed(2)}`;

  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
      <Tooltip title=
      {translatedMenuItems[0]}
      //  "My Collections "
      // title="Distributor"
      >
        <span
          onClick={() => props.setCollectionViewType("distributor")}
          style={{
            marginRight: "0.5rem",
            cursor:"pointer",
            color: props.viewType === "distributor" && "#1890ff",
          }}
        >
          <Avatar style={{ background: props.viewType === "distributor" ? "#f279ab" : "#28a355" }}>
          {translatedMenuItems[1]} {/* ALL */}
          </Avatar>
        </span>
      </Tooltip>

      {props.viewType === "distributor" && (
        <>
          <div className=" ml-5">

          </div>
          &nbsp; &nbsp;

          &nbsp;
          {props.activeKey1 === "1" ? null : (
            <>
              <div className=" ml-5">
                <></>
              </div>
              <div className=" ml-5">
                <></>
              </div>
            </>
          )}
        </>
      )}

      {props.viewType === "customer" && (
        <>
          {props.activeKey === "1" ? (
            <div sclassName=" ml-5">

            </div>
          ) : (
            <div className=" ml-5">

            </div>
          )}

          {props.activeKey === "1" ? null : (
            <>
              <div className=" ml-5" >
                <>
                  <b>
                    {/* Outstanding Opening */}
                    {translatedMenuItems[2]}  ₹ {`${costA}`}</b>
                </>
              </div>
              <div className=" ml-5">
                <>
                  <b>
                    {/* Outstanding Closing */}
                    {translatedMenuItems[3]} ₹ {`${cost}`}</b>
                </>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth, collection, distributor, customer }) => ({
  user: auth.userDetails,
  viewType: collection.viewType,
  allCustomers: collection.allCustomers,
  allDistributors: collection.allDistributors,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputCustomerAllDataSearch,
      inputCustomerReceivableDataSearch,
      inputDistributorAllDataSearch,
      inputDistributorReceivableDataSearch,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CollectionActionLeft)

