import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, } from "draft-js";
import draftToHtml from "draftjs-to-html";
 import { addNote } from "../../LeadsAction";
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
      addNote,
      customerId,
      employeeId,
      notes,
      rowdata,
      fetchingNotesListByLeadsId,
    } = this.props;
    const { editorState, placeholder } = this.state;
    console.log(rowdata)
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            notes: "",
            // customerId: customerId ? customerId : "",
            // employeeId:employeeId ? employeeId:"",
          }}
          onSubmit={(values, { resetForm }) => {
            const { type, id } = this.props;
            console.log(
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            );
            const htmlBody = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );
            // const htmlBody = 'draftToHtml(convertToRaw(editorState.getCurrentContent()))'
            addNote(
              {
                ...values, notes: htmlBody
              },
              rowdata.category,rowdata.category==="Task"?rowdata.taskId:rowdata.category==="Event"?rowdata.eventId:rowdata.category==="Call"?rowdata.callId:null,
              this.createCallback
        
            );
          
           
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
                <div class=" flex justify-end" >
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

const mapStateToProps = ({ auth, team, customer }) => ({
  user: auth.userDetails,
  fetchingNotesListByCustomerId: customer.fetchingNotesListByCustomerId,
  employeeId:auth.userDetails.employeeId,
  //   team: team.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNote,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsNoteForm);
