import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Button} from "antd";
import {  PstoProductionBuilder } from "../../Product/ProductAction";
const DynamicInputForm = (props) => {
    console.log(props.step.quantity)
  const [inputs, setInputs] = useState(Array(props.step.quantity).fill(''));


  useEffect(() => {
    setInputs(Array(props.step.quantity).fill(''));
  }, [props.step.quantity]);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Do something with the input values (e.g., send them to an API)
    console.log('Submitted inputs:', inputs);
    const modifiedData = {
        // ...editedRowData,
        createPartNo: inputs,
        productionProductId:props.productionTableData.productionProductId,
        userId:props.productionTableData.userId,
        locationDetailsId:props.productionTableData.locationDetailsId
      };
    props.PstoProductionBuilder(modifiedData);

  };

  return (
    <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {inputs.map((inputValue, index) => (
        <input
          key={index}
          style={{ marginRight: '10px', marginBottom: '10px', flexBasis: 'calc(30% - 10px)' ,border:"2px solid black"}}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(index, e.target.value)}
          placeholder={`Input ${index + 1}`}
          //style={{ marginRight: '10px', marginBottom: '10px' }}
        />
      ))}
      </div>
      <Button type="primary">Submit</Button>
    </form>
  );
};

const mapStateToProps = ({ product,auth }) => ({
    // builderbyProductId: product.builderbyProductId,
    // fetchingBuilderByProductId: product.fetchingBuilderByProductId,
    // locationId: auth.userDetails.locationId,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        // getBuilderByProId,
        // removeProductBuilder,
        PstoProductionBuilder
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(DynamicInputForm);


