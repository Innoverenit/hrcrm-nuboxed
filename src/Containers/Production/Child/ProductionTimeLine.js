import React, { useState,useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddSpareNotesModal from "../Child/AddSpareNotesModal"
import AddSpareStepsModal from "../Child/AddSpareStepsModal"
import { Button, Steps } from 'antd';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import {addSpareStepsModal,getProductionSteps,addSpareNotesModal} from "../ProductionAction"


const { Step } = Steps;

const Component2 = (props) => {
    const[step,setStep]=useState("")
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);



    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
           "1156", //  "Steps",//0
           "1054", //   "Add Parts",//1
           "147"    //Description
          
          
           
              
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);
   
    useEffect(() => {
        props.getProductionSteps(props.userId);
        // setPage(page + 1);
        // props.getRoomRackByLocId(props.locationId, props.orgId);
    }, []);


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
        <div className=' flex justify-end sticky top-28 z-auto' style={{height:"43em"}}>
             <div class="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] " style={{scrollbarWidth:"thin"}}>
            <h2>
                {/* Steps */}
                {translatedMenuItems[0]}
                </h2>
           


            {props.productionTableSteps.length > 0 ? (
<Steps direction="vertical" current={0} style={{display:"flex"}}>
               
                      {props.productionTableSteps.map((step, stageIndex) => (
                    <Step
                        key={stageIndex}
                        style={{display:"flex"}}
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
                                                     {translatedMenuItems[1]}
                                                {/* Add Parts */}
                                            </Button>

                                            <ControlCameraIcon
                              className=" !text-icon cursor-pointer text-[#28a355]"
                              onClick={() => {
                                props.addSpareNotesModal(true);
                                handleSteps(step);
                                // handleSetCurrentCustomer(item);
                                // handleRowData(item);
                              }}
                              />
                                      
                                     
                                    </div>
                               
                            </div>
                        }
                    >
                        </Step>
                ))}
                
            </Steps>
 ) : (
    <div>No steps available</div>
  )}
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
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
        step={step}
        productionProductId={props.productionProductId}
        productionTableData={props.productionTableData}
        addSpareStepsModal={props.addSpareStepsModal}
        addSparePartsDrawerModal={props.addSparePartsDrawerModal}
        />

<AddSpareNotesModal
  translatedMenuItems={translatedMenuItems}
        step={step}
        // productionTableData={props.productionTableData}
        addSpareNotesModal={props.addSpareNotesModal}
        addSpareNotesDrawerModal={props.addSpareNotesDrawerModal}
        />
        </>
    );
};



const mapStateToProps = ({ auth, account, opportunity,production }) => ({
    addSparePartsDrawerModal:production.addSparePartsDrawerModal,
    userId: auth.userDetails.userId,
    addSpareNotesDrawerModal:production.addSpareNotesDrawerModal,
    productionTableSteps:production.productionTableSteps
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        addSpareStepsModal,
        getProductionSteps,
        addSpareNotesModal
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(Component2);





  



