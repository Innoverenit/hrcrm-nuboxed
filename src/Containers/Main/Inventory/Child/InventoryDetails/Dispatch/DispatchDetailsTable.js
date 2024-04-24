
import React, { useState, useEffect, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  getDispatchUpdateList,
  updateDispatchInspectionButton,
} from "../../../InventoryAction";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Button, Tooltip } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import { SubTitle } from "../../../../../../Components/UI/Elements";
import moment from "moment";
const QRCodeModal = lazy(() => import("../../../../../../Components/UI/Elements/QRCodeModal"));
const DispatchTaskTable = lazy(() => import("./DispatchTaskTable"))
const DispatchReceiveToggle = lazy(() => import("./DispatchReceiveToggle"));


function OpenReceivedOrderIdForm(props) {
  useEffect(() => {
    props.getDispatchUpdateList(props.rowData.orderPhoneId)
  }, [])

  const [rowData, setRowData] = useState({});
  const [phoneId, setphoneId] = useState("");
  const [task, setTask] = useState(false);

  const handlePhoneTask = (id) => {
    setTask(!task)
    setphoneId(id);
  }
  const handleRowData = (data) => {
    setRowData(data)
  }
  const columns = [
    {
      title: "",
      dataIndex: "",
      width: "1%",
    },
    {
      title: "OEM",
      dataIndex: "company",
      width: "9%",

    },
    {
      title: "Model",
      dataIndex: "model",
      width: "8%",
    },
    {
      title: "IMEI",
      dataIndex: "imei",
      width: "8%",
    },
    {
      title: "OS",
      dataIndex: "os",
      width: "7%",

    },
    {
      title: "GB",
      dataIndex: "gb",
      width: "7%",
    },
    {
      title: "Color",
      dataIndex: "color",
      width: "9%",
    },
    {
      title: "Condition",
      dataIndex: "conditions",
      width: "9%",
    },
    {
      title: "Technician",
      dataIndex: "repairTechnicianName",
      width: "10%",
    },


    {
      title: "QR",
      width: "8%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            {item.qrCodeId ? (
              <QRCodeModal
                qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                imgHeight={"2.8em"}
                imgWidth={"2.8em"}
                imgRadius={20}
              />
            ) : (
              <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
                No QR
              </span>
            )}
          </SubTitle>
        );
      },
    },
    {
      title: "",
      width: "3%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip title="Task">
            <FileDoneOutlined style={{ color: "black" }} type="file-done"
              onClick={() => {
                handleRowData(item);
                handlePhoneTask(item.phoneId);
              }}
            />

          </Tooltip>
        );
      },
    },
    {
      title: "",
      width: "3%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip title="Notes">
            <NoteAltIcon
              style={{ cursor: "pointer", fontSize: "13px" }}
            // onClick={() => {
            //   handleSetParticularOrderData(item);
            //   props.handleReceivedOrderIdPhoneNoteModal(true);
            // }}
            />

          </Tooltip>
        );
      },
    },
    {
      title: "Inspected",
      width: "8%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip>
            {props.rowData.dispatchInspectionInd === 1 && <DispatchReceiveToggle
              phoneId={item.phoneId}
              dispatchPhoneInd={item.dispatchPhoneInd}
              dispatchInspectionInd={item.dispatchInspectionInd}
              orderPhoneId={props.rowData.orderPhoneId}
            />}
          </Tooltip>
        );
      },
    },
    {
      dataIndex: "dispatchPhoneUserName",
      width: "10%",
    },

  ];


  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight - 200;
  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={props.updateDispatchList}
        pagination={false}
        scroll={{ y: tableHeight }}
      />
      <div class=" flex justify-end" >
        {props.rowData.dispatchInspectionInd === 1 && <Button type="primary">Pause</Button>}
        {props.rowData.dispatchInspectionInd === 1 &&
          <div class=" ml-[10px]" >
            <Button
              loading={props.updatingDispatchInspectionButton}
              onClick={() => props.updateDispatchInspectionButton({
                dispatchInspectionInd: 2,
                stopDispatchInspectionUser: props.userId,
                stopDispatchInspectionDate: moment()
              },
                props.rowData.orderPhoneId,
                props.locationDetailsId)}
              type="primary"
            >Inspection Completed</Button>
          </div>}
      </div>
      {task && <DispatchTaskTable phoneId={phoneId} />}
    </>
  );
}

const mapStateToProps = ({ inventory, distributor, auth }) => ({
  updateDispatchList: inventory.updateDispatchList,
  updatingDispatchInspectionButton: inventory.updatingDispatchInspectionButton,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  phoNoteReceivedOrderIdModal: inventory.phoNoteReceivedOrderIdModal,
  userId: auth.userDetails.userId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDispatchUpdateList,
      updateDispatchInspectionButton,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpenReceivedOrderIdForm);
