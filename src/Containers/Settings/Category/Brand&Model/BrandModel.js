import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input } from "antd";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { BundleLoader } from "../../../../Components/Placeholder";
import {
  getBrandModel,
  addBrandModel,
} from "./BrandModelAction";
import dayjs from "dayjs";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const BrandModel = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [brandModel, setBrandModelData] = useState(props.brandModel);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);

  const [newModelName, setModelName] = useState("");
  const [newBrandModelName, setBrandModelName] = useState("");
  const [brandError, setBrandError] = useState("");
  const [modelError, setModelError] = useState("");

  useEffect(() => {
    props.getBrandModel(props.orgId);
  }, []);

  const editRegion = (phoneMasterListId, name) => {
    setEditingId(phoneMasterListId);
    setBrandModelName(name.brand);
    setModelName(name.model);
  };

  const handleAddBrandModel = () => {
    setAddingRegion(true);
    setBrandModelName("");
    setModelName("");
  };

  const handleUpdateBrandModel = (region) => {
    let isValid = true;

    if (!newBrandModelName.trim()) {
      setBrandError("Brand name is required.");
      isValid = false;
    } else {
      setBrandError("");
    }

    if (!newModelName.trim()) {
      setModelError("Model name is required.");
      isValid = false;
    } else {
      setModelError("");
    }

    if (!isValid) return;

    const data = {
      phoneMasterListId: region.phoneMasterListId,
      brand: newBrandModelName,
      model: newModelName,
    };
    props.updateShipBy(data, region.phoneMasterListId);
    setEditingId(null);
  };

  const handleBrandModel = () => {
    let isValid = true;

    if (!newBrandModelName.trim()) {
      setBrandError("Brand name is required.");
      isValid = false;
    } else {
      setBrandError("");
    }

    if (!newModelName.trim()) {
      setModelError("Model name is required.");
      isValid = false;
    } else {
      setModelError("");
    }

    if (!isValid) return;

    const data = {
      brand: newBrandModelName,
      model: newModelName,
      orgId: props.orgId,
    };
    props.addBrandModel(data, props.orgId);
    setAddingRegion(false);
    setBrandModelName("");
    setModelName("");
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getShipByData(props.orgId);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchShipByName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setBrandModelName("");
    setModelName("");
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.brandModel.length > 0) {
      setBrandModelData(props.brandModel);
    }
  }, [props.brandModel]);

  if (props.fetchingBrandModel) {
    return <div><BundleLoader /></div>;
  }

  return (
    <>
      <div>
        <div className="flex flex-row justify-end items-center">
          <div className="flex w-[18vw] mt-1 mr-3">
            <Input
              placeholder="Search by Name"
              style={{ width: "100%", marginLeft: "0.5rem" }}
              onPressEnter={handleSearch}
              onChange={handleChange}
            />
          </div>
          <div className="add-region">
            {addingRegion ? (
              <div>
                <input
                  style={{
                    border: brandError ? "2px solid red" : "2px solid black",
                  }}
                  type="text"
                  placeholder="Brand"
                  value={newBrandModelName}
                  onChange={(e) => {
                    setBrandModelName(e.target.value);
                    if (brandError) setBrandError(""); // Clear error on typing.
                  }}
                />
                {brandError && <div style={{ color: "red", marginTop: "5px" }}>{brandError}</div>}

                <input
                  style={{
                    border: modelError ? "2px solid red" : "2px solid black",
                  }}
                  type="text"
                  placeholder="Model"
                  value={newModelName}
                  onChange={(e) => {
                    setModelName(e.target.value);
                    if (modelError) setModelError(""); // Clear error on typing.
                  }}
                />
                {modelError && <div style={{ color: "red", marginTop: "5px" }}>{modelError}</div>}

                <button
                  onClick={handleBrandModel}
                  disabled={!newBrandModelName.trim() || !newModelName.trim()}
                >
                  Save
                </button>
                <button onClick={handleCancelAdd}>Cancel</button>
              </div>
            ) : (
              <button
                style={{ backgroundColor: "tomato", color: "white" }}
                onClick={handleAddBrandModel}
              >
                Add More
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <MainWrapper className="!h-[69vh] !mt-2">
            {!props.fetchingBrandModel && brandModel.length === 0 ? (
              <NodataFoundPage />
            ) : (
              brandModel.map((region, index) => (
                <div
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                  key={region.phoneMasterListId}
                >
                  {editingId === region.phoneMasterListId ? (
                    <input
                      style={{ border: "2px solid black" }}
                      type="text"
                      value={newBrandModelName}
                      onChange={(e) => setBrandModelName(e.target.value)}
                    />
                  ) : (
                    <div>{region.brand}</div>
                  )}
                  {editingId === region.phoneMasterListId ? (
                    <input
                      style={{ border: "2px solid black" }}
                      type="text"
                      value={newModelName}
                      onChange={(e) => setModelName(e.target.value)}
                    />
                  ) : (
                    <div style={{ width: "39rem" }}>
                      {region.model}
                      &nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") ? (
                        <span className="text-xs text-[tomato] font-bold">New</span>
                      ) : null}
                    </div>
                  )}
                </div>
              ))
            )}
          </MainWrapper>
        </div>
        <div className="font-bold">
          Updated on {dayjs(props.brandModel?.[0]?.updationDate).format("YYYY-MM-DD")} by {props.brandModel?.[0]?.updatedBy}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ brandmodel, auth }) => ({
  addingBrandModel: brandmodel.addingBrandModel,
  addingBrandModelError: brandmodel.addingBrandModelError,
  brandModel: brandmodel.brandModel,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  fetchingBrandModel: brandmodel.fetchingBrandModel,
  fetchingBrandModelError: brandmodel.fetchingBrandModelError,
  updatingBrandModel: brandmodel.updatingBrandModel,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBrandModel,
      addBrandModel,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BrandModel);
