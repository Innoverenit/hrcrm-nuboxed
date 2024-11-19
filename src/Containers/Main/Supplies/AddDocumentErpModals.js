import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip,Select } from "antd";
import { Formik, Form, Field } from "formik";
import { StyledDrawer } from "../../../Components/UI/Antd";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
  getCustomerDocument,
  getselectdrop,
  addCustomerDocument
} from "../../Customer/CustomerAction";
import DragableUpload from "../../../Components/Forms/Formik/DragableUpload";
import InputIcon from '@mui/icons-material/Input';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import { base_url } from "../../../Config/Auth";
import LinkedDocumentsSupplies from "./LinkedDocumentsSupplies";

const { Option } = Select;
const ButtonGroup = Button.Group;
const documentSchema = Yup.object().shape({
  documentId: Yup.string().required("Input needed !"),
});

function AddDocumentErpModals (props){
  const [documentshare, setDocumentshare] = useState(false);
  const [approvalAbove, setApprovalAbove] = useState(false);
  const [contract, setContract] = useState(false);
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
         
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  useEffect(() => {
    props.getselectdrop(props.orgId);
  }, [ props.orgId]);

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
    handleErpDocumentUploadModal(false);
  };

  const callback = () => {
    getCustomerDocument(customer.customerId);
    handleErpDocumentUploadModal(false);
  };

  const handleApprovalAboveChange = (checked) => {
    setApprovalAbove(checked);
  };

  const {
    customer,
    documentUploadModal,
    handleErpDocumentUploadModal,
    addCustomerDocument,
    erpDocumentUploadModal,
    addingDocumentByCustomerId,
    oppoStages,
    subscriptionType,
    organization,
    getCustomerDocument,
  } = props;


  return (
    <>
      <StyledDrawer
        title="Document"
        width="60%"
        visible={erpDocumentUploadModal}
        onClose={handleClose}
      >
        <Formik
          initialValues={{
            documentTypeId: "",
            documentTitle: "",
            documentDescription: "",
            contractInd: contract ? "true" : "false",
            documentId: "",
            suppliesId:props.suppliesId,
          }}
          validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            addCustomerDocument({ ...values, shareInd:selectedIncludeValues, contractInd: contract ? "true" : "false" }, callback);
            resetForm();
          }}
        >
          {({ errors, touched, isSubmitting, setFieldValue, setFieldTouched, values, ...rest }) => (
            <Form className="form-background">
              <div class=" flex justify-between ">
                <div class=" h-full w-2/4">
                  <Field name="documentId" isRequired component={DragableUpload} />
                  {errors.documentId && (
                    <p style={{ color: "tomato", fontWeight: 600 }}>{errors.documentId}</p>
                  )}
                  <div class=" mt-3">
                    <div className="font-bold font-poppins text-xs">{translatedMenuItems[0]}</div>
                    {/* type */}
                    <Field
                      name="documentTypeId"
                      selectType="documentTypeName"
                      isColumnWithoutNoCreate                     
                      component={SearchSelect}
                      isColumn
                      value={values.documentId}
                      inlineLabel
                    />
                  </div>
                  <div class=" flex  mt-4">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                    {translatedMenuItems[1]}
                      {/* Contract */}
                      </div>
                    <Switch
                      style={{ width: "6.25em", marginLeft: "0.625em" }}
                      onChange={handleContract}
                      checked={contract}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                </div>
                <div class=" h-full w-2/5">
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
       <div className="mt-1 flex flex-col">
      
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
          {props.selectDrop.map((includes) => (
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
        <LinkedDocumentsSupplies
        suppliesId={props.suppliesId}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        />
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
  selectDrop:customer.selectDrop
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { 
      addCustomerDocument,
      getCustomerDocument,
      getselectdrop
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddDocumentErpModals);
