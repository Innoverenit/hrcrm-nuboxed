import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getDiscountCat } from "../../../SettingsAction";
import { Input, Switch, Button, Checkbox } from 'antd';
import DiscountCategoryVolume from "./DiscountCategoryVolume";

const DiscountCategory = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]); 
    const [inputValues, setInputValues] = useState({}); 

    useEffect(() => {
        props.getDiscountCat(props.orgId)
        
    }, []);



    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex sticky z-auto">
                    <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className="flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                           
                            <div className="md:w-[7.1rem]">Category</div>
                           
                        </div>
                        <div className="h-[33vh]">
                            {props.discountCat.map((item) => {
                                const currentdate = dayjs().format("DD/MM/YYYY");
                                const date = dayjs(item.paymentDate).format("DD/MM/YYYY");
                         
                                return (
                                    <>
                                    <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                                       
                                        <div className="flex font-medium justify-between w-[10.25rem]">
                                            <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                                {item.piId}
                                            </div>
                                        </div>
                                        <div className="flex w-[7.1rem]">
                                            <div className="text-xs font-poppins">
                                                {item.piInquiryItemLinkId}
                                            </div>
                                        </div>
                                    </div>
                                    <DiscountCategoryVolume
                                   categoryId={item.categoryId}
                                    />
                                    </>
                                )
                               
                                
                            })}
                        </div>
                        <DiscountCategoryVolume
                                 
                                    />
                    </div>
                </div>
        </div>
    );
};

const mapStateToProps = ({ settings, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    discountCat:settings.discountCat
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDiscountCat,

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DiscountCategory);
