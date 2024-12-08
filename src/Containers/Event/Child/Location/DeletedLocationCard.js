import React, { useEffect,useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getLocationDeleteHistory} from "../Location/LocationAction"
import InfiniteScroll from "react-infinite-scroll-component";
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import { BundleLoader } from "../../../../Components/Placeholder";
import ReInstateLocation from "./ReInstateLocation";
import LanguageIcon from'@mui/icons-material/Language';
import AddLocationAltIcon from'@mui/icons-material/AddLocationAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import ApartmentIcon from '@mui/icons-material/Apartment';

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
        endMessage={ <p class="flex  text-center font-bold text-xs font-poppins text-red-500">You have reached the end of page. </p>}
      >
      <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky font-poppins !text-lm z-10">
        <div className=" max-md:w-[14.5rem] w-[14.5rem] text-[#00A2E8] text-sm">
        <ContactsIcon className="!text-icon  "/> {translatedMenuItems[0]}
        {/* Name */}
        </div>
        <div className=" max-md:w-[17.1rem] w-[17.1rem]">
        <LanguageIcon  className="!text-icon text-[#480CA8]"/> {translatedMenuItems[1]} {/* Country */}
          </div>
        <div className=" max-md:w-[22.1rem] w-[22.1rem] ">
        <AddLocationAltIcon className="!text-icon text-[#9B2226] "/> {translatedMenuItems[2]} {/* Address */}
          </div>
       
        <div className=" max-md:w-[9.9rem] w-[9.9rem]">
        <LanguageIcon  className="!text-icon text-[#005F73]"/> {translatedMenuItems[3]} {/* Regions */}
          </div>
        <div className=" max-md:w-[5.9rem] w-[5.9rem]">
        <ApartmentIcon className="!text-icon text-[#BC4749]"/> {translatedMenuItems[4]}{/* Reinstate */}
          </div>
      </div>
      <div class="">
          {props.deletedLocationHistory.map((item) => {
            return (
              <div >
                <div class=" flex rounded justify-between py-ygap bg-white mt-[0.5rem]  items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                  <div class="flex">
                  <div className=" flex  items-center justify-start border-l-2 border-green-500 bg-[#eef2f9] max-md:w-[15.25rem] w-[15.25rem] ">
                      

                      <div class=" font-normal items-center ml-gaptext-[0.82rem]  font-poppins">
             

                        {item.locationName}
                      </div>
                    </div>
                   

                    <div className=" flex  w-[7.25rem] max-md:w-[7.25rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] ">
                      

                      <div class=" font-normal text-[0.82rem]  font-poppins">
                      <CountryFlag1 countryCode={item.countryAlpha2Code} />
  &nbsp;
                        {item.countryAlpha2Code}
                      </div>
                    </div>
                    <div className=" flex w-[34rem] max-md:w-[34rem] justify-center h-8 ml-gap items-center bg-[#eef2f9]">
                     

                      <div class=" font-normal text-[0.82rem]   ml-gap  font-poppins ">
                       
                      
  {item.address && item.address.length > 0 ? (
    `${(item.address[0].city || "")} ${(item.address[0].state || "")}`.slice(0, 20)
  ) : (
    "No address available"
  )}        </div>
                    </div>
                    <div className="   items-center justify-center h-8 ml-gap  bg-[#eef2f9] flex w-[14.41rem] ">
                      
                      <div class=" font-normal text-[0.82rem] items-center ml-gap font-poppins">
                       {item.regions}
                      </div>
                    </div>
                    <div className=" flex  w-[7.2rem]  items-center justify-center h-8 ml-gap  bg-[#eef2f9] ">
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