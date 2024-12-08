import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../Components/Placeholder";
import CountryFlag1 from "../../Settings/Category/Country/CountryFlag1";


const InventoryLocation = (props) => {
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

//   useEffect(() => {
//     getInventory(orgId);
//   }, [getInventory, orgId]);
//   const handleLoadMore = () => {
//     setPage(page + 1);
//     props.getInventory(orgId);
//   };

  const filteredData = inventory.filter((item) => item.inventoryInd === true);
  return (
    <>
      <div className=' flex justify-end sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[4.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[6.1rem]">{props.translatedMenuItems[0]}</div>
            <div className=" w-[9.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">{props.translatedMenuItems[1]}</div>
            <div className="w-[6.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.6rem] max-lg:w-[7.6rem]">{props.translatedMenuItems[2]}</div>
            <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">{props.translatedMenuItems[3]}</div>
          <div className="w-[4.3rem]"></div>
          </div>
         
           <>
              {/* {props.user.map((item) => {
                const currentdate = dayjs().format("DD/MM/YYYY");
                const countryCode = props.user.country
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                console.log(countryCode)
                return ( */}
                  <div>
                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[5rem] max-sm:flex-col">
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex font-medium  w-[16.2rem] max-xl:w-[9.2rem] max-lg:w-[7.8rem] max-sm:w-auto  ">


                          <Tooltip>
                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                              <div class="flex text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">

                               
                              <div
  onClick={() => window.location.assign(`/locationDetails/${props.user.locationId}`)}
  className="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
  title={props.user.location}
>
  {props.user.location}
</div>

                                {/* &nbsp;&nbsp;
                                {date === currentdate ? (
                                  <span class="text-xs font-bold text-[tomato]">
                                    New
                                  </span>
                                ) : null} */}

                              </div>
                            </div>
                          </Tooltip>

                        </div>


                        <div className=" flex font-medium  w-[20.2rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                          {/* <div class=" text-xs  font-poppins max-sm:hidden">Country</div> */}
                          <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {/* {(item.address && item.address[0].country) || ""} */}
                            <CountryFlag1 countryCode={props.user.country} />
                          &nbsp;
                          {props.user.country}
                          </div>
                        </div>
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex font-medium  w-[17.5rem]    max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden"># Opportunity</div> */}

                        <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                        

                        </div>
                      </div>
                      <div className=" flex font-medium  w-[16.5rem] max-xl:w-[14.5rem] max-lg:w-[8.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                        {/* <div class=" text-sm  font-poppins max-sm:hidden">Pipeline Value</div> */}

                        <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                         

                        </div>
                      </div>


                      

                        
                    
                      </div>
                    </div>
                  </div>
                {/* )
              })} */}
            </>
             
        </div>
      </div>
      

      
    </>
  );
};

const mapStateToProps = ({ inventory, auth, locations }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
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

export default connect(mapStateToProps, mapDispatchToProps)(InventoryLocation);
