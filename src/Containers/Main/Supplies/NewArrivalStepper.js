// import React, { useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button } from "antd";
// import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
// import { StyledSteps } from "../../../Components/UI/Antd";
// import NewArrivalListStep1 from "./NewArrivalListStep1";
// import NewArrivalList from "./NewArrivalList";

// const Step = StyledSteps.Step;

// const NewArrivalStepper = (props) => {
//     const [current, setCurrent] = useState(0);
//     const [thirdPageData, setThirdPageData] = useState({});

//     const handleSubmit = (data) => {
//         setThirdPageData(data);
//         handleComplete();
//     };

//     const next = () => setCurrent((prev) => prev + 1);
//     const prev = () => setCurrent((prev) => prev - 1);

//     const handleComplete = () => {
//         props.handleOpportunityModal(false);
//     };

//     const steps = [
//         {
//             title: "Step 1",
//             icon: <UserOutlined className="text-green-600" style={{ backgroundColor: "green" }} />,
//             content: (
//                 <NewArrivalListStep1
//                     translateText={props.translateText}
//                     selectedLanguage={props.selectedLanguage}
//                 />
//             ),
//         },
//         {
//             title: "Step 2",
//             icon: <PhoneOutlined className="text-green-500" />,
//             content: (
//                 <NewArrivalList
//                     translateText={props.translateText}
//                     selectedLanguage={props.selectedLanguage}
//                 />
//             ),
//         },
//     ];

//     return (
//         <>
//             <StyledSteps current={current}>
//                 <Step
//                     title={<AddShoppingCartIcon className="!text-icon" />}
//                     description="Step 1"
//                 />
//                 <Step
//                     title={<ControlPointDuplicateIcon className="!text-icon" />}
//                     description="Step 2"
//                 />
//             </StyledSteps>
//             <div className="min-[50vh]">{steps[current].content}</div>
//             <div className="flex justify-end">
//                 <div className="steps-action flex">
//                     <div>
//                         {current > 0 && (
//                             <Button type="tertiary" onClick={prev}>
//                                 <div className="text-base cursor-pointer">Previous</div>
//                             </Button>
//                         )}
//                     </div>
//                     <div>
//                         {current === steps.length - 1 && (
//                             <Button type="secondary" onClick={handleComplete}>
//                                 <div className="text-base cursor-pointer">Complete</div>
//                             </Button>
//                         )}
//                     </div>
//                     &nbsp;
//                     <div>
//                         {current < steps.length - 1 && (
//                             <>
//                                 {current === 0 && (
//                                     <Button type="tertiary" onClick={next}>
//                                         <div className="text-base cursor-pointer">Proceed</div>
//                                     </Button>
//                                 )}
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// const mapStateToProps = ({ auth, opportunity }) => ({

// });

// const mapDispatchToProps = (dispatch) => bindActionCreators({

// }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(NewArrivalStepper);


import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Checkbox, Tooltip } from "antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { StyledSteps } from "../../../Components/UI/Antd";
import { getItemData } from "./SuppliesAction";
import { getContactData } from "../../Contact/ContactAction";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import { base_url2 } from "../../../Config/Auth";
import NewArrivalListStep1 from "./NewArrivalListStep1";
import NewArrivalList from "./NewArrivalList";


const Step = StyledSteps.Step;

const NewArrivalStepper = (props) => {
    const [current, setCurrent] = useState(0);
    const [selectedItemsStep1, setSelectedItemsStep1] = useState([]);
    const [selectAllStep1, setSelectAllStep1] = useState(true); 
    const [selectedItemsStep2, setSelectedItemsStep2] = useState([]);

    const next = () => setCurrent((prev) => prev + 1);
    const prev = () => setCurrent((prev) => prev - 1);

    const handleComplete = async () => {
        try {
            const payload = {
                contacts: selectedItemsStep2.map((item) => item.contactId), // Contacts array from Step 2
              
                newArrivals: selectedItemsStep1.map((item) => ({
                  creationDate: new Date().toISOString(), // Set current date in ISO format
                  imageId: item.imageId || "defaultImageId", // Use the correct property or default if missing
                  imageUrl: item.imageUrl || "defaultImageUrl", // Provide default if not available
                  suppliesId: item.suppliesId,
                  suppliesName: item.suppliesName,
                  unit: item.unit || 0, // Default to 0 if unit is not available
                })),
              };
            await axios.post(
                `${base_url2}/newArrivalsMaterials/sendEmail/${props.orgId}`,
                payload,
                {
                    headers: {
                        Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
                    },
                }
            );
            Swal.fire({
                icon: "success",
                title: "Email sent Successfully!",
            });
            props.handleOpportunityModal(false);
        } catch (error) {
            console.error("Error sending selected data:", error);
        }
    };

    const steps = [
        {
            title: "Item Info ",
            icon: <UserOutlined className="text-green-600" style={{ backgroundColor: "green" }} />,
            content: (
                <NewArrivalListStep1
                    selectedItems={selectedItemsStep1}
                    setSelectedItems={setSelectedItemsStep1}
                    selectAll={selectAllStep1}
                    setSelectAll={setSelectAllStep1}
                    translateText={props.translateText}
                    selectedLanguage={props.selectedLanguage}
                    orgId={props.orgId}
                    getItemData={props.getItemData}
                    newStepItemData={props.newStepItemData}
                />
            ),
        },
        {
            title: "Mailling List",
            icon: <PhoneOutlined className="text-green-500" />,
            content: (
                <NewArrivalList
                    selectedItems={selectedItemsStep2}
                    setSelectedItems={setSelectedItemsStep2}
                    translateText={props.translateText}
                    selectedLanguage={props.selectedLanguage}
                    userId={props.userId}
                    getContactData={props.getContactData}
                    contactData={props.contactData}
                />
            ),
        },
    ];

    return (
        <>
            <StyledSteps current={current}>
                {steps.map((step, index) => (
                    <Step key={index} title={step.title} icon={step.icon} />
                ))}
            </StyledSteps>

            <div className="min-[50vh]">{steps[current].content}</div>

            <div className="flex justify-end">
                <div className="steps-action flex">
                    {current > 0 && (
                        <Button type="tertiary" onClick={prev}>
                            <div className="text-base cursor-pointer">Previous</div>
                        </Button>
                    )}

                    {current < steps.length - 1 && (
                        <Button type="tertiary" onClick={next}>
                            <div className="text-base cursor-pointer">Proceed</div>
                        </Button>
                    )}

                    {current === steps.length - 1 && (
                        <Button type="secondary" onClick={handleComplete}>
                            <div className="text-base cursor-pointer">Complete</div>
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};


const mapStateToProps = ({ supplies, auth, contact }) => ({
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    newStepItemData: supplies.newStepItemData,
    contactData: contact.contactData,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getItemData,
            getContactData,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(NewArrivalStepper);
