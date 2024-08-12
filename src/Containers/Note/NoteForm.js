
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FlexContainer } from "../../Components/UI/Layout";

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
    // bold: { icon: bold, className: undefined },
    // italic: { icon: italic, className: undefined },
    // underline: { icon: underline, className: undefined },
    // strikethrough: { icon: strikethrough, className: undefined },
    // monospace: { icon: monospace, className: undefined },
    // superscript: { icon: superscript, className: undefined },
    // subscript: { icon: subscript, className: undefined },
  },
  // blockType: {
  //     inDropdown: true,
  //     options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
  //     className: undefined,
  //     component: undefined,
  //     dropdownClassName: undefined,
  // },
  // fontSize: {
  //     icon: fontSize,
  //     options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
  //     className: undefined,
  //     component: undefined,
  //     dropdownClassName: undefined,
  // },
  // fontFamily: {
  //     options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
  //     className: undefined,
  //     component: undefined,
  //     dropdownClassName: undefined,
  // },
  // list: {
  //     inDropdown: false,
  //     className: undefined,
  //     component: undefined,
  //     dropdownClassName: undefined,
  //     options: ['unordered', 'ordered', 'indent', 'outdent'],
  //     unordered: { icon: unordered, className: undefined },
  //     ordered: { icon: ordered, className: undefined },
  //     indent: { icon: indent, className: undefined },
  //     outdent: { icon: outdent, className: undefined },
  // },
  // textAlign: {
  //     inDropdown: false,
  //     className: undefined,
  //     component: undefined,
  //     dropdownClassName: undefined,
  //     options: ['left', 'center', 'right', 'justify'],
  //     left: { icon: left, className: undefined },
  //     center: { icon: center, className: undefined },
  //     right: { icon: right, className: undefined },
  //     justify: { icon: justify, className: undefined },
  // },
  // colorPicker: {
  //     icon: color,
  //     className: undefined,
  //     component: undefined,
  //     popupClassName: undefined,
  //     colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
  //         'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
  //         'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
  //         'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
  //         'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
  //         'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
  // },
  // link: {
  //     inDropdown: false,
  //     className: undefined,
  //     component: undefined,
  //     popupClassName: undefined,
  //     dropdownClassName: undefined,
  //     showOpenOptionOnHover: true,
  //     defaultTargetOption: '_self',
  //     options: ['link', 'unlink'],
  //     link: { icon: link, className: undefined },
  //     unlink: { icon: unlink, className: undefined },
  //     linkCallback: undefined
  // },
  // emoji: {
  //     icon: emoji,
  //     className: undefined,
  //     component: undefined,
  //     popupClassName: undefined,
  //     emojis: [
  //         '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
  //         '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
  //         '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
  //         '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
  //         '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
  //         '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
  //         '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
  //         '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
  //         '✅', '❎', '💯',
  //     ],
  // },
  // embedded: {
  //     icon: embedded,
  //     className: undefined,
  //     component: undefined,
  //     popupClassName: undefined,
  //     embedCallback: undefined,
  //     defaultSize: {
  //         height: 'auto',
  //         width: 'auto',
  //     },
  // },
  // image: {
  //     icon: image,
  //     className: undefined,
  //     component: undefined,
  //     popupClassName: undefined,
  //     urlEnabled: true,
  //     uploadEnabled: true,
  //     alignmentEnabled: true,
  //     uploadCallback: undefined,
  //     previewImage: false,
  //     inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
  //     alt: { present: false, mandatory: false },
  //     defaultSize: {
  //         height: 'auto',
  //         width: 'auto',
  //     },
  // },
  // remove: { icon: eraser, className: undefined, component: undefined },
  // history: {
  //     inDropdown: false,
  //     className: undefined,
  //     component: undefined,
  //     dropdownClassName: undefined,
  //     options: ['undo', 'redo'],
  //     undo: { icon: undo, className: undefined },
  //     redo: { icon: redo, className: undefined },
  // },
};
class NoteForm extends Component {
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
  componentDidMount() {
    // this.props.getFunctionNameByUserId()
  }
  render() {
    const {
      user: { userId, firstName, lastName },
    //   addNote,
      customerId,
      notes,
      collectionDTO,
      ownerId,
      accountId,
      opportunityId,
      distributorId,
      shipperId,
      supplierId,
      leadsId,
      eventId,
      taskId,
      type,
      vendorId,
      orderId,
      orderPhoneId,
      phoneId
    } = this.props;
    const { editorState, placeholder } = this.state;
    // const departmentOption = this.props.functionById.map((item) => {
    //   return {
    //     label: item.functionName,
    //     value: item.functionId
    //   }
    // })
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            userId: userId ? userId : "",
            notes: "",
            functionId: "",
            contactId: customerId ? customerId : "",
            distributorId: distributorId ? distributorId : "",
            shipperId: shipperId ? shipperId : "",
            supplierId: supplierId ? supplierId : "",
            vendorId: vendorId ? vendorId : "",
            leadsId: leadsId ? leadsId : "",
            taskId: taskId ? taskId : "",
            orderId: orderId ? orderId : "",
            type: type ? type : "",
            orderPhoneId: orderId ? orderId : "",
            phoneId: phoneId ? phoneId : "",
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
            // addNote({ ...values, notes: htmlBody }, this.createCallback);
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
                {/* <div style={{ width: "47%" }}>
                  <Field
                    name='functionId'
                    placeholder='Select Department...'
                    component={SelectComponent}
                    options={Array.isArray(departmentOption) ? (departmentOption) : []}
                  />
                </div> */}
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
                  toolbar={toolbarOption}
                />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={this.state.edit}
                    style={{
                      marginTop: "45px",
                      marginBottom: "5px",
                      marginRight: "5px",
                    }}
                  >
                    Post
                  </Button>
                </FlexContainer>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, user, leads }) => ({
  user: auth.userDetails,
  fetchingNotesListByLeadsId: leads.fetchingNotesListByLeadsId,
  userId: auth.userDetails.userId,
  // functionById: user.functionById,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   addNote,
    //   getFunctionNameByUserId
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);


// const customIcons = {
//   1: '😈',
//   2: '👎',
//   3: '🌝',
//   4: '👍',
//   5: '😀',
// };