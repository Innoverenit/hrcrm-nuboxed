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
        height={"75vh"}
      >
      <div className=" flex justify-between w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[7.5rem]">Name</div>
        <div className=" md:w-[12.1rem]">Country</div>
        <div className=" md:w-[4.1rem] ">Address</div>
       
        <div className="md:w-[1.9rem]">Regions</div>
        <div className="md:w-[30.9rem]">Reinstate</div>
      </div>
      <div class="">
          {props.deletedLocationHistory.map((item) => {
            return (
              <div >
                <div class=" flex rounded-xl justify-between  bg-white mt-[0.5rem] h-[2.75rem] items-center p-3 ">
                  <div class="flex">
                  <div className=" flex font-medium  md:w-[15.25rem]  max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
             

                        {item.locationName}
                      </div>
                    </div>
                   

                    <div className=" flex font-medium  md:w-[7.25rem]  max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      <CountryFlag1 countryCode={item.countryAlpha2Code} />
  &nbsp;
                        {item.countryAlpha2Code}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-[19rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                     

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                       
                      <span>
  {item.address && item.address.length > 0 ? (
    `${(item.address[0].city || "")} ${(item.address[0].state || "")}`.slice(0, 20)
  ) : (
    "No address available"
  )}
</span>            </div>
                    </div>
                    <div className=" font-medium flex-row md:w-[4.41rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                      
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                       {item.regions}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col w-[7.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <ReInstateLocation locationDetailsId={item.locationDetailsId} />
                            </div>
                          
                  </div>
                </div>

                    {/* <div className=" flex font-medium flex-row md:w-[7.21rem] max-sm:flex-row w-full mt-1 max-sm:justify-between">
                     

                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        <RefurbishToggle
                        locationDetailsId={item.locationDetailsId}
                        productionInd={item.productionInd}
                        />
                      </div>
                    </div> */}
               
                  
                   
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