import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { Button, Upload } from "antd";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Field, Form, Formik } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { StyledLabel } from "../../../../Components/UI/Elements";

class AddPartnerEmailDrawerModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      files: null,
      flag: null,
      status: "done",
    };
  }
  handleReset = (resetForm) => {
    this.props.setEmailModalVisible(false);
    resetForm();
    this.setState({ editorState: EditorState.createEmpty() });
  };
  handleRemove = ({}) => {
    //debugger
    console.log(this.state.flag);
    if (this.state.flag === true) {
      return this.setState({ file: null });
    }
    console.log(this.state.files);
  };
  onEditorStateChange = (editorState) => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.setState({ editorState });
  };
  onFileChoose = (file) => {
    debugger;

    console.log(file);
    if (file.status !== "uploading") {
      this.setState({
        files: file.file.originFileObj,
        flag: true,
      });
    }
  };
  onEditorBlank = () => {
  };

  render() {
    const { editorState, placeholder } = this.state;
    const {
        partner: { name, middleName, lastName, customerId },
      toggleViewType,
      customer,
      customerByUserId,
    } = this.props;

    console.log("full", name);
    console.log("full1", this.props);

    return (
      <div>
        <StyledDrawer
          title={name}
          width={"40%"}
          visible={this.props.addDrawerPartnerEmailModal}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() => this.props.handlePartnerEmailDrawerModal(false)}
        >
            <Formik
            enableReinitialize
            initialValues={{
              subject: "",
              body: "",
              cc: [],
              bcc: [],
              to:  [],
              from: [],
            }}
            // validationSchema={NoteSchema}
            onSubmit={(values, { resetForm }) => {
              //debugger
              console.log(
                draftToHtml(convertToRaw(editorState.getCurrentContent()))
              );
              const htmlBody = draftToHtml(
                convertToRaw(editorState.getCurrentContent())
              );

              console.log({ ...values, cc: [values.cc], bcc: [values.bcc] });
              console.log(this.state.files);
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
            }) => {
              const empty = values.to;
              console.log(empty);

              return (
                <Form>
                   <div class=" w-full">
                   <div class=" flex items-center">
                    <div class=" w-1/12">
               <div class=" text-xs font-bold font-poppins text-black">To</div>
                    </div>
                    <div class=" w-11/12">
                      
                    <Field
                      name="to"
                      component={InputComponent}
                      width="100%"
                    />
                      </div>
                  </div>
                  <div class=" flex items-center">
                  <div class=" w-1/12">
               <div class=" text-xs font-bold font-poppins text-black">CC</div>
                    </div>
                    <div class=" w-11/12">
                      
                    <Field
                      name="cc"
                      component={InputComponent}
                      width="100%"
                    />
                      </div>
                  </div>
                 
                  <div class=" flex items-center">
                  <div class=" w-1/12">
               <div class=" text-xs font-bold font-poppins text-black">BCC</div>
                    </div>
                    <div class=" w-11/12">
                      
                    <Field
                      name="bcc"
                      component={InputComponent}
                      width="100%"
                    />
                      </div>
                  </div>
                  <div class=" flex items-center">
                  <div class=" w-1/12">
               <div class=" text-xs font-bold font-poppins text-black">Subject</div>
                    </div>
                    <div class=" w-11/12">
                      
                    <Field
                      name="subject"
                      component={InputComponent}
                      width="100%"
                    />
                      </div>
                  </div>
                  </div>

                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={{
                      height: 250,
                      overflow: "auto",
                      border: "1px solid #aaa",
                      padding: "5px 10px ",
                    }}
                     onEditorStateChange={this.onEditorStateChange}
                    placeholder={placeholder || "Type here"}
                  />
                   <div class=" flex justify-end">
                    <div class=" flex flex-row">
                      <Upload
                      >
                        <Button
                          type="link"
                        >
                        </Button>
                      </Upload>

                      <Button
                        type="primary"
                        htmlType="submit"
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ partner }) => ({
  partner: partner.partner,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPartnerEmailDrawerModal);
