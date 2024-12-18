
import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Field, Form } from 'formik';
import { Input, Space, Button } from 'antd';
import {addQualityProduct} from "../../ProductAction";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';  
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const ProductAddQulitySpec = (props) => {
  const { particularDiscountData } = props;

  // Ensure data fallback if null or undefined
  const qualityList = particularDiscountData?.qualityList || [''];
  const specsList = particularDiscountData?.specsList || [''];

  // Initialize state with safe checks
  const [loading, setLoading] = useState(false);
  const [qualityFields, setQualityFields] = useState(
    Array.from({ length: qualityList.length || 1 }, (_, i) => i)
  );
  const [specFields, setSpecFields] = useState(
    Array.from({ length: specsList.length || 1 }, (_, i) => i)
  );

  // Add or remove fields dynamically
  const addQualityField = () => setQualityFields([...qualityFields, qualityFields.length]);
  const removeQualityField = () => qualityFields.length > 1 && setQualityFields(qualityFields.slice(0, -1));
  const addSpecField = () => setSpecFields([...specFields, specFields.length]);
  const removeSpecField = () => specFields.length > 1 && setSpecFields(specFields.slice(0, -1));

  return (
    <Formik
      initialValues={{
        qualityList: qualityList.length > 0 ? qualityList : [''], // Ensure at least one input
        specsList: specsList.length > 0 ? specsList : ['']        // Ensure at least one input
      }}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        props.addQualityProduct(
          { ...values },
          particularDiscountData?.categoryId, // Safely access categoryId
          setLoading,
          props.setOpen(),
          () => resetForm(),
        );
      }}
    >
      {({ values }) => (
        <Form style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '50px' }}>
          {/* Quality input fields */}
          <div>
            <label>Qualities:</label>
            <Space align="baseline">
              {qualityFields.map((_, index) => (
                <Space key={index} align="baseline">
                  <Field
                    name={`qualityList[${index}]`}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter Quality" style={{ width: 200 }} />
                    )}
                  />
                  {index === qualityFields.length - 1 && (
                    <>
                      <AddCircleOutlineIcon onClick={addQualityField} style={{ fontSize: '20px', color: 'green' }} />
                      {qualityFields.length > 1 && (
                        <RemoveCircleOutlineIcon
                          onClick={removeQualityField}
                          style={{ fontSize: '20px', color: 'red' }}
                        />
                      )}
                    </>
                  )}
                </Space>
              ))}
            </Space>
          </div>

          {/* Spec input fields */}
          <div style={{ marginTop: '20px' }}>
            <label>Specs:</label>
            <Space align="baseline">
              {specFields.map((_, index) => (
                <Space key={index} align="baseline">
                  <Field
                    name={`specsList[${index}]`}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter Spec" style={{ width: 200 }} />
                    )}
                  />
                  {index === specFields.length - 1 && (
                    <>
                      <AddCircleOutlineIcon onClick={addSpecField} style={{ fontSize: '20px', color: 'green' }} />
                      {specFields.length > 1 && (
                        <RemoveCircleOutlineIcon
                          onClick={removeSpecField}
                          style={{ fontSize: '20px', color: 'red' }}
                        />
                      )}
                    </>
                  )}
                </Space>
              ))}
            </Space>
          </div>

          <div style={{ marginTop: '20px' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ supplies }) => ({
  addingQualityCategory: supplies.addingQualityCategory,
  addingMaterialCategory: supplies.addingMaterialCategory
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addQualityProduct
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddQulitySpec);
