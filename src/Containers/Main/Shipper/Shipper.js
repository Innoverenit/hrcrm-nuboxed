import React, { useState,useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  handleShipperModal,
  setShipperViewType,
  getShipperByUserId,
  getAllShipperList,
} from "./ShipperAction";

const ShipperHeader =lazy(()=>import("./ShipperHeader"));
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
     "110",  // "Name",//0
      "102",   // "Phone",//1
      "140",   // "Email",//2
       "891",  // "Ship By",//3
      "185",   // 'Address',//4
      "188",   // 'City',//5
      "879",   // 'Pin Code',//6
      "1069",   // 'Reinstate',//7
      "82",   // 'Loading',//8
      "170",   // 'Edit',//9
      "",   //  'Do you want to delete',//10
      "887",   //  'Shipper',//11
       "357",  //  'Dial Code',//12
       "",  //  'Integrated',//13
      "76",   //  'Assigned',//14
       "104",  //  'Create',//15
       "",  //  'Update',//16
       "900",  //  'My Shippers',//17
       "228",  //  'All',//18
       "",  //  'Deleted',//19
       "288",  //  'Search by Name or Sector',//20
        "", //  'Export Shipper',//21
       "85",  //  'Add',//22
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
      <Suspense fallback={<BundleLoader />}>
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
