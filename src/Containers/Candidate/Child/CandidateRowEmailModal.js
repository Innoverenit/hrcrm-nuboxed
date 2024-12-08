import React, { Component, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { Button, Upload } from "antd";
import { Field, Form, Formik } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, } from "draft-js";



class CandidateRowEmailModal extends Component {

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
    //debugger;
    // this.setState({ editorState: EditorState.createEmpty() });
  };

  render() {
    const { editorState, placeholder } = this.state;
    const {
      customerById: { name, middleName, lastName, customerId },
      toggleViewType,
      customer,
      customerByUserId,
    } = this.props;

    console.log("full", name);
    console.log("full1", this.props);

    return (
      <div>
        <StyledDrawer
            
        title="Email"
       
        width={"60%"}
        visible={this.props.addCandidateRowEmailModal}
        // maskClosable={false}
        closable
        destroyOnClose
         maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
         style={{marginTop:"3rem"}}
         onClose={() => this.props.handleCandidateRowEmailModal(false)}
        //  footer={null}
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
              // const htmlBody = 'draftToHtml(convertToRaw(editorState.getCurrentContent()))'

              console.log({ ...values, cc: [values.cc], bcc: [values.bcc] });
              // const emailFormData = new FormData();
              // emailFormData.append("to", new Array(values.to));
              // emailFormData.append("cc", new Array(values.cc));
              // emailFormData.append("bcc", new Array(values.bcc));
              // emailFormData.set("subject", values.subject);
              // emailFormData.set("from", values.from);
              // emailFormData.set("body", htmlBody);
              // emailFormData.set("userId", userId);
              // emailFormData.set("orgId", organizationId);
              // emailFormData.set("contactId", contactId);
              // emailFormData.append("attachment", this.state.files);
              console.log(this.state.files);
              // console.log(emailFormData);
              // // sendEmail(emailFormData, this.onEditorBlank(), () =>
              //   this.handleReset(resetForm)
              // );

              // sendEmail({ ...values, cc: [values.cc], bcc: [values.bcc], attachment: this.state.file }, () => setEmailModalVisible(false))
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
                   <div class=" w-full" >
                  <div class=" flex items-center" >
                    {/* <Title type='user' style={{ fontSize: 18, display: 'inline'}} >To</Title> */}
                    <div class="w-[12%]" >
               <div class=" text-xs font-bold font-poppins text-black">To</div>
                    </div>
                    <div class="w-[88%]" >
                      
                    <Field
                      name="to"
                      component={InputComponent}
                      width="100%"
                    />
                      </div>
                  </div>
                  <div class=" flex items-center" >
                  <div class=" w-[12%]" >
               <div class=" text-xs font-bold font-poppins text-black">CC</div>
                    </div>
                    <div class="w-[88%]" >
                      
                    <Field
                      name="cc"
                      component={InputComponent}
                      width="100%"
                    />
                      </div>
                  </div>
                 
                  <div class=" flex items-center" >
                  <div class=" w-[12%]" >
               <div class=" text-xs font-bold font-poppins text-black">BCC</div>
                    </div>
                    <div class="w-[88%]" >
                      
                    <Field
                      name="bcc"
                      component={InputComponent}
                      width="100%"
                    />
                      </div>
                  </div>
                  <div class=" flex items-center" >
                  <div class=" w-[12%]" >
               <div class=" text-xs font-bold font-poppins text-black">Subject</div>
                    </div>
                    <div class="w-[88%]" >
                      
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
                  <div class=" flex justify-end" >
                    <div class=" flex flex-row"
                    >
                      <Upload
                        // onChange={this.onFileChoose}
                        // onRemove={this.handleRemove}
                      >
                        <Button
                          type="link"
                          style={{
                            marginTop: "8px",
                            marginLeft: "",
                          }}
                        >
                          {/* <Icon size="large" type="paper-clip" /> */}
                        </Button>
                      </Upload>

                      <Button
                        type="primary"
                        htmlType="submit"
                        // disabled={!values.to && values.cc && values.bcc}
                        // disabled={!empty.length}
                        // loading={sendingEmail}
                        style={{ marginTop: "10px" }}
                      >
                        Send
                      </Button>
                      {/* <Button type='default' style={{ marginLeft: 5, marginTop: '5px' }} onClick={() => setSmsModalVisible(false)}>cancel</Button> */}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {/* <Suspense fallback={<BundleLoader />}></Suspense> */}
        </StyledDrawer>
      </div>
    );
  }
}
const mapStateToProps = ({ profile, auth, employee, customer }) => ({
  customerById: customer.customerById,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateRowEmailModal);
