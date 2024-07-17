import React, { useState,useEffect, Suspense, lazy } from "react";
import ShipperHeader from "./ShipperHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  handleShipperModal,
  setShipperViewType,
  getShipperByUserId,
  getAllShipperList,
} from "./ShipperAction";

const AddShipperModal =lazy(()=>import("./AddShipperModal"));
const AllShipperList =lazy(()=>import("./AllShipperList"));
const ShipperDeleteTable =lazy(()=>import("./ShipperDeleteTable"));
const ShipperDashboard =lazy(()=>import("./ShipperDashboard"));
const ShipperCardList =lazy(()=>import("./ShipperCardList"));


function  Shipper (props) {
  const [currentData, setCurrntData] = useState("");

const handleClear = () => {
  setCurrntData("");
    if (props.viewType === "table") {
      props.getShipperByUserId(props.userId);
    } else if (props.viewType === "all") {
      props.getAllShipperList();
    }
  };
  const setCurrentData = (value) => {
    setCurrntData(value);
  };

    const {
   addShipperModal,
      handleShipperModal,
      setShipperViewType,
      viewType,
    } =props;

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          const itemsToTranslate = [
           "Name",//0
            "Phone",//1
            "Email",//2
            "Ship By",//3
            'Address',//4
            'City',//5
            'Pin Code',//6
           'Reinstate',//7
            'Loading',//8
            'Edit',//9
         'Do you want to delete',//10
         'Shipper',//11
         'Dial Code',//12
         'Integrated',//13
         'Assigned',//14
         'Create',//15
         'Update',//16
         'My Shippers',//17
         'All',//18
         'Deleted',//19
         'Search by Name or Sector',//20
         'Export Shipper',//21
         'Add',//22
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
        } catch (error) {
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);


    return (
      <>
        <ShipperHeader
          viewType={viewType}
          setShipperViewType={setShipperViewType}
          handleClear={handleClear}
          currentData={currentData}
          setCurrentData={setCurrentData}
          handleShipperModal={handleShipperModal}
          translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}
        />
        <AddShipperModal
          handleShipperModal={handleShipperModal}
          addShipperModal={addShipperModal}
          translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}
        />
        <Suspense fallback={<BundleLoader />}>
          {props.viewType === "table" ? (
            <ShipperCardList translateText={props.translateText}
            translatedMenuItems={translatedMenuItems}
            selectedLanguage={props.selectedLanguage} />
          ) : props.viewType === "all" ? (
            <AllShipperList translateText={props.translateText}
            translatedMenuItems={translatedMenuItems}
            selectedLanguage={props.selectedLanguage}/>
          ) : props.viewType === "grid" ? (
            <ShipperDeleteTable translateText={props.translateText}
            translatedMenuItems={translatedMenuItems}
            selectedLanguage={props.selectedLanguage}/>
          ) : props.viewType === "dashboard" ? (
            <ShipperDashboard translateText={props.translateText}
            translatedMenuItems={translatedMenuItems}
            selectedLanguage={props.selectedLanguage}/>
          ) : null}
        </Suspense>
      </>
    );
}

const mapStateToProps = ({ shipper, auth }) => ({
  viewType: shipper.viewType,
  addShipperModal: shipper.addShipperModal,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setShipperViewType,
      getShipperByUserId,
      handleShipperModal,
      getAllShipperList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Shipper);
