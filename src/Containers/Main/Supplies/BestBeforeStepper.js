import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Checkbox, Tooltip } from "antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { StyledSteps } from "../../../Components/UI/Antd";
import { getBestBefore } from "./SuppliesAction";
import { getContactDistributor } from "../../Contact/ContactAction";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import { base_url2 } from "../../../Config/Auth";
import BestbeforeStep1 from "./BestbeforeStep1";
import BestbeforeStep2 from "./BestbeforeStep2";



const Step = StyledSteps.Step;

const BestBeforeStepper = (props) => {
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
              
                bestBfrViewDTOS: selectedItemsStep1.map((item) => ({
                    expiryDate: new Date().toISOString(), // Set current date in ISO format
                  suppliesId: item.suppliesId,
                  suppliesName: item.suppliesName,
                  batchNo: item.batchNo ,
                  unit: item.unit || 0, // Default to 0 if unit is not available
                })),
              };
            await axios.post(
                `${base_url2}/po/sendEmail/getBestBeforeItemList/${props.orgId}`,
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
                showConfirmButton: false,
                timer: 1500,
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
                <BestbeforeStep1
                    selectedItems={selectedItemsStep1}
                    setSelectedItems={setSelectedItemsStep1}
                    selectAll={selectAllStep1}
                    setSelectAll={setSelectAllStep1}
                    translateText={props.translateText}
                    selectedLanguage={props.selectedLanguage}
                    orgId={props.orgId}
                    getBestBefore={props.getBestBefore}
                    bestBeforeData={props.bestBeforeData}
                />
            ),
        },
        {
            title: "Mailling List",
            icon: <PhoneOutlined className="text-green-500" />,
            content: (
                <BestbeforeStep2
                    selectedItems={selectedItemsStep2}
                    setSelectedItems={setSelectedItemsStep2}
                    translateText={props.translateText}
                    selectedLanguage={props.selectedLanguage}
                    userId={props.userId}
                    getContactDistributor={props.getContactDistributor}
                    contactDistributor={props.contactDistributor}
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
    bestBeforeData: supplies.bestBeforeData,
    contactDistributor: contact.contactDistributor,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getBestBefore,
            getContactDistributor,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(BestBeforeStepper);
