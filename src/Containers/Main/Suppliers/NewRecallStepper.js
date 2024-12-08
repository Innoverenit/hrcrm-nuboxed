import React, { useState } from "react";
import { Button } from "antd";
import GroupsIcon from '@mui/icons-material/Groups';
import CallIcon from '@mui/icons-material/Call';
import { StyledSteps } from "../../../Components/UI/Antd";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { getItemData } from "../Supplies/SuppliesAction";
import { getContactData } from "../../Contact/ContactAction";
import { base_url2 } from "../../../Config/Auth";
import NewRecallListStep1 from "./NewRecallListStep1";
import NewRecallListStep12 from "./NewRecallListStep12";

const Step = StyledSteps.Step;

const NewRecallStepper = (props) => {
    const [current, setCurrent] = useState(0);
    const [selectedItemsStep1, setSelectedItemsStep1] = useState([]); // Step 1 data
    const [selectedItemsStep2, setSelectedItemsStep2] = useState([]); // Step 2 data


    const next = () => setCurrent((prev) => prev + 1);
    const prev = () => setCurrent((prev) => prev - 1);

    const handleComplete = async () => {
        try {
            const payload = {
               
                customerInfo: selectedItemsStep1.map((item) => ({
                    supplierId: item.supplierId,
                    suppliesFullName: item.suppliesFullName,
                    contacts: selectedItemsStep2.map((item) => item.contactId),
                })),
            };

            await axios.post(`${base_url2}/dummyurl`, payload, {
                headers: {
                    Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
                },
            });

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
            title: "Item Info",
            icon: <GroupsIcon className="text-green-600" style={{ backgroundColor: "green" }} />,
            content: (
                <NewRecallListStep1
                    selectedItems={selectedItemsStep1}
                    setSelectedItems={setSelectedItemsStep1}
                    nextStep={next} // Pass next step function
                />
            ),
        },
        {
            title: "Mailing List",
            icon: <CallIcon className="text-green-500" />,
            content: (
                // <NewRecallListStep12
                //     selectedItems={selectedItemsStep2}
                //     setSelectedItems={setSelectedItemsStep2}
                // />
                <NewRecallListStep12
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

export default connect(mapStateToProps, mapDispatchToProps)(NewRecallStepper);

