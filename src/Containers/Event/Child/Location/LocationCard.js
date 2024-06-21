import React, { useEffect, useState, lazy } from "react";
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
import { Popconfirm, Switch, Tooltip } from "antd";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { DeleteOutlined } from "@ant-design/icons";
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
import LocationCellDrawer from "./LocationCellDrawer";
const LocationCustomerDrawer = lazy(() => import("./LocationCustomerDrawer"));
const LocationSupplierDrawer = lazy(() => import("./LocationSupplierDrawer"));
const LocationShiftDrawer = lazy(() => import("./LocationShiftDrawer"));
const LocationUpdateDrawer = lazy(() => import("./LocationUpdateDrawer"));

const LocationCard = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
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
    props.getlocation(props.orgId);
  }, []);

  const [storedLoc, setStoredLoc] = useState({});
  const handleStoredLocations = (locs) => {
    setStoredLoc(locs);
  }
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getlocation(props.orgId);
  }
  if (props.fetchingLocationData) return <BundleLoader />;
  return (
    <>
      <div>
        <InfiniteScroll
          dataLength={props.showLocation.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={props.fetchingLocationData ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
          height={"80vh"}
        >
          <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
            <div className=" md:w-[10.5rem]">
              Name</div>
            <div className=" md:w-[9.1rem]">
              Country
            </div>
            <div className=" md:w-[11.1rem] ">
              Address</div>
            <div className=" md:w-[8.2rem] ">Production</div>
            <div className=" md:w-[8.2rem] ">
              Refurbish</div>
            <div className="md:w-[8.5rem]">
              Inventory</div>
            <div className="md:w-[7.5rem]">
              Billing</div>
            <div className="md:w-[8.51rem]">
              Corporate</div>
            <div className="md:w-[8.3rem]">
              Project</div>
            <div className="md:w-[8.9rem]">
              Retail</div>
            <div className="md:w-[8.9rem]">Regions</div>
          </div>
          <div class="">
            {props.showLocation.map((item) => {
              return (
                <div >
                  <div class=" flex rounded  justify-between  bg-white mt-1 h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow-2xl  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                    <div class="flex">
                      <div className=" flex font-medium flex-row md:w-[25.12rem] max-sm:flex-row w-full max-sm:justify-between ">


                        <div class=" font-normal text-[0.82rem]text-cardBody font-poppins md:w-[10.1rem]">
                          {item.locationName}
                        </div>


                        <div className=" flex font-medium  md:w-[7.25rem]  max-sm:flex-row w-full mt-1 max-sm:justify-between">


                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                            <CountryFlag1 countryCode={item.countryAlpha2Code} />
                            &nbsp;
                            {item.countryAlpha2Code}
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[13rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


                          <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">

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


                    <div className=" flex font-medium flex-row md:w-[7.22rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <ProductionToggle
                          locationDetailsId={item.locationDetailsId}
                          productionInd={item.productionInd}
                        />
                      </div>
                    </div>
                    <div className=" flex font-medium flex-row md:w-[7.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <RefurbishToggle
                          locationDetailsId={item.locationDetailsId}
                          refurbishInd={item.refurbishInd}
                        />
                      </div>
                    </div>
                    <div className=" flex font-medium flex-row md:w-[7.12rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">


                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <InventoryToggle
                          locationDetailsId={item.locationDetailsId}
                          inventoryInd={item.inventoryInd}
                        />
                        {/* <Switch
                          className="toggle-clr"
                          checked={item.inventoryInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                          disabled={!props.orderManagementInd}
                        /> */}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-row md:w-[7.1rem] max-sm:flex-row w-full mt-1 max-sm:justify-between ">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <BillingToggle
                          locationDetailsId={item.locationDetailsId}
                          billingInd={item.billingInd}
                        />
                        {/* <Switch
                          className="toggle-clr"
                          checked={item.billingInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                          disabled={!props.financeInd}
                        /> */}
                      </div>
                    </div>


                    <div className=" flex font-medium flex-row md:w-[7.11rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">

                        <CorporateToggle
                          locationDetailsId={item.locationDetailsId}
                          corporateInd={item.corporateInd}
                        />
                        {/* <Switch
                          className="toggle-clr"
                          checked={item.corporateInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                          
                        /> */}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-row md:w-[6.23rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <ProjectToggle
                          locationDetailsId={item.locationDetailsId}
                          projectInd={item.projectInd}
                        />
                        {/* <Switch
                          className="toggle-clr"
                          checked={item.projectInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                          disabled={!props.recruitProInd}
                        /> */}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-row md:w-[11.41rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <RetailToggle
                          locationDetailsId={item.locationDetailsId}
                          retailInd={item.retailInd}
                        />
                        {/* <Switch
                          className="toggle-clr"
                          checked={item.retailInd}
                          isLoading={true}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        /> */}
                      </div>
                    </div>
                    <div className=" font-medium flex-col md:w-[4.41rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
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
                              className="!text-icon cursor-pointer text-[red]"
                            />
                          </Tooltip>
                        </StyledPopconfirm>

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
      <LocationShiftDrawer
        storedLoc={storedLoc}
        locShiftDrawer={props.locShiftDrawer}
        handleLocationShiftDrawer={props.handleLocationShiftDrawer}
        handleStoredLocations={handleStoredLocations}
      />
      <LocationUpdateDrawer
        storedLoc={storedLoc}
        locationUpdatedrawr={props.locationUpdatedrawr}
        handleUpdateLocationDrawer={props.handleUpdateLocationDrawer}
      />
      <LocationCustomerDrawer
        storedLoc={storedLoc}
        locationCustomerdrawr={props.locationCustomerdrawr}
        handleLocationCustomerDrawer={props.handleLocationCustomerDrawer}
      />
      <LocationSupplierDrawer
        storedLoc={storedLoc}
        locationSupplierdrawr={props.locationSupplierdrawr}
        handleLocationSupplierDrawer={props.handleLocationSupplierDrawer}
      />
      <LocationCellDrawer
        storedLoc={storedLoc}
        clickLocDrwr={props.clickLocDrwr}
        handleLocnCellDrawer={props.handleLocnCellDrawer}
      />
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