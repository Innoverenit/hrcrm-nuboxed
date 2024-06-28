import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Button } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
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

class MainNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      edit: true,
      recognizing: false,
    };
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
          const contentState = ContentState.createFromText(interimTranscript);
          const newEditorState = EditorState.createWithContent(contentState);
          this.onEditorStateChange(newEditorState);
        }
      };
    }
  }

  startTimer = () => {
    this.timer = setTimeout(() => {
      this.stopRecognition();
    }, 10000); // 30 seconds
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
    const { addNote, uniqueId ,} = this.props;
    const htmlBody = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    addNote({
      notes: htmlBody,
      userId: this.props.userId,
      type:this.props.type,
      id:uniqueId
    }, this.createCallback);
  };

  render() {
    const { user, addNote, customerId,uniqueId, employeeId } = this.props;
    const { editorState, recognizing } = this.state;
console.log(this.props.uniqueId)
    return (
      <Formik
        enableReinitialize
        initialValues={{
          notes: "",       
          
  userId: this.props.userId,
type:this.props.type,
id:uniqueId

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
            />
            <div className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                disabled={this.state.edit}
                style={{ marginRight: "1.3125em", marginTop: "1.3125em" }}
              >
                <FormattedMessage id="app.post" defaultMessage="Post" />
              </Button>
              <Button
                type="default"
                onClick={recognizing ? this.stopRecognition : this.startRecognition}
                style={{ marginLeft: "1.3125em", marginTop: "1.3125em" }}
              >
                {recognizing ? <VoiceOverOffIcon /> : <RadioButtonCheckedIcon />}
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
  type:PropTypes.string,
  id:PropTypes.string,
  userId: PropTypes.string,
  callback: PropTypes.func,
};

MainNoteForm.defaultProps = {
    id:"",
    userId: "",
    type:"",
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










