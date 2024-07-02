




// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
// import { bindActionCreators } from "redux";
// import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';

// import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
// import { Button } from "antd";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import { addNote } from "../../../../CustomerAction";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// //import "antd/dist/antd.css"; // Ensure you have antd styles

// /**
//  * yup validation scheme for creating a note
//  */
// const NoteSchema = Yup.object().shape({
//   notes: Yup.string().required(""),
// });

// const toolbarOption = {
//   options: [
//     "inline",
//     "fontSize",
//     "fontFamily",
//     "list",
//     "textAlign",
//     "colorPicker",
//     "link",
//   ],
//   inline: {
//     inDropdown: false,
//     className: undefined,
//     component: undefined,
//     dropdownClassName: undefined,
//     options: ["bold", "italic", "underline", "strikethrough"],
//   },
// };

// class NoteForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty(),
//       edit: true,
//       recognizing: false,
//     };
//     this.recognition = null;
//   }

//   componentDidMount() {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert("Your browser does not support speech recognition. Try Google Chrome.");
//     } else {
//       this.recognition = new window.webkitSpeechRecognition();
//       this.recognition.continuous = true;
//       this.recognition.interimResults = true;

//       this.recognition.onstart = () => {
//         this.setState({ recognizing: true });
//       };

//       this.recognition.onend = () => {
//         this.setState({ recognizing: false });
//       };

//       this.recognition.onresult = (event) => {
//         let interimTranscript = '';
//         for (let i = event.resultIndex; i < event.results.length; ++i) {
//           if (event.results[i].isFinal) {
//             interimTranscript += event.results[i][0].transcript;
//           }
//         }
//         if (interimTranscript) {
//           const contentState = ContentState.createFromText(interimTranscript);
//           const newEditorState = EditorState.createWithContent(contentState);
//           this.onEditorStateChange(newEditorState);
//         }
//       };
//     }
//   }

//   startRecognition = () => {
//     if (this.recognition) {
//       this.recognition.start();
//     }
//   };

//   stopRecognition = () => {
//     if (this.recognition) {
//       this.recognition.stop();
//     }
//   };

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//       edit: false,
//     });
//   };

//   createCallback = () => {
//     this.setState({ editorState: EditorState.createEmpty(), edit: true }, () =>
//       this.props.callback()
//     );
//   };

//   render() {
//     const {
//       user: { userId, firstName, lastName },
//       addNote,
//       customerId,
//       employeeId,
//     } = this.props;
//     const { editorState, placeholder, recognizing } = this.state;
//     return (
//       <>
//         <Formik
//           enableReinitialize
//           initialValues={{
//             notes: "",
//             customerId: customerId ? customerId : "",
//             employeeId: employeeId ? employeeId : "",
//           }}
//           onSubmit={(values, { resetForm }) => {
//             const htmlBody = draftToHtml(
//               convertToRaw(editorState.getCurrentContent())
//             );

//             addNote({ ...values, notes: htmlBody }, this.createCallback);
//             resetForm();
//           }}
//         >
//           {({
//             errors,
//             touched,
//             isSubmitting,
//             setFieldValue,
//             setFieldTouched,
//             values,
//             ...rest
//           }) => {
//             return (
//               <Form className="form-background">
//                 <Editor
//                   editorState={editorState}
//                   wrapperClassName="demo-wrapper"
//                   editorClassName="demo-editor"
//                   editorStyle={{
//                     height: 100,
//                     overflow: "auto",
//                   }}
//                   onEditorStateChange={this.onEditorStateChange}
//                   placeholder={placeholder || "Type here"}
//                   toolbar={toolbarOption}
//                 />
//                 <div className="flex justify-end">
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     disabled={this.state.edit}
//                     style={{
//                       marginRight: "1.3125em",
//                       marginTop: "1.3125em",
//                     }}
//                   >
//                     <FormattedMessage id="app.post" defaultMessage="Post" />
//                   </Button>
//                   <Button
//                     type="default"
//                     onClick={recognizing ? this.stopRecognition : this.startRecognition}
//                     style={{
//                       marginLeft: "1.3125em",
//                       marginTop: "1.3125em",
//                     }}
//                   >
//                     {recognizing ? <VoiceOverOffIcon/> : 
//                     <RadioButtonCheckedIcon/>
//                     }
//                   </Button>
//                 </div>
//               </Form>
//             );
//           }}
//         </Formik>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ auth, customer }) => ({
//   user: auth.userDetails,
//   fetchingNotesListByCustomerId: customer.fetchingNotesListByCustomerId,
//   employeeId: auth.userDetails.employeeId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addNote,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);



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
import { addNote } from "../../../../CustomerAction";
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

class NoteForm extends Component {
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
    const { addNote, customerId, employeeId } = this.props;
    const htmlBody = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    addNote({
      notes: htmlBody,
      customerId: customerId || "",
      employeeId: employeeId || "",
    }, this.createCallback);
  };

  render() {
    const { user, addNote, customerId, employeeId } = this.props;
    const { editorState, recognizing } = this.state;

    return (
      <Formik
        enableReinitialize
        initialValues={{
          notes: "",
          customerId: customerId || "",
          employeeId: employeeId || "",
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

NoteForm.propTypes = {
  user: PropTypes.object.isRequired,
  addNote: PropTypes.func.isRequired,
  customerId: PropTypes.string,
  employeeId: PropTypes.string,
  callback: PropTypes.func,
};

NoteForm.defaultProps = {
  customerId: "",
  employeeId: "",
  callback: () => {},
};

const mapStateToProps = ({ auth, customer }) => ({
  user: auth.userDetails,
  fetchingNotesListByCustomerId: customer.fetchingNotesListByCustomerId,
  employeeId: auth.userDetails.employeeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNote,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);










