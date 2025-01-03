import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Popconfirm, Input } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import { MainWrapper } from "../../../../Components/UI/Layout";
import AddIcon from "@mui/icons-material/Add";
import {
  getCategory,
  getCategoryCount,
  addCategory,
  searchCategoryName,
  ClearReducerDataOfCategory,
  removeCategory,
  updateCategory,
} from "../CategoryList/CategoryListAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

const CategoryList = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [categoryListData, setCategoryListData] = useState(props.categoryListData);
  const [editingId, setEditingId] = useState(null);
  const [addingRegion, setAddingRegion] = useState(false);
  const [newCategoryName, setCategoryName] = useState("");

  useEffect(() => {
    props.getCategory(props.orgId);
    props.getCategoryCount(props.orgId);
  }, []);

  const editRegion = (categoryId, name) => {
    setEditingId(categoryId);
    setCategoryName(name);
  };

  const handleAddCategory = () => {
    setAddingRegion(true);
    setCategoryName("");
  };

  const handleUpdateCategory = (region) => {
    if (newCategoryName.trim() === "") {
      alert("Category name cannot be empty. Please provide a value.");
      return;
    }

    let data = {
      categoryId: region.categoryId,
      name: newCategoryName,
    };
    props.updateCategory(data, region.categoryId);
    setEditingId(null);
  };

  const handleCategory = () => {
    if (newCategoryName.trim() === "") {
      alert("Category name cannot be empty. Please provide a value.");
      return;
    }

    let data = {
      name: newCategoryName,
      orgId: props.orgId,
    };
    props.addCategory(data, props.orgId);
    setAddingRegion(false);
  };

  const handleChange = (e) => {
    setCurrentData(e.target.value.trim());

    if (e.target.value.trim() === "") {
      props.getCategory(props.orgId);
    }
  };

  const handleSearch = () => {
    if (currentData.trim() !== "") {
      props.searchCategoryName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

  const handleCancelAdd = () => {
    setCategoryName("");
    setAddingRegion(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  useEffect(() => {
    if (props.categoryListData.length > 0) {
      setCategoryListData(props.categoryListData);
    }
  }, [props.categoryListData]);

  if (props.fetchingCategory) {
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

        <div className="add-region">
          {addingRegion ? (
            <div>
              <input
                className="border-2 border-gray mr-1 ml-1 w-[53%]"
                type="text"
                placeholder="Add Category"
                value={newCategoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <button
                className={`bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1 ${
                  newCategoryName.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={newCategoryName.trim() === ""}
                onClick={handleCategory}
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
              onClick={handleAddCategory}
            >
              <AddIcon className="!text-icon" /> Add
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <MainWrapper className="!h-[69vh] !mt-2">
          {!props.fetchingCategory && categoryListData.length === 0 ? (
            <NodataFoundPage />
          ) : (
            categoryListData
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((region) => (
                <div
                  key={region.categoryId}
                  className="flex rounded ml-1 font-bold border-[#0000001f] border shadow-[#a3abb980] bg-white text-[#444] mt-1 p-2 justify-between items-center h-8 scale-[0.99] hover:scale-100 ease-in duration-100 shadow border-solid m-1 leading-3 hover:border hover:border-[#23A0BE] hover:shadow-[#23A0BE]"
                >
                  {editingId === region.categoryId ? (
                    <input
                      placeholder="Update Category"
                      className="border-2 border-gray mr-1 ml-1"
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  ) : (
                    <div className="region">
                      {region.name}&nbsp;&nbsp;&nbsp;
                      {dayjs(region.creationDate).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") && (
                        <span className="text-xs text-[tomato] font-bold">New</span>
                      )}
                    </div>
                  )}

                  <div className="actions">
                    {editingId === region.categoryId ? (
                      <div>
                        <button
                          className="bg-green-400 text-white border-none p-2.5 rounded-md ml-1 mr-1"
                          onClick={() => handleUpdateCategory(region)}
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
                        onClick={() => editRegion(region.categoryId, region.name)}
                      />
                    )}

                    <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => props.removeCategory(region.categoryId, props.orgId)}
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
        {dayjs(props.categoryListData && props.categoryListData.length && props.categoryListData[0].updationDate).format(
          "YYYY-MM-DD"
        )}{" "}
        by {props.categoryListData && props.categoryListData.length && props.categoryListData[0].updatedBy}
      </div>
    </div>
  );
};

const mapStateToProps = ({ categoryList, auth }) => ({
  addingCategory: categoryList.addingCategory,
  addingCategoryError: categoryList.addingCategoryError,
  categoryListData: categoryList.categoryListData,
  categoryCount: categoryList.categoryCount,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  removingCategory: categoryList.removingCategory,
  removingCategoryError: categoryList.removingCategoryError,
  fetchingCategory: categoryList.fetchingCategory,
  fetchingCategoryError: categoryList.fetchingCategoryError,
  updatingCategory: categoryList.updatingCategory,
  updatingCategoryError: categoryList.updatingCategoryError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCategory,
      getCategoryCount,
      ClearReducerDataOfCategory,
      searchCategoryName,
      addCategory,
      removeCategory,
      updateCategory,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
