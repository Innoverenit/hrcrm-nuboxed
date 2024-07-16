import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getArchieveListOfProduction } from "../ProductionAction"
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";

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
             "Article #",//0
              "Name",//1
              "Category",//1
              "Sub",//1
              "Attribute",//1
              "Website",//1
          
          
           
              
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
                <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
                        <div className=""></div>
                        <div className=" md:w-[7%]">
                        {translatedMenuItems[0]}
                            </div>
                        <div className=" md:w-[6.1rem]">
                            {/* Name */}
                            {translatedMenuItems[1]}
                            </div>
                        <div className=" md:w-[4.2rem] ">
                            {/* Category */}
                            {translatedMenuItems[2]}
                            </div>
                        <div className="md:w-[5.8rem]">
                            {/* Sub */}
                            {translatedMenuItems[3]}
                            </div>
                        <div className="md:w-[8.5rem]">
                            {/* Attribute */}
                            {translatedMenuItems[4]}
                            </div>
                        <div className="md:w-[5.2rem]">
                            {/* Website */}
                            {translatedMenuItems[5]}
                            </div>
                        <div className="w-12"></div>
                    </div>
                    <InfiniteScroll
                        dataLength={props.archieveProduction.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingArchieveProduction ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.archieveProduction.length ?
                            <>
                                {props.archieveProduction.map((item) => {
                                    return (
                                        <div>
                                            <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                                                <div class="flex">
                                                    <div className=" flex font-medium flex-col md:w-[5.1rem] max-sm:w-full  ">
                                                        <SubTitle>
                                                            {item.imageId ? (
                                                                <MultiAvatar
                                                                    imageId={item.imageId ? item.imageId : ''}
                                                                    imgHeight={"1.8em"}
                                                                    imgWidth={"1.8em"}
                                                                    imgRadius={20}
                                                                />
                                                            ) : (
                                                                <div class="font-bold text-xs" >
                                                                    No Image
                                                                </div>
                                                            )}
                                                        </SubTitle>
                                                    </div>
                                                    <div className=" flex font-medium flex-col md:w-[6.1rem] max-sm:w-full  ">
                                                        <div class="text-sm  font-semibold  font-poppins cursor-pointer">
                                                            {item.articleNo}
                                                        </div>
                                                    </div>

                                                    <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                        <div class=" text-xs  font-poppins">
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins">
                                                        {item.categoryName}
                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                        {item.subCategoryName}
                                                    </div>
                                                </div>

                                                <div className=" flex font-medium flex-col md:w-[3.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs  font-semibold  font-poppins">
                                                        {item.attributeName}
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    );
                                })}
                            </> : !props.archieveProduction.length
                                && !props.fetchingArchieveProduction ? <NodataFoundPage /> : null}
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
