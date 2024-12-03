import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import {getDataRoom} from "./DataRoomAction";
import CountryFlag1 from "../Settings/Category/Country/CountryFlag1";

const DataRoomCard = (props) => {
  const [rowData, setRowData] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    getDataRoom,
    handleInventoryRoomRackModal,
    inventory,
    userId,
    dataRoomlist,
    fetchingInventoryList
  } = props;

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
           "482",//0 Room Name
            "483",//1 Room Member List
            "484",//2 List Of User
            "485",//3 List of Contact
            

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

  useEffect(() => {
    getDataRoom(userId);
  }, [getDataRoom, userId]);
//   const handleLoadMore = () => {
//     setPage(page + 1);
//     props.getInventory(orgId);
//   };


  return (
    <>
       <div className=' flex  sticky z-auto'>
        
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
            <div className=" font-poppins text-xs font-bold w-[7.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[6.1rem]">
            {translatedMenuItems[0]}  {/* Room Name */}
            </div>
            <div className="font-poppins text-xs font-bold  w-[9.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
            {translatedMenuItems[1]}  {/* Room Member List */}
            </div>
            <div className=" font-poppins text-xs font-bold  w-[6.6rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.6rem] max-lg:w-[7.6rem]">
            {translatedMenuItems[2]} {/* List Of user */}
            </div>
            <div className="font-poppins text-xs font-bold  w-[6.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {translatedMenuItems[3]} {/* List Of Contact */}
                </div>    
            <div className="w-[4.3rem]"></div>
          </div>
          {/* <InfiniteScroll
            dataLength={dataRoomlist.length}
            height={"75vh"}
          > */}
          <>
              {dataRoomlist.map((item) => {
                const currentdate = dayjs().format("DD/MM/YYYY");
                const countryCode = item.address[0].country_alpha2_code
                const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                console.log(countryCode)
                return (
                  <div>
                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:flex-col  p-1 max-sm:h-[5rem] max-sm:">
                    <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex   w-[14.2rem] max-xl:w-[9.2rem] max-lg:w-[7.8rem] max-sm:w-auto  ">


                          <Tooltip>
                            <div class="flex max-sm:flex-row justify-between w-full md:">
                              <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">

                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
                                  to={`locationDetails/${item.locationDetailsId}`}
                                  title={`${item.locationName}`}
                                >{item.locationName}</Link>&nbsp;&nbsp;
                                {date === currentdate ? (
                                  <span class="text-[0.65rem] font-bold text-[tomato]">
                                    New
                                  </span>
                                ) : null}

                              </div>
                            </div>
                          </Tooltip>

                        </div>


                        <div className=" flex   w-[20.2rem] max-xl:w-[10.2rem] max-lg:w-[6.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">


                          
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                           
                            <CountryFlag1 countryCode={countryCode} />
                          &nbsp;
                          {countryCode}
                          </div>
                        </div>
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex   w-[17.5rem]    max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                        

                        <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                          {`${(item.address && item.address[0].city) || ""} ${" "}${(item.address && item.address[0].state) || ""}`}

                        </div>
                      </div>
                      <div className=" flex   w-[16.5rem] max-xl:w-[14.5rem] max-lg:w-[8.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                       

                        <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                          {(item.address && item.address[0].postalCode) || ""}

                        </div>
                      </div>


                      

                        <div className=" flex  justify-center  max-sm:flex-row  ">

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
 

          {/* </InfiniteScroll> */}
        </div>
      </div>
      

     
    </>
  );
};

const mapStateToProps = ({ inventory, auth, datRoom }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  dataRoomlist: datRoom.dataRoomlist
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getDataRoom 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DataRoomCard);
