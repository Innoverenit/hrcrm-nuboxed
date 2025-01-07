import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, message, Input } from "antd";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddIcon from '@mui/icons-material/Add';
import {
  getQuality,
  addQuality,
  removeQuality,
  updateQuality,
  searchQualityName,
  getQualityCount,
} from "../Quality/QualityAction";
import dayjs from "dayjs"; 
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const Quality = (props) => {
    const [currentData, setCurrentData] = useState("");
    const [qualityList, setQualityListData] = useState(props.qualityList);
    const [editingId, setEditingId] = useState(null);
    const [addingRegion, setAddingRegion] = useState(false);
    const [newDescriptionName, setDescriptionName] = useState('');
    const [newCodeName, setCodeName] = useState('');

    useEffect(() => {
        props.getQuality(); 
        props.getQualityCount(); 
    }, []);
  
    const editRegion = (qualityId, code, description) => {
        setEditingId(qualityId);
        setCodeName(code);
        setDescriptionName(description);
    };
  
    const handleAddQuality = () => {
        setAddingRegion(true);
        setCodeName("");
        setDescriptionName("");
    };
  
    const handleQuality = () => {
        if (!newCodeName.trim() || !newDescriptionName.trim()) {
            message.error("Code and Description fields are required!");
            return;
        }

        let data = {
            code: newCodeName,
            description: newDescriptionName,
            orgId: props.orgId,
        };

        props.addQuality(data);
        setAddingRegion(false);
    };

    const handleUpdateQuality = (region) => {
        if (!newCodeName.trim() || !newDescriptionName.trim()) {
            message.error("Code and Description fields are required!");
            return;
        }

        let data = {
            qualityId: region.qualityId,
            code: newCodeName,
            description: newDescriptionName,
        };

        props.updateQuality(data, region.qualityId);
        setEditingId(null);
    };

    const handleChange = (e) => {
        setCurrentData(e.target.value.trim());
        if (e.target.value.trim() === "") {
            props.getQuality();
        }
    };
  
    const handleSearch = () => {
        if (currentData.trim() !== "") {
            props.searchQualityName(currentData);
        } else {
            console.error("Input is empty. Please provide a value.");
        }
    };

    const handleCancelAdd = () => {
        setCodeName("");
        setDescriptionName("");
        setAddingRegion(false);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    useEffect(() => {
        if (props.qualityList.length > 0) {
            setQualityListData(props.qualityList);
        }
    }, [props.qualityList]);

    if (props.fetchingQuality) {
        return <div><BundleLoader /></div>;
    }

    return (
        <>
            <div>
                <div className="flex flex-row justify-end items-center">
                    <div className="flex w-[18vw] mr-3">
                        <Input
                            placeholder="Search by Name"
                            style={{ width: "100%", marginLeft: "0.5rem" }}
                            onPressEnter={handleSearch}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-region">
                        {addingRegion ? (
                            <div>
                                <input 
                                    placeholder="Code"
                                    className="border-2 border-gray mr-1 ml-1"
                                    type="text" 
                                    value={newCodeName} 
                                    onChange={(e) => setCodeName(e.target.value)} 
                                />
                                <input 
                                    placeholder="Description"
                                    className="border-2 border-gray mr-1 ml-1"
                                    type="text" 
                                    value={newDescriptionName} 
                                    onChange={(e) => setDescriptionName(e.target.value)} 
                                />
                                <button 
                                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                                onClick={handleQuality}>Save</button>
                                <button
                                className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                                 onClick={handleCancelAdd}>Cancel</button>
                            </div>
                        ) : (
                            <button style={{ backgroundColor: "tomato", color: "white" }}
                                onClick={handleAddQuality}><AddIcon className="!text-icon" /> Add</button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col">
                    <MainWrapper className="!h-[69vh] !mt-2">
                        {!props.fetchingQuality && qualityList.length === 0 ? (
                            <NodataFoundPage />
                        ) : (
                            qualityList.slice().sort((a, b) => a.code.localeCompare(b.code)).map((region) => (
                                <div
                                    className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                                    key={region.qualityId}
                                >
                                    {editingId === region.qualityId ? (
                                        <input
                                            className="border-2 border-gray mr-1 ml-1"
                                            type="text"
                                            placeholder="Code"
                                            value={newCodeName}
                                            onChange={(e) => setCodeName(e.target.value)}
                                        />
                                    ) : (
                                        <div style={{ width: "29rem" }}>
                                            {region.code}&nbsp;&nbsp;&nbsp;
                                            {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ? (
                                                <span className="text-xs text-[tomato] font-bold">New</span>
                                            ) : null}
                                        </div>
                                    )}

                                    {editingId === region.qualityId ? (
                                        <input
                                            className="border-2 border-gray mr-1 ml-1"
                                            type="text"
                                            placeholder="Description"
                                            value={newDescriptionName}
                                            onChange={(e) => setDescriptionName(e.target.value)}
                                        />
                                    ) : (
                                        <div style={{ width: "39rem" }}>{region.description}</div>
                                    )}

                                    <div className="flex flex-row">
                                        {editingId === region.qualityId ? (
                                            <div>
                                                <button
                                                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                                                onClick={() => handleUpdateQuality(region)}>Save</button>
                                                <button 
                                                className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1 "
                                                onClick={cancelEdit}>Cancel</button>
                                            </div>
                                        ) : (
                                            <BorderColorIcon
                                                className="!text-icon text-red-600 cursor-pointer"
                                                onClick={() => editRegion(region.qualityId, region.code, region.description)}
                                            />
                                        )}

                                        <Popconfirm
                                            title="Do you want to delete?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={() => props.removeQuality(region.qualityId)}
                                        >
                                            <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                                        </Popconfirm>
                                    </div>
                                </div>
                            ))
                        )}
                    </MainWrapper>
                </div>

                <div className="font-bold">
                    Updated on {dayjs(props.qualityList && props.qualityList.length && props.qualityList[0].updationDate).format('YYYY-MM-DD')} by {props.qualityList && props.qualityList.length && props.qualityList[0].updatedBy}
                </div>
            </div>
        </>
    );
};

const mapStateToProps = ({ quality, auth }) => ({
    addingQuality: quality.addingQuality,
    addingQualityError: quality.addingQualityError,
    qualityList: quality.qualityList,
    qualityCount: quality.qualityCount,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    fetchingQuality: quality.fetchingQuality,
    fetchingQualityError: quality.fetchingQualityError,
    updatingQuality: quality.updatingQuality
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getQuality,
            addQuality,
            removeQuality,
            updateQuality,
            searchQualityName,
            getQualityCount
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Quality);
