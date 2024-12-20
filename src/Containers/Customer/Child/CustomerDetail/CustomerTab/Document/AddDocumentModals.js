
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip,Select } from "antd";
import { Formik, Form, Field } from "formik";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
  handleDocumentUploadModal,
  addCustomerDocument,
  getCustomerDocument,
} from "../../../../CustomerAction";
import DragableUpload from "../../../../../../Components/Forms/Formik/DragableUpload";
import InputIcon from '@mui/icons-material/Input';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import {base_url} from "../../../../../../Config/Auth";
const { Option } = Select;
const ButtonGroup = Button.Group;
const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});

function AddDocumentModal (props){
  const [documentshare, setDocumentshare] = useState(false);
  const [approvalAbove, setApprovalAbove] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [contract, setContract] = useState(false);
  const [touchedCustomer, setTouchedCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [ownerAbove, setOwnerAbove] = useState("Specific");
  const [selectedOwnerAbove, setSelectedOwnerAbove] = useState("Specific");
  const [data, setData] = useState([1]);
  const [isLoadingInclude, setIsLoadingInclude] = useState(false);
  const [include, setInclude] = useState([]);
  const [selectedIncludeValues, setSelectedIncludeValues] = useState([]);
  const [touchedInclude, setTouchedInclude] = useState(false);
  const [showInclude, setShowInclude] = useState(false);
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  const fetchInclude = async () => {
    setIsLoadingInclude(true);
    try {
      const apiEndpoint = ` ${base_url}/employee/active/user/drop-down/${props.orgId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setInclude(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingInclude(false);
    }
  };

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
         "71",//0
          "1205",//1
          "110",//2
          "147",//3
          "1158",//4
          "75",//5
          "154",//6
         "73",//7
         "138",//8
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  // useEffect(() => {
  //   props.getselectdrop(props.orgId);
  // }, [ props.orgId]);

  const handleSelectChangeInclude = (values) => {
    setSelectedIncludeValues(values); // Update selected values
  };

 const handleSelectIncludeFocus = () => {
    if (!touchedInclude) {
      fetchInclude();
      setTouchedInclude(true);
    }
  };

  const handleToggleInclude = () => {
    setShowInclude(!showInclude);
  };



  const handleSelectCustomerFocus = () => {
    if (!touchedCustomer) {
      fetchCustomers();
      // fetchSector();

      setTouchedCustomer(true);
    }
  };

  const handleCustomerChange = (customerId) => {
    setSelectedCustomer(customerId);
    // fetchContacts(customerId);
  };


  const fetchCustomers = async () => {
    setIsLoadingCustomers(true);
    try {
   

      const apiEndpoint = `${base_url}/contact-list/drop-down/${props.uniqueId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoadingCustomers(false);
    }
  };
  




  const handleButtonClick = () => {
    setData([...data, data.length + 1]);
  };

  const handleContract = (checked) => {
    setContract(checked);
  };

  const handleChange = (checked) => {
    setDocumentshare(checked);
  };

  const handleAboveChange = (data) => {
    setOwnerAbove(data);
    setSelectedOwnerAbove(data);
  };

  const handleClose = () => {
    setDocumentshare(false);
    setApprovalAbove(false);
    handleDocumentUploadModal(false);
  };

  const callback = () => {
    getCustomerDocument(props.uniqueId,props.type);
    handleDocumentUploadModal(false);
  };

  const handleApprovalAboveChange = (checked) => {
    setApprovalAbove(checked);
  };

  const {
    customer,
    documentUploadModal,
    handleDocumentUploadModal,
    addCustomerDocument,
    addingDocumentByCustomerId,
    oppoStages,
    subscriptionType,
    organization,
    getCustomerDocument,
  } = props;

console.log(props.contactId)
  return (
    <>
      <StyledDrawer
        title={translatedMenuItems[8]}
        width="50%"
        visible={documentUploadModal}
        onClose={handleClose}
      >
        <Formik
          initialValues={{
            documentTypeId: "",
            documentTitle: "",
            documentDescription: "",
            contract: contract ? "true" : "false",
            documentId: "",
            customerId: props.customerId,
            contactId: props.contactId,
            opportunityId: props.opportunityId,
            invOpportunityId:props.invOpportunityId,
            investorId:props.investorId,
            employeeId:props.employeeId,
            candidateId:props.candidateId,
          }}
          validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            addCustomerDocument({ ...values, 
              included:selectedIncludeValues, 
              contactId:selectedCustomer,
              // contactId: props.contactId,
              contract: contract ? "true" : "false" }, callback);
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting, setFieldValue, setFieldTouched, values, ...rest }) => (
            <Form className="form-background h-[52vh]">
              <div class=" flex justify-between ">
                <div class=" h-full w-2/4">
                  <Field name="documentId" isRequired component={DragableUpload} />       
                  {errors.documentId && (
                    <div className="text-[tomato] text-[0.5rem] font-semibold">{errors.documentId}</div>
                  )}
                  <div class="flex justify-between mt-3">
                  <div class="  w-1/2">
                    <div className="font-bold font-poppins text-xs">{translatedMenuItems[0]}</div>
                    {/* type */}
                    <Field className="w-[14vw]"
                      name="documentTypeId"
                      selectType="documentTypeName"
                      isColumnWithoutNoCreate                     
                      component={SearchSelect}
                      isColumn
                      value={values.documentId}
                      inlineLabel
                    />
                  </div>
                  <div class=" flex  ">
                    <div class="font-bold font-poppins w-1/2  m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                    {translatedMenuItems[1]}
                      {/* Contract */}
                     
                    <Switch className="w-[6.25rem] "          
                      onChange={handleContract}
                      checked={contract}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                     </div>
                  </div>
                  </div>
                  {(props.type === "customer" || props.type === "investor" ) && (
                  <div class=" w-w47.5.5 max-sm:w-wk">                
<div className="font-bold text-xs">
{translatedMenuItems[7]}
  {/* Contact */}
  </div>
      <Select
      className="w-[14vw]"
        placeholder="Select Contact"
        loading={isLoadingCustomers}
        onFocus={handleSelectCustomerFocus}
        onChange={handleCustomerChange}
      >
        {customers.map(customer => (
          <Option key={customer.contactId} value={customer.contactId}>
            {customer.fullName}
          </Option>
        ))}
      </Select>
          
            </div>
)}  
                </div>
                <div class=" h-full w-[47.5%]">
                <div className="font-bold font-poppins text-xs">{translatedMenuItems[2]}</div>
                {/* name */}
                  <Field 
                    name="documentTitle"
                    width={"100%"}
                    isColumn
                    component={InputComponent}
                  />
                  <div class=" mt-3">
                  <div className="font-bold font-poppins text-xs">{translatedMenuItems[3]}</div>
                  {/* Description */}
                    <Field
                      name="documentDescription"                  
                      isRequired
                      isColumn
                      width={"100%"}
                      component={TextareaComponent}
                    />
                  </div>           
       <div className="mt-2 flex flex-col">
      
      <div className="flex items-center">
      <div className="font-bold font-poppins text-xs">{translatedMenuItems[4]}</div>
      {/* Share */}
        <Switch
          checked={showInclude}
          onChange={handleToggleInclude}
          style={{ marginLeft: "10px" }}
          checkedChildren="Yes"
      unCheckedChildren="No"
        />
      </div>
      {showInclude && (
      <div className="mt-1 flex flex-col">
      <div className="font-bold font-poppins text-xs">{translatedMenuItems[5]}</div>
      {/* Include */}
        <Select
          showSearch
          style={{ width: "-webkit-fill-available" }}
          placeholder="Search or select include"
          optionFilterProp="children"
          loading={isLoadingInclude}
          onFocus={handleSelectIncludeFocus}
          onChange={handleSelectChangeInclude}
          defaultValue={selectedIncludeValues}
          mode="multiple"
        >
          {include.map((includes) => (
            <Option key={includes.employeeId} value={includes.employeeId}>
              {includes.empName}
            </Option>
          ))}
        </Select>
        </div>
      )}
    </div>
                  <div class=" mt-3">
                    {!documentshare && (
                      <p>Will be shared with customer Owner</p>
                    )}
                  </div>
                  <div class=" mt-3">
                    {documentshare && (
                      <div class=" flex justify-between w-full ">
                        {data.map(() => {
                          return (
                            <>
                              <div class=" w-1/3 mr-2">
                                <Field
                                  inlineLabel
                                  name="department"
                                  label="Function" 
                                  isRequired
                                  isColumn
                                  component={InputComponent}
                                />
                              </div>
                              <div>
                                <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                                  {" "}
                                Level
                                </div>
                                <div class=" flex justify-between">
                                  <ButtonGroup>
                                    <Tooltip title="Specific">
                                      <Button
                                        onClick={() => handleAboveChange("Specific")}
                                        style={{
                                          fontSize: "18px",
                                          cursor: "pointer",
                                          padding: "0px 7px",
                                          backgroundColor: selectedOwnerAbove === "Specific" ? "Orange" : null,
                                          color: selectedOwnerAbove === "Specific" ? "white" : "rgba(0, 0, 0, 0.65)",
                                        }}
                                      >
                                        <InputIcon type="right-square" />
                                      </Button>
                                    </Tooltip>
                                    <Tooltip title="Above">
                                      <Button
                                        onClick={() => handleAboveChange("Above")}
                                        style={{
                                          fontSize: "18px",
                                          padding: "0px 7px",
                                          cursor: "pointer",
                                          backgroundColor: selectedOwnerAbove === "Above" ? "Orange" : null,
                                          color: selectedOwnerAbove === "Above" ? "white" : "rgba(0, 0, 0, 0.65)",
                                        }}
                                      >
                                        <VerticalAlignTopIcon type="VerticalAlignTopIcon" />
                                      </Button>
                                    </Tooltip>{" "}
                                  </ButtonGroup>
                                </div>
                              </div>
                              <div class=" w-5/12">
                                <Field
                                  isRequired
                                  name="level"
                                  isColumn
                                  selectType="level"
                                  component={InputComponent}
                                  inlineLabel
                                />
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div class=" flex justify-end mt-3">
                <Button htmlType="submit" type="primary" loading={addingDocumentByCustomerId}>
                <div className="font-bold font-poppins text-xs">{translatedMenuItems[6]}</div>
                {/* submit */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ customer, settings, auth }) => ({
  customer: customer.customer,
  documentUploadModal: customer.documentUploadModal,
  addingDocumentByCustomerId: customer.addingDocumentByCustomerId,
  organization: auth.userDetails?.metaData?.organization,
  orgId: auth.userDetails.organizationId,
  selectDrop:customer.selectDrop,
  token: auth.token,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleDocumentUploadModal,
      addCustomerDocument,
      getCustomerDocument,
      // getselectdrop
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentModal);