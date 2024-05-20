import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../Components/Placeholder";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';



const DataRoomCard = (props) => {
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

//   useEffect(() => {
//     getInventory(orgId);
//   }, [getInventory, orgId]);
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getInventory(orgId);
  };

  const filteredData = inventory.filter((item) => item.inventoryInd === true);
  return (
    <>
      {fetchingInventoryList ? <BundleLoader /> : <div className=' flex justify-end sticky top-28 z-auto'>
        <div class="rounded-lg m-5 max-sm:m-1 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex max-sm:hidden justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[7.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[6.1rem]">
                Room Name
            </div>
            <div className=" w-[9.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
                Room Memeber List
            </div>
            <div className="w-[6.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.6rem] max-lg:w-[7.6rem]">
                List Of user
            </div>
            <div className="w-[6.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                List Of Contact
                </div>    
            <div className="w-[4.3rem]"></div>
          </div>
          <InfiniteScroll
            dataLength={filteredData.length}
            height={"75vh"}
          >
            {/* {filteredData.length ? <>
              {filteredData.map((item) => {
                const currentdate = dayjs().format("DD/MM/YYYY");
                const countryCode = item.address[0].country_alpha2_code
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                console.log(countryCode)
                return (
                  <div>
                    <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3 max-sm:h-[5rem] max-sm:flex-col">
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex font-medium  w-[14.2rem] max-xl:w-[9.2rem] max-lg:w-[7.8rem] max-sm:w-auto  ">


                          <Tooltip>
                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                              <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
                                  to={`locationDetails/${item.locationDetailsId}`}
                                  title={`${item.locationName}`}
                                >{item.locationName}</Link>&nbsp;&nbsp;
                                {date === currentdate ? (
                                  <span class="text-xs font-bold text-[tomato]">
                                    New
                                  </span>
                                ) : null}

                              </div>
                            </div>
                          </Tooltip>

                        </div>


                        <div className=" flex font-medium  w-[20.2rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                          
                          <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                           
                            <CountryFlag1 countryCode={countryCode} />
                          &nbsp;
                          {countryCode}
                          </div>
                        </div>
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium  w-[17.5rem]    max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                        

                        <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                          {`${(item.address && item.address[0].city) || ""} ${" "}${(item.address && item.address[0].state) || ""}`}

                        </div>
                      </div>
                      <div className=" flex font-medium  w-[16.5rem] max-xl:w-[14.5rem] max-lg:w-[8.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                       

                        <div class=" text-xs text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                          {(item.address && item.address[0].postalCode) || ""}

                        </div>
                      </div>


                      

                        <div className=" flex font-medium justify-center flex-col max-sm:flex-row  ">

                        <Button type="primary"
                            onClick={() => {
                              setRowData(item);
                              handleInventoryRoomRackModal(true);
                            }}
                          >
                             Store Config
                            </Button>
                         
                        </div>
                    
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
              : !filteredData.length
                && !props.fetchingInventoryList ? <NodataFoundPage /> : null} */}

          </InfiniteScroll>
        </div>
      </div>
      }

     
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
     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DataRoomCard);
