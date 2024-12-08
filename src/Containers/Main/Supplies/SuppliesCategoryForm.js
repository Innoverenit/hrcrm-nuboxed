import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Space,Input } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import * as Yup from "yup";
import {addMaterialCategory} from "./SuppliesAction";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';  
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// async function addSuppliesCategory(values, setLoading,callback) {
//     try {
//         setLoading(true);
//         const response = await axios.post(
//             `${base_url2}/supplies/suppliescategory`,
//             values,
//             {
//                 headers: {
//                     Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         console.log("API Response:", response.data);
//         if (callback) callback();
//     } catch (error) {
//         console.error("Error adding category:", error);
//     }
//     finally {
//         setLoading(false); 
//     }
// }

const formSchema = Yup.object().shape({
    categoryName: Yup.string().required("Input Required!"),
  });



function SuppliesCategoryForm (props) {

    const [loading, setLoading] = useState(false);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    const [qualityFields, setQualityFields] = useState([0]); // Start with one Quality input
    const [specFields, setSpecFields] = useState([0]);


    
  const addQualityField = () => {
    setQualityFields([...qualityFields, qualityFields.length]);
  };

  const removeQualityField = () => {
    if (qualityFields.length > 1) {
      setQualityFields(qualityFields.slice(0, -1));
    }
  };

  const addSpecField = () => {
    setSpecFields([...specFields, specFields.length]);
  };

  const removeSpecField = () => {
    if (specFields.length > 1) {
      setSpecFields(specFields.slice(0, -1));
    }
  };
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
     
            
              "Category",//0
              "Create"
              
  
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);

    return (
        <>
        <Formik
          initialValues={{
            categoryName:"",
            imageId: "",
            qualityList:"",
            specsList:"",
            qualityList: [''], // Initialize with one quality input
            specsList: [''],
          }}
          validationSchema={formSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            props.addMaterialCategory(
              {
                ...values,
                alert:(parseInt(values.alert, 10) || 0),
                //qualityList: values.qualityList.split(','), 
                //specsList: values.specsList.split(',') 
                
              },
              setLoading, 
              props.closeModal(),
              () => resetForm(),
            );
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            values,
            ...rest
          }) => (
            <Form>
              <div class="flex justify-between">
                <div class="h-full w-[45%]">
                  <div class=" flex  flex-nowrap">
                    <div> <FastField name="imageId" component={PostImageUpld} /></div>
                    <div>
                      <div class=" flex justify-between flex-col ml-4">
                        <div class=" flex flex-col">
                          <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[0]}</div>
                       
                          <Field
                            name="categoryName"
                             label="Category"
                            placeholder="Category"
                            isColumn
                            width={"100%"}
                            inlineLabel
                            component={InputComponent}

                          />
                       
                        </div>
                        <div class=" flex flex-col">
                  <div class="font-bold text-xs font-poppins text-black">Alert in days</div>
                
                      <Field
                        name="alert"
                        //label="HSN"
                        placeholder="Alert"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      />
                    
                    </div>
                    <div class="mt-4">
                  <div class="font-bold text-xs font-poppins text-black">Quality</div>
                      {/* <Field
                        name="qualityList"
                        //label="HSN"
                        placeholder="Quality"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      /> */}

<Space align="baseline">
              {qualityFields.map((field, index) => (
                <Space key={index} align="baseline">
                  <Field
                    name={`qualityList[${index}]`}
                    render={({ field }) => (
                      <Input {...field} placeholder="Input Value" style={{ width: 100 }} />
                    )}
                  />
                  {index === qualityFields.length - 1 && (
                    <>
                      <AddCircleOutlineIcon onClick={addQualityField} className="text-[green] !text-icon" />
                      {qualityFields.length > 1 && (
                        <RemoveCircleOutlineIcon
                          onClick={removeQualityField}
                          className="text-[red] !text-icon"
                        />
                      )}
                    </>
                  )}
                </Space>
              ))}
            </Space>
                    </div>
                    <div class="mt-2">
                  <div class="font-bold text-xs font-poppins text-black">Spec</div>
                      {/* <Field
                        name="specsList"
                        //label="HSN"
                        placeholder="Spec"
                        isColumn
                        width={"100%"}
                        inlineLabel
                        component={InputComponent}
                      /> */}
                        <Space align="baseline">
              {specFields.map((field, index) => (
                <Space key={index} align="baseline">
                  <Field
                    name={`specsList[${index}]`}
                    render={({ field }) => (
                      <Input {...field} placeholder="Input Value" style={{ width: 100 }} />
                    )}
                  />
                  {index === specFields.length - 1 && (
                    <>
                      <AddCircleOutlineIcon className="text-[green] !text-icon"
                       onClick={addSpecField}  />
                      {specFields.length > 1 && (
                        <RemoveCircleOutlineIcon
                          onClick={removeSpecField}
                          className="text-[red] !text-icon"
                        />
                      )}
                    </>
                  )}
                </Space>
              ))}
            </Space>
                    </div> 
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="flex justify-end ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        </>
    )
}

const mapStateToProps = ({  supplies }) => ({
  addingMaterialCategory:supplies.addingMaterialCategory
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        addMaterialCategory
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(SuppliesCategoryForm);
  