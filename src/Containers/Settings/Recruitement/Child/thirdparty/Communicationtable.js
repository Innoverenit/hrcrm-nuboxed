import React from "react";
import { Switch,Input, Button } from "antd";

function Communicationtable(props) {

    return (
        <>
            
            <div className=" flex justify-between">
      <div> Zoom </div>
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
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
        <div className=" flex justify-between">
      <div>Whatsapp</div>
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
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
        <div className=" flex justify-between">
      <div>Email</div>
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
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
        <div className=" flex justify-between">
      <div>SMS</div>
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
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
        <div className=" flex justify-between">
      <div> FaceBook</div>
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
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
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
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
        <div className=" flex justify-between">
      <div>Instagram</div>
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
                <div class="font-bold font-poppins text-xs"> Submit</div>
             
              </Button></div>
        </div>
        </>
    );
};
export default Communicationtable;