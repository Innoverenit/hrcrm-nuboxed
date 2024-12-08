import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
  import { addNote } from "../CallAction";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
 
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["bold", "italic", "underline", "strikethrough"],
  },

};
class NoteFile extends Component {
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
      addNote,
      
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
      leadsId,
      eventId,
      taskId,
      type,
      vendorId,
      fetchingNotesListByLeadsId,
    } = this.props;
    const { editorState, placeholder } = this.state;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            // comment: ""
            callId: callId ? callId : "",
            notes: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            );
            const htmlBody = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );
            console.log({ ...values, notes: htmlBody });
             addNote({ ...values, notes: htmlBody }, this.createCallback);
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
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  editorStyle={{
                    height: 100,
                    overflow: "auto",
                  }}
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
                      marginTop: "3.8125em",
                      marginBottom: "0.3125em",
                      marginRight: "0.3125em",
                    }}
                  >                 
                    Post
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

const mapStateToProps = ({ auth, team, task,call }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  fetchingNotesListByCallId: call.fetchingNotesListByCallId,
  organizationId: auth.userDetails.organizationId,
     candidateId:auth.userDetails.candidateId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    addNote,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NoteFile);
