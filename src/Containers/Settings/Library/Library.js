import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Input } from "antd";
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, {
} from "react-speech-recognition";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import {
  getLibrarys,
  getLibraryRecords,
  addLibrarys,
  removeSkills,
  updateLibrarys,
  searchLibraryName,
  ClearReducerDataOfLibrary,
} from "./LibraryAction";
const SingleLibrary = lazy(() => import("./SingleLibrary"));

const Library = ({
  getLibrarys,
  getLibraryRecords,
  addLibrarys,
  removeSkills,
  updateLibrarys,
  searchLibraryName,
  ClearReducerDataOfLibrary,
  fetchingLibrarys,
  fetchingLibrarysError,
  librarys,
  addingLibrarys,
  updatingLibrarys,
  userId,
  orgId,
  organizationId,
}) => {
  const [linkedLibrarys, setLinkedLibrarys] = useState([]);
  const [isTextInputOpen, setIsTextInputOpen] = useState(false);
  const [name, setName] = useState("");
  const [singleLibrary, setSingleLibrary] = useState("");
  const [editInd, setEditInd] = useState(true);
  const [currentData, setCurrentData] = useState("");

  const handleChangeDes = (e) => {
    setCurrentData(e.target.value);

    if (e.target.value.trim() === "") {
      // Assuming you have pageNo in the state
      // setPageNo((prevPageNo) => prevPageNo + 1);
      getLibrarys(organizationId);
      ClearReducerDataOfLibrary();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      searchLibraryName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleClear = () => {
    setCurrentData("");
    getLibrarys(organizationId);
  };

  const handleSearchChange = (e) => {
    setCurrentData(e.target.value);
  };

  const toggleInput = () => setIsTextInputOpen((prev) => !prev);

  const handleChange = (e) => setName(e.target.value);

  const handleAddLibrary = () => {
    let library = { name, editInd, userId, orgId: organizationId };

    let exist =
      librarys &&
      librarys.some((element) => element.name === name);

    addLibrarys(library, () => console.log("add library callback"));

    setName("");
    setSingleLibrary("");
    setIsTextInputOpen(false);
    setEditInd(true);
  };

  const handleUpdateLibrary = (name, definationId, cb) => {
    updateLibrarys(name, definationId, cb);
    setName("");
    setSingleLibrary("");
  };

  const handleDeleteSkill = (definationId) => {
    removeSkills(definationId);
    setName("");
    setSingleLibrary("");
  };

  useEffect(() => {
    getLibrarys(organizationId);
    getLibraryRecords(orgId);
  }, [getLibrarys,getLibraryRecords, organizationId,orgId]);

  if (fetchingLibrarys) return <p>Loading ...</p>;
  if (fetchingLibrarysError) return <p>Error ...</p>;

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
                onChange={handleChange}
                width="61%"
                style={{ marginRight: "0.125em" }}
              />
         
              <Button
                type="primary"
                htmlType="submit"
                disabled={!name}
                loading={addingLibrarys}
                onClick={handleAddLibrary}
                style={{ marginRight: "0.125em" }}
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
              <br />
              <div className="flex justify-end">
                <Button
                  type="primary"
                  ghost
                  htmlType="button"
                  loading={addingLibrarys}
                  onClick={toggleInput}
                >
                  Add Skill
                </Button>
              </div>
            </>
          )}
          </div>
          <div className="flex flex-col">
            <div>

              {librarys.length ? (
                librarys
                  .slice()
                  .sort((a, b) => {
                    const nameA = (a.name || '').toString();
                    const nameB = (b.name || '').toString();
                    return nameA.localeCompare(nameB);
                  })
                  .map((library, i) => (
                    <SingleLibrary
                      key={i}
                      value={singleLibrary}
                      data="singleLibrary"
                      library={library}
                      linkedLibrarys={linkedLibrarys}
                      updatingLibrarys={updatingLibrarys}
                      handleChange={handleChange}
                      handleDeleteSkill={handleDeleteSkill}
                      handleUpdateLibrary={handleUpdateLibrary}
                      handleClear={handleClear}
                      handleSearchChange={handleSearchChange}
                      currentData={currentData}
                      setCurrentData={setCurrentData}
                    />
                  ))
              ) : (
                <p>None Available</p>
              )}
            {/* </MainWrapper> */}</div>
          </div>
        </MainWrapper>
      </div>
      <div>
        Updated on{" "}
        {dayjs(
          librarys && librarys.length && librarys[0].updationDate
        ).format("ll")}{" "}
        by {librarys && librarys.length && librarys[0].updatedName}
      </div>
    </>
  );
};

const mapStateToProps = ({ librarys, auth }) => ({
  addingLibrarys: librarys.addingLibrarys,
  addingLibrarysError: librarys.addingLibrarysError,
  librarys: librarys.librarys,
  updatingLibrarys: librarys.updatingLibrarys,
  updatingLibrarysError: librarys.updatingLibrarysError,
  fetchingLibrarys: librarys.fetchingLibrarys,
  fetchingLibrarysError: librarys.fetchingLibrarysError,
  userId: auth.userDetails.userId,
  libraryRecordData:librarys.libraryRecordData,
  orgId: auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLibrarys,
      getLibraryRecords,
      addLibrarys,
      removeSkills,
      updateLibrarys,
      ClearReducerDataOfLibrary,
      searchLibraryName,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Library);







