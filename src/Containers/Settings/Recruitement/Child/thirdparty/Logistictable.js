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
              placeholder="Auth Key"
              name="firstName"
              className="-ml-2"
              // style={{marginLeft:"-6px"}}
          
            /></div>
                  
      <div> <Input
              placeholder="Test Key"
              name="firstName"
              style={{marginLeft:"-6px"}}
          
            /></div>
      <div> <Button
                type="primary"
                htmlType="submit"
                // loading={props.addingCustomerConfig}
              >
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
        <div className=" flex justify-between">
      <div> DTDC</div>
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
              placeholder="Auth Key"
              name="firstName"
              style={{marginLeft:"-6px"}}
            //   value="NAme"
            //   onChange={handleInputChange}
            /></div>
            <div> <Input
              placeholder="Test Key"
              name="firstName"
              style={{marginLeft:"-6px"}}
          
            /></div>
      <div> <Button
                type="primary"
                htmlType="submit"
                // loading={props.addingCustomerConfig}
              >
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
        <div className=" flex justify-between">
      <div> DHL</div>
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
              placeholder="Auth Key"
              name="firstName"
              style={{marginLeft:"-6px"}}
            //   value="NAme"
            //   onChange={handleInputChange}
            /></div>
            <div> <Input
              placeholder="Test Key"
              name="firstName"
              style={{marginLeft:"-6px"}}
          
            /></div>
      <div> <Button
                type="primary"
                htmlType="submit"
                // loading={props.addingCustomerConfig}
              >
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
        <div className=" flex justify-between">
      <div>UPS</div>
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
              placeholder="Auth Key"
              name="firstName"
              style={{marginLeft:"-6px"}}
            //   value="NAme"
            //   onChange={handleInputChange}
            /></div>
            <div> <Input
              placeholder="Test Key"
              name="firstName"
              style={{marginLeft:"-6px"}}
          
            /></div>
      <div> <Button
                type="primary"
                htmlType="submit"
                // loading={props.addingCustomerConfig}
              >
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
        <div className=" flex justify-between">
      <div> Click Ship</div>
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
              placeholder=" Auth Key"
              name="firstName"
              style={{marginLeft:"-6px"}}
            //   value="NAme"
            //   onChange={handleInputChange}
            /></div>
            <div> <Input
              placeholder="Test Key"
              name="firstName"
              style={{marginLeft:"-6px"}}
          
            /></div>
      <div> <Button
                type="primary"
                htmlType="submit"
                // loading={props.addingCustomerConfig}
              >
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
        </>
    );
};
export default Logistictable;