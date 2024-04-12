import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateProfileEquipment } from "../../../ProfileAction";
import { Switch, Popconfirm, Input } from 'antd';
import { getEquipment } from "../../../../Settings/Category/Equipment/EquipmentAction";
import { BundleLoader } from '../../../../../Components/Placeholder';
import { MainWrapper } from '../../../../../Components/UI/Layout';

const EquipmentForm = (props) => {
    const [equipmentListData, setEquipmentListData] = useState(props.equipmentListData);
    
    useEffect(() => {
        props.getEquipment();
    }, []);

    useEffect(() => {
        if (props.equipmentListData.length > 0) {
            setEquipmentListData(props.equipmentListData);
        }
    }, [props.equipmentListData]);

    const [equipment, setEquipment] = useState(props.equipmentInd);
    useEffect(() => {
      setEquipment(props.equipmentInd);
    }, [props.equipmentInd]);
    const handleEquipment = (checked) => {
      setEquipment(checked);
      if(props.equipmentInd === true ){
        let data = {
       
          equipmentData:equipmentValue,
          equipmentInd:false,
          orgId:props.orgId,
          // adminId:props.adminId,
        };
        // props.addMaxRequirementValue(data,props.orgId);
      }
      
    };

    const [equipmentValue, setEquipmentValue] = useState(props.equipmentListData.equipmentData);

    const handleEquipmentValue = (e) => {
      setEquipmentValue(e.target.value);
    };

    return (
        <div>
            <div className="flex flex-nowrap flex-col">
                {equipmentListData.map((dept, index) => (
                    <div key={index} className="flex items-center ml-2 mt-2">
                        <span className="font-bold w-[8rem]">{dept.name}</span>
                        <Switch
                            onChange={handleEquipment}
                            checked={equipment || props.equipmentInd}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                        />
                        {equipment && (
                            <Input
                                type="text"
                                name="equipmentData"
                                defaultValue={props.equipmentListData.equipmentData}
                                value={equipmentValue}
                                onChange={handleEquipmentValue}
                            />
                        )}
                    </div>
                ))}
                   {/* <Button 
                    onClick={handleSubmit}
                    >Save</Button> */}
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth, equipment }) => ({
    equipmentListData: equipment.equipmentListData,
    organizationId: auth.userDetails.organizationId,
    orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    updateProfileEquipment,
    getEquipment
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentForm);
