import React, { useEffect,useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getLocationDeleteHistory} from "../Location/LocationAction"
import InfiniteScroll from "react-infinite-scroll-component";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import { BundleLoader } from "../../../../Components/Placeholder";
import ReInstateLocation from "./ReInstateLocation";


const DeletedLocationCard = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       
        "110",  // "Name",//0
        "1109",  // "Country",//1
         "185", // "Address",//2
       "24",   // "Region",//3
         "1069" // "Reinstate"//4
         
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
    props.getLocationDeleteHistory(props.orgId);
  }, []);

  const [storedLoc,setStoredLoc]=useState({});
const handleStoredLocations=(locs)=>{
  setStoredLoc(locs);
}
const handleLoadMore = () => {
      setPage(page + 1);
      props.getLocationDeleteHistory(props.orgId);
}
   if (props.fetchingDeletedLocationHistory) return <BundleLoader />;
  return (
    <>
      <div>
      <InfiniteScroll
        dataLength={props.deletedLocationHistory.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingDeletedLocationHistory?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"80vh"}
        style={{scrollbarWidth:"thin"}}
      >
      <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
        <div className=" md:w-[14.5rem] text-[#00A2E8] text-base">
        {translatedMenuItems[0]}
        {/* Name */}
        </div>
        <div className="font-bold font-poppins text-xs md:w-[17.1rem]">
        {translatedMenuItems[1]} {/* Country */}
          </div>
        <div className="font-bold font-poppins text-xs md:w-[22.1rem] ">
        {translatedMenuItems[2]} {/* Address */}
          </div>
       
        <div className="font-bold font-poppins text-xs md:w-[9.9rem]">
        {translatedMenuItems[3]} {/* Regions */}
          </div>
        <div className="font-bold font-poppins text-xs md:w-[5.9rem]">
        {translatedMenuItems[4]}{/* Reinstate */}
          </div>
      </div>
      <div class="">
          {props.deletedLocationHistory.map((item) => {
            return (
              <div >
                <div class=" flex rounded justify-between  bg-white mt-[0.5rem] h-8 items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                  <div class="flex">
                  <div className=" flex font-medium items-center justify-start border-l-2 border-green-500 bg-[#eef2f9] md:w-[15.25rem]  max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      

                      <div class=" font-normal items-center ml-gaptext-[0.82rem]  font-poppins">
             

                        {item.locationName}
                      </div>
                    </div>
                   

                    <div className=" flex font-medium  md:w-[7.25rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      

                      <div class=" font-normal text-[0.82rem]  font-poppins">
                      <CountryFlag1 countryCode={item.countryAlpha2Code} />
  &nbsp;
                        {item.countryAlpha2Code}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[34rem] justify-center h-8 ml-gap  bg-[#eef2f9] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                     

                      <div class=" font-normal text-[0.82rem]   ml-gap  font-poppins">
                       
                      <span>
  {item.address && item.address.length > 0 ? (
    `${(item.address[0].city || "")} ${(item.address[0].state || "")}`.slice(0, 20)
  ) : (
    "No address available"
  )}
</span>            </div>
                    </div>
                    <div className=" font-medium  items-center justify-start h-8 ml-gap  bg-[#eef2f9] flex-row md:w-[20.41rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      
                      <div class=" font-normal text-[0.82rem] items-center ml-gap font-poppins">
                       {item.regions}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col w-[7.2rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <ReInstateLocation locationDetailsId={item.locationDetailsId} />
                            </div>
                          
                  </div>
                </div>                                                     
                 </div>
                </div>
            );
          })}
        </div>
        </InfiniteScroll>
      </div>
  
    
    </>
  );
};
const mapStateToProps = ({ location, auth }) => ({
    deletedLocationHistory: location.deletedLocationHistory,
  orgId: auth.userDetails.organizationId,
  fetchingDeletedLocationHistory:location.fetchingDeletedLocationHistory,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getLocationDeleteHistory
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DeletedLocationCard);