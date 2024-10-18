import React, { useEffect, useState } from "react";
import { MainWrapper } from "../../../../Components/UI/Layout";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { getOrganizationSignatureByOrgId } from "../../../Auth/AuthAction";
import { Button,  } from "antd";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { addOrganizationSignatureByOrgId } from "../../../Auth/AuthAction";
function SignatureView(props) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());

  const [edit, setEdit] = useState(false);

  function onEditorStateChange(editorState) {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    seteditorState(editorState);
    setEdit(true);
  }

  function handleEmpty() {
    setEdit(false);

    seteditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(props.orgSignatureData.signature)
        )
      )
    );
  }
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    
          " Update"
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  useEffect(() => {
    props.getOrganizationSignatureByOrgId(props.organizationId);
  }, []);
  useEffect(() => {
    if (props.orgSignatureData.signature) {
      seteditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(props.orgSignatureData.signature)
          )
        )
      );
    } else {
      seteditorState(EditorState.createEmpty());
    }
  }, [props.orgSignatureData.signature]);
  function handleUpdate() {
    console.log(editorState);
    const editText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(editText);

    props.addOrganizationSignatureByOrgId({
      signature: editText,
      signatureId: props.orgSignatureData.signatureId || "",
      orgId: props.organizationId,
    });
  }
  return (
    <div>
      <MainWrapper>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          editorStyle={{
            height: 250,
            overflow: "auto",
            border: "0.0625em solid #aaa",
            padding: "0.3125em 0.625em ",
          }}
          onEditorStateChange={onEditorStateChange}
          placeholder={"Type here"}
        />
      
        <div class=" flex justify-end mr-[0.625em] mt-4"  >
          <StyledPopconfirm
            title="Do you want to Update?"
            onConfirm={handleUpdate}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              Loading={props.addingOrgSignature}
              htmlType="submit"
              disabled={!edit}
            >
             {translatedMenuItems[0]} {/* Update */}
            </Button>
          </StyledPopconfirm>
        </div>
      </MainWrapper>
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({
  organizationId: auth.userDetails.organizationId,
  orgSignatureData: auth.orgSignatureData,
  addingOrgSignature: auth.addingOrgSignature,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrganizationSignatureByOrgId,
      addOrganizationSignatureByOrgId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignatureView);
