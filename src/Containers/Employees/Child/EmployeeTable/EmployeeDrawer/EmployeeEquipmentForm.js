import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import {
//      updateProfileEquipment,
//   } from "../../../ProfileAction";
  import { Switch,Popconfirm } from 'antd';
  import {getEquipment} from "../../../../Settings/Category/Equipment/EquipmentAction";
import { BundleLoader } from '../../../../../Components/Placeholder';
import { MainWrapper } from '../../../../../Components/UI/Layout';

const data = [
    { id: 1, region: "Europe" },
    { id: 2, region: "Africa" },
    { id: 3, region: "Antartica" }
];
const demo = [
    {
      department: "Sales",
      id: "1",
      serviceInd: false
    },
    {
      department: "Management",
      id: "2",
      serviceInd: false
    }
  ];

const EmployeeEquipmentForm = (props) => {
    const [currentData, setCurrentData] = useState("");
    const [equipmentListData, setEquipmentListData] = useState(props.equipmentListData);
    const [serviceLine, setServiceLine] = useState(props.serviceLine);
    const [editingId, setEditingId] = useState(null);
    const [addingRegion, setAddingRegion] = useState(false);
    const [newServiceLineName, setNewServiceLineName] = useState('');
    useEffect(() => {
        props.getEquipment()  
    }, [])


 
    // const handleEquipmentChange = (checked, index) => {
    //     const updatedEquipment = [...equipmentListData];
    //     console.log(updatedEquipment)
    //     updatedEquipment[index].serviceLineInd = checked;
    //     setEquipmentListData(updatedEquipment);
    //     if (checked) {
    //         props.updateProfileEquipment(updatedEquipment[index].departmentId,checked)
    //       console.log("liveInd:", checked, "id:", updatedEquipment[index].departmentId);
    //     }
    //   }
 
      useEffect(() => {
        
        if (props.equipmentListData.length > 0) {
          
            setEquipmentListData(props.equipmentListData);
        }
      }, [props.equipmentListData]);
// console.log(regions)
// if (props.fetchingServiceLine) {
//   return <div><BundleLoader/></div>;
// }
    return (
        <div>
   <div className="flex flex-nowrap flex-col">
  {equipmentListData.map((dept, index) => (
    <div key={index} className="flex items-center ml-2 mt-2">
      <span class=" font-bold w-[8rem]">{dept.name}</span>
      <Switch
        checked={dept.serviceLineInd}
        checkedChildren="Yes"
        unCheckedChildren="No"
        // onChange={(checked) => handleEquipmentChange(checked, index)}
      />
    </div>
  ))}
</div>
     
            
        </div>
    );
};
const mapStateToProps = ({ region,auth,serviceLines,equipment  }) => ({
   
    equipmentListData: equipment.equipmentListData,
     organizationId: auth.userDetails.organizationId,
     orgId: auth.userDetails.organizationId,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        //  updateProfileEquipment,
        getEquipment
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEquipmentForm);

