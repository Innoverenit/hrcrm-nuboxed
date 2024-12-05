import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {getDiscountCatVol,categoryVolUpdate } from "../../../SettingsAction";
import { Input, Switch, Button, Checkbox } from 'antd';

const DiscountCategoryVolume = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]); 
    const [inputValues, setInputValues] = useState({}); 

    useEffect(() => {
        props.getDiscountCatVol(props.categoryId)
        
    }, []);



    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex sticky z-auto">
                    <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className="flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                           
                            <div className="md:w-[7.1rem]"><EqualizerIcon className='!text-icon  text-[#e4eb2f]'/>Volume</div>
                            <div className="md:w-[7.12rem]"><CurrencyExchangeIcon className='!text-icon  text-[#84a59d]'/>Value</div>
                            <div className="md:w-[8.1rem]"><DateRangeIcon className="!text-icon "/>Start Date</div>
                            <div className="md:w-[8.12rem]"><DateRangeIcon className="!text-icon "/>End Date</div>
                        </div>
                        <div className="h-[33vh]">
                            {props.discountCatVol.map((item) => {
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
                                   
                                    </>
                                )
                               
                                
                            })}
                        </div>
                    </div>
                </div>
        </div>
    );
};

const mapStateToProps = ({ settings, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    discountCatVol:settings.discountCatVol
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDiscountCatVol,
            categoryVolUpdate
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DiscountCategoryVolume);
