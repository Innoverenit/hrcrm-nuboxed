import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getPrmotionData
} from "./PrmotionAction";
import TokenIcon from '@mui/icons-material/Token';
import {  Tooltip } from "antd";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import { BundleLoader } from "../../../Components/Placeholder";




const PrmotionTable = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [refurbish, Setrefurbish] = useState(props.promotionsData.productionInd,)
//   const handleRefurbishClick = (checked) => {
//     Setrefurbish(checked);
//     let data = {
//       value: checked,
//       //locationDetailsId:locationDetailsId,
//       orgId: props.orgId,
//       type: "production  ",
//     };
//     props.addingLocationToggle(data);
//   };
//   useEffect(() => {
//     const fetchMenuTranslations = async () => {
//       try {
//         const itemsToTranslate = [
       
//           "Name",//0
//           "Address",//1
//           "Production",//2
//           "Refurbish",//3
//           "Inventory",//4
//           "Billing",//5
//           "Corporate",//6
//           "Project",//7
//           "Retail",//8
//           "Region"//9
         
//         ];

//         const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
//         setTranslatedMenuItems(translations);
//       } catch (error) {
//         console.error('Error translating menu items:', error);
//       }
//     };

//     fetchMenuTranslations();
//   }, [props.selectedLanguage]);
  useEffect(() => {
    props.getPrmotionData();
  }, []);

  const [storedLoc, setStoredLoc] = useState({});
  const handleStoredLocations = (locs) => {
    setStoredLoc(locs);
  }
//   const handleLoadMore = () => {
//     setPage(page + 1);
//     props.getPrmotionData(props.orgId);
//   }
//   if (props.fetchingLocationData) return <BundleLoader />;
  return (
    <>
      <div>
        {/* <InfiniteScroll
          dataLength={props.promotionsData.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingLocationData ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
          height={"80vh"}
        > */}
          <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
            <div className=" md:w-[7.5rem]">
            Name</div>
            <div className="   md:w-[9.1rem]">
             Code 
            </div>
            <div className=" md:w-[6.1rem] ">
             Discount In %
              </div>
            <div className=" md:w-[6.9rem] ">
            Apply Catalogue
            </div>
            <div className=" md:w-[5.9rem] ">
          SupplierInventory
            </div>
            <div className="md:w-[7.5rem]">
           Material
              </div>
            
          </div>
          <div class="">
            {/* {props.promotionsData.map((item) => {
              return (
                <div >
                  <div class=" flex rounded  justify-between  bg-white mt-1 h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                    <div class="flex">
                      <div className=" flex  flex-row md:w-[25.12rem] max-sm:flex-row w-full max-sm:justify-between ">


                        <div class=" font-normal text-[0.82rem] font-poppins md:w-[10.1rem]">
                          {item.locationName}
                        </div>


                        <div className=" flex   md:w-[7.25rem]  max-sm:flex-row w-full mt-1 max-sm:justify-between">


                          <div class=" font-normal text-[0.82rem]  font-poppins">
                            <CountryFlag1 countryCode={item.countryAlpha2Code} />
                            &nbsp;
                            {item.countryAlpha2Code}
                          </div>
                        </div>
                        <div className=" flex  flex-col md:w-[13rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


                          <div class=" font-normal text-[0.82rem]  font-poppins">

                            <span>
                              {item.address && item.address.length > 0 ? (
                                `${(item.address[0].city || "")} ${(item.address[0].state || "")}`.slice(0, 20)
                              ) : (
                                "No address available"
                              )}
                            </span>            </div>
                        </div>
                      </div>
                    </div>


                    <div className=" flex  flex-row md:w-[7.22rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">

                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        <ProductionToggle
                          locationDetailsId={item.locationDetailsId}
                          productionInd={item.productionInd}
                        />
                      </div>
                    </div>
                    <div className=" flex  flex-row md:w-[7.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        <RefurbishToggle
                          locationDetailsId={item.locationDetailsId}
                          refurbishInd={item.refurbishInd}
                        />
                      </div>
                    </div>
                    <div className=" flex  flex-row md:w-[7.12rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        <InventoryToggle
                          locationDetailsId={item.locationDetailsId}
                          inventoryInd={item.inventoryInd}
                        />
                        
                      </div>
                    </div>
                    <div className=" flex  flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">

                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        <BillingToggle
                          locationDetailsId={item.locationDetailsId}
                          billingInd={item.billingInd}
                        />
                        
                      </div>
                    </div>


                    <div className=" flex  flex-row md:w-[7.11rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">

                      <div class=" font-normal text-[0.82rem]  font-poppins">

                        <CorporateToggle
                          locationDetailsId={item.locationDetailsId}
                          corporateInd={item.corporateInd}
                        />
                       
                      </div>
                    </div>
                    <div className=" flex  flex-row md:w-[6.23rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">

                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        <ProjectToggle
                          locationDetailsId={item.locationDetailsId}
                          projectInd={item.projectInd}
                        />
                        
                      </div>
                    </div>
                    <div className=" flex  flex-row md:w-[11.41rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">

                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        <RetailToggle
                          locationDetailsId={item.locationDetailsId}
                          retailInd={item.retailInd}
                        />
                        
                      </div>
                    </div>
                    <div className=" w-28  max-md:w-[4.41rem] max-sm:flex-row  mt-1 max-sm:justify-between">

                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        {item.regions}
                      </div>
                    </div>
                    <div class="flex   max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
                      <div>
                        <Tooltip title="Shift">
                          <FilterTiltShiftIcon
                            className="!text-icon cursor-pointer"
                            onClick={() => {
                              handleStoredLocations(item);
                              props.handleLocationShiftDrawer(true);
                              // handleSetCurrentLeadsId(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip title="Customer-Virtual Location">
                          <AcUnitIcon
                            className="!text-icon cursor-pointer"
                            onClick={() => {
                              handleStoredLocations(item);
                              props.handleLocationCustomerDrawer(true);
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>

                    <div class="flex  max-sm:flex-row max-sm:w-[10%]">
                      {item.productionInd ?
                        <div>
                          <Tooltip title="Cell">
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
                    <div class="flex  max-xl:w-[1.2rem] max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%] ">
                      <div>
                        <Tooltip title="Edit">
                          <BorderColorIcon
                            className="!text-icon cursor-pointer text-[tomato]"
                            onClick={() => {
                              handleStoredLocations(item);
                              props.handleUpdateLocationDrawer(true);
                            }}
                          />
                        </Tooltip>
                      </div>
                      <div>
                        <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => props.deleteLocation(item.locationDetailsId, props.orgId)}
                        >
                          <Tooltip title="Delete">
                            <DeleteOutlined
                              type="delete"
                              className="!text-icon cursor-pointer text-red-500"
                            />
                          </Tooltip>
                        </StyledPopconfirm>

                      </div>
                    </div>

                  </div>
                </div>
              );
            })} */}
          </div>
        {/* </InfiniteScroll> */}
      </div>
      
    </>
  );
};
const mapStateToProps = ({promotion , auth }) => ({

  orgId: auth.userDetails.organizationId,
  promotionsData: promotion.promotionsData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     getPrmotionData,
   
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PrmotionTable);