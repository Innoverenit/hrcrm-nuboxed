import React, { Component } from "react";
import { EditorState, Modifier } from "draft-js";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Select } from "antd";
const { Option } = Select;
const data = [
  { lable: "First_Name", value: "First_Name" },
  { lable: "Last_Name", value: "Last_Name" },

  { lable: "Organization_Signature", value: "Organization_Signature" },
];

const data1 = [
  { lable: "First_Name", value: "First_Name" },
  { lable: "Last_Name", value: "Last_Name" },
  { lable: "Opportunity_name", value: "Opportunity_name" },
  { lable: "Proposal_value", value: "Proposal_value" },
  { lable: "Currency", value: "Currency" },
  { lable: "Customer_Name", value: "Customer_Name" },
  { lable: "Task_Name", value: "Task_Name" },
  { lable: "Personal_Signature", value: "Personal_Signature" },
  { lable: "Organization_Signature", value: "Organization_Signature" },
];
const data2 = [
  { lable: "First_Name", value: "First_Name" },
  { lable: "Last_Name", value: "Last_Name" },
  { lable: "Opportunity_name", value: "Opportunity_name" },
  { lable: "Proposal_value", value: "Proposal_value" },
  { lable: "Currency", value: "Currency" },
  { lable: "Customer_Name", value: "Customer_Name" },
  { lable: "Task_Name", value: "Task_Name" },
  { lable: "Personal_Signature", value: "Personal_Signature" },
];
const data3 = [
  { lable: "First_Name", value: "First_Name" },
  { lable: "Last_Name", value: "Last_Name" },
  { lable: "Opportunity_name", value: "Opportunity_name" },
  { lable: "Proposal_value", value: "Proposal_value" },
  { lable: "Currency", value: "Currency" },
  { lable: "Customer_Name", value: "Customer_Name" },
  { lable: "Task_Name", value: "Task_Name" },

  { lable: "Organization_Signature", value: "Organization_Signature" },
];
class CustomOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: "",
    };
  }
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  handleChange = async (value) => {
    const { editorState, onChange } = this.props;
    console.log("inside function...............");

    await this.setState({ selectedData: value });
    console.log(this.state.selectedData ? this.state.selectedData : "");

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      // ` {${value}} `,
      this.state.selectedData ? `{${this.state.selectedData}}` : "",
      editorState.getCurrentInlineStyle()
    );

    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
 
    const {user}=this.props;
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.3125em",
          }}
        >
          {/* <div style={{ margin: "0em 0em", fontWeight: "bold" }}>Tag</div> */}
          
          <Button
                  type="primary"
                  htmlType="submit"
                    onClick={()=>
                      this.props.handleFilterBy("Talent")
                    }
                  //loading={updateCandidateById}
                >
               Talent
                  {/* Update */}
                  {/* <FormattedMessage id="app.talent" defaultMessage="Talent" /> */}

                  {/* {data1.map((item) => {
              return <Option value={item.value}>{item.lable} </Option>;
            })} */}
             </Button>
             &nbsp;&nbsp; &nbsp;
          
             <Button
                  type="primary"
                  htmlType="submit"
                  onClick={()=>
                    this.props.handleFilterBy("Customer")
                  }
                 // onClick={updateCandidateById}
                  //loading={updateCandidateById}
                >
                  {/* Update */}
                  <FormattedMessage id="app.customer" defaultMessage="Customer" />
             </Button>
             &nbsp;&nbsp; &nbsp;
          
             <Button
                  type="primary"
                  htmlType="submit"
                  onClick={()=>
                    this.props.handleFilterBy("Contact")
                  }
                  //loading={updateCandidateById}
                >
                  {/* Update */}
                  <FormattedMessage id="app.contact" defaultMessage="Contact" />
             </Button>
             &nbsp;&nbsp;
          
             <Button
                  type="primary"
                  htmlType="submit"
                  //loading={updateCandidateById}
                >
                  {/* Update */}
                  <FormattedMessage id="app.vendorContact" defaultMessage="Vendor Contact" />
             </Button>
             &nbsp;&nbsp; &nbsp;
          
             <Button
                  type="primary"
                  htmlType="submit"
                  onClick={()=>
                    this.props.handleFilterBy("Opportunity")
                  }
                  //loading={updateCandidateById}
                >
                  {/* Update */}
                  <FormattedMessage id="app.opportunity" defaultMessage="Opportunity" />
             </Button>
             &nbsp;&nbsp; &nbsp;
          
             <Button
                  type="primary"
                  htmlType="submit"
                  onClick={()=>
                    this.props.handleFilterBy("Signature")
                  }
                  //loading={updateCandidateById}
                >
                  {/* Update */}
                  <FormattedMessage id="app.signature" defaultMessage="Signature" />
             </Button>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
          
          
         {this.props.selectType==="Talent"&&(
          <Select
            style={{ width: 200 }}
           placeholder="Select Tag"
            onSelect={this.handleChange}
          >
             <Option value="salutaion">Salutation</Option>
               <Option value="first_Name">First_Name</Option>
               <Option value="last_Name">Last_Name</Option>
               <Option value="email">Email</Option>
               <Option value="mobile #">Mobile #</Option>
               <Option value="billing / Salary">Billing / Salary</Option>
               <Option value="availability">Availability</Option>
               <Option value="address">Address</Option>
               <Option value="dateOfBirth">Date of Birth</Option>
          
          </Select>
         )}
          {this.props.selectType==="Customer"&&(
          <Select
            style={{ width: 200 }}
           placeholder="Select Tag"
            onSelect={this.handleChange}
          >
             <Option value="name">Name</Option>
             <Option value="address">Address</Option>
                       
          </Select>
         )}
          {this.props.selectType==="Contact"&&(
          <Select
            style={{ width: 200 }}
           placeholder="Select Tag"
            onSelect={this.handleChange}
          >
             <Option value="salutation">Salutation</Option>
               <Option value="first_Name">First_Name</Option>
               <Option value="last_Name">Last_Name</Option>
               <Option value="address">Address</Option>
                         
          </Select>
         )}

      {this.props.selectType===" Vendor Contact"&&(
          <Select
            style={{ width: 200 }}
           placeholder="Select Tag"
            onSelect={this.handleChange}
          >
             <Option value="salutation">Salutation</Option>
               <Option value="first_Name">First_Name</Option>
               <Option value="last_Name">Last_Name</Option>
               <Option value="address">Address</Option>
                         
          </Select>
         )}
           {this.props.selectType==="Opportunity"&&(
          <Select
            style={{ width: 200 }}
           placeholder="Select Tag"
            onSelect={this.handleChange}
          >
             <Option value="name">Name</Option>
               <Option value="value">Value</Option>
               <Option value="startDate">Start Date</Option>
          
          </Select>
         )}
          {/* &nbsp; &nbsp; */}
          {this.props.selectType==="Signature"&&(
          <Select
            style={{ width: 200 }}
            placeholder="Select Tag"
            onSelect={this.handleChange}
          >
             <Option value="organization">Organization</Option>
               <Option value="user">User</Option>
            {/* {data.map((item) => {
              return <Option value={item.value}>{item.lable} </Option>;
            })} */}
          
          </Select>
          )}                       
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ auth}) => ({
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  // getOpportunityRecord
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomOption);
