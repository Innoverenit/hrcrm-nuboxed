import React, {  useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field } from "formik";
import {getCustomerListByUserId} from "../../../../Customer/CustomerAction"

import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { addTemplate } from "../../../../Rules/RulesAction";
import CustomOption from "../../../../Rules/Child/RulesTab/CustomOption";
import { getSignatureInd } from "../../../../Settings/SettingsAction";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
const TemplateSchema = Yup.object().shape({
  type: Yup.string().required("Input needed!"),
  subject: Yup.string().required("Input needed!"),
});
function TemplateForm(props) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [edit, setEdit] = useState(true);
  const [selectType, setSelectType] = useState("");

  function handleFilterBy(value) {
    setSelectType(value);
  }

  function onEditorStateChange(editorState) {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    seteditorState(editorState);
    setEdit(false);
  }
  useEffect(() => {
    props.getSignatureInd();
    props.getCustomerListByUserId(props.userId, 0,"creationdate");
  }, []);
  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
      const data = new FormData(); // eslint-disable-line no-undef
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }
  const sortedCustomer =props.customerByUserId.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    // Compare department names
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const customerNameOption = sortedCustomer.map((item) => {
    return {
      label: `${item.name}`,
      value: item.customerId,
    };
  });

  return (
    <>
      <Formik
        initialValues={{
          type: "",
          template: "",
          // templateId: "",
          description: "",
          subject: "",
          customerId:""
        }}
        validationSchema={TemplateSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          const editText = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          );
          props.addTemplate({
            ...values,
            template: editText,
          });
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
              <div class=" flex justify-between"
             
              >
                <div class=" w-full h-full"
                
                >
                  <div class=" flex justify-between" >
                    <div class=" flex flex-col" >
                      <div class=" w-[90%]" >
                        <Field
                          isRequired
                          name="name"
                          type="text"
                          isColumn
                          width={"100%"}
                          /// label="Name"
                          label={
                            <FormattedMessage
                              id="app.name"
                              defaultMessage="Name"
                            />
                          }
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            height: "2.0625em",
                            marginTop: "0.25em",
                          }}
                        />
                      </div>
                      <div class=" w-[90%]">
                        <Field
                          isRequired
                          name="subject"
                          type="text"
                          isColumn
                          width={"100%"}
                          //label="Subject"
                          label={
                            <FormattedMessage
                              id="app.subject"
                              defaultMessage="Subject"
                            />
                          }
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            height: "2.0625em",
                            marginTop: "0.25em",
                          }}
                        />
                      </div>
                      <div class=" w-[90%]">
                    <Field
                      name="customerId"
                      isColumnWithoutNoCreate
                      selectType="customerList"
                      label={
                        <FormattedMessage
                          id="app.customer"
                          defaultMessage="Customer"
                        />
                      }
                      isColumn
                      component={SelectComponent}
                 options={
                   Array.isArray(customerNameOption)
                     ? customerNameOption
                     : []
                 }
                      // value={values.customerId}
                      style={{
                        flexBasis: "80%",
                        marginTop: "0.25em",
                        height: "2.0625em",
                      }}
                    />
                  </div>
                    </div>
                    <div class=" w-[50%]">
                      <Field
                        name="description"
                        //label="Description"
                        label={
                          <FormattedMessage
                            id="app.description"
                            defaultMessage="Description"
                          />
                        }
                        width={"100%"}
                        height={"5.625em"}
                        isColumn
                        component={TextareaComponent}
                        style={{
                          flexBasis: "80%",
                          height: "5em",
                          // marginLeft: "2.5em",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </div>
                  <div class=" mt-3" />
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={{
                      height: 250,
                      overflow: "auto",
                      border: "0.0625em solid #aaa",
                      padding: "0.3125em 0.625em ",
                    }}
                    toolbar={{
                      image: {
                        uploadCallback: uploadImageCallBack,
                        alt: { present: true, mandatory: false },
                        inputAccept:
                          "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                      },
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "fontFamily",
                        "list",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "emoji",
                       "image",
                        "history",
                      ],
                      
                    }}
                    toolbarCustomButtons={[
                      <CustomOption 
                      handleFilterBy={handleFilterBy}
                      signatureInd={props.signatureInd} 
                      selectType={selectType}
                      setSelectType={selectType}
                      />,
                    ]}
                    
                    onEditorStateChange={onEditorStateChange}
                    placeholder={"Type here"}
                  />
                 
                </div>
              </div>
            
              <div class=" flex justify-end mt-4" >
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.addingTemplate}
                  disabled={edit}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />

                </Button>
              </div>
            </Form>
          )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ rule, settings,customer,auth }) => ({
  addingTemplate: rule.addingTemplate,
  userId: auth.userDetails.userId,
  customerByUserId: customer.customerByUserId,
  signatureInd: settings.signatureInd && settings.signatureInd,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTemplate,
      getCustomerListByUserId,
      getSignatureInd,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm);
