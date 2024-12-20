import React, { useState, useEffect,lazy, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import {
  handleCandidateModal,
  handleCandidateResumeModal,

} from "../CandidateAction";
import { getLibrarys } from "../../../Containers/Settings/Library/LibraryAction";
import { Button } from "antd";
import { addResumeForm, addParsingForm } from "../CandidateAction";
const AddCandidateModal = lazy(() => import("./AddCandidateModal"));

const ResumeForm = ({
  addingResumeForm,
  addCandidateModal,
  librarys,
  organizationId,
  resumeForm,
  parsingForm,
  addResumeForm,
  handleCandidateResumeModal,
  handleCandidateModal,
  getLibrarys,
  name,
  translateText,
  selectedLanguage
  
  // handleResponseData, // Include handleResponseData in the props
}) => {
  const [fileData, setFileData] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSetFileData = useCallback((file) => {
    setFileData(file);
  }, []);

  const handleReset = useCallback((resetForm) => {
    resetForm();
  }, []);

  const handleResumeUpload = () => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    console.log(resumeForm.length && resumeForm);
    addResumeForm(formData);
  };

  console.log(name)

  const handleResponseData = (data) => {
    console.log(data)
    console.log('function called');
    setResponseData(data);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    console.log(selectedFile);
    console.log(librarys);
    const convertedArray = librarys.map((item) => item.name);
    const convertedString = convertedArray.toString();
    console.log(convertedString);
    let formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("skills", convertedString);
    console.log(formData);
    axios
      .post(`https://develop.tekorero.com/HrAnalytics/pdf/read`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res=> {
        console.log("data45", res.data);
         // Call handleResponseData with the response data
         handleResponseData(res.data);
        handleCandidateModal(true);
      
        // handleCandidateResumeModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLibrarys(organizationId);
  }, [getLibrarys, organizationId]);

  console.log("formch", resumeForm);
  console.log("FormRender", fileData);
  console.log("parsing", parsingForm);

  return (
    <>
      <input type="file" name="file" onChange={changeHandler} />
      <div className="flex justify-end mt-3">
        <div>
          <button
            style={{
              backgroundColor: "#24d8a7",
              height: "1.6rem",
              color: "white",
              borderColor: "#24d8a7",
            }}
            onClick={() => {
              handleSubmission();
              handleResumeUpload();
            }}
          >
            Upload Selected File
          </button>
        </div>

        <div className="ml-[5px]">
          <Button
            type="danger"
            ghost
            onClick={() => {
              handleCandidateModal(true);
            }}
          >
            Don't have resume handy
          </Button>
        </div>
      </div>
      <AddCandidateModal
          addCandidateModal={addCandidateModal}
          handleCandidateModal={handleCandidateModal}
          responseData={responseData}
          translateText={translateText}
          selectedLanguage={selectedLanguage}
        />
    </>
  );
};

const mapStateToProps = ({
  auth,
  librarys,
  candidate,
  opportunity,
  contact,
  customer,
}) => ({
  addingResumeForm: candidate.addingResumeForm,
  addCandidateModal: candidate.addCandidateModal,
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
  resumeForm: candidate.resumeForm,
  parsingForm: candidate.parsingForm,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addResumeForm,
      handleCandidateResumeModal,
      handleCandidateModal,
      getLibrarys,
      addParsingForm,
     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ResumeForm);

