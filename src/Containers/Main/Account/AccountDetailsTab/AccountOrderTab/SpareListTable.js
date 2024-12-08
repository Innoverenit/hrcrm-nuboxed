import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSpareListByPhoneId } from "../../AccountAction";

function SpareListTable(props) {
    useEffect(() => {
        props.getSpareListByPhoneId(props.RowData.phoneId)
    }, [])



    return (
        <>
            <div className='flex sticky z-auto'>
                <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className=" flex  w-[100%]  p-1 bg-transparent font-bold sticky z-10">
                        <div className=" md:w-[8.1rem]">Spare</div>
                        <div className=" md:w-[8.1rem]">category</div>
                        <div className=" md:w-[8.1rem]">attribute</div>
                        <div className=" md:w-[10.1rem]">Units</div>
                        <div className=" md:w-[5.8rem] ">Hours</div>
                        <div className="md:w-[4.6rem]">Cost</div>
                        <div className="md:w-[4.6rem]">Total</div>

                    </div>
                    {props.spareList.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 " >
                                    <div class="flex">
                                        <div className=" flex   md:w-[7.6rem] max-sm:w-full  ">
                                            {item.suppliesName}
                                        </div>
                                        <div className=" flex    md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs  font-poppins">
                                                {item.categoryName} {item.subCategoryName}
                                            </h4>

                                        </div>
                                        <div className=" flex   md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-xs  font-poppins">
                                                {item.attribute} {item.subAttribute}
                                            </h4>
                                        </div>
                                        <div className=" flex    md:w-[10.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs  font-poppins">
                                                {item.noOfSpare}
                                            </h4>

                                        </div>
                                        <div className=" flex   md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-xs  font-poppins">
                                                {item.hours}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className=" flex   md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.extraCost}
                                        </div>
                                    </div>
                                    <div className=" flex   md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs  font-poppins text-center">
                                            {item.total}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    );
}

const mapStateToProps = ({ distributor }) => ({
    fetchingSpareListByPhoneId: distributor.fetchingSpareListByPhoneId,
    spareList: distributor.spareList,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSpareListByPhoneId
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SpareListTable);