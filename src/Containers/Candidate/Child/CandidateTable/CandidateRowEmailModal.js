
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { Field, Form, Formik } from "formik";
import { Button } from "antd";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const CandidateRowEmailModal = props => {
  return (
    <>
      <StyledDrawer
        title="Email"    
        width="35%"
        visible={props.addemaildrawermodal}
        onClose={() => props.handleemaildrawermodal(false)}
      >
         <Formik
            enableReinitialize
            initialValues={{
              subject: "Quotation",
              text: "",
              //cc: [],
              //bcc: [],
              to:  [],
              from: [],
            }}
            // validationSchema={NoteSchema}
            onSubmit={(values, { resetForm }) => {
              const htmlBody = draftToHtml(
              );
              console.log(this.state.formattedFile)
              
              // const blobData = new Blob([this.state.formattedFile],);
              // console.log(blobData)
              let formData = new FormData();


            //   Object.keys(this.state.formattedFile).forEach(key => {
            //     formData.append(key, this.state.formattedFile[key]);
            // });

            const file = new File([/* ArrayBuffer, Blob, or Typed Array representing file content */], this.state.formattedFile.name, { type: this.state.formattedFile.type });

// Append file and other properties to FormData
formData.append('file', file); // 'file' is the key for the file content
// Object.keys(this.state.formattedFile).forEach(key => {
//     formData.append(key, this.state.formattedFile[key]);
// });
            

  
  // formData.append("name", this.state.formattedFile.name);
  // formData.append("type", this.state.formattedFile.type);
  // formData.append("status", this.state.formattedFile.status);
  // formData.append("size", this.state.formattedFile.size);
  // formData.append("uid", this.state.formattedFile.uid);


  // Append other form values
  
  formData.append("to", values.to);
  formData.append("from", values.from);
  formData.append("subject",values.subject);
  formData.append("text", htmlBody);
               this.props.sendEmail(formData, 
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
                      name="from"
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
                    // editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorStyle={{
                      height: 250,
                      overflow: "auto",
                      border: "1px solid #aaa",
                      padding: "5px 10px ",
                    }}
                     onEditorStateChange={this.onEditorStateChange}
                    // placeholder={placeholder || "Type here"}
                  />
                  <div class=" flex justify-between items-center" >
                  <div class="w-24">
        <span onClick={() => this.exportPDFAnnexure()}>
          <Button type="primary">
            Generate Pdf
            </Button>
                           </span>
          </div>
                    <div class=" flex flex-row"
                    >                

                      <Button
                        type="primary"
                        htmlType="submit"                   
                        //  loading={sendingEmail}
                        style={{ marginTop: "10px" }}
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
    </>
  );
};

export default CandidateRowEmailModal;
