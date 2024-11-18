import React, { useState, useEffect, lazy } from "react";

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { linkTypeToggle, removeDocuments } from "../DocumentsAction";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import { Button, Tooltip, Select, Popconfirm } from "antd";
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";

const DocumentStatusToggle = lazy(() =>
  import("./DocumentStatusToggle")
);

const SingleDocuments = ({
  document,
  handleChange,
  name,
  value,
  linkTypeToggle,
  removeDocuments,
  handleUpdateDocument,
  handleDeleteDocument
}) => {
  const [type, setType] = useState("");
  const { documentTypeName, creationDate, editInd, mandatoryInd, userType, documentTypeId } = document;

  const handleStageType = (value) => {
    setType(value);
    let data = {
      userType: value,
      documentTypeId: documentTypeId,
    }
    linkTypeToggle(data);
  }

  const currentdate = dayjs().format("DD/MM/YYYY");
  const date = dayjs(creationDate).format("DD/MM/YYYY");

  return (
    <div className="w-full cursor-pointer">
      <ViewEditCard>
        {({ viewType }, toggleViewType) => (
          viewType === "view" ? (
            <div>
              <div className="flex">
                <div className="w-60">
                  <div className="font-semibold">
                    {documentTypeName}&nbsp;&nbsp;&nbsp;
                    {date === currentdate &&
                      <span className="text-xs text-[tomato] font-bold">
                        New
                      </span>
                    }
                  </div>
                </div>
                <div className="flex justify-between w-96">
                  <div className="w-[8rem]">
                    <Select
                      style={{ width: "100%" }}
                      onChange={handleStageType}
                      value={userType}
                      placeholder="Select Entity"
                    >
                      <option value="User">User</option>
                      <option value="Customer">Customer</option>
                      <option value="Supplier">Supplier</option>
                    </Select>
                  </div>
                  <div>
                    <DocumentStatusToggle
                      editInd={editInd}
                      mandatoryInd={mandatoryInd}
                      documentTypeName={documentTypeName}
                      documentTypeId={documentTypeId}
                    />
                  </div>
                  <div>
                    {editInd && !mandatoryInd && (
                      <BorderColorIcon
                        tooltipTitle="Edit"
                        iconType="edit"
                        onClick={toggleViewType}
                        style={{ fontSize: "1rem" }}
                      />
                    )}
                    {editInd && !mandatoryInd && (
                      <Tooltip title="Delete">
                        <Popconfirm
                          title="Do you want to delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => removeDocuments(documentTypeId)}
                        >
                          <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                        </Popconfirm>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex">
              <TextInput
                name={name}
                defaultValue={documentTypeName}
                onChange={handleChange}
                style={{ width: "60%" }}
              />
              <div className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  // loading={props.updatingDocuments}
                  disabled={!value}
                  onClick={() => handleUpdateDocument(documentTypeId, value, toggleViewType())}
                >
               Update
                </Button>
                <Button type="cancel" onClick={() => toggleViewType()}>
               Cancel
                </Button>
              </div>
            </div>
          )
        )}
      </ViewEditCard>
    </div>
  );
}

const mapStateToProps = ({ document }) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkTypeToggle,
      removeDocuments
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SingleDocuments);
