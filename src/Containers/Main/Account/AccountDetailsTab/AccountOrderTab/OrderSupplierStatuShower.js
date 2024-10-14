import React, {Suspense, lazy, useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Rate, Steps } from 'antd';
import { FormattedMessage } from 'react-intl';
import {getProcureStatusItem} from "../../AccountAction";
import dayjs from 'dayjs';
import OrdrSuplrStatusItemCard from "./OrdrSuplrStatusItemCard";

function OrderSupplierStatuShower (props) {

  useEffect(()=>{
    props.getProcureStatusItem(props.particularRowData.orderId);
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
                 <b> {dayjs(props.statusItems.creationDate).format("DD-MM-YYYY")} </b>
                    </>
                },
                {
                    title: 'Payment',
                    status: <>
                   
                        </>,
                    description:
                        <>

{props.statusItems.paymentType} |{props.statusItems && props.statusItems.paymentDate ? 
  dayjs(props.statusItems.paymentDate).format("DD-MM-YYYY") : 
  ""
}

 {/* {dayjs(props.statusItems.paymentDate).format("DD-MM-YYYY")} */}

                        </>
                },
                {
                    title: 'Order Pick Up',
                    status:  '',
                   // subTitle: <StatusItemCard statusItems={props.statusItems}/>,
                    description: <>
         
                      <OrdrSuplrStatusItemCard statusItems={props.statusItems} particularRowData={props.particularRowData}/>
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

const mapStateToProps = ({ distributor, auth }) => ({
    statusItems:distributor.statusItems

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getProcureStatusItem

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderSupplierStatuShower);
