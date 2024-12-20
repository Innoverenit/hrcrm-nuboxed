import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getPriceFactor } from "./SuppliesAction";
import { Input, Switch, Button, Checkbox } from 'antd';


const PriceFactorList = (props) => {


    useEffect(() => {
        props.getPriceFactor(props.rowData.suppliesId)
        
    }, []);


const item=props.priceFactorData
    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex sticky z-auto">
                    <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className="flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                           
                            <div className="md:w-[2.1rem]">P1</div>
                            <div className="md:w-[2.1rem]">P2</div>
                            <div className="md:w-[2.1rem]">P3</div>
                            <div className="md:w-[2.1rem]">P4</div>
                            <div className="md:w-[2.1rem]">P5</div>
                            <div className="md:w-[2.1rem]">P6</div>
                            <div className="md:w-[2.1rem]">P7</div>
                            <div className="md:w-[2.1rem]">P8</div>

                        </div>
                        <div className="h-[4vh]">
                           
                                    <>
                                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                                       
                                        <div className="flex font-medium justify-between w-[2.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.p1}
                                            </div>
                                        </div>
                                        <div className="flex font-medium justify-between w-[2.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.p2}
                                            </div>
                                        </div>
                                        <div className="flex font-medium justify-between w-[2.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.p3}
                                            </div>
                                        </div>
                                        <div className="flex font-medium justify-between w-[2.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.p4}
                                            </div>
                                        </div>
                                        <div className="flex font-medium justify-between w-[2.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.p5}
                                            </div>
                                        </div>
                                        <div className="flex font-medium justify-between w-[2.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.p6}
                                            </div>
                                        </div>
                                        <div className="flex font-medium justify-between w-[2.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.p7}
                                            </div>
                                        </div>
                                        <div className="flex font-medium justify-between w-[2.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.p8}
                                            </div>
                                        </div>
                                    </div>
                                  
                                    </>
                              
                        </div>
                    </div>
                </div>
        </div>
    );
};

const mapStateToProps = ({ settings, auth,supplies }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    discountCat:settings.discountCat,
    priceFactorData:supplies.priceFactorData,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPriceFactor,

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PriceFactorList);
