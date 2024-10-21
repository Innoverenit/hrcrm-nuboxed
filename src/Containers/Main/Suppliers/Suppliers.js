import React, { useState,useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuppliersViewType } from "./SuppliersAction";
import { BundleLoader } from "../../../Components/Placeholder";
import { getSuppliersList, getAllSuppliersList } from "./SuppliersAction";
const SuppliersHeader =lazy(()=>import("../../Main/Suppliers/SuppliersHeader"));
const SuppliersDeletedCardList =lazy(()=>import("./Child/SuppliersDeletedCardList"));
const SuppliersCardList =lazy(()=>import("./Child/SuppliersCardList"));
const AllSuppliersCardList=lazy(()=>import("./Child/AllSuppliersCardList"));
const SuppliersNotApprovalList =lazy(()=>import("./Child/SuppliersNotApprovalList"))

 function Suppliers (props) {

  const [currentData, setCurrtData] = useState("");

 const setCurrentData = (value) => {
  setCurrtData(value);
  };

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       "110", //  "Name",//0
        "102",  // "Phone",//1
       "140",   // "Email",//2
        "1109",  // "Country",//3
        "835",  // "My Suppliers",//4
         "1257", // "Not Approved",//5
         "228", // "ALL",//6
         "1258", // 'Deleted',//7
        "228",  // 'Search by Name or Sector',//8 (ALL)
        "85",  // 'Add',//9
         "82", // 'Loading',//10
        "1277", // 'Export Supplier',//11
         "104", // 'Create',//12
         "824", // 'Suppliers',//13
         "357", // 'Dial Code',//14
         "102", // 'Phone',//15
        "140",  // 'Email',//16
        "116",  // 'Approve',//17
        "831",  // 'Purchase Order',//18
        "657",  // 'Price',//19
        "170",  // 'Edit',//20
        "84",  // 'Delete',//21
       "1259",  // 'Do you want to delete',//22
        "100",  // 'New',//23
         "76", // 'Assigned',//24
         "1107", // 'Update',//25
         "14", // 'Category',//26
         "259", // 'Attribute',//27
          "654",// 'Quality',//28
         "1260", // 'Last',//29
          "76",// 'Date',//30
         "1079", // 'Cancel',//31
         "796", // 'Material',//32
         "241", // 'Currency',//33
         "185", // 'Address',//34
         "188", // 'City',//35
         "879", // 'Pin Code',//36
         "1069", // 'Reinstate',//37
          "739",// "Publish",//38
          "880",//39 Invenntory
          "1083",//Supplier ID 40
          "302",//url 41
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

    const { setSuppliersViewType, viewType } = props;
    return (
      <React.Fragment>
       <Suspense fallback={<BundleLoader />}>
        <SuppliersHeader
          setSuppliersViewType={setSuppliersViewType}
          viewType={viewType}
          handleClear={props.handleClear}
          currentData={currentData}
          setCurrentData={setCurrentData}
          translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}
        />

       
          {props.viewType === "card" ? (
            <SuppliersCardList 
            translateText={props.translateText}
            translatedMenuItems={translatedMenuItems}
            selectedLanguage={props.selectedLanguage}
            />
          ) 
          : props.viewType==="all" ? (
            <AllSuppliersCardList
            translateText={props.translateText}
            translatedMenuItems={translatedMenuItems}
            selectedLanguage={props.selectedLanguage}
            />
          )
          : props.viewType==="not approved" ? (
            <SuppliersNotApprovalList
            translateText={props.translateText}
            translatedMenuItems={translatedMenuItems}
            selectedLanguage={props.selectedLanguage}
            />
          )
          : props.viewType==="delete" ? (
            <SuppliersDeletedCardList
            translateText={props.translateText}
            translatedMenuItems={translatedMenuItems}
            selectedLanguage={props.selectedLanguage}
            />
          )
          :null}
        </Suspense>
      </React.Fragment>
    );
}

const mapStateToProps = ({ suppliers, auth }) => ({
  viewType: suppliers.viewType,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setSuppliersViewType,
      getSuppliersList,
      getAllSuppliersList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers);
