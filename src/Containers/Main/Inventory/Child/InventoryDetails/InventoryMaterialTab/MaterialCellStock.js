import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";


const MaterialCellStock = (props) => {
    // useEffect(() => {
    //     props.getGrnListOfaPoInStock(props.locationDetailsId);
    // }, [])


    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[100%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[30.05rem]"><FormattedMessage id="app.po" defaultMessage="PO #" /></div>
                        <div className=" md:w-[23.51rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                        <div className=" md:w-[15.52rem]"><FormattedMessage id="app.grn" defaultMessage="GRN #" /></div>
                        <div className=" md:w-[22.12rem]"><FormattedMessage id="app.price" defaultMessage="Price" /></div>
                        <div className=" md:w-[15.25rem]"><FormattedMessage id="app.unit" defaultMessage="Unit" /></div>
                        <div className=" md:w-[22.10rem]"><FormattedMessage id="app.received" defaultMessage="Receive" /></div>
                        <div className=" md:w-[15.42rem]"><FormattedMessage id="app.damaged" defaultMessage="Damaged" /></div>
                        <div className=" md:w-[22.01rem]"><FormattedMessage id="app.remark" defaultMessage="Remark" /></div>
                        <div className=" md:w-[22.01rem]"><FormattedMessage id="app.room" defaultMessage="Cell" /></div>

                        <div className=""></div>
                    </div>
                    {/* <InfiniteScroll
                        dataLength={props.poGrnList.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingGrnListOfAPo ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
                        height={"75vh"}
                    >
                        {props.poGrnList.map((item,index) => {
                            return (
                                <div>
                                    <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                                    <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[9.1rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm text-cardBody font-semibold  font-poppins ">
                                                    {item.newPoNumber}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="flex">
                                            <div className=" flex font-medium flex-col md:w-[11.12rem] max-sm:w-full  ">
                                                <div class="flex justify-between text-sm text-cardBody font-semibold font-poppins cursor-pointer underline text-blue-600">
                                                    <span
                                                        onClick={() => {
                                                            props.handleSTockItemModal(true)
                                                            handleItemClick(item)
                                                        }}
                                                    >
                                                        {item.suppliesFullName.substring(0, 20)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                       
                                        <div className=" flex font-medium flex-col  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.grnNumber}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.price}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[9.01rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unit}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[11.012rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unitReceived}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[7.03rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.unitDamaged}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.04rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                                {item.remark}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.04rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                            {editsuppliesId === item.poSupplierSuppliesId ? (
                       <input
                       class="border-[2px] border-black w-12"
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.poSupplierSuppliesId]?.room !== undefined ? editedFields[item.poSupplierSuppliesId].room : item.room}
                       onChange={(e) => handleChange(item.poSupplierSuppliesId, 'room', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.room}</div>
                      </div>
                    )}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[8.04rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <div class=" text-xs text-cardBody font-poppins">
                                            {editsuppliesId === item.poSupplierSuppliesId ? (
                       <input
                       class="border-[2px] border-black w-12"
                      //  style={{border:"2px solid black"}}
                       value={editedFields[item.poSupplierSuppliesId]?.room !== undefined ? editedFields[item.poSupplierSuppliesId].room : item.room}
                       onChange={(e) => handleChange(item.poSupplierSuppliesId, 'room', e.target.value)}
                       />
                       
                    ) : (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <div> {item.room}</div>
                      </div>
                    )}
                                            </div>
                                        </div>
                                        <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
            
                      <div>
                        <Tooltip title="">
                        <i class="far fa-share-square"
                        //    className="!text-base cursor-pointer text-[tomato]"
                            onClick={() => {
                              props.handleStockUsedDrawer(true);
                            }}
                            style={{cursor:"pointer"}}
                          />
                        </Tooltip>
                      </div>
                      <div>
                      {editsuppliesId === item.poSupplierSuppliesId ? (
                        <>
                      <Button 
                      type="primary"
                    //   onClick={() => handleUpdateSupplies(item.suppliesId,item.suppliesName,item.categoryName, item.subCategoryName )}
                      >
                        Save
                      </Button>
                        <Button 
                         type="primary"
                        onClick={() => handleCancelClick(item.poSupplierSuppliesId)} className="ml-[0.5rem]">
                        Cancel
                      </Button>
                      </>
                      
                    ) : (
                      <BorderColorIcon
                        className="!text-base cursor-pointer text-[tomato] flex justify-center items-center mt-1 ml-1"
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={() => handleEditClick(item.poSupplierSuppliesId)}
                      />
                    )}
                      </div>
                    
                    <div></div>
                  </div>

                                    </div>

                                </div>
                            );
                        })}
                    </InfiniteScroll> */}
                </div>
            </div>

        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MaterialCellStock)
);
