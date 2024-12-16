import React, { useState, useEffect, useRef,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Tooltip,
  Button,
  Input,
  Popconfirm
} from "antd";
import {
  getExperienceByCandidateId,
  updateExperienceByCandidateId
} from "../../../../../CandidateAction";
import dayjs from "dayjs";

const ExperienceTable = (props) => {
  const [isEditingName, setIsEditingName] = useState(null); // Tracks the currently editing skill name
  const [nameInput, setNameInput] = useState("");
  const [isEditingExperience, setIsEditingExperience] = useState(null); // Tracks the currently editing experience
  const [experienceInput, setExperienceInput] = useState("");

  useEffect(() => {
    props.getExperienceByCandidateId(props.candidateId);
  }, []);

  const handleUpdate = (type, value, skillSetDetailsId) => {
    const updatedPayload = {
      skillSetDetailsId,
      [type]: value, // Update either skillName or experience dynamically
    };

    props.updateExperienceByCandidateId(updatedPayload, skillSetDetailsId);

    // Reset editing states
    if (type === "skillName") setIsEditingName(null);
    if (type === "experience") setIsEditingExperience(null);
  };

  return (
    <div className="rounded m-1 p-1 w-[100%]">
      <div className="flex justify-between w-[100%] p-1 sticky font-bold font-poppins items-end z-10">
        <div className="text-[#00A2E8] truncate w-[10.8rem] text-sm">Skill</div>
        <div className="w-[15.2rem] truncate">Experience (in Years)</div>
        <div className="w-[15.4rem] truncate">Level</div>
      </div>

      <div className="flex flex-col">
        {props.skillExperince.map((item) => (
          <div
            key={item.skillSetDetailsId}
            className="flex rounded justify-between bg-white mt-1 items-center shadow border-solid leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
          >
            {/* Skill Name */}
            <div className="flex w-[12.3rem] items-center justify-start h-8 bg-[#eef2f9]">
              {isEditingName === item.skillSetDetailsId ? (
                <input
                  type="text"
                  className="h-7 w-[6rem] text-sm"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleUpdate("skillName", nameInput, item.skillSetDetailsId)
                  }
                  onBlur={() => handleUpdate("skillName", nameInput, item.skillSetDetailsId)}
                  autoFocus
                  onClick={(e) => e.stopPropagation()} // Prevent input from losing focus due to parent click
                />
              ) : (
                <div
                  onClick={() => {
                    setIsEditingName(item.skillSetDetailsId);
                    setNameInput(item.skillName || ""); // Pre-fill input with the current skill name
                  }}
                  className="cursor-pointer text-sm"
                >
                  {item.skillName || "Enter Name"}
                </div>
              )}
            </div>

            {/* Experience */}
            <div className="flex w-[12.4rem] items-center justify-center h-8 bg-[#eef2f9]">
              {isEditingExperience === item.skillSetDetailsId ? (
                <input
                  type="text"
                  className="h-7 w-[6rem] text-sm"
                  value={experienceInput}
                  onChange={(e) => setExperienceInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    handleUpdate("experience", experienceInput, item.skillSetDetailsId)
                  }
                  onBlur={() => handleUpdate("experience", experienceInput, item.skillSetDetailsId)}
                  autoFocus
                  onClick={(e) => e.stopPropagation()} // Prevent input from losing focus due to parent click
                />
              ) : (
                <div
                  onClick={() => {
                    setIsEditingExperience(item.skillSetDetailsId);
                    setExperienceInput(item.experience || ""); // Pre-fill input with the current experience
                  }}
                  className="cursor-pointer text-sm"
                >
                  {item.experience || "Enter Desc"}
                </div>
              )}
            </div>

            {/* Skill ID */}
            <div className="flex w-[12.1rem] items-center justify-start h-8 bg-[#eef2f9]">
              <div className="truncate text-xs">{item.skillSetDetailsId}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



const mapStateToProps = ({ candidate,auth}) => ({
  skillName:candidate.candidateId,
  experience:candidate.candidateId,
   skillExperince:candidate.skillExperince,
   candidateId: candidate.candidate.candidateId,
   fetchingSkillExperince:candidate.fetchingSkillExperince,
   fetchingSkillExperinceError:candidate.fetchingSkillExperinceError,
   topicsByCandidateId:candidate.topicsByCandidateId
});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getExperienceByCandidateId,
    updateExperienceByCandidateId
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceTable);
