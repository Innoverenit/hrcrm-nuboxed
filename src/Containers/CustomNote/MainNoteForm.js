import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Button } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
//import createMentionPlugin from 'draft-js-mention-plugin';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import 'draft-js-mention-plugin/lib/plugin.css';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { addNote } from "./MainNoteAction";
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
    options: ["bold", "italic", "underline", "strikethrough"],
  },
};
//JHello

class MainNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      edit: true,
      recognizing: false,
    };
    // this.mentionPlugin = createMentionPlugin();
    // this.plugins = [this.mentionPlugin];
    // this.users = [
    //   { id: 1, name: 'Abinash' },
    //   { id: 2, name: 'John' },
    //   { id: 3, name: 'Alice' },
    //   { id: 4, name: 'Michael' },
    // ];
    this.recognition = null;
    this.timer = null;
  }

  componentDidMount() {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser does not support speech recognition. Try Google Chrome.");
    } else {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onstart = () => {
        this.setState({ recognizing: true });
        this.startTimer();
      };

      this.recognition.onend = () => {
        this.setState({ recognizing: false });
        this.stopTimer();
        this.handleVoiceNoteSubmission();
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        if (interimTranscript) {
          const currentContent = this.state.editorState.getCurrentContent();
          const currentContentAsText = currentContent.getPlainText('\u0001');
          const newContentAsText = currentContentAsText + ' ' + interimTranscript;
          const newContentState = ContentState.createFromText(newContentAsText);
          const newEditorState = EditorState.push(this.state.editorState, newContentState, 'insert-characters');
          this.onEditorStateChange(newEditorState);
          this.startTimer(); // Reset timer when new speech is detected
        }
      };
    }
  }

  startTimer = () => {
    this.stopTimer(); // Clear any existing timer
    this.timer = setTimeout(() => {
      this.stopRecognition();
    }, 4000); // 4 seconds
  };

  stopTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  startRecognition = () => {
    if (this.recognition) {
      this.recognition.start();
    }
  };

  stopRecognition = () => {
    if (this.recognition) {
      this.recognition.stop();
    }
  };

  onEditorStateChange = (editorState) => {
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

  handleVoiceNoteSubmission = () => {
    const { editorState } = this.state;
    const { addNote, uniqueId } = this.props;
    const htmlBody = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    addNote({
      notes: htmlBody,
      userId: this.props.userId,
      type: this.props.type,
      id: uniqueId
    }, this.createCallback);
  };

  render() {
   // const { MentionSuggestions } = this.mentionPlugin;
    const { user, addNote, customerId, uniqueId, employeeId } = this.props;
    const { editorState, recognizing } = this.state;

    return (
      <Formik
        enableReinitialize
        initialValues={{
          notes: "",
          userId: this.props.userId,
          type: this.props.type,
          id: uniqueId
        }}
        onSubmit={(values, { resetForm }) => {
          const htmlBody = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
          );
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
        }) => (
          <Form className="form-background">
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              editorStyle={{ height: 100, overflow: "auto" }}
              onEditorStateChange={this.onEditorStateChange}
              placeholder="Type here"
              toolbar={toolbarOption}
                 plugins={this.plugins}
            />
              {/* <MentionSuggestions
          // onSearchChange={({ value }) => {
          //   // Filter users based on search term
          //   const filteredUsers = this.users.filter((user) =>
          //     user.name.toLowerCase().startsWith(value.toLowerCase())
          //   );
          //   return filteredUsers;
          // }}
          // renderSuggestion={(suggestion) => (
          //   <div>{suggestion.name}</div>
          // )}
        /> */}
            <div className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                disabled={this.state.edit}
                style={{ marginTop: "1.3125em" }}
              >
               Post
              </Button>
              <Button
                type="default"
                onClick={recognizing ? this.stopRecognition : this.startRecognition}
                style={{ marginLeft: "1.3125em", marginTop: "1.3125em", marginRight:"4.3125em" }}
                // class=" !text-icon items-center  "
              >
                {recognizing ? <VoiceOverOffIcon className="!text-icon text-red-600 " /> : <RadioButtonCheckedIcon className="!text-icon text-red-600"/>}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

MainNoteForm.propTypes = {
  user: PropTypes.object.isRequired,
  addNote: PropTypes.func.isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
  userId: PropTypes.string,
  callback: PropTypes.func,
};

MainNoteForm.defaultProps = {
  id: "",
  userId: "",
  type: "",
  callback: () => {},
};

const mapStateToProps = ({ auth, mainNotes }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  fetchingNotesListByCustomerId: mainNotes.fetchingNotesListByCustomerId,
  employeeId: auth.userDetails.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNote,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainNoteForm);