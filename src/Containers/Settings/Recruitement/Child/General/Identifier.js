import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Switch, Popconfirm, message } from "antd";
import { addingIdentifier, getIdentifier } from "../../../../Settings/SettingsAction";
import dayjs from "dayjs";
import { Button } from "antd";


function Identifier(props) {
  const [formValues, setFormValues] = useState({
    deviceCode: false,
    invoiceCode: false,
    materialCode: false,
    orderCode: false,
    ownerName: false,
    packetCode: false,
    paymentCode: false,
    productCode: false,
    repairCode: false,
    userCode: false,
    aiInd: false,
  });

  useEffect(() => {
    props.getIdentifier(props.orgId);
  }, []);

  useEffect(() => {
    if (props.identifiers) {
      setFormValues({
        deviceCode: props.identifiers.deviceCode === "barcode",
        invoiceCode: props.identifiers.invoiceCode === "barcode",
        materialCode: props.identifiers.materialCode === "barcode",
        orderCode: props.identifiers.orderCode === "barcode",
        ownerName: props.identifiers.ownerName === "barcode",
        packetCode: props.identifiers.packetCode === "barcode",
        paymentCode: props.identifiers.paymentCode === "barcode",
        productCode: props.identifiers.productCode === "barcode",
        repairCode: props.identifiers.repairCode === "barcode",
        userCode: props.identifiers.userCode === "barcode",
        aiInd: props.identifiers.aiInd,
      });
    }
  }, [props.identifiers]);

  const handleToggleChange = (name, value) => {
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
  };

  const handleConfirm = (name) => {
    const payload = {
      ...formValues,
      deviceCode: formValues.deviceCode ? "barcode" : "qrcode",
      invoiceCode: formValues.invoiceCode ? "barcode" : "qrcode",
      materialCode: formValues.materialCode ? "barcode" : "qrcode",
      orderCode: formValues.orderCode ? "barcode" : "qrcode",
      ownerName: formValues.ownerName ? "barcode" : "qrcode",
      packetCode: formValues.packetCode ? "barcode" : "qrcode",
      paymentCode: formValues.paymentCode ? "barcode" : "qrcode",
      productCode: formValues.productCode ? "barcode" : "qrcode",
      repairCode: formValues.repairCode ? "barcode" : "qrcode",
      userCode: formValues.userCode ? "barcode" : "qrcode",
    };

    props.addingIdentifier(payload, props.orgId);

    message.success(`${name} updated successfully.`);
  };

  return (
    <div className="mr-5 ml-5 overflow-auto" style={{ scrollbarWidth: "thin" }}>
      <div className="flex">
        <div className="h-[70vh] overflow-auto overflow-x-hidden">
          <div className="form-background">
            <div className="flex justify-between w-full p-3">
              <div>
                {/* Device Code */}
                <div className="flex text-sm mt-2 font-bold">Identifier</div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs">Device</div>
                  <div>
                    <Popconfirm
                      title="Are you sure to change the Device code type?"
                      onConfirm={() => handleConfirm("Device Code")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.deviceCode}
                        checkedChildren={"Bar Code"}
                        unCheckedChildren={"QR Code"}
                        onChange={(checked) => handleToggleChange("deviceCode", checked)}
                      />
                    </Popconfirm>
                  </div>
                </div>

                {/* Invoice Code */}
                <div className="flex justify-between mt-2">
                  <div className="text-xs">Invoice</div>
                  <div>
                    <Popconfirm
                      title="Are you sure to change the Invoice code type?"
                      onConfirm={() => handleConfirm("Invoice Code")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.invoiceCode}
                        checkedChildren={"Bar Code"}
                        unCheckedChildren={"QR Code"}
                        onChange={(checked) => handleToggleChange("invoiceCode", checked)}
                      />
                    </Popconfirm>
                  </div>
                </div>

                {/* Additional Fields */}
                <div className="flex flex-col justify-between mt-2">
                  {/* Material Code */}
                  <div className="flex justify-between mt-2">
                    <div className="text-xs">Material</div>
                    <div>
                      <Popconfirm
                        title="Are you sure to change the Material code type?"
                        onConfirm={() => handleConfirm("Material Code")}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          checked={formValues.materialCode}
                          checkedChildren={"Bar Code"}
                          unCheckedChildren={"QR Code"}
                          onChange={(checked) => handleToggleChange("materialCode", checked)}
                        />
                      </Popconfirm>
                    </div>
                  </div>

                  {/* Order Code */}
                  <div className="flex justify-between mt-2">
                    <div className="text-xs">Order</div>
                    <div>
                      <Popconfirm
                        title="Are you sure to change the Order code type?"
                        onConfirm={() => handleConfirm("Order Code")}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          checked={formValues.orderCode}
                          checkedChildren={"Bar Code"}
                          unCheckedChildren={"QR Code"}
                          onChange={(checked) => handleToggleChange("orderCode", checked)}
                        />
                      </Popconfirm>
                    </div>
                  </div>

           
                  <div className="flex justify-between mt-2">
                    <div className="text-xs">Packet (Dispatch)</div>
                    <div>
                      <Popconfirm
                        title="Are you sure to change the Packet code type?"
                        onConfirm={() => handleConfirm("Packet Code")}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          checked={formValues.packetCode}
                          checkedChildren={"Bar Code"}
                          unCheckedChildren={"QR Code"}
                          onChange={(checked) => handleToggleChange("packetCode", checked)}
                        />
                      </Popconfirm>
                    </div>
                  </div>

                  {/* Payment Code */}
                  <div className="flex justify-between mt-2">
                    <div className="text-xs">Payment</div>
                    <div>
                      <Popconfirm
                        title="Are you sure to change the Payment code type?"
                        onConfirm={() => handleConfirm("Payment Code")}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          checked={formValues.paymentCode}
                          checkedChildren={"Bar Code"}
                          unCheckedChildren={"QR Code"}
                          onChange={(checked) => handleToggleChange("paymentCode", checked)}
                        />
                      </Popconfirm>
                    </div>
                  </div>

                  {/* Product Code */}
                  <div className="flex justify-between mt-2">
                    <div className="text-xs">Product</div>
                    <div>
                      <Popconfirm
                        title="Are you sure to change the Product code type?"
                        onConfirm={() => handleConfirm("Product Code")}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          checked={formValues.productCode}
                          checkedChildren={"Bar Code"}
                          unCheckedChildren={"QR Code"}
                          onChange={(checked) => handleToggleChange("productCode", checked)}
                        />
                      </Popconfirm>
                    </div>
                  </div>


               {/* Repair Code */}
                   <div className="flex justify-between mt-2">
                    <div className="text-xs">Repair</div>
                    <div>
                      <Popconfirm
                        title="Are you sure to change the Repair code type?"
                        onConfirm={() => handleConfirm("Repair Code")}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          checked={formValues.repairCode}
                          checkedChildren={"Bar Code"}
                          unCheckedChildren={"QR Code"}
                          onChange={(checked) => handleToggleChange("repairCode", checked)}
                        />
                      </Popconfirm>
                    </div>
                  </div>

{/* User Code */}
<div className="flex justify-between mt-2">
                    <div className="text-xs">User</div>
                    <div>
                      <Popconfirm
                        title="Are you sure to change the User code type?"
                        onConfirm={() => handleConfirm("User Code")}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          checked={formValues.userCode}
                          checkedChildren={"Bar Code"}
                          unCheckedChildren={"QR Code"}
                          onChange={(checked) => handleToggleChange("userCode", checked)}
                        />
                      </Popconfirm>
                    </div>
                  </div>


                  {/* AI Enable */}
                  <div className="flex justify-between mt-2">
                    <div className="text-xs">Enable AI</div>
                    <div>
                      <Popconfirm
                        title="Are you sure to change the AI status?"
                        onConfirm={() => handleConfirm("AI Status")}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          checked={formValues.aiInd}
                          checkedChildren={"Yes"}
                          unCheckedChildren={"No"}
                          onChange={(checked) => handleToggleChange("aiInd", checked)}
                        />
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              Updated on {dayjs(props.identifiers.creationDate).format("DD/MM/YYYY")} by{" "}
              {props.identifiers.ownerName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  requirementDuration: settings.requirementDuration,
  orgId: auth.userDetails.organizationId,
  addingIdentifiers: settings.addingIdentifiers,
  addingIdentifiersError: settings.addingIdentifiersError,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  identifiers: settings.identifiers,
  fetchingIdentifiers: settings.fetchingIdentifiers,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addingIdentifier,
      getIdentifier,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Identifier);
