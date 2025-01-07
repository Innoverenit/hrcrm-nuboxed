import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Popconfirm, message, Input } from "antd";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import AddIcon from '@mui/icons-material/Add';
import {
  getFeedback,
  addFeedBack,
  removeFeedBack,
  updateFeedBack,
  getFeedBackCount,
} from "../../SettingsAction";
import dayjs from "dayjs";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const FeedBack = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [feedBack, setfeedBack] = useState(props.feedBackList);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newDescriptionName, setDescriptionName] = useState("");
  const [newCodeName, setCodeName] = useState("");

  useEffect(() => {
    props.getFeedback();
    props.getFeedBackCount();
  }, []);

  const editRegion = (feedbackId, name, description) => {
    setEditingId(feedbackId);
    setCodeName(name);
    setDescriptionName(description);
  };

  const handleaddFeedBack = () => {
    setAddingRegion(true);
    setCodeName("");
    setDescriptionName("");
  };

  const handleupdateFeedBack = (region) => {
    if (!newCodeName.trim() || !newDescriptionName.trim()) {
      message.error("Name and Description are required fields.");
      return;
    }
    let data = {
      feedbackId: region.feedbackId,
      name: newCodeName,
      description: newDescriptionName,
    };
    props.updateFeedBack(data, region.feedbackId);
    setEditingId(null);
  };

  const handleQuality = () => {
    if (!newCodeName.trim() || !newDescriptionName.trim()) {
      message.error("Name and Description are required fields.");
      return;
    }
    let data = {
      name: newCodeName,
      description: newDescriptionName,
      orgId: props.orgId,
    };
    props.addFeedBack(data);
    setAddingRegion(false);
  };

  const handleCancelAdd = () => {
    setCodeName("");
    setDescriptionName("");
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.feedBackList.length > 0) {
      setfeedBack(props.feedBackList);
    }
  }, [props.feedBackList]);

  if (props.fetchingFeedback) {
    return (
      <div>
        <BundleLoader />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex flex-row justify-end items-center">
          <div className="add-region">
            {addingRegion ? (
              <div>
                <input
                className="border-2 border-gray mr-1 ml-1"
                  placeholder="Name"
                  type="text"
                  value={newCodeName}
                  onChange={(e) => setCodeName(e.target.value)}
                />
                <input
                className="border-2 border-gray mr-1 ml-1"
                  placeholder="Description"
                  type="text"
                  value={newDescriptionName}
                  onChange={(e) => setDescriptionName(e.target.value)}
                />
                <button
                  className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                  onClick={handleQuality}
                >
                  Save
                </button>
                <button
                  className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                  onClick={handleCancelAdd}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                style={{ backgroundColor: "tomato", color: "white" }}
                onClick={handleaddFeedBack}
              >
                <AddIcon className="!text-icon" /> Add 
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <MainWrapper className="!h-[69vh] !mt-2">
            {!props.fetchingFeedback && feedBack.length === 0 ? (
              <NodataFoundPage />
            ) : (
              feedBack
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((region) => (
                  <div
                    className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                    key={region.feedbackId}
                  >
                    {editingId === region.feedbackId ? (
                      <input
                        className="border-2 border-gray mr-1 ml-1"
                        type="text"
                        placeholder="Name"
                        value={newCodeName}
                        onChange={(e) => setCodeName(e.target.value)}
                      />
                    ) : (
                      <div style={{ width: "29rem" }}>
                        {region.name}&nbsp;&nbsp;&nbsp;
                        {dayjs(region.creationDate).format("DD/MM/YYYY") ===
                        dayjs().format("DD/MM/YYYY") ? (
                          <span className="text-xs text-[tomato] font-bold">
                            New
                          </span>
                        ) : null}
                      </div>
                    )}
                    {editingId === region.feedbackId ? (
                      <input
                        className="border-2 border-gray mr-1 ml-1"
                        type="text"
                        placeholder="Description"
                        value={newDescriptionName}
                        onChange={(e) => setDescriptionName(e.target.value)}
                      />
                    ) : (
                      <div style={{ width: "39rem" }}>
                        {region.description}
                      </div>
                    )}
                    <div className="flex flex-row">
                      {editingId === region.feedbackId ? (
                        <div>
                          <button
                            className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1" 
                            onClick={() => handleupdateFeedBack(region)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-red-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <BorderColorIcon
                          style={{ fontSize: "1rem", cursor: "pointer" }}
                          onClick={() =>
                            editRegion(
                              region.feedbackId,
                              region.name,
                              region.description
                            )
                          }
                        />
                      )}
                      <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => props.removeFeedBack(region.feedbackId)}
                      >
                        <DeleteOutlineIcon
                          className="!text-icon text-[tomato] cursor-pointer text-center"
                        />
                      </Popconfirm>
                    </div>
                  </div>
                ))
            )}
          </MainWrapper>
        </div>
      </div>
      <div className="font-bold">
        Updated on{" "}
        {dayjs(
          props.feedBackList &&
            props.feedBackList.length &&
            props.feedBackList[0].updationDate
        ).format("YYYY-MM-DD")}{" "}
        by{" "}
        {props.feedBackList &&
          props.feedBackList.length &&
          props.feedBackList[0].updatedBy}
      </div>
    </>
  );
};

const mapStateToProps = ({ auth, settings }) => ({
  addingFeedBack: settings.addingFeedBack,
  addingFeedBackError: settings.addingFeedBackError,
  feedBackList: settings.feedBackList,
  feedBackCount: settings.feedBackCount,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  fetchingFeedback: settings.fetchingFeedback,
  fetchingFeedbackError: settings.fetchingFeedbackError,
  updatingFeedBack: settings.updatingFeedBack,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getFeedback,
      addFeedBack,
      removeFeedBack,
      updateFeedBack,
      getFeedBackCount,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
