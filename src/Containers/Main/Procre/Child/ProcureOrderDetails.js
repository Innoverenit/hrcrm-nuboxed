import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Select } from "antd";
import {
  getProcureDetails,
  deleteProcureData,
  getBrand,
  getModel,
  updateProcureDetails
} from "../../Account/AccountAction";
import { FormattedMessage } from "react-intl";
import { BundleLoader } from "../../../../Components/Placeholder";

const { Option } = Select;

function ProcureOrderDetails(props) {
  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [newUnitName, setUnitName] = useState('');
  const [specs, setSpecs] = useState("");
  // const [particularRowData, setParticularRowData] = useState({});

  useEffect(() => {
    props.getBrand();
    props.getProcureDetails(props.particularRowData.orderId);
  }, []);

  const handleChange = (id, fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [id]: {
        ...prevFields[id],
        [fieldName]: value,
      },
    }));
  };

  const handleEditClick = (id, itemBrand, itemModel, unit, itemSpecs) => {
    setEditContactId(id);
    setBrand(itemBrand);
    setModel(itemModel);
    setUnitName(unit);
    setSpecs(itemSpecs);
  };

  const handleCancelClick = (id) => {
    setEditedFields((prevFields) => ({ ...prevFields, [id]: undefined }));
    setEditContactId(null);
  };

  const handleBrandChange = async (value) => {
    setBrand(value);
    await props.getModel(value);
  };
  
  const handleModelChange = (value) => {
    setModel(value);
  };

  const handleSpecsChange = (value) => {
    setSpecs(value);
  };

  const handleUpdate = (id) => {
    const data = {
      model: brand,
      orderPhoneId: props.particularRowData.orderId,
      brandId: model,
      unit: newUnitName,
      specs: specs,
    };

    props.updateProcureDetails(data, id);

    setEditedFields((prevFields) => ({ ...prevFields, [id]: undefined }));
    setEditContactId(null);
  };

  // const handleSetParticularOrderData = (item) => {
  //   setParticularRowData(item);
  // };

  if (props.fetchingProcureDetails) {
    return <BundleLoader />;
  }

  return (
    <>
      <div className="rounded-lg m-5 max-sm:m-1 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className="flex justify-between w-full p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className="md:w-[7.4rem]">
            <FormattedMessage id="app.brand" defaultMessage="Brand" />
          </div>
          <div className="md:w-[7.1rem]">
            <FormattedMessage id="app.model" defaultMessage="Model" />
          </div>
          <div className="md:w-[8.8rem]">
            <FormattedMessage id="app.specs" defaultMessage="Specs" />
          </div>
          <div className="md:w-[8.8rem]">
            <FormattedMessage id="app.unit" defaultMessage="Unit" />
          </div>
        
          <div className="md:w-[6.12rem]"></div>
        </div>

        {props.procureDetails.map((item, index) => {
          return (
            <div key={index} className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3">
              <div className="flex font-medium flex-col md:w-[13rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm text-cardBody font-poppins">
                
                    <div className="font-normal text-sm text-cardBody font-poppins">{item.brand}</div>
                 
                </div>
              </div>
              <div className="flex font-medium flex-col md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm text-cardBody font-poppins">
                
                    <div className="font-normal text-sm text-cardBody font-poppins">{item.model}</div>
                
                </div>
              </div>
              <div className="flex font-medium flex-col md:w-[17rem] ml-2 max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm text-cardBody font-poppins">
                 
                    <div className="font-normal text-sm text-cardBody font-poppins">{item.specs}</div>
               
                </div>
              </div>

              <div className="flex font-medium flex-col ml-2 md:w-[19rem] max-sm:flex-row w-full max-sm:justify-between">
                <div className="text-sm text-cardBody font-poppins">
                 
                    <div className="font-normal text-sm text-cardBody font-poppins">{item.unit}</div>
                
                </div>
              </div>
             

            
            </div>
          );
        })}
      </div>
    </>
  );
}

const mapStateToProps = ({ distributor }) => ({
  procureDetails: distributor.procureDetails,
  orderDetailsId: distributor.orderDetailsId,
  brand: distributor.brand,
  model: distributor.model,
  fetchingProcureDetails: distributor.fetchingProcureDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcureDetails,
      deleteProcureData,
      getBrand,
      getModel,
      updateProcureDetails
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProcureOrderDetails);
