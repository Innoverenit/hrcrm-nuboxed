import React, {  useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { Button, message } from "antd";
import { Formik, Form, Field } from "formik";

import { FormattedMessage } from "react-intl";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import * as Yup from "yup";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { updateTemplate } from "../../../../Rules/RulesAction";
import CustomOption from "../../../../Rules/Child/RulesTab/CustomOption";

import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
const TemplateSchema = Yup.object().shape({
  type: Yup.string().required("Input needed!"),
});
function TemplateView(props) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [edit, setEdit] = useState(false);
  function onEditorStateChange(editorState) {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    seteditorState(editorState);
    setEdit(true);
  }
  function findImageEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "IMAGE"
      );
    }, callback);
  }

  const Image = (props) => {
    const { height, src, width } = props.contentState
      .getEntity(props.entityKey)
      .getData();

    return <img src={src} height={height} width={width} />;
  };

  useEffect(() => {
    if (props.currentEmail.template) {
      debugger;
      const sampleMarkup = props.currentEmail.template || editorState;
      console.log(convertFromHTML(props.currentEmail.template));
      const blocksFromHTML = convertFromHTML(sampleMarkup);
      seteditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          )
        )
      );
    } else {
      seteditorState(EditorState.createEmpty());
    }
  }, [props.currentEmail.template]);

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
  function handleCallBack(status) {
    debugger;
    if (status === "success") {
      debugger;
      setEdit(false);
      message.success("Changes updated successfully");
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          type: props.currentEmail.type || "",
          template: "",
          customerId:"",
          templateId: props.currentEmail.templateId || "",
          descripion: props.currentEmail.descripion || "",
          subject: props.currentEmail.subject || "",
        }}
        validationSchema={TemplateSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          const editText = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          );
          console.log({ ...values, template: editText });
          props.updateTemplate(
            {
              ...values,
              template: editText,
            },
            handleCallBack
          );
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
              <div class=" flex justify-between h-[50vh] overflow-scroll"
           
              >
                <div class=" w-full h-full ml-[1.25em] mr-[1.25em]"
               
                >
                  <div class=" mt-[1.25em]" ></div>
                  <div class=" flex justify-between" >
                    <div class=" flex flex-col" >
                      <div class=" w-[90%]" >
                        {" "}
                        <Field
                          isRequired
                          name="name"
                          type="text"
                          isColumn
                          width={"100%"}
                          //label="Name"
                          label={<FormattedMessage
                            id="app.name"
                            defaultMessage="Name"
                          />}
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            height: "2.0625em",
                            marginTop: "0.25em",
                          }}
                        />
                      </div>
                      <div class=" mt-3" style={{ marginBottom: "-0.5em" }} />

                      <div class=" w-[90%]" >
                        <Field
                          name="subject"
                          type="text"
                          isColumn
                          width={"100%"}
                          // label="Subject"
                          label={<FormattedMessage
                            id="app.subject"
                            defaultMessage="Subject"
                          />}
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            height: "2.0625em",
                            marginTop: "0.25em",
                          }}
                        />
                      </div>
                      <div class=" w-[90%]" >
                    <Field
                      name="customerId"
                      isColumnWithoutNoCreate
                      selectType="name"
                      

                      

                      // label="Sectors"
                      label={
                        <FormattedMessage
                          id="app.customer"
                          defaultMessage="Customer"
                        />
                      }
                      isColumn
                      component={SearchSelect}
                      // value={values.sectorId}
                      style={{
                        flexBasis: "80%",
                        marginTop: "0.25em",
                        height: "2.0625em",
                      }}
                    />
                  </div>
                    </div>
                    <div class=" w-[50%]" >
                      <Field
                        name="descripion"
                        //label="Description"
                        label={<FormattedMessage
                          id="app.descripion"
                          defaultMessage="Description"
                        />}
                        width={"100%"}
                        height={"5.9375em"}
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

            

              <div class=" mt-4">
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={{
                      height: 100,
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
                        previewImage: true,
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
                        "remove",
                        "history",
                      ],
                    }}
                    toolbarCustomButtons={[<CustomOption />]}
                    onEditorStateChange={onEditorStateChange}
                    placeholder={"Type here"}
                  />
                  </div> 
                </div>
              </div>
            
              <div class=" flex justify-end mt-4" >
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.udatingEmail}
                  disabled={!edit}
                >
                  <FormattedMessage
                    id="app.update"
                    defaultMessage="Update"
                  />
                  {/* Update */}
                </Button>
              </div>
            </Form>
          )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ rule, settings }) => ({
  udatingEmail: rule.udatingEmail,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateTemplate,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TemplateView);

const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    width: 600,
  },
  editor: {
    border: "0.0625em solid #ccc",
    cursor: "text",
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: "center",
  },
};
