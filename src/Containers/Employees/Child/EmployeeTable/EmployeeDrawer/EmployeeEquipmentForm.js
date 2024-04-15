import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateProfileEquipment,getEmployeeEquipmentByUserId } from "../../../../Profile/ProfileAction";
import { Switch, Input, Button } from 'antd'; 
import { getEquipment } from "../../../../Settings/Category/Equipment/EquipmentAction";
import { MainWrapper } from '../../../../../Components/UI/Layout';
import { BundleLoader } from '../../../../../Components/Placeholder';

const EmployeeEquipmentForm = (props) => {
    const [equipmentListData, setEquipmentListData] = useState(props.equipmentListData);
    const [selectedEquipment, setSelectedEquipment] = useState({}); 
    const [equipmentValues, setEquipmentValues] = useState({}); 

    useEffect(() => {
        props.getEquipment();
        props.getEmployeeEquipmentByUserId(props.employeeName.employeeId);
    }, []);

    useEffect(() => {
        if (props.equipmentListData.length > 0) {
            setEquipmentListData(props.equipmentListData);
        }
    }, [props.equipmentListData]);

    const handleEquipment = (checked, equipmentId) => {
        setSelectedEquipment(prevState => ({
            ...prevState,
            [equipmentId]: checked
        }));
    };

    const handleInputChange = (equipmentId, value) => {
        setEquipmentValues(prevState => {
            const updatedValues = { ...prevState };
            updatedValues[equipmentId] = value;
            return updatedValues;
        });
    };
    const handleSubmit = () => {
        const equipmentDataArray = [];
        Object.keys(selectedEquipment).forEach(equipmentId => {
            if (selectedEquipment[equipmentId]) {
                const data = {
                  equipmentName: equipmentId,
                    // equipmentName: equipmentListData.find(equipment => equipment.equipmentId === equipmentId).name,
                    value: equipmentValues[equipmentId] || '', 
                    orgId: props.orgId,
                    userId:props.userId,
                };
                equipmentDataArray.push(data);
            }
        });
        console.log("Submit data array:", equipmentDataArray); 
         props.updateProfileEquipment(equipmentDataArray);
    };
    

    // const handleSubmit = () => {
    //     Object.keys(selectedEquipment).forEach(equipmentId => {
    //         if (selectedEquipment[equipmentId]) {
    //             const data = {
    //                 equipmentId: equipmentId,
    //                 equipmentName: equipmentListData.find(equipment => equipment.equipmentId === equipmentId).name,
    //                 value: equipmentValues[equipmentId] || '', // Get input value for the selected equipment
    //                 orgId: props.orgId,
    //             };
    //             console.log("Submit data:", data); // Check if data is correct
    //             props.updateProfileEquipment(data);
    //         }
    //     });
    // };
    
    if (props.fetchingEquipmentEmployee) {
        return <div><BundleLoader/></div>;
        }
    return (
        <div>
            <div className="flex flex-nowrap flex-col">
                {equipmentListData.map((dept, index) => (
                    <div key={index} className="flex items-center ml-2 mt-2">
                        <span className="font-bold w-[8rem]">{dept.name}</span>
                        <Switch
                            onChange={(checked) => handleEquipment(checked, dept.equipmentId)}
                            checked={selectedEquipment[dept.equipmentId]}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                        />
                        {selectedEquipment[dept.equipmentId] && (
                            <div class=" ml-4 w-[10%]">
                                <Input
                                    type="text"
                                    placeholder='Size'
                                    value={equipmentValues[dept.equipmentId] || ''}
                                    onChange={(e) => handleInputChange(dept.equipmentId, e.target.value)}
                                />
                              
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div class=" flex justify-end">
            <Button       type="primary" onClick={handleSubmit}>
          Submit
        </Button>
        </div>
        </div>
    );
};

const mapStateToProps = ({ auth, equipment,profile }) => ({
    fetchingEquipmentEmployee:profile.fetchingEquipmentEmployee,
    employeeEquipment:profile.employeeEquipment,
    equipmentListData: equipment.equipmentListData,
    organizationId: auth.userDetails.organizationId,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateProfileEquipment,
    getEmployeeEquipmentByUserId,
    getEquipment
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEquipmentForm);
