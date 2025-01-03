import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from '@mui/icons-material/Download';
import { base_url } from "../../../../Config/Auth";
import AddIcon from '@mui/icons-material/Add'; 
import dayjs from "dayjs";
import { Tooltip, Input } from "antd";
import {
    getServiceLine,
    getServiceLineCount,
    addServiceLine,
    removeServiceLine,
    updateServiceLine,
    updateDepartmentService,
    searchServiceName
} from "./ServiceLineAction";
import { Switch, Popconfirm } from 'antd';
import { getDepartments } from "../../../Settings/Department/DepartmentAction";
import { BundleLoader } from '../../../../Components/Placeholder';
import { MainWrapper } from '../../../../Components/UI/Layout';

const ServiceLine = (props) => {
    const [currentData, setCurrentData] = useState("");
    const [departments, setDepartments] = useState(props.departments);
    const [serviceLine, setServiceLine] = useState(props.serviceLine);
    const [editingId, setEditingId] = useState(null);
    const [addingRegion, setAddingRegion] = useState(false);
    const [newServiceLineName, setNewServiceLineName] = useState('');
    
    useEffect(() => {
        props.getServiceLine(props.organizationId);
        props.getServiceLineCount(props.Id);
        props.getDepartments();  
    }, []);

    const editRegion = (serviceLineId, serviceLineName) => {
        setEditingId(serviceLineId);
        setNewServiceLineName(serviceLineName);
    };

    const handleAddRegion = () => {
        setAddingRegion(true);
        setNewServiceLineName("");
    };

    const handleUpdateRegion = (region) => {
        let data = {
            serviceLineId: region.serviceLineId,
            serviceLineName: newServiceLineName
        };
        props.updateServiceLine(data, region.serviceLineId);
        setEditingId(null);
    };

    const handleServiceLine = () => {
        // Validation for empty service line
        if (newServiceLineName.trim() === "") {
            alert("Service Line cannot be empty!");
            return; // Prevent submission if the input is empty
        }

        let data = {
            serviceLineName: newServiceLineName,
        };
        props.addServiceLine(data, props.orgId);
        setAddingRegion(false);
    };

    const handleChange = (e) => {
        setCurrentData(e.target.value.trim());
        if (e.target.value.trim() === "") {
            props.getServiceLine(props.organizationId);
        }
    };

    const handleSearch = () => {
        if (currentData.trim() !== "") {
            props.searchServiceName(currentData);
        } else {
            console.error("Input is empty. Please provide a value.");
        }
    };

    const handleCancelAdd = () => {
        setNewServiceLineName('');
        setAddingRegion(false);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const handleServiceChange = (checked, index) => {
        const updatedDepartments = [...departments];
        updatedDepartments[index].serviceLineInd = checked;
        setDepartments(updatedDepartments);
        if (checked) {
            props.updateDepartmentService(updatedDepartments[index].departmentId, checked);
        }
    };

    useEffect(() => {
        if (props.serviceLine.length > 0) {
            setServiceLine(props.serviceLine);
        }
    }, [props.serviceLine]);

    useEffect(() => {
        if (props.departments.length > 0) {
            setDepartments(props.departments);
        }
    }, [props.departments]);

    if (props.fetchingServiceLine) {
        return <div><BundleLoader /></div>;
    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                {departments.map((dept, index) => (
                    <div key={index} style={{ marginLeft: "15px" }}>
                        <h2>{dept.departmentName}</h2>
                        <Switch
                            checked={dept.serviceLineInd}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                            onChange={(checked) => handleServiceChange(checked, index)}
                        />
                    </div>
                ))}
            </div>
            
            <div className="flex flex-row justify-end items-center mt-2">
                <div className="flex w-[18vw] mr-2 mt-7px">
                    <Input
                        placeholder="Search by Name"
                        style={{ width: "100%", marginLeft: "0.5rem" }}
                        onPressEnter={handleSearch}  
                        onChange={handleChange}
                    />
                </div>
                <div className="w-[2rem]">
                    <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=${"serviceLine"}`}>
                        <div className="circle-icon !text-base cursor-pointer text-[green]">
                            <Tooltip placement="top" title="Download XL">
                                <DownloadIcon />
                            </Tooltip>
                        </div>
                    </a>
                </div>
                
                <div className="add-region">
                    {addingRegion ? (
                        <div>
                            <input 
                                placeholder='Service Line'
                                className="border-2 border-gray mr-1 ml-1"
                                type="text" 
                                value={newServiceLineName} 
                                onChange={(e) => setNewServiceLineName(e.target.value)} 
                            />
                            <button 
                                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                                onClick={handleServiceLine}
                            >
                                Save
                            </button>
                            <button
                                className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                                onClick={handleCancelAdd}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button 
                            style={{ backgroundColor: "tomato", color: "white" }}
                            onClick={handleAddRegion}
                        >
                            <AddIcon className="!text-icon" /> Add 
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col">
                <MainWrapper className="!h-[69vh] !mt-2">
                    {serviceLine.map(region => (
                        <div className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]" key={region.serviceLineId}>
                            {/* Region name display or input field */}
                            {editingId === region.serviceLineId ? (
                                <input
                                    className="border-2 border-gray mr-1 ml-1"
                                    type="text"
                                    value={newServiceLineName}
                                    onChange={(e) => setNewServiceLineName(e.target.value)}
                                />
                            ) : (
                                <div>{region.serviceLineName}</div>
                            )}

                            {/* Action buttons */}
                            <div>
                                {/* Edit button */}
                                {editingId === region.serviceLineId ? (
                                    <div>
                                        <button
                                            className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                                            onClick={() => handleUpdateRegion(region)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                                            onClick={cancelEdit}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <VisibilityIcon 
                                        className="cursor-pointer !text-icon text-red-600" 
                                        onClick={() => editRegion(region.serviceLineId, region.serviceLineName)} 
                                    />
                                )}

                                {/* Delete button */}
                                <Popconfirm
                                    title="Do you want to delete?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => props.removeServiceLine(region.serviceLineId, props.orgId)}
                                >
                                    <DeleteOutlineIcon 
                                        className="cursor-pointer !text-icon text-red-600"
                                    />
                                </Popconfirm>
                            </div>
                        </div>
                    ))}
                </MainWrapper>
            </div>
            <div className="font-bold">
                Updated on {dayjs(props.serviceLine && props.serviceLine.length && props.serviceLine[0].updationDate).format('YYYY-MM-DD')} by {props.serviceLine && props.serviceLine.length && props.serviceLine[0].updatedBy}
            </div>
        </div>
    );
};

const mapStateToProps = ({ region, auth, serviceLines, departments }) => ({
    serviceLine: serviceLines.serviceLine,
    departments: departments.departments,
    serviceLineCount: serviceLines.serviceLineCount,
    fetchingServiceLine: serviceLines.fetchingServiceLine,
    organizationId: auth.userDetails.organizationId,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getServiceLine,
            getServiceLineCount,
            addServiceLine,
            updateServiceLine,
            removeServiceLine,
            getDepartments,
            updateDepartmentService,
            searchServiceName,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ServiceLine);
