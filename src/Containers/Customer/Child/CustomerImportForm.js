import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select } from "antd";
import { Formik, Form, Field } from "formik";
import {addCustomerImportForm,getHeader} from "../CustomerAction"
import ImportTaskUpload from "../../../Components/Forms/Formik/ImportTaskUpload";


const { Option } = Select;
class CustomerImportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentshare: false,
      approvalAbove: false,
      showUserList: false,
      ownerAbove: "Specific",
      selectedownerAbove: "Specific",
      data: [1],
      headers: [],
      selectedUsers: {},
    };
    this.users = ['User1', 'User2', 'User3', 'User4'];
  }

  componentDidMount() {
    this.props.getHeader("Customer");
  }

  handleUserChange = (header, user) => {
    this.setState((prevState) => {
      const updatedSelectedUsers = { ...prevState.selectedUsers };

      // Remove the user from any other headers it was assigned to
      Object.keys(updatedSelectedUsers).forEach((key) => {
        if (updatedSelectedUsers[key] === user) {
          delete updatedSelectedUsers[key];
        }
      });

      // Assign the user to the current header
      updatedSelectedUsers[header] = user;

      return { selectedUsers: updatedSelectedUsers };
    });
  };

  setHeaders = (newHeaders) => {
    this.setState({ headers: newHeaders });
  };
  handleSubmit = () => {
    const { headers, selectedUsers } = this.state;

    // Create an object to map headers to their assigned dropdown data
    const headersData = headers.reduce((acc, header) => {
      acc[header] = selectedUsers[header] || null; // Use null if no user is selected
      return acc;
    }, {});

    console.log("Headers Data:", headersData);
  };
 
  render() {
   console.log(this.state.headers)
   
   const catagory=[
    {
      id:1,
      name:"Document"  
    },
    {
        id:2,
        name:"Spreadsheet"  
      },
      {
        id:3,
        name:"Presentation"  
      },
      {
        id:4,
        name:"Image"  
      },
   ]
    return (
      <>
       
            <Formik
              // enableReinitialize
              initialValues={{
              
               
                excelId:"",
               
                // shareInd:"",
                //opportunityId:this.props.opportunity.opportunityId,
              }}
            //    validationSchema={documentSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                this.props.addCustomerImportForm(
                  // values.documentId,
                  {
                    ...values,
                    //shareInd:this.state.showUserList,
                  },
                this.props.userId,
                  this.callback
                );
                resetForm();
              }}
            >
              {({
                errors,
                touched,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                values,
                ...rest
              }) => (
                <Form className="form-background">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "45%",
                      }}
                    >
                      <Field
                        name="excelId"
                        isRequired
                        component={ImportTaskUpload
                          
                        }
                        headers={this.setHeaders}
                        // component={DocumentUpload}
                      />
                      {errors.documentId && (
                        <p style={{ color: "tomato", fontWeight: 600 }}>
                          {errors.documentId}
                        </p>
                      )}
                      <mt-3 />
                  
                  <mt-3 />
                   
                    </div>
                    
                  </div>
                  {this.state.headers && this.state.headers.length > 0 && (
          <div>
            <h3>Headers Provided:</h3>
            <ul>
              {this.state.headers.map((header, index) => (
                <li key={index}>
                  {header}

                  <Select
                    style={{ width: 200, marginLeft: '10px' }}
                    placeholder="Select a user"
                    onChange={(value) => this.handleUserChange(header, value)}
                    value={this.state.selectedUsers[header] || undefined}
                  >
                    {this.users
                      .filter((user) => !Object.values( this.state.selectedUsers).includes(user) ||  this.state.selectedUsers[header] === user)
                      .map((user) => (
                        <Option key={user} value={user}>
                          {user}
                        </Option>
                      ))}
                  </Select>
                </li>
              ))}
            </ul>
          </div>
        )}

                  <mt-3 />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                    <Button
                      htmlType="submit"
                //       type="primary"
                // Loading={this.props.addingCustomerImportForm}
                onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
        
       
      </>
    );
  }
}

const mapStateToProps = ({ document, settings,leads,customer, departments,auth }) => ({
    addingLeadsImportForm:leads.addingLeadsImportForm,
    addingCustomerImportForm:customer.addingCustomerImportForm,
    userId:auth.userDetails.userId,
    headerdata:customer.headerdata,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addCustomerImportForm,
        getHeader
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerImportForm);
