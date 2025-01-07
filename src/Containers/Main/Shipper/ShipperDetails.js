import React, { Component,useEffect,useState,Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getShipperByShipperId } from "./ShipperAction";
import {  MainWrapper } from "../../../Components/UI/Layout";
import { BundleLoader } from "../../../Components/Placeholder";
const ShipperDetailsHeader =lazy(()=>import("./ShipperDetailsHeader"));
const ShipperDetailsRight =lazy(()=>import("./ShipperDetails/ShipperDetailsTab/ShipperDetailsRight"));
const ShipperDetailsLeft =lazy(()=>import("./ShipperDetails/ShipperDetailsLeft"));

function ShipperDetails (props) {
    const { shipperId, data } = useParams();
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
         props.getShipperByShipperId(shipperId);
      }, [shipperId]);
        useEffect(() => {
          const fetchMenuTranslations = async () => {
            try {
              setLoading(true); 
              const itemsToTranslate = [
                "1165",//Activity 0
                "1377",// "ship id" 1
                "316",// "Notes" 2
                "138",  // Document 3
                "73",  // Contact 4
                "1219",// Cost 5
                "104",//Create 6
               "186",//  street7
               "188",//  City8
               "1261",//  State9
               "1236",//  Pincode10
               "1109",//  Country11
               "102",//  Phone12
               "140",//  Email13
               "891",//  "Ship By14
      
      
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
  
    const { shipper, fetchingShipperDetailsByShipperId } = props;
    return (
      <>
        <>
        <Suspense fallback={"Loading..."}>
          <ShipperDetailsHeader
           translateText={props.translateText}
           selectedLanguage={props.selectedLanguage}
           translatedMenuItems={translatedMenuItems}
          />
          </Suspense>
          {fetchingShipperDetailsByShipperId ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
            <div>
              <Suspense fallback={"Loading..."}>
                <div class="flex flex-nowrap" flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div class="w-[22%]">
                    <ShipperDetailsLeft shipper={shipper}
                     translateText={props.translateText}
                     selectedLanguage={props.selectedLanguage}
                     translatedMenuItems={translatedMenuItems}
                    />
                  </div>
                  <div class="w-[78%]">
                    <ShipperDetailsRight shipper={shipper}
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
      </>
    );
 
}
const mapStateToProps = ({ shipper }) => ({
  fetchingShipperDetailsByShipperId: shipper.fetchingShipperDetailsByShipperId,
  shipper: shipper.shipperDetailsByShipperId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     getShipperByShipperId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperDetails)

