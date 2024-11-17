import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message } from "antd";

import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { updateNotificationTemplate } from "../../../../Rules/RulesAction";
import * as Yup from "yup";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import CustomOptionForNotification from "../../../../Rules/Child/RulesTab/CustomOptionForNotification";
const NotificationSchema = Yup.object().shape({
  notificationName: Yup.string().required("Input needed!"),
});


function NotificationView(props) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [edit, setEdit] = useState(true);
  function onEditorStateChange(editorState) {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    seteditorState(editorState);
    setEdit(false);
  }
  useEffect(() => {
    if (props.currentNotification.message) {
      debugger;
      const sampleMarkup = props.currentNotification.message || editorState;
      console.log(convertFromHTML(props.currentNotification.message));
      const blocksFromHTML = convertFromHTML(sampleMarkup);
      seteditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks || "",
            blocksFromHTML.entityMap
          )
        )
      );
    } else {
      seteditorState(EditorState.createEmpty());
    }
  }, [props.currentNotification.message]);

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
    if (status === "success") {
      setEdit(true);
      message.success("Changes updated successfully");
    }
  }
  return (
    <>
      <Formik
        initialValues={{
          notificationName: props.currentNotification.notificationName || "",
          message: "",
          notificationTemplateId:
            props.currentNotification.notificationTemplateId || "",
          description: props.currentNotification.description || "",
        }}
        validationSchema={NotificationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          const editText = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          );

          props.updateNotificationTemplate(
            {
              ...values,
              message: editText,
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // height: "50vh",
                  // overflow: "scroll",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    marginLeft: "1.25em",
                    marginRight: "1.25em",
                  }}
                >
                  <div style={{ marginTop: "1.25em" }}></div>
                  <Field
                    isRequired
                    name="notificationName"
                    type="text"
                    isColumn
                    width={"100%"}
                    //label="Name"
                    label={<FormattedMessage
                      id="app.notificationName"
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
                  <mt-3 />
                  <Field
                    name="description"
                    //label="Description"
                    label={<FormattedMessage
                      id="app.description"
                      defaultMessage="Description"
                    />}
                    width={"100%"}
                    isColumn
                    height={"4.375em"}
                    component={TextareaComponent}
                    style={{
                      flexBasis: "80%",
                      height: "5em",
                      // marginLeft: "2.5em",
                      marginTop: "0.25em",
                    }}
                  />

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
                    toolbarCustomButtons={[<CustomOptionForNotification />]}
                    onEditorStateChange={onEditorStateChange}
                    placeholder={"Type here"}
                  />
                </div>
              </div>
              <mt-3 />
              <div class=" flex flex-row flex-wrap items-center self-start justify-end grow shrink h-auto mr-auto m-[0.4rem]">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.udatingNotification}
                  disabled={edit}
                >
                  <FormattedMessage
                    id="app.update"
                    defaultMessage=" Update"
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

const mapStateToProps = ({ rule }) => ({
  udatingNotification: rule.udatingNotification,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateNotificationTemplate,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationView);

