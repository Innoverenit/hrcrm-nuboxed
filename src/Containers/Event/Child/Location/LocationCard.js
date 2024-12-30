import React, { useEffect, useState, lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getlocation, handleLocationShiftDrawer,
  handleUpdateLocationDrawer,
  handleLocationCustomerDrawer,
  handleLocationSupplierDrawer,
  deleteLocation, addingLocationToggle,
  handleLocnCellDrawer
} from "./LocationAction";
import TokenIcon from '@mui/icons-material/Token';
import {  Tooltip } from "antd";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import RefurbishToggle from "./RefurbishToggle";
import ProductionToggle from "./ProductionToggle";
import { BundleLoader } from "../../../../Components/Placeholder";
import InventoryToggle from "./InventoryToggle";
import BillingToggle from "./BillingToggle";
import CorporateToggle from "./CorporateToggle";
import ProjectToggle from "./ProjectToggle";
import RetailToggle from "./RetailToggle";
import ContactsIcon from '@mui/icons-material/Contacts';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AddLocationAltIcon from'@mui/icons-material/AddLocationAlt';
import InventoryIcon from'@mui/icons-material/Inventory';
import OnDeviceTrainingIcon from'@mui/icons-material/OnDeviceTraining';
import LanguageIcon from'@mui/icons-material/Language';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LocationSearchedData from "./LocationSearchedData";

const LocationCellDrawer = lazy(() => import("./LocationCellDrawer"));
const LocationCustomerDrawer = lazy(() => import("./LocationCustomerDrawer"));
const LocationSupplierDrawer = lazy(() => import("./LocationSupplierDrawer"));
const LocationShiftDrawer = lazy(() => import("./LocationShiftDrawer"));
const LocationUpdateDrawer = lazy(() => import("./LocationUpdateDrawer"));

