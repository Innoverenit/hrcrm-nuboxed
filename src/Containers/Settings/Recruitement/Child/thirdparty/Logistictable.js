import React from "react";
import { Switch,Input, Button } from "antd";

function Logistictable(props) {

    return (
        <>
              
         <div className=" flex justify-between">
      <div> Shiprocket</div>
      <div>
        <Switch
    //     checked={includeVisible}
    // onChange={() => toggleFieldVisibility('include')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
            // style={{ marginTop:" 4px "}}
          />
          </div>
      <div> <Input
              placeholder="First Name"
              name="firstName"
              style={{marginLeft:"-6px"}}
            //   value="NAme"
            //   onChange={handleInputChange}
            /></div>
      <div> <Button
                type="primary"
                htmlType="submit"
                // loading={props.addingCustomerConfig}
              >
                <div class="font-bold font-poppins text-xs"> Create</div>
             
              </Button></div>
        </div>
        </>
    );
};
export default Logistictable;