import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, } from "antd";
import { Formik, Form, } from "formik";
import * as Yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { addProcureNote } from "./ProcreAction";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


/**
 * yup validation scheme for creating a note
 */
const NoteSchema = Yup.object().shape({
  notes: Yup.string().required(""),
});
const toolbarOption = {
  options: [
    "inline",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
  ],
  // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["bold", "italic", "underline", "strikethrough"],
  },

};
class NoteFileProcure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      edit: true,
    };
  }
  onEditorStateChange = (editorState) => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.setState({
      editorState,
      edit: false,
    });
  };
  createCallback = () => {
    this.setState({ editorState: EditorState.createEmpty(), edit: true }, () =>
      this.props.callback()
    );
  };

  render() {
    const {
      user: { userId, firstName, lastName },
      addProcureNote,
      leadsId,
      OpportunityId,
      notes,
      collectionDTO,
      ownerId,
      accountId,
      opportunityId,
      distributorId,
      Loading,
      callback,
      teamId,
      callId,
      // leadsAccountId,
      // contactLeadsId,
  
      eventId,
      taskId,
      type,
      vendorId,

      // partnerId,
      // userIdFromPartner,
      fetchingNotesListByLeadsId,
    } = this.props;
    const { editorState, placeholder } = this.state;  const handleEmailBlur = () => {
      if (this.props.notes.trim() !== "") {
        this.props.addProcureNote({ notes: this.props.notes,
            procureId: this.props.particularRowData.procureId,userId :this.props.userId });
      }
    };
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            // comment: ""
            procureId: this.props.particularRowData.procureId ? this.props.particularRowData.procureId : "",
            notes: "",
            userId: this.props.userId?this.props.userId : "",
            iteamId: this.props.particularRowData.iteamId ? this.props.particularRowData.iteamId : "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            );
            const htmlBody = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );
            // const htmlBody = 'draftToHtml(convertToRaw(editorState.getCurrentContent()))'

            console.log({ ...values, notes: htmlBody });
            addProcureNote({ ...values, notes: htmlBody }, this.createCallback);
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
          }) => {
            console.log(editorState.getCurrentContent());

            return (
              <Form className="form-background">
                {/* <Field
                                name='description'
                                placeholder='Leave notes here ...'
                                component={TextareaComponent}
                            /> */}
               {/* <ReactSpeeech/>  */}
             
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  editorStyle={{
                    height: 100,
                    overflow: "auto",
                     border:"solid lightgrey 2px"
                  }}
                // onClick={handleEmailBlur}
                  onEditorStateChange={this.onEditorStateChange}
                  placeholder={placeholder || "Type here"}
                  toolbar={toolbarOption}
                />
             <div class=" flex justify-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={this.state.edit}
                    style={{
                      marginTop: "2rem",
                     
                    }}
                  >
                    <FormattedMessage
                      id="app.post"
                      defaultMessage="Post"
                    />
                
                  </Button>
                </div> 
             
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, team, task,leads }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  fetchingNotesListByLeadsId: leads.fetchingNotesListByLeadsId,
  organizationId: auth.userDetails.organizationId,
     candidateId:auth.userDetails.candidateId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addProcureNote,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NoteFileProcure);
