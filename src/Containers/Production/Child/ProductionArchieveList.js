import React, { useState, useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getArchieveListOfProduction } from "../ProductionAction"
import InfiniteScroll from "react-infinite-scroll-component";
import { MultiAvatar } from "../../../Components/UI/Elements";
import ContactsIcon from '@mui/icons-material/Contacts';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AttractionsIcon from '@mui/icons-material/Attractions';
import ExploreIcon from "@mui/icons-material/Explore";
import NewspaperIcon from '@mui/icons-material/Newspaper'

const NodataFoundPage = lazy(() => import("../../../Helpers/ErrorBoundary/NodataFoundPage"));
function ProductionArchieveList(props) {
    const [page, setPage] = useState(0);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        props.getArchieveListOfProduction(props.locationId, props.userId, page)
        setPage(page + 1);
    }, []);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
            "732",//  "Article #",//0
           "110", //   "Name",//1
           "14" ,//   "Category",//1
           "1059", //   "Sub",//1
            "259",//   "Attribute",//1
            "700",//   "Website",//1       
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getArchieveListOfProduction(props.locationDetailsId, props.userId, page)
    };

    return (
        <>
            <div className=' flex sticky  z-auto'>
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky  z-10">
                        <div className=""></div>
                        <div className="text-sm text-[#00A2E8] w-[13.9rem] truncate max-md:w-[7%]">
                        <NewspaperIcon className='!text-base mr-1  text-[#00A2E8]'/> {translatedMenuItems[0]}
                            </div>
                        <div className=" w-[17.1rem] truncate max-md:w-[6.1rem]">
                            {/* Name */}
                            <ContactsIcon className="!text-icon mr-1 text-[#3af64a]"/> {translatedMenuItems[1]}
                            </div>
                        <div className=" w-[15rem] truncate max-md:w-[4.2rem] ">
                            {/* Category */}
                            <FormatListNumberedIcon className='!text-icon  mr-1   text-[#42858c]' />  {translatedMenuItems[2]}
                            </div>
                        <div className="w-[15.1rem] truncate max-md:w-[5.8rem]">
                            {/* Sub */}
                            <FormatListNumberedIcon className='!text-icon  mr-1   text-[#42858c]' /> {translatedMenuItems[3]}
                            </div>
                        <div className="w-[15.2rem] truncate max-md:w-[8.5rem]">
                            {/* Attribute */}
                            <AttractionsIcon className="  !text-icon text-[#8e71ed]" />    {translatedMenuItems[4]}
                            </div>
                        <div className="w-[10.7rem] truncate max-md:w-[5.2rem]">
                            {/* Website */}
                            <ExploreIcon className=" !text-icon cursor-pointer text-[green]"/> {translatedMenuItems[5]}
                            </div>
                
                    </div>
                    <InfiniteScroll
                        dataLength={props.archieveProduction.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingArchieveProduction ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"82vh"}
                    >
                        {props.archieveProduction.length ?
                            <>
                                {props.archieveProduction.map((item) => {
                                    return (
                                        <div>
                                            <div className="flex rounded justify-between mt-1  bg-white  items-center py-ygap max-sm:h-[9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]  md:flex row-auto    max-sm:border-b-4 max-sm:border-blue-500 ">
                                                <div class="flex">
                                                    <div className=" flex font-medium flex-col items-center justify-center border-l-2 border-green-500 bg-[#eef2f9] md:w-[4.1rem] max-sm:w-full  ">
                                                       <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk">
                                                            {item.imageId ? (
                                                                <MultiAvatar
                                                                    imageId={item.imageId ? item.imageId : ''}
                                                                    imgHeight={"1.8em"}
                                                                    imgWidth={"1.8em"}
                                                                    imgRadius={20}
                                                                />
                                                            ) : (
                                                                <div class="font-bold ml-gap text-xs" >
                                                                    No Image
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className=" flex  w-[8.9rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                                                        <div class="text-sm  ml-gap  font-poppins cursor-pointer">
                                                            {item.articleNo}
                                                        </div>
                                                    </div>

                                                    <div className=" flex  w-[16.6rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                                                        <div class=" text-xs ml-gap font-poppins">
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className=" flex  w-[14.7rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                                                    <div class=" text-xs ml-gap font-poppins">
                                                        {item.categoryName}
                                                    </div>
                                                </div>
                                                <div className=" flex  w-[14.8rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                                                    <div class=" text-xs  ml-gap font-poppins">
                                                        {item.subCategoryName}
                                                    </div>
                                                </div>

                                                <div className=" flex  w-[14.9rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                                                    <div class=" text-xs  ml-gap  font-poppins">
                                                        {item.attributeName}
                                                    </div>
                                                </div>

                                                <div className=" flex  w-[9.7rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[7.1rem] max-lg:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between  ">
                                                    <div class=" text-xs  ml-gap  font-poppins">
                                                        {/* {item.} */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </> : !props.archieveProduction.length
                                && !props.fetchingArchieveProduction ? <Suspense><NodataFoundPage /></Suspense> : null}
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
}


const mapStateToProps = ({ production, auth, supplies }) => ({
    archieveProduction: production.archieveProduction,
    fetchingArchieveProduction: production.fetchingArchieveProduction,
    userId: auth.userDetails.userId,
    locationId: auth.userDetails.locationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getArchieveListOfProduction
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionArchieveList);
