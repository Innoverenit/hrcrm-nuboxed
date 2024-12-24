import React, {Suspense, lazy, useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Rate, Steps,Tooltip,Progress } from 'antd';
import {getProcureStatusItem} from "../../AccountAction";
import dayjs from 'dayjs';
import OrdrSuplrStatusItemCard from "./OrdrSuplrStatusItemCard";

function OrderSupplierStatuShower (props) {
  useEffect(()=>{
    props.getProcureStatusItem(props.particularRowData.orderId);
      },[]);

  return (
   <React.Fragment>
        <div className="bg-white p-4 rounded-md shadow-md">
            <div className="relative flex items-center justify-between px-4">
         
                <div className="absolute top-1/2 left-0 w-full h-1 bg-red-500 z-0"></div>
                
                    <div className="relative z-10 flex flex-col items-center">
                 <div className="text-4xl mb-2">🛒</div>
                        
     
                        <div className={`${props.statusItems.creationDate ? "bg-green-500  w-8 h-8 text-white rounded-full flex items-center justify-center":"bg-red-500 w-8 h-8 text-white rounded-full flex items-center justify-center"}`}>
                            1
                        </div>
                        
         <p className="mt-2 text-sm font-medium text-center">{props.translatedMenuItems[85]}</p>
         <b> {dayjs(props.statusItems.creationDate).format("DD-MM-YYYY")} </b>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                 <div className="text-4xl mb-2">🛒</div>
                        <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                            2
                        </div>
         <p className="mt-2 text-sm font-medium text-center">{props.translatedMenuItems[10]}</p>
         {/*  */} <Tooltip title="">
{" "}
<Progress
type="circle"
className=" !text-xl cursor-pointer text-[red]"
percent={25}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                 <div className="text-4xl mb-2">🛍️</div>
                        <div className={`${props.statusItems.paymentType ? "w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center":"w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"}`}>
                            3
                        </div>
         <p className="mt-2 text-sm font-medium text-center">{props.translatedMenuItems[23]}</p>
         <b> {`${props.statusItems.paymentType ? `${props.statusItems.paymentType} |` :""} ${props.statusItems && props.statusItems.paymentDate ? 
  dayjs(props.statusItems.paymentDate).format("DD-MM-YYYY") : 
  ""
}`}</b>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                 <div className="text-4xl mb-2">🛒</div>
                        <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                            4
                        </div>
         <p className="mt-2 text-sm font-medium text-center">Pack</p>
         {/*  */}
         <Tooltip title="">
{" "}
<Progress
type="circle"
className=" !text-xl cursor-pointer text-[red]"
percent={50}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                 <div className="text-4xl mb-2">🛒</div>
                        <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                            5
                        </div>
         <p className="mt-2 text-sm font-medium text-center">{props.translatedMenuItems[95]}</p>
         <Tooltip title="">
{" "}
<Progress
type="circle"
className=" !text-xl cursor-pointer text-[red]"
percent={71}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                 <div className="text-4xl mb-2">📍</div>
                        <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                            6
                        </div>
         <p className="mt-2 text-sm font-medium text-center">{props.translatedMenuItems[47]}</p>
         {/*  */}   <Tooltip title="">
{" "}
<Progress
type="circle"
className=" !text-xl cursor-pointer text-[red]"
percent={57}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                 <div className="text-4xl mb-2">🚚</div>
                        <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                            7
                        </div>
         <p className="mt-2 text-sm font-medium text-center">Delivered</p>
  <Tooltip title="">
{" "}
<Progress
type="circle"
className=" !text-xl cursor-pointer text-[red]"
percent={88}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
                    </div>  
            </div>
        </div>
        <OrdrSuplrStatusItemCard statusItems={props.statusItems} particularRowData={props.particularRowData} translatedMenuItems={props.translatedMenuItems}/>
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
