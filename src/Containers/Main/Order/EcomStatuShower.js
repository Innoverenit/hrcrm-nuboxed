import React, {useEffect ,useState, lazy, Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Steps } from 'antd';
import {getEcomStatusItem} from "./OrderAction";
import dayjs from 'dayjs';

const EcomStatusItemCard=lazy(()=>import("./EcomStatusItemCard"));
function EcomStatuShower (props) {


    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  useEffect(()=>{
    props.getEcomStatusItem(props.particularRowData.orderId);
      },[]);

      useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
                "1421",// Order Created 
                "1171", //Payment
               "1397", //Order Pick Up
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);

  return (
    <React.Fragment>
    
    <div class="bg-white">
        <Steps
            direction="vertical"
            current={1}
            items={[
                {
                    title:`${translatedMenuItems[0]}`,
                                     
                    status:"progress",
                    description: <>
                 <b> {dayjs(props.statusEcomItems.creationDate).format("DD-MM-YYYY")} </b>
                    </>
                },
                {
                    title:`${translatedMenuItems[1]}`,

// payment
                    status: <>
                   
                        </>,
                    description:
                        <>

{props.statusEcomItems.paymentType=== null ? "Not Available" : dayjs(props.statusEcomItems.paymentDate).format("DD-MM-YYYY") } 

                        </>
                },
                {
                    title:`${translatedMenuItems[2]}`,

// orderpickup
                    status:  '',
                   // subTitle: <StatusItemCard statusItems={props.statusItems}/>,
                    description: <>
         <Suspense>
                      <EcomStatusItemCard statusEcomItems={props.statusEcomItems} particularRowData={props.particularRowData} 
                           translateText={props.translateText}
                           selectedLanguage={props.selectedLanguage}
                         translatedMenuItems={props.translatedMenuItems}
                      /></Suspense>
                    </>
                },

        
               
                // {
                //     title: 'Customer Feedback',
                //     status: 'progress',
                //     description: <>
                //  <Rate/>
                //   </>
                // },
            ]}
        />
      
    </div>
       
    </React.Fragment>
  );
}

const mapStateToProps = ({order, auth }) => ({
    statusEcomItems:order.statusEcomItems

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getEcomStatusItem

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EcomStatuShower);
