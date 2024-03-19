import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../../Components/UI/Antd";
import { getSupplierContactList, handleUpdateSupplierContactModal, setEditSupplierContact } from "../../../../SuppliersAction";
import { EditOutlined } from "@ant-design/icons";
// import UpdateSupplierContactModal from "./UpdateSupplierContactModal";

function SupplierContactTable(props) {

  useEffect(() => {
    props.getSupplierContactList(props.supplier.supplierId);
  }, []);

  const [currentSupplierId, setCurrentSupplierId] = useState("");

  function handleSetCurrentSupplierId(supplierId) {
    setCurrentSupplierId(supplierId);
  }
  const { } = props;
  const columns = [
    {
      title: "Name",
      render: (name, item, i) => {
        return ` ${item.salutation || ""} ${item.firstName ||
          ""} ${item.middleName || ""} ${item.lastName || ""}`;
      },
    },
    {
      title: "Email",
      dataIndex: "emailId",
    },
    {
      title: "Mobile No",
      render: (name, item, i) => {
        return ` ${item.dialCode1 || ""} ${item.mobileNo || ""} `;
      },
    },
    {
      title: "Designation",
      dataIndex: "designationName",
    },
    {
      title: "Department",
      dataIndex: "departmentName",
    },
    {
      title: "",
      width: "2%",
      dataIndex: "documentId",
      render: (name, item, i) => {
        return (
          <Tooltip title="Edit">
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.setEditSupplierContact(item);
                props.handleUpdateSupplierContactModal(true);
              }}
            />
          </Tooltip>
        );
      },
    },
  ];

  return (
    <>
      {true && (
        <StyledTable
          // rowSelection={rowSelection}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 280 }}
          rowKey="supplierId"
          columns={columns}
          dataSource={props.contactSupplier}
          loading={props.fetchingSupplierContactListById}
          onChange={console.log("task onChangeHere...")}
        />
      )}
      {/* <UpdateSupplierContactModal
        supplierId={currentSupplierId}
        updateSupplierContactModal={props.updateSupplierContactModal}
        handleSetCurrentSupplierId={handleSetCurrentSupplierId}
        handleUpdateSupplierContactModal={props.handleUpdateSupplierContactModal}
      /> */}
    </>
  );
}
// }

const mapStateToProps = ({ suppliers }) => ({
  contactSupplier: suppliers.contactSupplier,
  fetchingSupplierContactListById: suppliers.fetchingSupplierContactListById,
  updateSupplierContactModal: suppliers.updateSupplierContactModal,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSupplierContactList,
      handleUpdateSupplierContactModal,
      setEditSupplierContact,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierContactTable);
