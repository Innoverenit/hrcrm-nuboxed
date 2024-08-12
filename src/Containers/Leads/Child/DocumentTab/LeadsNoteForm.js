import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Icon } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
 import { addLeadsNote } from "../../LeadsAction";
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
class LeadsNoteForm extends Component {
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
      addLeadsNote,
      
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
            notes: "",
            leadsId: leadsId ? leadsId : "",
            // type: type ? type : "",
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
            addLeadsNote({ ...values, notes: htmlBody }, this.createCallback);
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
                    // textTransform: "capitalize",
                  }}
                  onEditorStateChange={this.onEditorStateChange}
                  placeholder={placeholder || "Type here"}
                  // editorState={editorState}
                  toolbar={toolbarOption}
                />
               <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={this.state.edit}
                    style={{
                      // marginTop: "2.8125em",
                      // marginBottom: "0.3125em",
                      // marginRight: "0.3125em",
                      marginRight: "1.3125em",
                      marginTop: "1.3125em",
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

const mapStateToProps = ({ auth, team, leads }) => ({
  user: auth.userDetails,
  fetchingNotesListByLeadsId: leads.fetchingNotesListByLeadsId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    addLeadsNote,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsNoteForm);
