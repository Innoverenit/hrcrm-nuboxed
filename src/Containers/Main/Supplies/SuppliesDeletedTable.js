import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDeleteHistory } from "./SuppliesAction";
import ReInstateSupplies from "./ReInstateSupplies";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import FWLogo1 from "../../../Assets/Images/smallLogo.png"
import { MultiAvatar } from "../../../Components/UI/Elements";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import DateRangeIcon from '@mui/icons-material/DateRange';
import PinIcon from '@mui/icons-material/Pin';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AttractionsIcon from '@mui/icons-material/Attractions'; 
import ContactsIcon from '@mui/icons-material/Contacts';
import { BundleLoader } from "../../../Components/Placeholder";
function SuppliesDeletedTable(props) {
  useEffect(() => {
    props.getDeleteHistory()
  }, []);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const handleLoadMore = () => {
    props.getDeleteHistory()
  };


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "799",//0
          "110",//1
          "14",//1
          "803",//1
          "259",//1
          "805",//1
          "679",//1
          "1069",//1
      
      
       
          
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  return (
    <>
   <div className=" flex  sticky  z-auto">
        <div class="rounded m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky font-poppins !text-lm items-end max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
            <div className=" w-[3.4rem] max-xl:w-[2rem]"></div>
            <div className=" w-[10.5rem] text-sm text-[#00A2E8] truncate max-md:w-[6.13rem] ">
              {/* HSN */}
              < PinIcon className=" !text-icon"/> {translatedMenuItems[0]}
              </div>
            <div className=" w-[10.3rem]  truncate max-md:w-[5.1rem]">
              {/* Name */}
              <ContactsIcon className="!text-icon text-[#35CE8D] mr-1 "/>  {translatedMenuItems[1]}
              </div>
            <div className=" w-[14.2rem]  truncate max-md:w-[6.2rem]">
              {/* Category */}
              <WidgetsIcon className='!text-icon    text-[#42858c]' />   {translatedMenuItems[2]}
              </div>
            <div className=" w-[9.4rem]  truncate max-md:w-[6.1rem]">
              {/* Sub Category */}
              <WidgetsIcon className='!text-icon    text-[#42858c]' />  {translatedMenuItems[3]}
              </div>
            <div className=" w-[8.4rem]  truncate max-md:w-[4.8rem] ">
              {/* Attribute */}
              <AttractionsIcon className="text-[#755577]  !text-icon" /> {translatedMenuItems[4]}
              </div>
            <div className=" w-[9.6rem]  truncate max-md:w-[6.1rem]">
              {/* Re-order level */}
              {translatedMenuItems[5]}
              </div>
            <div className=" w-[9.23rem]   truncate max-md:w-[4.23rem]">
              {/* Created */}
              <DateRangeIcon className="!text-icon "/>  {translatedMenuItems[6]}
              </div>
            <div className=" w-[8.1rem]  truncate max-md:w-[7.2rem]">
              {/* Reinstate */}
              {translatedMenuItems[7]}
              </div>           
          </div>

          <InfiniteScroll
            dataLength={props.deleteSuppliesHistory.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingDeletedSuppliesHistory ? <div><BundleLoader/></div> : null}
            height={"83vh"}
            style={{overflowX:"hidden", scrollbarWidth:"thin"}}
            
          >
            {props.deleteSuppliesHistory.length ?
              <>
                {props.deleteSuppliesHistory.map((item) => {
                    const currentDate = dayjs().format("DD/MM/YYYY");
                  return (
                    <>
                      <div className="flex rounded justify-center bg-white mt-1  py-ygap max-sm:h-[7.5rem] max-sm:flex-col max-xl:text-[0.65rem] max-lg:text-[0.45rem]  hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                        <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex  w-[3.5rem] items-center  border-l-2 border-green-500 bg-[#eef2f9] h-8 max-xl:w-[8.1rem] max-lg:w-[6.6rem]   max-sm:w-auto">
                            <div className="flex max-sm:w-wk max-sm:justify-between ">
                              <div>
<span>
                                <MultiAvatar
                                  // primaryTitle={item.name}
                                  imageId={item.imageId}
                                  // imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                                </span>

                              </div>
                              </div>
                              </div>
                             

                              <div class="max-sm:w-auto flex items-center">

                                <div className=" flex  w-[10rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-center max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                                  <div class="  text-[0.65rem] max-sm:text-[0.65rem]  font-poppins ">
                                  <span> {currentDate === dayjs(item.creationDate).format("DD/MM/YYYY") ? (
                    <span className="text-[0.65rem] text-[tomato] font-bold">
                      New
                    </span>
                  ) : null} </span> &nbsp;  {item.hsn}
                                  </div>
                                </div>
                              </div>
                           
                        
                          <div className=" flex  w-[10.7rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-start max-xl:w-[6.5rem] max-lg:w-[4.5rem]  max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class="  text-[0.65rem] ml-gap max-sm:text-[0.65rem]  font-poppins ">
                              {item.suppliesName}
                            </div>
                          </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex  w-[13.81rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-start max-xl:w-[8.1rem] max-lg:w-[6.6rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class="  text-[0.65rem] ml-gap max-sm:text-[0.65rem]  font-poppins ">
                              {item.categoryName}
                            </div>
                          </div>

                          <div className=" flex  w-[9.4rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-start max-xl:w-[6.23rem] max-lg:w-[5.23rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class="  text-[0.65rem] ml-gap max-sm:text-[0.65rem]  font-poppins ">
                              {item.subCategoryName}
                            </div>
                          </div>
                          <div className=" flex  w-[8.12rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-start max-xl:w-[6.32rem] max-lg:w-[5.32rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class="  text-[0.65rem] ml-gap max-sm:text-[0.65rem]  font-poppins ">
                              {item.attributeName} {item.subAttributeName}
                            </div>
                          </div>
                          </div>
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex  w-[9.41rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-center max-xl:w-[6.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class="  text-[0.65rem] max-sm:text-[0.65rem]  font-poppins ">
                              {item.reorder}
                            </div>
                          </div>
                          <div className=" flex  w-[9.3rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-center max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class="  text-[0.65rem] items-center flex max-sm:text-[0.65rem]  font-poppins ">
                            <MultiAvatar
                              primaryTitle={item.userName}
                              imageId={item.imageId}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                               {`${dayjs(item.creationDate).format("ll")}`}
                            </div>
                          </div>
                          <div className=" flex  w-[7.2rem] items-center  h-8 ml-gap bg-[#eef2f9] justify-center max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                            <div class="  text-[0.65rem] max-sm:text-[0.65rem]  font-poppins ">
                            <ReInstateSupplies suppliesId={item.suppliesId} />
                            </div>
                          </div>
                          
                          
                          </div>
                          
                        
                        </div>
                      </div>
                    </>
                  );
                })}
              </> :
              !props.deleteSuppliesHistory.length
                && !props.fetchingDeletedSuppliesHistory ? <NodataFoundPage /> : null}
          </InfiniteScroll>
        </div>
      </div>

    

    </>
  );
}
const mapStateToProps = ({ supplies }) => ({
  deleteSuppliesHistory: supplies.deleteSuppliesHistory,
  fetchingDeletedSuppliesHistory: supplies.fetchingDeletedSuppliesHistory
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeleteHistory
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesDeletedTable);
