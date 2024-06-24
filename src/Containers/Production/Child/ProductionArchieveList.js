import React, { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getArchieveListOfProduction } from "../ProductionAction"
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";

function ProductionArchieveList(props) {
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        props.getArchieveListOfProduction(props.locationId, props.userId, page)
        setPage(page + 1);
    }, []);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getArchieveListOfProduction(props.locationDetailsId, props.userId, page)
    };

    return (
        <>

            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
                    <div className=" flex justify-between w-[99%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[7%]">Article #</div>
                        <div className=" md:w-[6.1rem]">Name</div>
                        <div className=" md:w-[4.2rem] ">Category</div>
                        <div className="md:w-[5.8rem]">Sub</div>
                        <div className="md:w-[8.5rem]">Attribute</div>
                        <div className="md:w-[5.2rem]">Website</div>
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
                                            <div className="flex rounded-xl justify-between mt-2 bg-white h-[2.75rem] items-center p-3 ">
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
