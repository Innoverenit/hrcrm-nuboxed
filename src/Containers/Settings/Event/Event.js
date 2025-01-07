import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { base_url } from "../../../Config/Auth";
import { Tooltip } from "antd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Popconfirm, Input } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import {
  getEvents,
  getEventCount,
  addEvents,
  removeEvents,
  updateEvents,
  searchEventName,
  ClearReducerDataOfEvent,
} from "./EventAction";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MainWrapper } from "../../../Components/UI/Layout";

const Event = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [events, setEvents] = useState(props.events);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newEventName, setEventName] = useState("");

  useEffect(() => {
    props.getEvents();
    props.getEventCount(props.orgId);
  }, []);

  const editRegion = (eventTypeId, name) => {
    setEditingId(eventTypeId);
    setEventName(name);
  };

  const handleAddEvent = () => {
    setAddingRegion(true);
    setEventName("");
  };

  const handleUpdateEvent = (region) => {
    let data = {
      eventTypeId: region.eventTypeId,
      eventType: newEventName,
    };
    props.updateEvents(data, region.eventTypeId);
    setEditingId(null);
  };

  const handleEvent = () => {
    if (!newEventName.trim()) {
      console.error("Event name is mandatory. Please provide a valid name.");
      alert("Event name is mandatory. Please provide a valid name.");
      return;
    }

    let data = {
      eventType: newEventName.trim(),
      orgId: props.orgId,
    };

    props.addEvents(data, props.orgId);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());
    if (e.target.value.trim() === "") {
      props.getEvents();
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchEventName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setEventName("");
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.events.length > 0) {
      setEvents(props.events);
    }
  }, [props.events]);

  if (props.fetchingEvents) {
    return (
      <div>
        <BundleLoader />
      </div>
    );
  }

  const { userId, user } = props;

  return (
    <div>
      <div className="flex flex-row justify-end">
        <div className="flex w-[18vw] mt-7px mr-2">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="w-[2rem]">
          <a
            href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=eventType`}
          >
            <div className="circle-icon !text-base cursor-pointer text-[green]">
              <Tooltip placement="top" title="Download XL">
                <DownloadIcon />
              </Tooltip>
            </div>
          </a>
        </div>
        <div className="add-region">
          {addingRegion ? (
            <div>
              <input
                className="border-2 border-gray-500 w-[54%]"
                type="text"
                placeholder="Events"
                value={newEventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                loading={props.addingItemTask}
                onClick={handleEvent}
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
              onClick={handleAddEvent}
            >
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <MainWrapper className="!h-[65vh] !mt-2">
          {!props.fetchingEvents && events.length === 0 ? (
            <NodataFoundPage />
          ) : (
            events
              .slice()
              .sort((a, b) => a.eventType.localeCompare(b.eventType))
              .map((region, index) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                  key={region.eventTypeId}
                >
                  {editingId === region.eventTypeId ? (
                    <input
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      placeholder="Events"
                      value={newEventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  ) : (
                    <div>
                      {region.eventType}&nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") ===
                      dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">
                          New
                        </span>
                      ) : null}
                    </div>
                  )}
                  <div className="flex items-center">
                    {editingId === region.eventTypeId ? (
                      <div>
                        <button
                          className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={() => handleUpdateEvent(region)}
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
                        className="!text-icon text-red-600 cursor-pointer"
                        onClick={() =>
                          editRegion(region.eventTypeId, region.eventType)
                        }
                      />
                    )}
                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() =>
                        props.removeEvents(region.eventTypeId, props.orgId)
                      }
                    >
                      <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer" />
                    </Popconfirm>
                  </div>
                </div>
              ))
          )}
        </MainWrapper>
      </div>
      <div className="font-bold">
        Updated on{" "}
        {dayjs(
          props.events && props.events.length && props.events[0].updationDate
        ).format("YYYY-MM-DD")}{" "}
        by {props.events && props.events.length && props.events[0].name}
      </div>
    </div>
  );
};

const mapStateToProps = ({ events, auth }) => ({
  addingEvents: events.addingEvents,
  addingEventsError: events.addingEventsError,
  events: events.events,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  updatingEvents: events.updatingEvents,
  updatingEventsError: events.updatingEventsError,
  fetchingEvents: events.fetchingEvents,
  eventCount: events.eventCount,
  fetchingEventsError: events.fetchingEventsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getEvents,
      getEventCount,
      addEvents,
      removeEvents,
      updateEvents,
      ClearReducerDataOfEvent,
      searchEventName,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Event);
