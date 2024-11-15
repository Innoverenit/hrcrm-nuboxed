import React from "react";
import { Switch,Input, Button } from "antd";

function Accountingtable(props) {

    return (
        <>
       
        <div className=" flex justify-between">
      <div> QuickBook</div>
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
        <div className=" flex justify-between">
      <div>Tally</div>
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
export default Accountingtable;