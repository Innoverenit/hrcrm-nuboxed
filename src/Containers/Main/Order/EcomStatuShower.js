import React, {Suspense, lazy, useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { Button, Rate, Steps } from 'antd';
import { FormattedMessage } from 'react-intl';
import EcomStatusItemCard from "./EcomStatusItemCard";
import {getEcomStatusItem} from "./OrderAction";
import moment from 'moment';

function EcomStatuShower (props) {

  useEffect(()=>{
    props.getEcomStatusItem(props.particularRowData.orderId);
      },[]);



  return (
    <React.Fragment>
    
    <div class="bg-white">
        <Steps
            direction="vertical"
            current={1}
            items={[
                {
                    title: <FormattedMessage
                        id="app.ordercreated"
                        defaultMessage="Order Created"
                    />,
                    status: <FormattedMessage
                        id="app.progress"
                        defaultMessage="progress"
                    />,
                    description: <>
                 <b> {moment(props.statusEcomItems.creationDate).format("DD-MM-YYYY")} </b>
                    </>
                },
                {
                    title: 'Payment',
                    status: <>
                   
                        </>,
                    description:
                        <>

{props.statusEcomItems.paymentType} | {moment(props.statusEcomItems.paymentDate).format("DD-MM-YYYY")}

                        </>
                },
                {
                    title: 'Order Pick Up',
                    status:  '',
                   // subTitle: <StatusItemCard statusItems={props.statusItems}/>,
                    description: <>
         
                      <EcomStatusItemCard statusEcomItems={props.statusEcomItems} particularRowData={props.particularRowData} />
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
