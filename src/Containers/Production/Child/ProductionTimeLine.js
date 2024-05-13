// import React from 'react';
// import { Timeline } from 'antd';

// const ProductionTimeLine = () => {
//     // Hardcoded JSON data for the Timeline component
//     const timelineData = [
//         { time: '2023-01-01', event: 'Event 1' },
//         { time: '2023-02-15', event: 'Event 2' },
//         { time: '2023-03-20', event: 'Event 3' },
//         { time: '2023-05-10', event: 'Event 4' },
//     ];

//     return (
//         <div className=' flex justify-end sticky top-28 z-auto'>
//              <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
//             <h2>Timeline Component</h2>
//             <Timeline>
//                 {timelineData.map((item, index) => (
//                     <Timeline.Item key={index} label={item.time}>
//                         {item.event}
//                     </Timeline.Item>
//                 ))}
//             </Timeline>
//         </div>
//         </div>
//     );
// };

// export default ProductionTimeLine;


import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddSpareStepsModal from "../Child/AddSpareStepsModal"
import { Button, Steps } from 'antd';

import {addSpareStepsModal} from "../ProductionAction"
import NodataFoundPage1 from '../../../Helpers/ErrorBoundary/NodataFoundPage1';

const { Step } = Steps;

const Component2 = (props) => {
    const[step,setStep]=useState("")
    // Hardcoded JSON data for the Steps component
    const stepsData = [
        { title: 'Step 1', description: 'Description for Step 1' },
        { title: 'Step 2', description: 'Description for Step 2' },
        { title: 'Step 3', description: 'Description for Step 3' },
        { title: 'Step 4', description: 'Description for Step 4' },
    ];


    function handleSteps(step) {
        setStep(step);
        // console.log("opp",item);
      }

    return (
        <>
        <div className=' flex justify-end sticky top-28 z-auto'>
             <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            <h2>Steps</h2>
           



<Steps direction="vertical" current={0}>
                {props.productionTableData.map((item, index) => (
                    <>
                      {item.steps.map((step, stageIndex) => (
                    <Step
                        key={stageIndex}
                        // title={status.title}
                        title={`${step.suppliesName} (${step.quantity})`} 
                        description={
                            <div style={{display:"flex"}}>
                                {step.description}
                               
                                    <div className="actions">
                                        
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    props.addSpareStepsModal(true)
                                                    handleSteps(step);
                                                   
                                                }}
                                            >
                                                Add Parts
                                            </Button>
                                      
                                     
                                    </div>
                               
                            </div>
                        }
                    />
                ))}
                </>
                ))}
            </Steps>

{/* {props.productionTableData.map((item, index) => (
    <React.Fragment key={index}>
        {item.steps.length > 0 ? (
            // Render Steps for each item with non-empty steps array
            item.steps.map((step, stageIndex) => (
                <Step
                direction="vertical"
                // current={0}
                current={stageIndex + 1} 
                    key={stageIndex}
                    title={`${step.suppliesName} (${step.quantity})`} 
                    description={
                        <div style={{ display: "flex" }}>
                            {step.description}
                            <div className="actions">
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        props.addSpareStepsModal(true);
                                        handleSteps(step);
                                    }}
                                >
                                    Add Parts
                                </Button>
                            </div>
                        </div>
                    }
                />
            ))
        ) : (
            // Render "No steps found" message if steps array is empty
            <p>No steps found</p>
        )}
    </React.Fragment>
))} */}





        </div>
        </div>
        <AddSpareStepsModal
        step={step}
        productionTableData={props.productionTableData}
        addSpareStepsModal={props.addSpareStepsModal}
        addSparePartsDrawerModal={props.addSparePartsDrawerModal}
        />
        </>
    );
};



const mapStateToProps = ({ auth, account, opportunity,production }) => ({
    addSparePartsDrawerModal:production.addSparePartsDrawerModal
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        addSpareStepsModal,
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(Component2);



