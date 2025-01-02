import React, { useState, useEffect, useRef } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; 
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { connect } from "react-redux";
import { Input, Tooltip, Popconfirm, message } from "antd";
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';  
import { base_url } from "../../../../Config/Auth";
import { bindActionCreators } from "redux";
import {
    getRegions,
    getRegionCount,
    addRegions,
    removeRegions,
    updateRegions,
    searchRegionName,
    handleRegionDrawerModal
} from "./RegionAction";
import AddRegionModal from './AddRegionModal';
import { BundleLoader } from '../../../../Components/Placeholder';
import { MainWrapper } from '../../../../Components/UI/Layout';

const Region = (props) => {
    const [activeTab, setActiveTab] = useState("");
    const [regions, setRegions] = useState(props.regions);
    const [editingId, setEditingId] = useState(null);
    const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    const [addingRegion, setAddingRegion] = useState(false);
    const [newRegionName, setNewRegionName] = useState('');
    const [currentData, setCurrentData] = useState("");
    const [currentregionId, setCurrentRegionId] = useState("");
    const [selectedYear, setSelectedYear] = useState(null);
    const [sales, setSales] = useState({ amount: '', currency: "", kpi: "" });
    const [fulfillment, setFulfillment] = useState({ amount: '', kpi: "" });
    const [investment, setInvestment] = useState({ amount: '', currency: "", kpi: "" });

    useEffect(() => {
        props.getRegions(props.organizationId);
        props.getRegionCount(props.orgId);
    }, []);

    const handleSetCurrentRegionId = (regionsId) => {
        setCurrentRegionId(regionsId);
    };

    const editRegion = (regionsId, regions) => {
        setEditingId(regionsId);
        setNewRegionName(regions);
    };

    const deleteRegion = (id) => {
        const updatedRegions = regions.filter(region => region.id !== id);
        setRegions(updatedRegions);
    };

    const handleAddRegion = () => {
        setAddingRegion(true);
        setNewRegionName('');
    };

    const handleChange = (e) => {
        setCurrentData(e.target.value.trim());
        if (e.target.value.trim() === "") {
            props.getRegions(props.organizationId);
        }
    };

    const handleUpdateRegion = (region) => {
        let data = {
            regionsId: region.regionsId,
            regions: newRegionName
        };
        props.updateRegions(data, region.regionsId);
        setEditingId(null);
    };

    const handleSaveRegion = () => {
        if (!newRegionName.trim()) {
            message.error("Empty Region. Please provide a value.");
            return;
        }
        let data = { regions: newRegionName };
        props.addRegions(data, props.orgId);
        setAddingRegion(false);
    };

    const handleCancelAdd = () => {
        setNewRegionName('');
        setAddingRegion(false);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    useEffect(() => {
        if (props.regions.length > 0) {
            setRegions(props.regions);
        }
    }, [props.regions]);

    const handleSearch = () => {
        if (currentData.trim() !== "") {
            props.searchRegionName(currentData);
        } else {
            console.error("Input is empty. Please provide a value.");
        }
    };

    const yearSelectRef = useRef(null);

    const resetData = () => {
        setSelectedYear(null);
        setActiveTab(null);
        setSales({ amount: null, currency: null, kpi: null });
        setFulfillment({ amount: null, kpi: null });
        setInvestment({ amount: null, currency: null, kpi: null });
        if (yearSelectRef.current) {
            yearSelectRef.current.value = "";
        }
    };

    if (props.fetchingRegions) {
        return <div><BundleLoader /></div>;
    }

    return (
        <>
            <div>
                <div className="flex flex-row justify-end items-center">
                    <div className="flex w-[18vw] mt-7px mr-2">
                        <Input
                            placeholder="Search by Name"
                            style={{ width: "100%", marginLeft: "0.5rem" }}
                            onPressEnter={handleSearch}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-[2rem]">
                        <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=region`}>
                            <div className="circle-icon !text-base cursor-pointer text-[green]">
                                <Tooltip placement="top" title="Download XL">
                                    <DownloadIcon />
                                </Tooltip>
                            </div>
                        </a>
                    </div>
                    {addingRegion ? (
                        <div>
                            <input
                                placeholder="Add Region"
                                className="border-2 border-gray mr-1 ml-1"
                                type="text"
                                value={newRegionName}
                                onChange={(e) => setNewRegionName(e.target.value)}
                            />
                            <button 
                            className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                            onClick={handleSaveRegion}>Save</button>
                            <button
                            className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                            onClick={handleCancelAdd}>Cancel</button>
                        </div>
                    ) : (
                        <button style={{ backgroundColor: "tomato", color: "white" }} onClick={handleAddRegion}>
                          <AddIcon className="!text-icon" /> Add 
                        </button>
                    )}
                </div>
                <div className="flex flex-col">
                    <MainWrapper className="!h-[69vh] !mt-2">
                        {regions.map(region => (
                            <div
                                className="flex rounded ml-1 font-bold  border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                                key={region.regionsId}
                            >
                                {editingId === region.regionsId ? (
                                    <input
                                        className="border-2 border-gray mr-1 ml-1"
                                        type="text"
                                        value={newRegionName}
                                        onChange={(e) => setNewRegionName(e.target.value)}
                                    />
                                ) : (
                                    <div>{region.regions}</div>
                                )}
                                <div className="actions">
                                    <RemoveCircleOutlineIcon
                                        onClick={() => {
                                            handleSetCurrentRegionId(region.regionsId);
                                            props.handleRegionDrawerModal(true);
                                            resetData();
                                        }}
                                    />
                                    {editingId === region.regionsId ? (
                                        <div>
                                            <button 
                                            className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                                            onClick={() => handleUpdateRegion(region)}>
                                            
                                           
                                              Save</button>
                                            <button 
                                            className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
 
                                            onClick={cancelEdit}>Cancel</button>
                                        </div>
                                    ) : (
                                        <VisibilityIcon className="cursor-pointer !text-icon text-red-600" onClick={() => editRegion(region.regionsId, region.regions)} />
                                    )}
                                    <Popconfirm
                                        title="Do you want to delete?"
                                        okText="Yes"
                                        cancelText="No"
                                        onConfirm={() => props.removeRegions(region.regionsId, props.orgId)}
                                    >
                                        <DeleteOutlineIcon className="cursor-pointer !text-icon text-red-600" />
                                    </Popconfirm>
                                </div>
                            </div>
                        ))}
                    </MainWrapper>
                </div>
                <div className="font-bold">Updated on {dayjs(props.regions && props.regions.length && props.regions[0].updationDate).format('YYYY-MM-DD')} by {props.regions && props.regions.length && props.regions[0].updatedBy}</div>
            </div>
            <AddRegionModal
                currentregionId={currentregionId}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                sales={sales}
                setSales={setSales}
                fulfillment={fulfillment}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                years={years}
                setFulfillment={setFulfillment}
                yearSelectRef={yearSelectRef}
                investment={investment}
                setInvestment={setInvestment}
                addRegionModal={props.addRegionModal}
                handleRegionDrawerModal={props.handleRegionDrawerModal}
            />
        </>
    );
};

const mapStateToProps = ({ region, auth }) => ({
    regions: region.regions,
    addRegionModal: region.addRegionModal,
    fetchingRegions: region.fetchingRegions,
    organizationId: auth.userDetails.organizationId,
    orgId: auth.userDetails.organizationId,
    regiondata: region.regiondata,
    regionCount: region.regionCount,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getRegions,
            addRegions,
            getRegionCount,
            updateRegions,
            removeRegions,
            searchRegionName,
            handleRegionDrawerModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Region);
