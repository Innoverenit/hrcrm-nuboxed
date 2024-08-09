import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,  Rate, } from "antd";
import { Formik, Form, } from "formik";
import * as Yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { addFeedbackNote } from "./NoteAction";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomOption from "./CustomOption";

import { BorderBox } from "../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";

const smileIcon = "&#128522";

const customIcons = {
  1: '😈',
  2: '👎',
  3: '🌝',
  4: '👍',
  5: '😀',
};

/**
 * yup validation scheme for creating a note
 */
const NoteSchema = Yup.object().shape({
  feedback: Yup.string().required(""),
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
    // "emoji",
  ],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  // emoji: {
  //   // icon: emoji,
  //   className: undefined,
  //   component: undefined,
  //   popupClassName: undefined,
  //   emojis: [
  //     '😀', '🤗', '🤔', '😣'


  //   ],
  // },
};

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
const text = "Rate your engagement";
class NoteFormForFeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      ratingData: "",
    };
  }
  onEditorStateChange = (editorState) => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.setState({
      editorState,
    });
  };
  createCallback = () => {
    this.setState({ editorState: EditorState.createEmpty() }, () =>
      this.props.callback()
    );
  };
  handleChange = (value) => {
    this.setState({ ratingData: value })
  }
  render() {
    const {
      user: { userId, firstName, lastName },
      addFeedbackNote,
      orderId,
      contactId,
      type,
      distributorId,
      shipperId,
      supplierId,
    } = this.props;
    const { editorState, placeholder } = this.state;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            feedback: "",
            orderId: orderId ? orderId : "",
            contactId: contactId ? contactId : "",
            distributorId: distributorId ? distributorId : "",
            shipperId: shipperId ? shipperId : "",
            supplierId: supplierId ? supplierId : "",
            type: type ? type : "",
            userId: this.props.userId,
            rating: this.state.ratingData,
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            );
            const htmlBody = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );
            // const htmlBody = 'draftToHtml(convertToRaw(editorState.getCurrentContent()))'

            console.log({ ...values, feedback: htmlBody });
            addFeedbackNote(
              {
                ...values,
                rating: this.state.ratingData,
                feedback: htmlBody
              },
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
              <Form>
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  editorStyle={{ height: 85, overflow: "auto", border: "1px solid #aaa", }}
                  onEditorStateChange={this.onEditorStateChange}
                  placeholder={placeholder || "Type here"}
                  toolbarStyle={{ border: "2px solid black", }}
                  toolbar={toolbarOption}
                  toolbarCustomButtons={[<CustomOption />]}
                />
                {/* <Select onChange={this.handleChange}>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                </Select> */}
                <div class=" mt-3" />
                <div class=" mt-3" />
                <div class=" mt-3" />
                <BorderBox style={{ border: "1px solid #aaa" }}>
                  <p>{text}</p>
                  <Rate
                    // allowHalf
                    defaultValue={3} character={({ index }) => customIcons[index + 1]}
                    style={{ color: "orange" }}
                    tooltips={desc}
                    onChange={this.handleChange}
                    title={text}
                  />
                </BorderBox>
                <div class=" mt-3" />
                <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                  <Button
                    type="primary"
                    htmlType="submit"
                    // disabled={editorState.getCurrentContent().length <= 7}
                    // style={{ marginTop: "157px" }}
                    style={{
                      marginTop: "45px",
                      marginBottom: "5px",
                      marginRight: "5px",
                    }}
                  >
                    {<FormattedMessage id="app.submit" defaultMessage="Submit"/>}
                    
                  </Button>
                </div>
                {/* </div> */}
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, team }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  //   team: team.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addFeedbackNote,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NoteFormForFeedBack);