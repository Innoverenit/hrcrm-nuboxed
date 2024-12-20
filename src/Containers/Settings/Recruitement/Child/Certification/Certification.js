
import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Input } from "antd";
import MicIcon from '@mui/icons-material/Mic';
import {getCertificationRecords} from "../../../Library/LibraryAction"
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { TextInput } from "../../../../../Components/UI/Elements";
import {
  getCertification,
  addCertification,
  removeCertification,
  updateCertification,
  searchCertificationName,
  ClearReducerDataOfCertification,
} from "../Certification/CertificationAction";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import dayjs from "dayjs";
const SingleCertification = lazy(() => import("./SingleCertification"));

const Certification = ({
  getCertification,
  getCertificationRecords,
  addCertification,
  removeCertification,
  updateCertification,
  searchCertificationName,
  ClearReducerDataOfCertification,
  fetchingCertifications,
  fetchingCertificationsError,
  certifications,
  addingCertifications,
  updatingCertifications,
  userId,
  orgId,
  organizationId,
}) => {
  const [linkedCertification, setLinkedCertification] = useState([]);
  const [isTextInputOpen, setIsTextInputOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [singleCertification, setSingleCertification] = useState("");
  const [editInd, setEditInd] = useState(true);
  const [currentData, setCurrentData] = useState("");

  const handleChangeDes = (e) => {
    setCurrentData(e.target.value);

    if (e.target.value.trim() === "") {
      getCertification(organizationId);
      ClearReducerDataOfCertification();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      searchCertificationName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleClear = () => {
    setCurrentData("");
    getCertification(organizationId);
  };


  const handleSearchChange = (e) => {
    setCurrentData(e.target.value);
  };

  const toggleInput = () => setIsTextInputOpen((prev) => !prev);

  const handleChange = (e) => setName(e.target.value);

  const handleAddCertification = () => {
    const { addCertification } = this.props;
    const { name } = this.state;
    let certification = { name };
    
    addCertification(certification, () => console.log("add certification callback"));

    setName("");
    setSingleCertification("");
    setIsTextInputOpen(false);
    setEditInd(true);
  };

  const handleDeleteCertification = (certificationId) => {
    removeCertification(certificationId);
    setName("");
    setSingleCertification("");
  };

  const handleUpdateCertification = (name, certificationId, editInd, cb) => {
    updateCertification(name, certificationId, editInd, cb);
    setName("");
    setSingleCertification("");
  };

  useEffect(() => {
    getCertification(organizationId);
    getCertificationRecords(orgId)
  }, [getCertification,getCertificationRecords, organizationId,orgId]);

  if (fetchingCertifications) return <p>Loading ...</p>;

  return (
    <>
      <div className="flex flex-no-wrap">
        <MainWrapper
          style={{
            flexBasis: "100%",
            overflow: "scroll",
            color: "#FFFAFA",
            height:"29rem"
          }}
        >
          <div class=" flex flex-row justify-end">
          <div className="flex w-[18vw] mr-1">
            <Input
              placeholder="Search by Name"
              suffix={
                <MicIcon
                  onClick={SpeechRecognition.startListening}
                  style={{
                    fontSize: 16,
                    color: "#1890ff",
                  }}
                />
              }
             
              onPressEnter={handleSearch}
              onChange={handleChangeDes}
            />
          </div>
          {isTextInputOpen ? (
            <div className="flex items-center ml-[0.3125em] ">
              <TextInput
                placeholder="Add More"
                name="name"
                value={name}
                onChange={(e) => handleChange(e)}
                width="61%"
                style={{ marginRight: "0.125em" }}
              />
          
              <Button
                type="primary"
                htmlType="submit"
                disabled={!name}
                loading={addingCertifications}
                onClick={handleAddCertification}
                style={{ marginRight: "0.125em"}}
              >
                Save
              </Button>
            
              <Button type="primary" 
             
              ghost onClick={toggleInput}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
           
              <div className="flex justify-end">
                <Button
                  type="primary"
                  ghost
                  htmlType="button"
                  // loading={addingCertifications}
                  onClick={toggleInput}
                >
                  Add Certification
                </Button>
              </div>
            </>
          )}

</div>
          <div className="flex flex-col">
            <MainWrapper style={{ height: "30em" }}>
              {certifications.length ? (
                certifications
                  .slice()
                  .sort((a, b) => {
                    const nameA = (a.name || '').toString();
                    const nameB = (b.name || '').toString();
                    return nameA.localeCompare(nameB);
                  })
                  .map((certification, i) => (
                    <SingleCertification
                      key={i}
                      value={singleCertification}
                      data="singleCertification"
                      certification={certification}
                      linkedCertification={linkedCertification}
                      updatingCertifications={updatingCertifications}
                      handleChange={handleChange}
                      handleUpdateCertification={handleUpdateCertification}
                      handleDeleteCertification={handleDeleteCertification}
                      handleClear={handleClear}
                      handleSearchChange={handleSearchChange}
                      currentData={currentData}
                      setCurrentData={setCurrentData}
                    />
                  ))
              ) : (
                <p>None Available</p>
              )}
            </MainWrapper>
          </div>
        </MainWrapper>
      </div>
      <div>
        Updated on{" "}
        {dayjs(
          certifications &&
            certifications.length &&
            certifications[0].updationDate
        ).format("ll")}{" "}
        by{" "}
        {certifications &&
          certifications.length &&
          certifications[0].updatedName}
      </div>
    </>
  );
};

const mapStateToProps = ({ certifications,librarys, auth }) => ({
  certificationRecordData:librarys.certificationRecordData,
  addingCertifications: certifications.addingCertifications,
  addingCertificationsError: certifications.addingCertificationsError,
  certifications: certifications.certifications,
  certificationId: certifications.certificationId,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
  updatingCertifications: certifications.updatingCertifications,
  updatingCertificationsError: certifications.updatingCertificationsError,
  fetchingCertifications: certifications.fetchingCertifications,
  fetchingCertificationsError: certifications.fetchingCertificationsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCertification,
      getCertificationRecords,
      addCertification,
      removeCertification,
      updateCertification,
      searchCertificationName,
      ClearReducerDataOfCertification,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Certification);
