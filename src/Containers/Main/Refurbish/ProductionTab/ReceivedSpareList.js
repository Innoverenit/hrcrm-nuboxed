
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../Components/UI/Antd";
import { getSpareListById } from "../RefurbishAction"
import ReciveSpareItemToggle from "./ReciveSpareItemToggle";

function ReceivedSpareList(props) {
    useEffect(() => {
        props.getSpareListById(props.data.phoneId)
    }, [])

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            setLoading(true); 
            const itemsToTranslate = [
       
              "1308", //  "Spare",//0
              "14",  //"Category",//1
              "259" ,// "Attribute",  2           
              "1085", // "Received ",//3
             
               
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
    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: translatedMenuItems[0],
            dataIndex: "suppliesName",
            width: "20%",
        },
        {
            title: translatedMenuItems[1],
            width: "15%",
            render: (text, item) => {
                return (
                    <>
                        {item.categoryName} {item.subCategoryName}
                    </>
                )
            },
        },
        {
            title: translatedMenuItems[2],
            render: (text, item) => {
                return (
                    <>
                        {item.attribute} {item.subAttribute}
                    </>
                )
            },
            width: "15%",
        },
        {
            title: translatedMenuItems[3],
            width: "10%",
            render: (text, item) => {
                return (
                    <>
                        <ReciveSpareItemToggle
                            spareReleaseInd={item.spareReleaseInd}
                            sparePacketId={item.sparePacketId}
                        />
                    </>

                )
            }

        },
        {
            title: "",
            width: "10%",
            render: (text, item) => {
                return (
                    <>
                        <ReciveSpareItemToggle
                            spareReleaseInd={item.spareReleaseInd}
                            sparePacketId={item.sparePacketId}
                        />
                    </>

                )
            }
        },

    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.rcvSpareList}
                pagination={false}
                loading={props.fetchingSpareListById}
            />

        </>
    );
}

const mapStateToProps = ({ refurbish, auth }) => ({
    fetchingSpareListById: refurbish.fetchingSpareListById,
    rcvSpareList: refurbish.rcvSpareList,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSpareListById,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedSpareList);
