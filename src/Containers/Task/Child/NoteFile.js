import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Icon } from "antd";
import { Formik, Form, Field } from "formik";
//  import ReactSpeeech from "../../../../../Components/ReactSpeech/ReactSpeech";
import * as Yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
//import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
 import { addNote } from "../TaskAction";
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
      leadsId,
      eventId,
      taskId,
      type,
      vendorId,

      // partnerId,
      // userIdFromPartner,
      fetchingNotesListByLeadsId,
    } = this.props;
    const { editorState, placeholder } = this.state;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            // comment: "",
            // notes: "",
            taskId:this.props.taskId,
            providerId:this.props.userId,
            orgId:this.props.organizationId,
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            );
            const htmlBody = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );
            // const htmlBody = 'draftToHtml(convertToRaw(editorState.getCurrentContent()))'

            console.log({ ...values, comment: htmlBody });
            addNote({ ...values, comment: htmlBody }, this.createCallback);
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
                  }}
                  onEditorStateChange={this.onEditorStateChange}
                  placeholder={placeholder || "Type here"}
                  toolbar={toolbarOption}
                />
                {/* <div class=" flex ">
                  <Button
                    type="primary"
                    htmlType="submit"
                 
                    style={{
                      marginTop: "3.8125em",
                      marginBottom: "0.3125em",
                      marginRight: "0.3125em",
                    }}
                  >
                    <FormattedMessage
                      id="app.notify"
                      defaultMessage="Notify"
                    />
               
                  </Button>
                </div> */}
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
                    <FormattedMessage
                      id="app.post"
                      defaultMessage="Post"
                    />
                    {/* Post */}
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

const mapStateToProps = ({ auth, team, task }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  fetchingNotesListByTaskId: task.fetchingNotesListByTaskId,
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
