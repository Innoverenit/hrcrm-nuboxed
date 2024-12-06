import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { getDiscountCatVol, categoryVolUpdate } from "../../../SettingsAction";

const DiscountCategoryVolume = (props) => {
    const [isEditingVolume, setIsEditingVolume] = useState(false);
    const [isEditingValue, setIsEditingValue] = useState(false);
    const [isEditingStartDate, setIsEditingStartDate] = useState(false);
    const [isEditingEndDate, setIsEditingEndDate] = useState(false);

    const [volumeInput, setVolumeInput] = useState("");
    const [valueInput, setValueInput] = useState("");
    const [startDateInput, setStartDateInput] = useState("");
    const [endDateInput, setEndDateInput] = useState("");

    useEffect(() => {
        props.getDiscountCatVol(props.categoryId);
    }, [props.categoryId]);

    useEffect(() => {
        if (props.discountCatVol && props.discountCatVol.categoryId === props.categoryId) {
            setVolumeInput(props.discountCatVol.volume || "");
            setValueInput(props.discountCatVol.value || "");
            setStartDateInput(props.discountCatVol.startDate || "");
            setEndDateInput(props.discountCatVol.endDate || "");
        }
    }, [props.discountCatVol, props.categoryId]);

    // Handle update for all fields: volume, value, startDate, endDate
    const handleUpdateField = (field) => {
        let updatedData = {
            categoryId: props.categoryId,
        };

        // Only add fields if they have been updated
        if (field === "volume") {
            updatedData.volume = volumeInput;
        } else if (field === "value") {
            updatedData.value = valueInput;
        } else if (field === "startDate") {
            updatedData.startDate = startDateInput ? dayjs(startDateInput).toISOString() : null; // Convert to ISO format
        } else if (field === "endDate") {
            updatedData.endDate = endDateInput ? dayjs(endDateInput).toISOString() : null; // Convert to ISO format
        }

        props.categoryVolUpdate(updatedData); // Dispatch the update action with the new payload
    };

    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex sticky z-auto">
                <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                    <div className="flex justify-between w-[99.5%] p-1 bg-transparent font-bold sticky z-10">
                        <div className="md:w-[7.1rem]">
                            <EqualizerIcon className='!text-icon text-[#e4eb2f]' />Volume
                        </div>
                        <div className="md:w-[7.12rem]">
                            <CurrencyExchangeIcon className='!text-icon text-[#84a59d]' />Value
                        </div>
                        <div className="md:w-[8.1rem]">
                            <DateRangeIcon className="!text-icon" />Start Date
                        </div>
                        <div className="md:w-[8.12rem]">
                            <DateRangeIcon className="!text-icon" />End Date
                        </div>
                    </div>
                    <div className="h-[5vh]">
                        <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1">
                            {/* Volume */}
                            <div className="flex font-medium justify-between w-[10.25rem]">
                                <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                    {isEditingVolume ? (
                                        <input
                                            type="text"
                                            className="h-7 w-[4rem] text-sm"
                                            value={volumeInput}
                                            onChange={(e) => setVolumeInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleUpdateField("volume")}
                                            onBlur={() => handleUpdateField("volume")}
                                            autoFocus
                                        />
                                    ) : (
                                        <div
                                            onClick={() => setIsEditingVolume(true)}
                                            className="cursor-pointer text-xl font-[Poppins]"
                                        >
                                            {volumeInput || "Enter Volume"}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Value */}
                            <div className="flex w-[7.1rem]">
                                <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                    {isEditingValue ? (
                                        <input
                                            type="text"
                                            className="h-7 w-[4rem] text-sm"
                                            value={valueInput}
                                            onChange={(e) => setValueInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleUpdateField("value")}
                                            onBlur={() => handleUpdateField("value")}
                                            autoFocus
                                        />
                                    ) : (
                                        <div
                                            onClick={() => setIsEditingValue(true)}
                                            className="cursor-pointer text-xl font-[Poppins]"
                                        >
                                            {valueInput || "Enter Value"}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Start Date */}
                            <div className="flex w-[8.1rem]">
                                <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                    {isEditingStartDate ? (
                                        <input
                                            type="date"
                                            className="h-7 w-[6rem] text-sm"
                                            value={startDateInput}
                                            onChange={(e) => setStartDateInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleUpdateField("startDate")}
                                            onBlur={() => handleUpdateField("startDate")}
                                            autoFocus
                                        />
                                    ) : (
                                        <div
                                            onClick={() => setIsEditingStartDate(true)}
                                            className="cursor-pointer text-xl font-[Poppins]"
                                        >
                                            {dayjs(startDateInput).format("DD/MM/YY") || "Enter Start Date"}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* End Date */}
                            <div className="flex w-[8.2rem]">
                                <div className="font-normal text-[0.85rem] font-poppins flex items-center">
                                    {isEditingEndDate ? (
                                        <input
                                            type="date"
                                            className="h-7 w-[6rem] text-sm"
                                            value={endDateInput}
                                            onChange={(e) => setEndDateInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleUpdateField("endDate")}
                                            onBlur={() => handleUpdateField("endDate")}
                                            autoFocus
                                        />
                                    ) : (
                                        <div
                                            onClick={() => setIsEditingEndDate(true)}
                                            className="cursor-pointer text-xl font-[Poppins]"
                                        >
                                             {dayjs(endDateInput).format("DD/MM/YY")  || "Enter End Date"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ settings, auth }) => ({
    userId: auth.userDetails.userId,
    orgId: auth.userDetails.organizationId,
    discountCatVol: settings.discountCatVol, // Expecting this as an object
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getDiscountCatVol,
            categoryVolUpdate,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(DiscountCategoryVolume);
