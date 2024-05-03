import React, { Component, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { Button, Upload } from "antd";
import { Field, Form, Formik } from "formik";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, } from "draft-js";
import { StyledLabel } from "../../../../Components/UI/Elements";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import "jspdf-autotable";
import {sendEmail} from "../../../../Containers/Settings/Email/EmailAction";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { base_url } from "../../../../Config/Auth";

class OpportunityRowEmailModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      files: null,
      file:null,
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

   exportPDFAnnexure = async () => {
    var doc = new jsPDF();
    const {
      userDetails:
      {address},
        imageId
    }=this.props
   
    let cityd=`${address.city}`
    let countryd=`${address.country}`
    let addressde=`${address.state}`
    let cityde=`${address.street}`
    var imageUrl = `${base_url}/image/${imageId || ""}`;
    var name1 = `East Repair Inc `
    var name2 =`1912 Harvest Lane New York ,NY 12210 ${cityd}`
    var name3 =`BILL TO`
    var name4 = `SHIP TO`
    var name5 = `QUOTE #`
    var name6 = `QUOTE DATE`
    var name7 = `P.O.#`
    var name8 = `Quote Total`
    var name9 = `QTY`
    var name10 = `DESCRIPTION`
    var name11 = `UNIT PRICE`
    var name12 = `AMOUNT`
    var name13= `TERM & CONDITIONS`
    var name14= `Payement id due within 15 days`
    var name15= `Please make checks payble to: East repair Inc. `
  
  
    doc.setFont("Montserrat");
    doc.setFillColor(62, 115, 185);
    doc.rect(0, 0, 230, 13, 'F');
    doc.setFontSize(25);
    doc.setFontSize(14);
    doc.setDrawColor(0, 0, 0)
    doc.addImage(imageUrl, 'JPEG', 20, 18, 165, 20);
    doc.text(name1, 8, 25);
    doc.setFontSize(10);
    let yPosition = 32;
    address.forEach(item => {
      doc.text(` ${item.city}  ${item.country}  ${item.state}  ${item.street}`, 8, yPosition);
      yPosition += 4
  });
    // doc.text(name2, 8, 32);
    doc.setFontSize(12);
    doc.text(name3, 8, 50);
    doc.text(name4, 60, 50);
    doc.text(name5, 120, 50);
    doc.text(name6, 120, 58);
    doc.text(name7, 120, 66);
    doc.line(8, 80, 200, 80);
    doc.setFontSize(22);
    doc.text(name8, 8, 90);
    doc.line(8, 100, 200, 100);
    doc.setFontSize(10);
    doc.text(name9, 8, 110);
    doc.text(name10, 30, 110);
    doc.text(name11, 90, 110);
    doc.text(name12, 140, 110);
    doc.setFontSize(12);
    doc.text(name13, 8, 250);
    doc.setFontSize(9);
    doc.text(name14, 8, 260);
    doc.text(name15, 8, 270);
    //footer
    doc.setFillColor(62, 115, 185);
    doc.rect(0, 276, 230, 15, 'F');
  
    doc.save("Quotation.pdf")
  
  }

  onEditorStateChange = (editorState) => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.setState({ editorState });
  };
  onFileChoose = (file) => {
    debugger;

    console.log(file);
    if (file.status !== "uploading") {
      this.setState({
        file: file.file.originFileObj,
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
      sendingEmail
    } = this.props;

    console.log("full", name);
    console.log("full1", this.props);
    console.log(this.state.file);
    console.log(this.props.opportunityData)
    return (
      <div>
        <StyledDrawer
              // title="Opportunity"
              title={this.props.opportunityData.opportunityId}
        width={"60%"}
        visible={this.props.addOpportunityRowEmailModal}
        // maskClosable={false}
        closable
        destroyOnClose
       
         onClose={() => this.props.handleOpportunityRowEmailModal(false)}
      >
            <Formik
            enableReinitialize
            initialValues={{
              subject: "Quotation",
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
               this.props.sendEmail({ ...values,body:htmlBody, cc: values.cc, bcc: values.bcc, attachment: this.state.file }, 
                // () => setEmailModalVisible(false)
              )
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
               <StyledLabel>To</StyledLabel>
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
               <StyledLabel>CC</StyledLabel>
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
               <StyledLabel>BCC</StyledLabel>
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
               <StyledLabel>Subject</StyledLabel>
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
                  <div class="w-6">
        {/* <span onClick={() => exportPDFAnnexure()}>
            <PictureAsPdfIcon/>
                           </span> */}
          </div>
                    <div class=" flex flex-row"
                    >
                      <Upload
                        onChange={this.onFileChoose}
                        onRemove={this.handleRemove}
                      >
                        <Button
                          type="link"
                          style={{
                            marginTop: "8px",
                            marginLeft: "",
                          }}
                        >
                          Upload
                        </Button>
                      </Upload>

                      <Button
                        type="primary"
                        htmlType="submit"
                        // disabled={!values.to && values.cc && values.bcc}
                        // disabled={!empty.length}
                         loading={sendingEmail}
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
const mapStateToProps = ({ profile, auth, employee, customer,email }) => ({
  customerById: customer.customerById,
  sendingEmail:email.sendingEmail,
  userDetails: auth.userDetails,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({sendEmail}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityRowEmailModal);
