import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { getInventory, handleInventoryRoomRackModal } from "./InventoryAction";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../Components/Placeholder";
import CountryFlag1 from "../../Settings/Category/Country/CountryFlag1";
const InventoryRoomRackModal = lazy(() =>
  import("./InventoryRoomRackModal")
);

const InventoryCard = (props) => {
  const [rowData, setRowData] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const {
    getInventory,
    handleInventoryRoomRackModal,
    inventory,
    orgId,
    addroomrackininventory,
    fetchingInventoryList
  } = props;

  const handleClick = (e) => {
    e.preventDefault();
    window.location.assign(`/locationDetails/${props.inventory.locationDetailsId}`);
  };

  useEffect(() => {
    getInventory(orgId);
  }, [getInventory, orgId]);
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getInventory(orgId);
  };

  const filteredData = inventory.filter((item) => item.inventoryInd === true);
  return (
    <>
      {fetchingInventoryList ? <BundleLoader /> : <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[4.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[6.1rem]">{props.translatedMenuItems[0]}</div>
            <div className=" w-[9.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">{props.translatedMenuItems[1]}</div>
            <div className="w-[6.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.6rem] max-lg:w-[7.6rem]">{props.translatedMenuItems[2]}</div>
            <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{props.translatedMenuItems[3]}</div>
            {/* <div className="w-[6.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.6rem] max-lg:w-[7.6rem]"><FormattedMessage id="app.zone" defaultMessage="#Zone" /></div> */}
            <div className="w-[4.3rem]"></div>
          </div>
          <InfiniteScroll
            dataLength={filteredData.length}
            height={"80vh"}
            style={{ scrollbarWidth:"thin"}}
          >
            {filteredData.length ? <>
              {filteredData.map((item) => {
                const currentdate = dayjs().format("DD/MM/YYYY");
                const countryCode = item.address[0].country_alpha2_code
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                console.log(countryCode)
                return (
                  <div>
                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col">
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex   w-[14.2rem] max-xl:w-[9.2rem] max-lg:w-[7.8rem] max-sm:w-auto  ">


                          <Tooltip>
                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                              <div class="flex text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                {/* <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
                                  to={`locationDetails/${item.locationDetailsId}`}
                                  title={`${item.locationName}`}
                                >{item.locationName}</Link> */}
                              <div
  onClick={() => window.location.assign(`/locationDetails/${item.locationDetailsId}`)}
  className="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
  title={item.locationName}
>
  {item.locationName}
</div>

                                &nbsp;&nbsp;
                                {date === currentdate ? (
                                  <span class="text-xs font-bold text-[tomato]">
                                    {props.translatedMenuItems[4]}
                                  </span>
                                ) : null}

                              </div>
                            </div>
                          </Tooltip>

                        </div>


                        <div className=" flex  w-[20.2rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                          {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {/* {(item.address && item.address[0].country) || ""} */}
                            <CountryFlag1 countryCode={countryCode} />
                          &nbsp;
                          {countryCode}
                          </div>
                        </div>
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex   w-[17.5rem]    max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                        {/* <div class=" text-xs  font-poppins max-sm:hidden"># Opportunity</div> */}

                        <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                          {`${(item.address && item.address[0].city) || ""} ${" "}${(item.address && item.address[0].state) || ""}`}

                        </div>
                      </div>
                      <div className=" flex   w-[16.5rem] max-xl:w-[14.5rem] max-lg:w-[8.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                        {/* <div class=" text-xs  font-poppins max-sm:hidden">Pipeline Value</div> */}

                        <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                          {(item.address && item.address[0].postalCode) || ""}

                        </div>
                      </div>


                      

                        <div className=" flex justify-center flex-col max-sm:flex-row  ">

                        <Button type="primary"
                            onClick={() => {
                              setRowData(item);
                              handleInventoryRoomRackModal(true);
                            }}
                          >
                             {/* Store Config */}      {props.translatedMenuItems[5]}
                            </Button>
                         
                        </div>
                    
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
              : !filteredData.length
                && !props.fetchingInventoryList ? <NodataFoundPage /> : null}

          </InfiniteScroll>
        </div>
      </div>
      }

      <InventoryRoomRackModal
        rowData={rowData}
        handleInventoryRoomRackModal={handleInventoryRoomRackModal}
        addroomrackininventory={addroomrackininventory}
        translateText={props.translateText}
        translatedMenuItems={props.translatedMenuItems}
        selectedLanguage={props.selectedLanguage}
      />
    </>
  );
};

const mapStateToProps = ({ inventory, auth, locations }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  fetchingInventoryList: inventory.fetchingInventoryList,
  inventory: inventory.inventory,
  // locationsType: locations.locationsType,
  addroomrackininventory: inventory.addroomrackininventory,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInventory,
      handleInventoryRoomRackModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InventoryCard);
