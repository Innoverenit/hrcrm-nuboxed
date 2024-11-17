import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, } from "draft-js";
import draftToHtml from "draftjs-to-html";
 import { addNoteOfProduct } from "../../ProductAction";
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
class LinkedProductNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      edit: true,
    };
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      edit: false,
    });
  };

  createCallback = () => {
    this.setState({ editorState: EditorState.createEmpty(), edit: true });
  };

  render() {
    
    const { editorState, placeholder } = this.state;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            notes: "",
            productionBuilderId:this.props.productionBuilderId,
  userId:this.props.userId
          }}
          onSubmit={(values, { resetForm }) => {
            const htmlBody = draftToHtml(
              convertToRaw(editorState.getCurrentContent())
            );
            this.props.addNoteOfProduct(
              {
                ...values, notes: htmlBody
              },
              this.props.productionBuilderId,
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
                  toolbar={toolbarOption}
                />
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={this.props.addingNotesOfProducts}
                    disabled={this.state.edit}
                    style={{
                      marginRight: "1.3125em",
                      marginTop: "1.3125em",
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

const mapStateToProps = ({ auth, product }) => ({
  user: auth.userDetails,
 employeeId:auth.userDetails.employeeId,
 userId: auth.userDetails.userId,
 addingNotesOfProducts:product.addingNotesOfProducts
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNoteOfProduct,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LinkedProductNoteForm);

