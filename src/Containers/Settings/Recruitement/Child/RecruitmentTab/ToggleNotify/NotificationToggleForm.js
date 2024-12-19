
import React, { useState ,useEffect} from 'react';
import { Switch, Checkbox, Button } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getNotificationConfig,addNotificationConfig} from "../../../../SettingsAction";
import { BundleLoader } from '../../../../../../Components/Placeholder';
//import './NameList.css'; // Import custom CSS for styling



const NameList = (props) => {
  const [data, setData] = useState(props.notificationConfig);
  console.log(data)

    useEffect(() => {

    props.getNotificationConfig();
   //  console.log(activeTab)
   },[]);

   useEffect(() => {
    // Check if data is available
    if (props.notificationConfig.length > 0) {
      // Update activeTab when data is available
      setData(props.notificationConfig);
    }
  }, [props.notificationConfig]); 

  const handleSwitchChange = (index, key, checked) => {
    const newData = [...data];
    newData[index][key] = checked;
    setData(newData);
  };

  const handleCheckboxChange = (itemIndex, type, checked) => {
    const newData = [...data];
    if (checked) {
      newData[itemIndex].type.push(type);
    } else {
      newData[itemIndex].type = newData[itemIndex].type.filter(t => t !== type);
    }
    setData(newData);
  };

  const handleUpdateClick = (index) => {
    const { name, type, reportingManager, reportingManager1, admin } = data[index];
    console.log({
      name,
      type,
      reportingManager,
      reportingManager1,
      admin
    });
    let result={
      name:name,
      type:type,
      reportingManager:reportingManager,
      reportingManager1:reportingManager1,
      admin:admin,


    }
    props.addNotificationConfig(result)
   
  };
  if(props.gettingNotificationConfig){
    return <BundleLoader/>;
  }

  return (
    <div className="max-h-[79vh] overflow-y-auto border p-2 ">
      <div className="flex flex-col gap-[20px]">
        {data.map((item, index) => (
          <div key={index} className="name-item">
            <div className='font-poppins font-semibold text-xl'>{item.name}</div>
            <div className='flex w-[100%]'>
            <div className="flex w-[50%]">
              <div classname="flex items-center">
                <div class="font-bold text-xs mr-2 mb-2 font-poppins text-black">Admin:</div>
                <Switch 
                 checkedChildren="Yes"
                        unCheckedChildren="No"
                  checked={item.admin}
                  onChange={(checked) => handleSwitchChange(index, 'admin', checked)}
                />
              </div>
              <div classname="flex items-center">
                <div class="font-bold text-xs mr-2 mb-2  font-poppins text-black">Reporting Manager:</div>
                <Switch
                 checkedChildren="Yes"
                        unCheckedChildren="No"
                  checked={item.reportingManager}
                  onChange={(checked) => handleSwitchChange(index, 'reportingManager', checked)}
                />
              </div>
              <div classname="flex items-center">
                <div class="font-bold text-xs mr-2 mb-2  font-poppins text-black">Reporting Manager+1:</div>
                <Switch
                 checkedChildren="Yes"
                        unCheckedChildren="No"
                  checked={item.reportingManager1}
                  onChange={(checked) => handleSwitchChange(index, 'reportingManager1', checked)}
                />
              </div>
            </div>
           
            <div className="flex w-[30%] items-center justify-center">
              {["Create", "Update", "Delete"].map((type, typeIndex) => (
                <Checkbox
                  key={typeIndex}
                  checked={item.type.includes(type)}
                  onChange={(e) => handleCheckboxChange(index, type, e.target.checked)}
                >
                  {type}
                </Checkbox>
              ))}
            </div>
         <div className='flex items-center justify-center w-[20%]'>
            <Button type='primary' onClick={() => handleUpdateClick(index)}>Update</Button>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}


const mapStateToProps = ({ auth,settings }) => ({
    notificationConfig:settings.notificationConfig,
    gettingNotificationConfig:settings.gettingNotificationConfig
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getNotificationConfig,
        addNotificationConfig
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(NameList);


















