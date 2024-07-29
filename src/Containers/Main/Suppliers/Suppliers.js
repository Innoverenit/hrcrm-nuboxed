import React, { useState,useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSuppliersViewType } from "./SuppliersAction";
import SuppliersHeader from "../../Main/Suppliers/SuppliersHeader";
import { BundleLoader } from "../../../Components/Placeholder";
import { getSuppliersList, getAllSuppliersList } from "./SuppliersAction";
import SuppliersDeletedCardList from "./Child/SuppliersDeletedCardList";
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
         "Name",//0
          "Phone",//1
          "Email",//2
          "Country",//3
          "My Suppliers",//4
          "Not Approved",//5
          "ALL",//6
          'Deleted',//7
          'Search by Name or Sector',//8
          'Add',//9
          'Loading',//10
          'Export Supplier',//11
          'Create',//12
          'Suppliers',//13
          'Dial Code',//14
          'Phone',//15
          'Email',//16
          'Approve',//17
          'Purchase Order',//18
          'Price',//19
          'Edit',//20
          'Delete',//21
          'Do you want to delete',//22
          'New',//23
          'Assigned',//24
          'Update',//25
          'Category',//26
          'Attribute',//27
          'Quality',//28
          'Last',//29
          'Date',//30
          'Cancel',//31
          'Material',//32
          'Currency',//33
          'Address',//34
          'City',//35
          'Pin Code',//36
          'Reinstate',//37
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

        <Suspense fallback={<BundleLoader />}>
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
