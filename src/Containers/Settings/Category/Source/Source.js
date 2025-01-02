import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { base_url } from "../../../../Config/Auth";
import DownloadIcon from '@mui/icons-material/Download';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Popconfirm, Tooltip, Input, message } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import {
  getSources,
  getSourceCount,
  searchSourceName,
  ClearReducerDataOfSource,
  addSources,
  removeSource,
  updateSource
} from "./SourceAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const SingleSource = lazy(() => import("./SingleSource"));

const Source = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [sources, setSourceData] = useState(props.sources);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newSourceName, setSourceName] = useState('');

  useEffect(() => {
    props.getSources(props.orgId);
    props.getSourceCount(props.orgId);
  }, []);

  const editRegion = (sourceId, name) => {
    setEditingId(sourceId);
    setSourceName(name);
  };

  const handleAddSource = () => {
    setAddingRegion(true);
    setSourceName("");
  };

  const handleUpdateSource = (region) => {
    let data = {
      sourceId: region.sourceId,
      name: newSourceName,
    };
    props.updateSource(data, region.sourceId);
    setEditingId(null);
  };

  const handleSource = () => {
    if (newSourceName.trim() === '') {
      message.error("Empty Add Source");
      return;
    }

    let data = {
      name: newSourceName,
      orgId: props.orgId,
    };
    props.addSources(data, props.orgId);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());
    if (e.target.value.trim() === "") {
      props.getSources(props.orgId);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchSourceName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setSourceName('');
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.sources.length > 0) {
      setSourceData(props.sources);
    }
  }, [props.sources]);

  if (props.fetchingSources) {
    return <div><BundleLoader /></div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-end items-center">
        <div className="flex w-[18vw] mt-[7px] mr-2">
          <Input
            placeholder="Search by Name"
            style={{ width: "100%", marginLeft: "0.5rem" }}
            onPressEnter={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="w-[2rem]">
          <a href={`${base_url}/excel/export/catagory/All/${props.orgId}?type=source`}>
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
                className="border-2 border-gray mr-1 ml-1"
                type="text"
                placeholder="Add Source"
                value={newSourceName}
                onChange={(e) => setSourceName(e.target.value)}
              />
              <button
                className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                onClick={handleSource}
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
              type="Primary"
              style={{ backgroundColor: "tomato", color: "white" }}
              onClick={handleAddSource}
            >
              <DataSaverOnIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingSources && sources.length === 0 ? (
            <NodataFoundPage />
          ) : (
            sources.slice().sort((a, b) => a.name.localeCompare(b.name)).map((region) => (
              <div
                className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                key={region.sourceId}
              >
                {editingId === region.sourceId ? (
                  <input
                    style={{ border: "2px solid black" }}
                    type="text"
                    placeholder="Update Source"
                    value={newSourceName}
                    onChange={(e) => setSourceName(e.target.value)}
                  />
                ) : (
                  <div>
                    {region.name}&nbsp;&nbsp;&nbsp;
                    {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") && (
                      <span className="text-xs text-[tomato] font-bold">New</span>
                    )}
                  </div>
                )}
                <div>
                  {editingId === region.sourceId ? (
                    <div>
                      <button
                        className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                        onClick={() => handleUpdateSource(region)}
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
                      onClick={() => editRegion(region.sourceId, region.name)}
                    />
                  )}
                  <Popconfirm
                    title="Do you want to delete?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => props.removeSource(region.sourceId, props.orgId)}
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
        Updated on {dayjs(props.sources && props.sources.length && props.sources[0].updationDate).format('YYYY-MM-DD')} by{" "}
        {props.sources && props.sources.length && props.sources[0].updatedBy}
      </div>
    </div>
  );
};

const mapStateToProps = ({ source, auth }) => ({
  addingSources: source.addingSources,
  addingSourcesError: source.addingSourcesError,
  sources: source.sources,
  sourceCount: source.sourceCount,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  removingSources: source.removingSources,
  removingSourcesError: source.removingSourcesError,
  fetchingSources: source.fetchingSources,
  fetchingSourcesError: source.fetchingSourcesError,
  updatingSources: source.updatingSources,
  updatingSourcesError: source.updatingSourcesError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSources,
      getSourceCount,
      addSources,
      removeSource,
      updateSource,
      ClearReducerDataOfSource,
      searchSourceName,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Source);
