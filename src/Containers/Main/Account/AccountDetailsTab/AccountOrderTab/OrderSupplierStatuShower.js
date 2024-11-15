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

      const steps = [
        { id: 1, label: "Select items", icon: "🛒" },
        { id: 2, label: "Add to cart", icon: "🛍️" },
        { id: 3, label: "Enter your address", icon: "📍" },
        { id: 4, label: "Payment", icon: "💳" },
        { id: 5, label: "Delivery to your home", icon: "🚚" },
    ];

  return (
    <React.Fragment>
    
    {/* <div class="bg-white">
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
      
    </div> */}
        <div className="bg-white p-4 rounded-md shadow-md">
            <div className="relative flex items-center justify-between px-4">
         
                <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500 z-0"></div>
                
                    <div className="relative z-10 flex flex-col items-center">
                 <div className="text-4xl mb-2">🛒</div>
                        
     
                        <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                            1
                        </div>
                        
         <p className="mt-2 text-sm font-medium text-center">Order Created</p>
         <b> {dayjs(props.statusItems.creationDate).format("DD-MM-YYYY")} </b>
                    </div>
            
                    <div className="relative z-10 flex flex-col items-center">
                 <div className="text-4xl mb-2">🛍️</div>
                        
     
                        <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                            2
                        </div>
                        
         <p className="mt-2 text-sm font-medium text-center">Payment</p>
         <b> {props.statusItems.paymentType} |{props.statusItems && props.statusItems.paymentDate ? 
  dayjs(props.statusItems.paymentDate).format("DD-MM-YYYY") : 
  ""
}</b>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                 <div className="text-4xl mb-2">🛒</div>
                        
     
                        <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                            3
                        </div>
                        
         <p className="mt-2 text-sm font-medium text-center">Order Pick Up</p>
         {/* <OrdrSuplrStatusItemCard statusItems={props.statusItems} particularRowData={props.particularRowData}/> */}
                    </div>
            </div>
        </div>

        <OrdrSuplrStatusItemCard statusItems={props.statusItems} particularRowData={props.particularRowData}/>
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
