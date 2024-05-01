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


import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

const Component2 = (props) => {
    // Hardcoded JSON data for the Steps component
    const stepsData = [
        { title: 'Step 1', description: 'Description for Step 1' },
        { title: 'Step 2', description: 'Description for Step 2' },
        { title: 'Step 3', description: 'Description for Step 3' },
        { title: 'Step 4', description: 'Description for Step 4' },
    ];

    return (
        <div className=' flex justify-end sticky top-28 z-auto'>
             <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            <h2>Steps</h2>
            {/* <Steps direction="vertical" current={0}>
                {stepsData.map((item, index) => (
                    <Step key={index} title={item.title} description={item.description} />
                ))}
            </Steps> */}
              <Steps direction="vertical" current={0}>
                {props.productionTableData?.steps?.map((step, index) => (
                    <Step key={index} title={`${step.suppliesName} (${step.quantity})`} description={step.description}>
                        {/* <p>Quantity: {step.quantity}</p>
                        <p>Steps: {step.steps}</p> */}
                    </Step>
                )) ?? (
                    <Step title="No Steps Data" description="No steps data available" />
                )}
            </Steps>
        </div>
        </div>
    );
};

export default Component2;

