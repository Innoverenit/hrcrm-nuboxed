import React, { useState, useEffect, useRef, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Tooltip, Popconfirm } from "antd";
import { MultiAvatar } from "../../../../../../../Components/UI/Elements";
import {
  getSupplierDocument,
  deleteErpDocument,
  getErpDocumentCount,
  updateErpDocument,
} from "../../../../SuppliersAction";
import dayjs from "dayjs";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import GavelIcon from "@mui/icons-material/Gavel";
import { base_url2 } from "../../../../../../../Config/Auth";
import ContractErpToggle from "./ContractErpToggle";
import EmptyPage from "../../../../../EmptyPage";
import { elipsize } from "../../../../../../../Helpers/Function/Functions";
const SupplierDocumentTable = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isEditingName, setIsEditingName] = useState(null);
  const [nameInput, setnameInput] = useState();
  const [isDescVisible, setIsDescVisible] = useState(null);
  const [descType, setDescType] = useState();

  useEffect(() => {
    props.getSupplierDocument(props.uniqueId, props.type);
    props.getErpDocumentCount(props.uniqueId, props.type);
  }, []);

  const handleUpdateName = (documentId) => {
    const updatedName = {
      documentTitle: nameInput,
    };
    props.updateErpDocument(updatedName, documentId);
    setIsEditingName(null);
  };

  const handleDescChange = (documentId) => {
    const updatedPayload = {
      documentDescription: descType,
    };

    props.updateErpDocument(updatedPayload, documentId);
    setIsDescVisible(null);
  };

  const {
    documentsBySupplierId,
    fetchingdocumentsBySupplierId,
    fetchingdocumentsBySupplierIdError,
    deleteErpDocument,
  } = props;

  if (fetchingdocumentsBySupplierId) {
    return <BundleLoader />;
  }
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      <div class="rounded m-1 p-1 w-[100%]  ">
        <div className=" flex justify-between w-[100%]  p-1 sticky font-bold font-poppins !text-lm items-end z-10">
          <div className=" text-[#00A2E8] truncate w-[10rem] text-sm max-md:w-[10rem]">
            <DateRangeIcon className="!text-icon  " />{" "}
            {props.translatedMenuItems[65]}
          </div>
          {/* Date */}
          <div className=" w-[11.2rem] truncate max-md:w-[11.2rem]">
            <ArticleIcon className="!text-icon mr-1 text-[#a379c9] " />
            {props.translatedMenuItems[122]}
          </div>
          {/* Name */}
          <div className=" w-[12.4rem] truncate max-md:w-[12.13rem]">
            <DescriptionIcon className="!text-icon text-[#9ad5ca] " />{" "}
            {props.translatedMenuItems[145]}
          </div>

          <div className=" w-[19.7rem] truncate max-md:w-[19.7rem]">
            <AccountCircleIcon className="!text-icon  text-[#f28482]" />{" "}
            {props.translatedMenuItems[159]}
          </div>

          <div className=" w-[16.2rem] truncate max-md:w-[16.2rem]">
            <FileOpenIcon className="!text-icon text-[#7fb800] " />{" "}
            {props.translatedMenuItems[160]}
          </div>
          {/* fileName */}

          <div className=" w-[7.5rem] truncate max-md:w-[7.5rem]">
            <GavelIcon className="!text-icon text-[red] " />{" "}
            {props.translatedMenuItems[161]}
          </div>
          {/* Contract */}
        </div>
        {!fetchingdocumentsBySupplierId &&
        documentsBySupplierId.length === 0 ? (
          <EmptyPage className=" overflow-hidden" />
        ) : (
          documentsBySupplierId.map((item, index) => {
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");

            return (
              <div>
                <div className="flex rounded justify-between  bg-white mt-1  items-center  max-sm:h-[9.1rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                  <div className=" flex w-[11rem] maax-md:w-[11rem] h-8 border-l-2 border-green-500 bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
                    <div className="flex  items-center">
                      <div class="">
                        <Tooltip>
                          <div class=" flex  justify-between flex-row md:flex-col w-[8rem]">
                            <div class="flex text-xs ml-gap items-center   font-poppins   cursor-pointer">
                              <span>{` ${dayjs(item.creationDate).format(
                                "DD/MM/YYYY"
                              )}`}</span>
                            </div>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div className=" flex w-[13.3rem] max-md:w-[12.3rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                      <div class="flex text-xs ml-gap items-center  font-poppins">
                        {isEditingName === item.documentId ? (
                          <input
                            type="text"
                            className="h-7 w-[4rem] text-sm"
                            value={nameInput}
                            onChange={(e) => setnameInput(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleUpdateName(item.documentId)
                            }
                            onBlur={() => handleUpdateName(item.documentId)}
                            autoFocus
                          />
                        ) : (
                          <div
                            onClick={() => {
                              setIsEditingName(item.documentId);
                              setnameInput(item.documentTitle);
                            }}
                            className="cursor-pointer text-sm font-[Poppins]"
                          >
                            {item.documentTitle || "Enter Name"}
                          </div>
                        )}
                        &nbsp;&nbsp;
                        {date === currentdate ? (
                          <span class="text-xs text-[tomato] font-bold">
                            {props.translatedMenuItems[27]}
                            {/* New */}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className=" flex w-[13.4rem]  max-md:w-[13.4rem] items-center justify-center h-8 ml-gap bg-[#eef2f9]  max-sm:flex-row  max-sm:justify-between">
                      <div class="text-xs  font-poppins">
                        {isDescVisible === item.documentId ? (
                          <textarea
                            type="text"
                            className="h-7 w-[4rem] text-sm"
                            value={descType}
                            onChange={(e) => setDescType(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleDescChange(item.documentId)
                            }
                            onBlur={() => handleDescChange(item.documentId)}
                            autoFocus
                          />
                        ) : (
                          <div
                            onClick={() => {
                              setIsDescVisible(item.documentId);
                              setDescType(item.documentDescription);
                            }}
                            className="cursor-pointer text-sm font-[Poppins]"
                          >
                            {elipsize(item.documentDescription || "", 15) ||
                              "Enter Desc"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex  w-[21.1rem] max-md:w-[21.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                    <div className="text-xs  font-poppins text-center">
                      <div className="font-normal text-xs font-poppins">
                        <Tooltip title={item.uploadedBy}>
                          <div>
                            <MultiAvatar
                              primaryTitle={item.uploadedBy}
                              imgWidth={"1.8rem"}
                              imgHeight={"1.8rem"}
                            />
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className=" flex w-[17.1rem]  max-md:w-[17.1rem] items-center justify-start h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                    <div class="flex text-xs truncate ml-gap items-center font-poppins text-center">
                      {item.fileName}
                    </div>
                  </div>
                  <div className=" flex w-[5.22rem]  max-md:w-[5.22rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between ">
                    <div class=" text-xs  font-poppins text-center">
                      <ContractErpToggle
                        contractInd={item.contractInd}
                        documentId={item.documentId}
                      />
                    </div>
                  </div>

                  <div class="flex items-center justify-center h-8 bg-[#eef2f9]">
                    <a
                      href={`${base_url2}/document/${item.documentId}`}
                      // target="_blank"
                    >
                      {" "}
                      <Tooltip title={props.translatedMenuItems[162]}>
                        <DownloadIcon className="cursor-pointer !text-icon" />
                      </Tooltip>
                    </a>
                  </div>
                  <div class="flex items-center justify-center h-8 bg-[#eef2f9]">
                    <Popconfirm
                      title={props.translatedMenuItems[120]}
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() =>
                        deleteErpDocument(item.documentId, props.type)
                      }
                    >
                      <Tooltip title={props.translatedMenuItems[59]}>
                        <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer" />
                      </Tooltip>
                    </Popconfirm>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

const mapStateToProps = ({ suppliers }) => ({
  suppliers: suppliers.suppliers,
  fetchingDocumentsBySupplierId: suppliers.fetchingDocumentsBySupplierId,
  fetchingDocumentsBySupplierIdError:
    suppliers.fetchingDocumentsBySupplierIdError,
  documentsBySupplierId: suppliers.documentsBySupplierId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSupplierDocument,
      deleteErpDocument,
      getErpDocumentCount,
      updateErpDocument,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierDocumentTable);
