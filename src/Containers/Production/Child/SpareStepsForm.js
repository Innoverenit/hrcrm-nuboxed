import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import {Button,Switch} from "antd";
import {  PstoProductionBuilder } from "../../Product/ProductAction";
const DynamicInputForm = (props) => {
  const data=[
    {
        system:"SSUG37000240592212024",
        partNo:"1234"
    },
    {
        system:"SSUG56421746263212024",
        partNo:"5678"
    },
    {
        system:"SSUG56421746263212024",
        partNo:"8984"
    },
    ]
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
    // <form onSubmit={handleSubmit}>
    //     <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    //   {inputs.map((inputValue, index) => (
    //     <input
    //       key={index}
    //       style={{ marginRight: '10px', marginBottom: '10px', flexBasis: 'calc(30% - 10px)' ,border:"2px solid black"}}
    //       type="text"
    //       value={inputValue}
    //       onChange={(e) => handleInputChange(index, e.target.value)}
    //       placeholder={`Input ${index + 1}`}
    //       //style={{ marginRight: '10px', marginBottom: '10px' }}
    //     />
    //   ))}
    //   </div>
    //   <Button type="primary">Submit</Button>
    // </form>
    <div className=' flex justify-end sticky z-auto'>
    <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className=" flex  w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=""></div>

            {/* <div className=" md:w-[22.12rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div> */}
            <div className=" md:w-[22.12rem]"><FormattedMessage id="app.id" defaultMessage="System ID" /></div>
            <div className=" md:w-[15.5rem]"><FormattedMessage id="app.part" defaultMessage="Part #" /></div>
            <div className=""></div>
            <div className=" md:w-[15.5rem]"><FormattedMessage id="app.tag" defaultMessage="Tag" /></div>
        </div>
       

            {data.map((item) => {
                return (
                    <div>
                        <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                            <div className=" flex font-medium flex-col md:w-[36.1rem] max-sm:w-full  ">
                                <div class="flex justify-between text-sm text-cardBody font-semibold  font-poppins ">
                                    {item.system}
                                </div>
                            </div>
                           


                            <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                <div class=" font-normal text-[0.85rem] text-cardBody font-poppins" style={{marginLeft:"9em"}} >
                                    {item.partNo}
                                </div>
                            </div>

                            <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                            <div className="md:w-[15.5rem]">
                                    <Switch 
                                    checkedChildren="Yes"
                                    unCheckedChildren="No"
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                );
            })}

    </div>
</div>
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


