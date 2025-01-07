import React, { useEffect, lazy, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select,} from "../../../../../Components/UI/Elements";
import { Switch, Popconfirm, message } from "antd";
import {
  updateRequirement,
  getRequirementsDuration,
} from "../../../../Settings/SettingsAction";
import * as Yup from "yup";
import dayjs from "dayjs";

const Identifier = lazy(() => import("./Identifier"));
const Notifications = lazy(() => import("../General/Notifications"));
const { Option } = Select;
const GeneralSchema = Yup.object().shape({
  criticlDateRange: Yup.number()
    .typeError("Input must be a number!")
});
function General(props) {
  const [formValues, setFormValues] = useState({
    timePeriod: props.requirementDuration.timePeriod === 0 ? "Not Applicable" : props.requirementDuration.timePeriod || "",
    oppTimePeriod: props.requirementDuration.oppTimePeriod === 0 ? "Not Applicable" : props.requirementDuration.oppTimePeriod || "",
    ordDelvry: props.requirementDuration.ordDelvry === 0 ? "Not Applicable" : props.requirementDuration.ordDelvry || "",
    qtionInclItem: props.requirementDuration.qtionInclItem === 0 ? "Not Applicable" : props.requirementDuration.qtionInclItem || "",
    matPrc: props.requirementDuration.matPrc === 0 ? "Not Applicable" : props.requirementDuration.matPrc || "",
    prcUpdt: props.requirementDuration.prcUpdt === 0 ? "Not Applicable" : props.requirementDuration.prcUpdt || "",
    jobAniEmailInd: props.requirementDuration.jobAniEmailInd,
    birthdayEmailInd: props.requirementDuration.birthdayEmailInd,
    trnsfrEvthngToErpInd: props.requirementDuration.trnsfrEvthngToErpInd,
    trnsfrToErpQtionWinInd: props.requirementDuration.trnsfrToErpQtionWinInd,
    piInd: props.requirementDuration.piInd,
    autoCiInd: props.requirementDuration.autoCiInd,
    b2bProcureInd: props.requirementDuration.b2bProcureInd,
    b2bRepairInd: props.requirementDuration.b2bRepairInd,
    b2bProductionInd: props.requirementDuration.b2bProductionInd,
    b2cProcureInd: props.requirementDuration.b2cProcureInd,
    b2cRepairInd: props.requirementDuration.b2cRepairInd,
    b2cProductionInd: props.requirementDuration.b2cProductionInd,
    leadsToCustInd: props.requirementDuration.leadsToCustInd,
    partNoInd: props.requirementDuration.partNoInd,
    inniInspectInd: props.requirementDuration.inniInspectInd,
    mfaInd: props.requirementDuration.mfaInd,
    typeInd: props.requirementDuration.typeInd,
    repairOrdInd: props.requirementDuration.repairOrdInd,
    qcInd: props.requirementDuration.qcInd,
    b2bCheckInvenOrdInd: props.requirementDuration.b2bCheckInvenOrdInd,
    b2cCheckInvenOrdInd: props.requirementDuration.b2cCheckInvenOrdInd,
    shipInvoicePayImentnd: props.requirementDuration.shipInvoicePayImentnd,
    amcInd: props.requirementDuration.amcInd,
    proInd: props.requirementDuration.proInd,
    repairProcessInd: props.requirementDuration.repairProcessInd,
    criticlDateRange: props.requirementDuration.criticlDateRange,
    newArrDay: props.requirementDuration.newArrDay,
    processInd: props.requirementDuration.processInd,
    enaShipInd: props.requirementDuration.enaShipInd,
    tskAgCriRng: props.requirementDuration.tskAgCriRng,
    noOfQtion: props.requirementDuration.noOfQtion,
    contAlrt: props.requirementDuration.contAlrt,
    task: props.requirementDuration.task,
    deal: props.requirementDuration.deal,
    qtionErp: props.requirementDuration.qtionErp,
    ordRepr: props.requirementDuration.ordRepr,
    ordCmrc: props.requirementDuration.ordCmrc,
    ordprdts: props.requirementDuration.ordprdts,
    apprvl: props.requirementDuration.apprvl,
    bestBfrDayRng: props.requirementDuration.bestBfrDayRng,
    packageInd: props.requirementDuration.packageInd,
    stucUpInd: props.requirementDuration.stucUpInd,
    disPackInd: props.requirementDuration.disPackInd,
    manfProcInd: props.requirementDuration.manfProcInd,
    nwTypInd: props.requirementDuration.nwTypInd,
    mfaLogInd: props.requirementDuration.mfaLogInd,
    mfaCPInd: props.requirementDuration.mfaCPInd,
    userId: props.userId,
    orgId: props.orgId,
  });
  const [anniversary, setAnniversary] = useState(props.requirementDuration.jobAniEmailInd);
  const [birthday, setBirthday] = useState(props.requirementDuration.birthdayEmailInd);

  const handleAnniversay = (checked) => {
    setAnniversary(checked);
  };
  const handleBirthday = (checked) => {
    setBirthday(checked);
  };
  useEffect(() => {
    props.getRequirementsDuration(props.orgId);
  }, []);
  useEffect(() => {
    if (props.requirementDuration) {
      setFormValues({
        timePeriod: props.requirementDuration.timePeriod === 0 ? "Not Applicable" : props.requirementDuration.timePeriod || "",
    oppTimePeriod: props.requirementDuration.oppTimePeriod === 0 ? "Not Applicable" : props.requirementDuration.oppTimePeriod || "",
    ordDelvry: props.requirementDuration.ordDelvry === 0 ? "Not Applicable" : props.requirementDuration.ordDelvry || "",
    qtionInclItem: props.requirementDuration.qtionInclItem === 0 ? "Not Applicable" : props.requirementDuration.qtionInclItem || "",
    matPrc: props.requirementDuration.matPrc === 0 ? "Not Applicable" : props.requirementDuration.matPrc || "",
    prcUpdt: props.requirementDuration.prcUpdt === 0 ? "Not Applicable" : props.requirementDuration.prcUpdt || "",
    jobAniEmailInd: props.requirementDuration.jobAniEmailInd,
    birthdayEmailInd: props.requirementDuration.birthdayEmailInd,
    trnsfrEvthngToErpInd: props.requirementDuration.trnsfrEvthngToErpInd,
    trnsfrToErpQtionWinInd: props.requirementDuration.trnsfrToErpQtionWinInd,
    piInd: props.requirementDuration.piInd,
    autoCiInd: props.requirementDuration.autoCiInd,
    b2bProcureInd: props.requirementDuration.b2bProcureInd,
    b2bRepairInd: props.requirementDuration.b2bRepairInd,
    b2bProductionInd: props.requirementDuration.b2bProductionInd,
    b2cProcureInd: props.requirementDuration.b2cProcureInd,
    b2cRepairInd: props.requirementDuration.b2cRepairInd,
    b2cProductionInd: props.requirementDuration.b2cProductionInd,
    leadsToCustInd: props.requirementDuration.leadsToCustInd,
    partNoInd: props.requirementDuration.partNoInd,
    inniInspectInd: props.requirementDuration.inniInspectInd,
    mfaInd: props.requirementDuration.mfaInd,
    typeInd: props.requirementDuration.typeInd,
    repairOrdInd: props.requirementDuration.repairOrdInd,
    qcInd: props.requirementDuration.qcInd,
    b2bCheckInvenOrdInd: props.requirementDuration.b2bCheckInvenOrdInd,
    b2cCheckInvenOrdInd: props.requirementDuration.b2cCheckInvenOrdInd,
    shipInvoicePayImentnd: props.requirementDuration.shipInvoicePayImentnd,
    amcInd: props.requirementDuration.amcInd,
    proInd: props.requirementDuration.proInd,
    repairProcessInd: props.requirementDuration.repairProcessInd,
    criticlDateRange: props.requirementDuration.criticlDateRange || "",
    newArrDay: props.requirementDuration.newArrDay || "",
    tskAgCriRng: props.requirementDuration.tskAgCriRng || "",
    noOfQtion: props.requirementDuration.noOfQtion || "",
    contAlrt: props.requirementDuration.contAlrt || "",
    task: props.requirementDuration.task || "",
    deal: props.requirementDuration.deal || "",
    qtionErp: props.requirementDuration.qtionErp || "",
    ordRepr: props.requirementDuration.ordRepr || "",
    ordCmrc: props.requirementDuration.ordCmrc || "",
    ordprdts: props.requirementDuration.ordprdts || "",
    apprvl: props.requirementDuration.apprvl || "",
    bestBfrDayRng: props.requirementDuration.bestBfrDayRng || "",
    packageInd: props.requirementDuration.packageInd,
    processInd: props.requirementDuration.processInd,
    enaShipInd: props.requirementDuration.enaShipInd,
    stucUpInd: props.requirementDuration.stucUpInd,
    disPackInd: props.requirementDuration.disPackInd,
    manfProcInd: props.requirementDuration.manfProcInd,
    nwTypInd: props.requirementDuration.nwTypInd,
    mfaLogInd: props.requirementDuration.mfaLogInd,
    mfaCPInd: props.requirementDuration.mfaCPInd,
    userId: props.userId,
    orgId: props.orgId,
      });
    }
  }, [props.requirementDuration]);
  const handleToggleChange = (name, value) => {
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
  };
  const handleDropdownChange = (name, value) => {
    const updatedValues = { ...formValues, [name]: value };
    console.log("Updated form values:", updatedValues); // Debugging
    setFormValues(updatedValues);
    // handleConfirm(name);
     props.updateRequirement(updatedValues, props.orgId);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    handleConfirm(name, value);
  };

  const handleConfirm = (name) => {
    const payload = {
      ...formValues,
      timePeriod: props.requirementDuration.timePeriod === 0 ? "Not Applicable" : props.requirementDuration.timePeriod || "",
          oppTimePeriod: formValues.oppTimePeriod === 0 ? "Not Applicable" : props.requirementDuration.oppTimePeriod || "",
          ordDelvry: formValues.ordDelvry === 0 ? "Not Applicable" : props.requirementDuration.ordDelvry || "",
          qtionInclItem: formValues.qtionInclItem === 0 ? "Not Applicable" : props.requirementDuration.qtionInclItem || "",
          matPrc: formValues.matPrc === 0 ? "Not Applicable" : props.requirementDuration.matPrc || "",
          prcUpdt: formValues.prcUpdt === 0 ? "Not Applicable" : props.requirementDuration.prcUpdt || "",
          userId: props.userId,
          orgId: props.orgId,
          jobAniEmailInd: formValues.jobAniEmailInd,
          birthdayEmailInd: formValues.birthdayEmailInd,
          trnsfrEvthngToErpInd:formValues.trnsfrEvthngToErpInd,
          trnsfrToErpQtionWinInd:formValues.trnsfrToErpQtionWinInd,
          piInd:formValues.piInd,
          autoCiInd:formValues.autoCiInd,
          b2bProcureInd:formValues.b2bProcureInd,
          b2bRepairInd:formValues.b2bRepairInd,
          b2bProductionInd:formValues.b2bProductionInd,
          b2cProcureInd:formValues.b2cProcureInd,
          b2cRepairInd:formValues.b2cRepairInd,
          b2cProductionInd:formValues.b2cProductionInd,
          leadsToCustInd:formValues.leadsToCustInd,
          partNoInd:formValues.partNoInd,
          inniInspectInd:formValues.inniInspectInd,
          mfaInd:formValues.mfaInd,
          typeInd: formValues.typeInd,
          repairOrdInd: formValues.repairOrdInd,
          qcInd: formValues.qcInd,
          task: formValues.task,
          deal: formValues.deal,
          qtionErp: formValues.qtionErp,
          ordRepr: formValues.ordRepr,
          ordCmrc: formValues.ordCmrc,
          ordprdts: formValues.ordprdts,
          apprvl: formValues.apprvl,
          b2bCheckInvenOrdInd: formValues.b2bCheckInvenOrdInd,
          b2cCheckInvenOrdInd: formValues.b2cCheckInvenOrdInd,
          shipInvoicePayImentnd: formValues.shipInvoicePayImentnd,
          amcInd: formValues.amcInd,
          stucUpInd: formValues.stucUpInd,
          proInd: formValues.proInd,
          
          repairProcessInd: formValues.repairProcessInd,
          criticlDateRange:formValues.criticlDateRange,
          newArrDay:formValues.newArrDay,
          processInd: formValues.processInd,
          noOfQtion: formValues.noOfQtion,
          contAlrt: formValues.contAlrt,
          tskAgCriRng: formValues.tskAgCriRng,
          enaShipInd: formValues.enaShipInd,
          bestBfrDayRng: formValues.bestBfrDayRng,
          packageInd: formValues.packageInd,
          disPackInd: formValues.disPackInd,
          manfProcInd: formValues.manfProcInd,
          nwTypInd: formValues.nwTypInd,
          mfaLogInd: formValues.mfaLogInd,
          mfaCPInd: formValues.mfaCPInd,
    };

    props.updateRequirement(payload, props.orgId);

    message.success(`${name} updated successfully.`);
  };
  return (
    <>
 
           <div class="mr-5 ml-5 overflow-auto" style={{ scrollbarWidth:"thin"  }}>
            <div class=" flex    ">
            <div class=" h-h86 overflow-auto overflow-x-hidden">
              
                <div class=" flex justify-between w-full p-3 ">             
                  <div>   
                 
                 
                  {props.user.hrInd  === true ? (
   <> 
                  <div class=" text-sm  font-bold">HR</div>           
                                 
                    <div class=" flex justify-between   mt-2">                
                       <div class=" text-xs  ">Send Job Anniversary Email</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Anniversary Email")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.jobAniEmailInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("jobAniEmailInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                     
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Send BirthDay Email</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("BirthDay Email")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.birthdayEmailInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("birthdayEmailInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    </>
                  ) : (
  <div className="mt-4 ml-4 text-red-500">
    HR module is Switched off. Switch it on to Access Features.
  </div>
)}   
       {props.user.crmInd   === true ? (
   <> 
                    <div class=" flex  justify-between mt-3">
                      <div class=" text-sm  font-bold ">CRM</div>
                      </div>
                      <div class=" flex justify-between ] mt-2">           
                        <div class=" text-xs  ">Drop Open Quotations (in months)</div>    
                      <div>
                      <Select
  value={formValues.oppTimePeriod}
  onChange={(value) => handleDropdownChange("oppTimePeriod", value)}
>
  <Option value="1">1</Option>
  <Option value="2">2</Option>
  <Option value="3">3</Option>
  <Option value="4">4</Option>
  <Option value="5">5</Option>
  <Option value="Not Applicable">Not Applicable</Option>
</Select>
                      </div>
                    </div>
                      <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Quotation win - Transfer Prospect info to ERP </div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Transfer Prospect to ERP On Quotation win")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.trnsfrToErpQtionWinInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("trnsfrToErpQtionWinInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Transfer all Prospect Info to Customer</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Transfer All Prospect Info to Erp")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.trnsfrEvthngToErpInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("trnsfrEvthngToErpInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                  <div className="text-xs">Number of Quotation</div>
                  <div>
                  <input
                      type="number"
                      name="noOfQtion"
                      value={formValues.noOfQtion}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs">Contact Alert</div>
                  <div>
                  <input
                      type="number"
                      name="contAlrt"
                      value={formValues.contAlrt}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs">Task Ageing Critical Range (Days) </div>
                  <div>
                  <input
                      type="number"
                      name="tskAgCriRng"
                      value={formValues.tskAgCriRng}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
                           
                <div className="flex justify-between mt-2">
                  <div className="text-xs">  Critical Range (Days) Deal</div>
                  <div>
                  <input
                      type="number"
                      name="deal"
                      value={formValues.deal}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs">  Critical Range (Days) QuotationErp</div>
                  <div>
                  <input
                      type="number"
                      name="qtionErp"
                      value={formValues.qtionErp}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs">  Critical Range (Days) Order Repair</div>
                  <div>
                  <input
                      type="number"
                      name="ordRepr"
                      value={formValues.ordRepr}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs">  Critical Range (Days) Order Commerce</div>
                  <div>
                  <input
                      type="number"
                      name="ordCmrc"
                      value={formValues.ordCmrc}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs">  Critical Range (Days) Order Product</div>
                  <div>
                  <input
                      type="number"
                      name="ordprdts"
                      value={formValues.ordprdts}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs">  Critical Range (Days) Approval</div>
                  <div>
                  <input
                      type="number"
                      name="apprvl"
                      value={formValues.apprvl}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs">Best Before Day Range</div>
                  <div>
                  <input
                      type="number"
                      name="bestBfrDayRng"
                      value={formValues.bestBfrDayRng}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>

                <div class=" flex justify-between ] mt-2">           
                        <div class=" text-xs  ">Order Delivery</div>    
                      <div className="w-[10rem]">
                      <Select
  value={formValues.ordDelvry}
  onChange={(value) => handleDropdownChange("ordDelvry", value)}
>
  <Option value="Associates trackId with packetId">Associates trackId with packetId</Option>
  <Option value="All packets are derivered">All packets are derivered</Option>
  <Option value="Not Applicable">Not Applicable</Option>
</Select>
                      </div>
                    </div>

                    <div class=" flex justify-between ] mt-2">           
                        <div class=" text-xs  ">Quotation Include Item</div>    
                        <div className="w-[10rem]">
                      <Select
  value={formValues.qtionInclItem}
  onChange={(value) => handleDropdownChange("qtionInclItem", value)}
>
<Option value="material">Material</Option>
  <Option value="product">Product</Option>
  <Option value="inventorySuppllier">Inventory Supplier</Option>
  <Option value="notApplicable">Not Applicable</Option>
</Select>
                      </div>
                    </div>
                    
                    <div class=" flex justify-between ] mt-2">           
                        <div class=" text-xs  ">Material-Pricing-Calculating method</div>    
                        <div className="w-[10rem]">
                      <Select
  value={formValues.matPrc}
  onChange={(value) => handleDropdownChange("matPrc", value)}
>
<Option value="simpleMarkup">Simple markup</Option>
  <Option value="averageOfStock">Average of stock</Option>
  <Option value="averageOfPrice">Average of Price</Option>

</Select>
                      </div>
                    </div>

                    <div class=" flex justify-between ] mt-2">           
                        <div class=" text-xs  ">Material-Price Update Trigger</div>    
                        <div className="w-[10rem]">
                                          <Select
                      value={formValues.prcUpdt}
                      onChange={(value) => handleDropdownChange("prcUpdt", value)}
                    >
                    <Option value="generatePo">Generate PO</Option>
                      <Option value="updateInStock">Update in stock</Option>
                      <Option value="generateGRN">Generate GRN</Option>

                    </Select>
                      </div>
                    </div>

                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Mfa Needed</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Mfa Needed")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.mfaInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("mfaInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    </>
 ) : (
  <div className="mt-4 ml-4 text-red-500">
    CRM module is Switched off. Switch it on to Access Features.
  </div>
)}   
        { props.user.inventoryAccessInd === true && props.user.erpInd === true  ? (
   <> 
                <div class=" flex  mt-2">
                      <div class=" text-sm  font-bold">Inventory</div>
                      </div>
<div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Inception</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Inception")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.inniInspectInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("inniInspectInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Stock Update</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("StuckUpdate")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.stucUpInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("stucUpInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                  <div className="text-xs">New Arrival Date Range (Days)</div>
                  <div>
                  <input
                      type="number"
                      name="newArrDay"
                      value={formValues.newArrDay}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
                <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Packing-Items updated in Stock </div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Package")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.packageInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("packageInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    {props.requirementDuration.mfaInd &&
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Network </div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Package")}
                      okText="yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.nwTypInd}
                        checkedChildren={"Google"}
                        unCheckedChildren={"Microsoft"}
                        onChange={(checked) => handleToggleChange("nwTypInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
}
<div class=" flex justify-between   mt-2">                
    <div class=" text-xs  ">Dispatch to Packing</div>
      <div>
      <div>
    <Popconfirm
      title="Are you sure to change ?"
      onConfirm={() => handleConfirm("Dispatch to Packing")}
      okText="Yes"
      cancelText="No"
    >
      <Switch
        checked={formValues.disPackInd}
        checkedChildren={"Item"}
        unCheckedChildren={"Order"}
        onChange={(checked) => handleToggleChange("disPackInd", checked)}
      />
    </Popconfirm>
  </div>
  
      </div>
    </div>  
    <div class=" flex justify-between   mt-2">                
    <div class=" text-xs  ">B2b Inventory Order</div>
      <div>
      <div>
    <Popconfirm
      title="Are you sure to change ?"
      onConfirm={() => handleConfirm("B2b Inventory Order")}
      okText="Yes"
      cancelText="No"
    >
      <Switch
        checked={formValues.b2bCheckInvenOrdInd}
        checkedChildren={"Yes"}
        unCheckedChildren={"No"}
        onChange={(checked) => handleToggleChange("b2bCheckInvenOrdInd", checked)}
      />
    </Popconfirm>
  </div>
  
      </div>
    </div> 
    <div class=" flex justify-between   mt-2">                
    <div class=" text-xs  ">B2c Inventory Order</div>
      <div>
      <div>
    <Popconfirm
      title="Are you sure to change ?"
      onConfirm={() => handleConfirm("B2c Inventory Order")}
      okText="Yes"
      cancelText="No"
    >
      <Switch
        checked={formValues.b2cCheckInvenOrdInd}
        checkedChildren={"Yes"}
        unCheckedChildren={"No"}
        onChange={(checked) => handleToggleChange("b2cCheckInvenOrdInd", checked)}
      />
    </Popconfirm>
  </div>
  
      </div>
    </div>
    </>
 ) : (
  <div className="mt-4 ml-4 text-red-500">
    Inventory module is Switched off. Switch it on to Access Features.
  </div>
)}     

                    <div class=" flex  mt-2">
                      <div class=" text-sm  font-bold">Production</div>                      
                      </div>
                    {props.user.productionInd === true ? (
   <> 
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Process</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Process")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.processInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("processInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Make To</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Make To")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.typeInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("typeInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">AMC</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("AMC")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.amcInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("amcInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    
                    </div>
                    <div class=" flex justify-between   mt-2">                
    <div class=" text-xs  ">Manufacturing process</div>
      <div>
      <div>
    <Popconfirm
      title="Are you sure to change ?"
      onConfirm={() => handleConfirm("Manufacturing process")}
      okText="Yes"
      cancelText="No"
    >
      <Switch
        checked={formValues.manfProcInd}
        checkedChildren={"Cell"}
        unCheckedChildren={"Batch"}
        onChange={(checked) => handleToggleChange("manfProcInd", checked)}
      />
    </Popconfirm>
  </div>
  
      </div>
    </div> 

  <div class=" flex justify-between   mt-2">                
  <div class=" text-xs  ">B2b Production</div>
    <div>
    <div>
  <Popconfirm
    title="Are you sure to change ?"
    onConfirm={() => handleConfirm("B2b Production")}
    okText="Yes"
    cancelText="No"
  >
    <Switch
      checked={formValues.b2bProductionInd}
      checkedChildren={"Yes"}
      unCheckedChildren={"No"}
      onChange={(checked) => handleToggleChange("b2bProductionInd", checked)}
    />
  </Popconfirm>
</div>

    </div>
  </div>
  <div class=" flex justify-between   mt-2">                
 <div class=" text-xs  ">B2c Production</div>
   <div>
   <div>
 <Popconfirm
   title="Are you sure to change ?"
   onConfirm={() => handleConfirm("B2c Production")}
   okText="Yes"
   cancelText="No"
 >
   <Switch
     checked={formValues.b2cProductionInd}
     checkedChildren={"Yes"}
     unCheckedChildren={"No"}
     onChange={(checked) => handleToggleChange("b2cProductionInd", checked)}
   />
 </Popconfirm>
</div>

   </div>
 </div> 

                    </>
 ) : (
  <div className="mt-4 ml-4 text-red-500">
    Production module is Switched off. Switch it on to Access Features.
  </div>
)}   
  {props.user.repairInd   === true ? (
   <> 

                    <div class=" flex  justify-between mt-3">
                      <div class=" text-sm  font-bold ">Repair</div>
                      </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Auto Generate Part Number For Spares</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Generate Part Number")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.partNoInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("partNoInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  "> Convert Leads To Customer Directly</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Leads To Customer")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.leadsToCustInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("leadsToCustInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
               
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">QC Required as part of Workflow</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("QC")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.qcInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("qcInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Repair Process</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Process")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.repairProcessInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("repairProcessInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                  <div className="text-xs">Critical Date Range (Days)</div>
                  <div>
                  <input
                      type="number"
                      name="criticlDateRange"
                      value={formValues.criticlDateRange}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className="input-component" // Add styling or class as needed
                    />
                  </div>
                </div>
            
              
   <div class=" flex justify-between   mt-2">                
   <div class=" text-xs  ">B2b Repair</div>
     <div>
     <div>
   <Popconfirm
     title="Are you sure to change ?"
     onConfirm={() => handleConfirm("B2b Reapir")}
     okText="Yes"
     cancelText="No"
   >
     <Switch
       checked={formValues.b2bRepairInd}
       checkedChildren={"Yes"}
       unCheckedChildren={"No"}
       onChange={(checked) => handleToggleChange("b2bRepairInd", checked)}
     />
   </Popconfirm>
 </div>

     </div>
   </div>

             
          
    <div class=" flex justify-between   mt-2">                
    <div class=" text-xs  ">B2c Repair</div>
      <div>
      <div>
    <Popconfirm
      title="Are you sure to change ?"
      onConfirm={() => handleConfirm("B2c Reapir")}
      okText="Yes"
      cancelText="No"
    >
      <Switch
        checked={formValues.b2cRepairInd}
        checkedChildren={"Yes"}
        unCheckedChildren={"No"}
        onChange={(checked) => handleToggleChange("b2cRepairInd", checked)}
      />
    </Popconfirm>
  </div>
  
      </div>
    </div> 

      </>
 ) : (
  <div className="mt-4 ml-4 text-red-500">
  Repair module is Switched off. Switch it on to Access Features.
  </div>
)}   
        {props.user.financeInd   === true ? (
   <> 
          
 <div class=" text-sm mt-3 font-bold ">Invoice</div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Proforma Invoice (PI) needed</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Proforma Invoice (PI) needed")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.piInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("piInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Invoice can be cancelled</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Invoice can be cancelled")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.trnsfrToErpQtionWinInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("trnsfrToErpQtionWinInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Auto generate Commercial Invoice (CI)</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Auto generate Commercial Invoice")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.autoCiInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("autoCiInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    {props.user.ecomInd  && (
                      <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">B2b Procure </div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("B2b Procure ")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.b2bProcureInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("b2bProcureInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
)}


 {props.user.ecomInd  && (
  <div class=" flex justify-between   mt-2">                
  <div class=" text-xs  ">B2c Procure</div>
    <div>
    <div>
  <Popconfirm
    title="Are you sure to change ?"
    onConfirm={() => handleConfirm("B2c Procure")}
    okText="Yes"
    cancelText="No"
  >
    <Switch
      checked={formValues.b2cProcureInd}
      checkedChildren={"Yes"}
      unCheckedChildren={"No"}
      onChange={(checked) => handleToggleChange("b2cProcureInd", checked)}
    />
  </Popconfirm>
</div>

    </div>
  </div>
)}
 



  
    <div class=" flex justify-between   mt-2">                
    <div class=" text-xs  ">Ship Invoice Payment</div>
      <div>
      <div>
    <Popconfirm
      title="Are you sure to change ?"
      onConfirm={() => handleConfirm("Ship Invoice Payment")}
      okText="Yes"
      cancelText="No"
    >
      <Switch
        checked={formValues.shipInvoicePayImentnd}
        checkedChildren={"Yes"}
        unCheckedChildren={"No"}
        onChange={(checked) => handleToggleChange("shipInvoicePayImentnd", checked)}
      />
    </Popconfirm>
  </div>
  
      </div>
    </div> 
    </>
  ) : (
  <div className="mt-4 ml-4 text-red-500">
    Invoice module is Switched off. Switch it on to Access Features.
  </div>
)}
  
    {props.user.logisticsInd === true ? (
   <> 

    <div class=" text-sm mt-3 font-bold ">Logistics</div>
    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Enable shipment on part payment</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Enable shipment on part payment")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.enaShipInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("enaShipInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                  
                    </>
 ) : (
  <div className="mt-4 ml-4 text-red-500">
    Logistic module is Switched off. Switch it on to Access Features.
  </div>
)}   
                  {props.user.imInd   === true ? (
   <> 
                  
   <div class=" text-sm mt-3 font-bold ">Investor Management</div>
                    <div class=" flex justify-between   mt-2">                
                    <div class=" text-xs  ">Show Orders To Investor</div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Show Orders To Investor")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.proInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("proInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    
                    </>
 ) : (
  <div className="mt-4 ml-4 text-red-500">
    Investor module is Switched off. Switch it on to Access Features.
  </div>
)}   
                  </div>
                </div>
                <div class="mt-4">
                  Updated on{" "}
                  {dayjs(props.requirementDuration.creationDate).format("DD/MM/YYYY")} by{" "}
                  {props.requirementDuration.ownerName}
                </div>

               
             
              </div>
              <div className="flex flex-col">
              <div class=" flex  mt-2 ml-2">
                      <div class=" text-sm  font-bold">MFA where to use</div>                      
                      </div>
                      <div class=" flex justify-between   mt-2 ml-2">                
                    <div class=" text-xs  ">MFA Login </div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Package")}
                      okText="yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.mfaLogInd}
                        checkedChildren={"yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("mfaLogInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                    <div class=" flex justify-between   mt-2 ml-2">                
                    <div class=" text-xs  ">Change Password </div>
                      <div>
                      <div>
                    <Popconfirm
                      title="Are you sure to change ?"
                      onConfirm={() => handleConfirm("Package")}
                      okText="yes"
                      cancelText="No"
                    >
                      <Switch
                        checked={formValues.mfaCPInd}
                        checkedChildren={"yes"}
                        unCheckedChildren={"No"}
                        onChange={(checked) => handleToggleChange("mfaCPInd", checked)}
                      />
                    </Popconfirm>
                  </div>
   
                      </div>
                    </div>
                  
              <Notifications />
              <Identifier/>
              </div>
            </div>
          </div>
      
    </>
  );
}
const mapStateToProps = ({ settings, auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  requirementDuration: settings.requirementDuration,
  orgId: auth.userDetails.organizationId,
  updateRequirement: settings.updateRequirement,
  updateRequirementError: settings.updateRequirementError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateRequirement,
      getRequirementsDuration,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(General);