const LocationCard = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [refurbish, Setrefurbish] = useState(props.showLocation.productionInd,)
  const handleRefurbishClick = (checked) => {
    Setrefurbish(checked);
    let data = {
      value: checked,
      //locationDetailsId:locationDetailsId,
      orgId: props.orgId,
      type: "production  ",
    };
    props.addingLocationToggle(data);
  };
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       
        "110",  // "Name",//0
         "185", // "Address",//1
         "203", // "Production",//2
         "758", // "Refurbish",//3
        "880",  // "Inventory",//4
        "1010",  // "Billing",//5
         "1011", // "Corporate",//6
       "137",   // "Project",//7
        "1013",  // "Retail",//8
        "24" , // "Region"//9
       "1017", // "Shift"
       "1627", // Customer-Virtual Location
       "744", // "Cell"
       "170", // "Edit"
       "1259", // "Do you want to delete?"
       "84",// "Delete"
     "1626" //  "No address available"
         
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  useEffect(() => {
    props.getlocation(props.orgId);
  }, []);

  const [storedLoc, setStoredLoc] = useState({});
  const handleStoredLocations = (locs) => {
    setStoredLoc(locs);
  }
  const handleLoadMore = () => {
    setPage(page + 1);
    // props.getlocation(props.orgId);
  }
  if (props.fetchingLocationData) return <BundleLoader />;
  return (
    <>
       {props.locationSerachedData.length > 0 ? (
    <LocationSearchedData
    locationSerachedData={props.locationSerachedData}
    fetchingLocationSearchData={props.fetchingLocationSearchData}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
  translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
      <div>
        <InfiniteScroll
          dataLength={props.showLocation.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingLocationData ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
          endMessage={ <p class="flex  text-center font-bold text-xs font-poppins text-red-500">You have reached the end of page. </p>}
          height={"83vh"}
        >
          <div className=" flex  font-bold font-poppins items-end  justify-between w-[94%] mt-3 p-1 bg-transparent  sticky  text-lm z-10 max-sm:hidden">
            <div className=" max-md:w-[7.5rem] w-[7.5rem] text-[#00A2E8] text-sm">
            <ContactsIcon className="!text-icon  "/>
            {translatedMenuItems[0]}</div>
            <div className="   max-md:w-[8.5rem] w-[8.5rem] ">
              
            </div>
            <div className=" max-md:w-[15.1rem] w-[15.1rem] ">
            <AddLocationAltIcon className="!text-icon  text-[#386641] "/>{translatedMenuItems[1]}
              {/* Address */}
              </div>
            <div className=" max-md:w-[5.9rem] w-[5.9rem] ">
            <PrecisionManufacturingIcon className=" !text-icon text-[#4361EE]"/>
            {translatedMenuItems[2]}
            {/* Production */}
            </div>
            <div className=" max-md:w-[3.9rem]  w-[4.9rem] truncate">
            <OnDeviceTrainingIcon className=" !text-icon text-[#06D6A0]"/> {translatedMenuItems[3]}{/* Refurbish */}
            </div>
            <div className="max-md:w-[5.5rem]  w-[5.5rem] truncate">
            <InventoryIcon className=" !text-icon text-[#480CA8]"/> {translatedMenuItems[4]} {/* Inventory */}
              </div>
            <div className="max-md:w-[4.6rem] w-[4.6rem] truncate ">
            <LocalAtmIcon  className="!text-icon text-[#001219] "/>
            {translatedMenuItems[5]} {/* Billing */}
              </div>
            <div className="max-md:w-[5.52rem] w-[5.52rem] truncate ">
            <ApartmentIcon className="!text-icon text-[#9B2226] "/>
            {translatedMenuItems[6]} {/* Corporate */}
              </div>
            <div className="max-md:w-[3.3rem] w-[4.3rem] truncate ">
            < AccountTreeIcon  className="!text-icon text-[#EF476F]"/>
            {translatedMenuItems[7]} {/* Project */}
              </div>
            <div className="max-md:w-[3.9rem] w-[3.9rem] truncate ">
            <PointOfSaleIcon  className="!text-icon text-[#005F73]"/>
            {translatedMenuItems[8]}{/* Retail */}
              </div>
            <div className="max-md:w-[7.9rem] w-[7.9rem] ">
            <LanguageIcon  className="!text-icon text-[#BC4749]"/>{translatedMenuItems[9]}{/* Regions */}
              </div>
          </div>
          <div class="w-[99%]">
            {props.showLocation.map((item) => {
              return (
                <div >
                  <div class=" flex rounded  justify-between  bg-white mt-1 h-8 items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200
                                     max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-24 max-sm: scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                    <div class="flex">
                      <div className=" flex w-[9.12rem] text-xs border-l-2 h-8 border-green-500 bg-[#eef2f9] items-center justify-start  md:w-[13.12rem] max-sm:w-full max-sm:justify-between ">


                        <div class=" text-xs items-center ml-gap font-poppins md:w-[10.1rem]">
                          {item.locationName}
                        </div>

                        </div>
                        <div className=" flex w-[3.25rem] items-center  h-8 ml-gap bg-[#eef2f9]  md:w-[3.25rem]  max-sm:w-full  max-sm:justify-between">


                          <div class=" text-xs items-center ml-gap font-poppins">
                            <CountryFlag1 countryCode={item.countryAlpha2Code} />
                            &nbsp;
                            {item.countryAlpha2Code}
                          </div>
                        </div>
                        <div className=" flex items-center  justify-start h-8 ml-gap bg-[#eef2f9] w-[13.22rem] md:w-[16.22rem] max-sm:w-full  max-sm:justify-between">

                          <div class=" text-xs items-center ml-gap font-poppins">

                            <span>
                              {item.address && item.address.length > 0 ? (
                                `${(item.address[0].city || "")} ${(item.address[0].state || "")}`.slice(0, 20)
                              ) : (
                               translatedMenuItems[16] // "No address available"
                              )}
                            </span>            </div>
                        </div>
                      
                    </div>


                    <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.22rem] md:w-[7.22rem] max-sm:w-full  max-sm:justify-between">

                      <div class=" text-xs  font-poppins">
                        <ProductionToggle
                          locationDetailsId={item.locationDetailsId}
                          productionInd={item.productionInd}
                        />
                      </div>
                    </div>
                    <div className=" flex w-[7.21rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]  md:w-[7.21rem] max-sm:w-full  max-sm:justify-between">


                      <div class=" text-xs  font-poppins">
                        <RefurbishToggle
                          locationDetailsId={item.locationDetailsId}
                          refurbishInd={item.refurbishInd}
                        />
                      </div>
                    </div>
                    <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]   w-[7.12rem] md:w-[7.12rem] max-smw-full  max-sm:justify-between">


                      <div class=" text-xs  font-poppins">
                        <InventoryToggle
                          locationDetailsId={item.locationDetailsId}
                          inventoryInd={item.inventoryInd}
                        />
                   
                      </div>
                    </div>
                    <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.1rem]  md:w-[7.1rem] max-sm:w-full  max-sm:justify-between ">

                      <div class=" text-xs  font-poppins">
                        <BillingToggle
                          locationDetailsId={item.locationDetailsId}
                          billingInd={item.billingInd}
                        />
                      
                      </div>
                    </div>


                    <div className=" flex  w-[4.11rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[4.11rem] max-sm:w-full  max-sm:justify-between">

                      <div class=" text-xs  font-poppins">

                        <CorporateToggle
                          locationDetailsId={item.locationDetailsId}
                          corporateInd={item.corporateInd}
                        />
                      
                      </div>
                    </div>
                    <div className=" flex  w-[3.23rem]  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[3.23rem] max-sm:w-full  max-sm:justify-between">

                      <div class=" text-xs  items-center ml-gap font-poppins">
                        <ProjectToggle
                          locationDetailsId={item.locationDetailsId}
                          projectInd={item.projectInd}
                        />
                        
                      </div>
                    </div>
                    <div className=" flex  w-[6.41rem] md:w-[6.41rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-full  max-sm:justify-between">

                      <div class=" text-xs  font-poppins">
                        <RetailToggle
                          locationDetailsId={item.locationDetailsId}
                          retailInd={item.retailInd}
                        />
                      
                      </div>
                    </div>
                    <div className=" w-28 flex max-md:w-[4.41rem] items-center justify-start h-8 ml-gap bg-[#eef2f9]  max-sm:justify-between">

                      <div class=" text-xs items-center ml-gap font-poppins">
                        {item.regions}
                      </div>
                    </div>
                    <div class="flex   justify-end w-[6.2rem]  max-xl:w-[1.2rem] max-lg:w-[1rem]  items-center  h-8  bg-[#eef2f9]  max-sm:w-[10%] ">
                      <div>
                        <Tooltip title={translatedMenuItems[10]} >
                          <FilterTiltShiftIcon
                            className="!text-icon cursor-pointer text-[#798071]"
                            onClick={() => {
                              handleStoredLocations(item);
                              props.handleLocationShiftDrawer(true);
                              // handleSetCurrentLeadsId(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip title={translatedMenuItems[11]} >
                          <AcUnitIcon
                            className="!text-icon cursor-pointer text-[#fecdaa]"
                            onClick={() => {
                              handleStoredLocations(item);
                              props.handleLocationCustomerDrawer(true);
                            }}
                          />
                        </Tooltip>
                      </div>
                   

                    <div class="flex  max-sm:w-[10%]">
                      {item.productionInd ?
                        <div>
                          <Tooltip title={translatedMenuItems[12]} >
                            <TokenIcon
                              className=" !text-icon cursor-pointer text-[blue]"
                              onClick={() => {
                                handleStoredLocations(item);
                                props.handleLocnCellDrawer(true);
                              }}
                            />
                          </Tooltip>
                        </div> : null}
                    </div>
                    
                      <div>
                        <Tooltip title={translatedMenuItems[13]} >
                          <BorderColorIcon
                            className="!text-icon cursor-pointer text-[tomato]"
                            onClick={() => {
                              handleStoredLocations(item);
                              props.handleUpdateLocationDrawer(true);
                            }}
                          />
                        </Tooltip>
                      </div>
                      
                        <StyledPopconfirm
                          title={translatedMenuItems[14]} 
                          onConfirm={() => props.deleteLocation(item.locationDetailsId, props.orgId)}
                        >
                          <Tooltip title={translatedMenuItems[15]} >
                          <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                          </Tooltip>
                        </StyledPopconfirm>

                      </div>
                    </div>
</div>
                 
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
        )}   
      <Suspense fallback={<BundleLoader />}>
      <LocationShiftDrawer
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
        storedLoc={storedLoc}
        locShiftDrawer={props.locShiftDrawer}
        handleLocationShiftDrawer={props.handleLocationShiftDrawer}
        handleStoredLocations={handleStoredLocations}
      />
      <LocationUpdateDrawer
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
        storedLoc={storedLoc}
        locationUpdatedrawr={props.locationUpdatedrawr}
        handleUpdateLocationDrawer={props.handleUpdateLocationDrawer}
      />
      <LocationCustomerDrawer
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
        storedLoc={storedLoc}
        locationCustomerdrawr={props.locationCustomerdrawr}
        handleLocationCustomerDrawer={props.handleLocationCustomerDrawer}
      />
      <LocationSupplierDrawer
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
        storedLoc={storedLoc}
        locationSupplierdrawr={props.locationSupplierdrawr}
        handleLocationSupplierDrawer={props.handleLocationSupplierDrawer}
      />
      <LocationCellDrawer
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
        storedLoc={storedLoc}
        clickLocDrwr={props.clickLocDrwr}
        handleLocnCellDrawer={props.handleLocnCellDrawer}
      />
      </Suspense>
    </>
  );
};
const mapStateToProps = ({ location, auth }) => ({
  showLocation: location.showLocation,
  locationSupplierdrawr: location.locationSupplierdrawr,
  locationCustomerdrawr: location.locationCustomerdrawr,
  orgId: auth.userDetails.organizationId,
  locShiftDrawer: location.locShiftDrawer,
  locationUpdatedrawr: location.locationUpdatedrawr,
  financeInd: auth.userDetails.financeInd,
  repairInd: auth.userDetails.repairInd,
  productionInd: auth.userDetails.productionInd,
  orderManagementInd: auth.userDetails.orderManagementInd,
  recruitProInd: auth.userDetails.recruitProInd,
  fetchingLocationData: location.fetchingLocationData,
  clickLocDrwr: location.clickLocDrwr,
  locationSerachedData:location.locationSerachedData,
  fetchingLocationSearchData:location.fetchingLocationSearchData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getlocation,
      handleLocationShiftDrawer,
      handleUpdateLocationDrawer,
      deleteLocation,
      handleLocationCustomerDrawer,
      handleLocationSupplierDrawer,
      addingLocationToggle,
      handleLocnCellDrawer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LocationCard);