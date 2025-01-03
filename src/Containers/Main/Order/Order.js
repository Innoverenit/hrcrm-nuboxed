import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setOrderViewType } from "./OrderAction";
import { BundleLoader } from "../../../Components/Placeholder";

const ProductionOrderCardList = lazy(() => import("./ProductionOrderCardList"));
const ProductionHistoryCardList = lazy(() =>
  import("./ProductionHistoryCardList")
);
const ProductionAllCardList = lazy(() => import("./ProductionAllCardList")); //2
const DeletedOrderList = lazy(() => import("./DeletedOrderList"));
const ProcreCardList = lazy(() => import("../Procre/ProcreCardList"));
const CommerceTab = lazy(() => import("./CommerceTab")); //2
const OrderHeader = lazy(() => import("./OrderHeader"));
const CompleteOrder = lazy(() => import("./CompleteOrder"));
const AllCompleteOrderList = lazy(() => import("./AllCompleteOrderList")); //2
const AllOrderList = lazy(() => import("./AllOrderList")); //4
const OrderTableByUserID = lazy(() => import("./OrderTableByUserID")); //1

const Order = (props) => {
  const [activeKey, setActiveKey] = useState("1");
  const [activeKey1, setActiveKey1] = useState("1");
  const [viewType, setViewType] = useState(props.viewType || "production");

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true);
        const itemsToTranslate = [
          "941", // List View 0
          "203", // Production 1
          "667", // Complete Orders 2
          "228", // ALL 3
          "663", // My Repair Orders 4
          "661", // Repair 5
          "664", // my Repair Orders-Completed 6
          "856", // trade 7
          "1518", // Ecom 8
          "1212", // Commerce 9
          "667", // Completed Orders 10
          "668", // Cancelled Orders 11
          "1280", // Search by OrderId 12
          "665", // My Repair Orders-Deleted 13
          "660", //   Order 14
          "679", //  Created(Name ANd Date) 15
          "142", // status 16
          "106", // 'Urgent', // 17
          "248", // ' Customer', // 18
          "73", // 'Contact', // 19
          "260", // ' Units', // 20
          "77", // 'Owner', // 21
          "676", // ' Supervisor',22
          "677", // 'Lead',23
          "108", // "Normal"24
          "100", // New 25
          "1272", // Add Lead 26
          "316", // Notes 27
          "920", // "Collection" 28
          "1259", // "Do you want to delete? 29
          "84", //  Delete 30
          "1251", //You have reached the end of page 31
          "85", // Add 32
          "1079", // Cancel 33
          "1380", // Add supervisor 34
          "102", // "Phone",35
          "289", // Creation Date 36
          "1044", // 'Item', 37
          "788", // ' Price/Unit',38
          "256", // 'Unit', 39
          "666", // 'Procure', 40
          "772", // 'Delivery', 41
          "658", // 'Location',42
          "794", // "Submitted By" 43
          "1533", // Change status to Accepted? 44
          "80", // Yes 45
          "81", // No 46
          "1534", // Accepted 47
          "1535", // Accept 48
          "1078", // Save 49
          "170", // Edit 50
          "213", // 'Quotation', // 51
          "1165", // ' Activity', // 52
          "138", // ' Documents',53
          "1167", // 'Sales Map',54
          "1168", // 'Summary',55
          "1169", // 'Invoice',//56
          "1213", // 'Add Commerce',/57
          "1357", // Memo 58
          "202", //    Order 59
          "1475", //    Add Order 60
          "1474", //    Add Contact 61
          "1209", // 'Shipping Address',62
          "710", // 'Billing Address',// 63
          "253", // 'Items',// 64
          "142", // 'Status',65
          "1210", // 'Invoices',66
          "1377", // 'Ship',67
          "71", //Type 68
          "880", //Inventory 69
          "1486", // Track 70
          "218", // Value 71
          "1492", // Total Value 72
          "1309", // Total Unit 73
          "926", // Transaction 74
        ];

        const translations = await props.translateText(
          itemsToTranslate,
          props.selectedLanguage
        );
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error translating menu items:", error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  useEffect(() => {
    const {
      repairInd,
      ecomModInd,
      tradingInd,
      orderManagementInd,
      productionInd,
    } = props.user.moduleMapper;
    if (!productionInd && repairInd && orderManagementInd) {
      setViewType("list");
    } else if (!repairInd && tradingInd && orderManagementInd) {
      setViewType("procure");
    } else if (!repairInd && !tradingInd && ecomModInd && orderManagementInd) {
      setViewType("ecom");
    } else {
      setViewType("production");
    }
  }, [props.user]);

  const handleViewChange = (type) => {
    setViewType(type);
  };
  const { translateText, selectedLanguage } = props;

  return (
    <React.Fragment>
      <Suspense fallback={<BundleLoader />}>
        <OrderHeader
          selectedLanguage={selectedLanguage}
          translateText={translateText}
          setOrderViewType={setOrderViewType}
          handleViewChange={handleViewChange}
          viewType={viewType}
          activeKey={activeKey}
          activeKey1={activeKey1}
          translatedMenuItems={translatedMenuItems}
        />

        {viewType === "list" &&
        props.user.moduleMapper.repairInd === true &&
        props.user.moduleMapper.orderManagementInd ? (
          <OrderTableByUserID
            selectedLanguage={selectedLanguage}
            translateText={translateText}
            translatedMenuItems={translatedMenuItems}
          />
        ) : viewType === "production" &&
          props.user.moduleMapper.productionInd === true &&
          props.user.moduleMapper.orderManagementInd ? (
          <ProductionOrderCardList
            selectedLanguage={selectedLanguage}
            translateText={translateText}
            translatedMenuItems={translatedMenuItems}
          />
        ) : viewType === "complete" ? (
          <ProductionHistoryCardList
            selectedLanguage={selectedLanguage}
            translateText={translateText}
            translatedMenuItems={translatedMenuItems}
          />
        ) : viewType === "productionAll" ? (
          <ProductionAllCardList
            selectedLanguage={selectedLanguage}
            translateText={translateText}
            translatedMenuItems={translatedMenuItems}
          />
        ) : viewType === "all" ? (
          <AllOrderList
            selectedLanguage={selectedLanguage}
            translateText={translateText}
            translatedMenuItems={translatedMenuItems}
          />
        ) : viewType === "complete" ? (
          <CompleteOrder
            selectedLanguage={selectedLanguage}
            translateText={translateText}
            translatedMenuItems={translatedMenuItems}
          />
        ) : viewType === "delete" ? (
          <DeletedOrderList
            selectedLanguage={selectedLanguage}
            translateText={translateText}
            translatedMenuItems={translatedMenuItems}
          />
        ) : viewType === "allcomplete" ? (
          <AllCompleteOrderList
            selectedLanguage={selectedLanguage}
            translateText={translateText}
            translatedMenuItems={translatedMenuItems}
          />
        ) : viewType === "procure" &&
          props.user.moduleMapper.tradingInd &&
          props.user.moduleMapper.orderManagementInd ? (
          <ProcreCardList
            selectedLanguage={selectedLanguage}
            translateText={translateText}
            translatedMenuItems={translatedMenuItems}
          />
        ) : viewType === "ecom" &&
          props.user.moduleMapper.ecomModInd &&
          props.user.moduleMapper.orderManagementInd ? (
          <CommerceTab
            selectedLanguage={selectedLanguage}
            translateText={translateText}
            translatedMenuItems={translatedMenuItems}
          />
        ) : null}
      </Suspense>
    </React.Fragment>
  );
};

const mapStateToProps = ({ order, auth }) => ({
  viewType: order.viewType,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setOrderViewType,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Order);
