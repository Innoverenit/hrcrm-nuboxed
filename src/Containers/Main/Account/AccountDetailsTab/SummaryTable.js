import React, { lazy,Suspense } from 'react'
import PieChart1 from '../../../../Components/Charts/PieChart1'
import { BundleLoader } from "../../../../Components/Placeholder";
import { Flex, Progress } from 'antd';
import StackedBarChart from '../../../Dashboard/Child/JumpStart/DashRepairBarClousreJumpstartUser';
import DynamicPieChart from '../../../Dashboard/Child/JumpStart/DynamicPieChart';
const AccountDonutChartByVolume = lazy(() => import("../AccountDetailsTab/AccountDonutChartByVolume"));
const AccountDonutChartByValue = lazy(() => import("../AccountDetailsTab/AccountDonutChartByValue"));
const PulseTable = lazy(() => import("./AccountDocumentTab/PulseTable"));

const SummaryTable = (props) => {
    const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();
  return (
    <>
     <div class="flex flex-col items-center ">
      <div class="font-bold"> {year}</div>
    </div>
   
    <div class="flex justify-between">
        <div class="flex flex-col w-[25%]">
            <div>
            <div class="font-poppins font-bold">Order By Value</div>
     <DynamicPieChart dtype={"value"} 
        userId={props.RowData.distributorId} timeRangeType={props.timeRangeType}/>
     </div>
     <div>
     <div class="font-poppins font-bold">Order By Volume</div>
     <DynamicPieChart dtype={"volume"} 
        userId={props.RowData.distributorId} timeRangeType={props.timeRangeType}/>
   
     </div>
     </div>
     <div class="flex flex-col mt-3 w-[30%] ml-36">
        <div class="flex items-center">
        <div class="w-16">
            LOB 1
            </div>
            <div class="w-wk">
              <StackedBarChart/>
     {/* <Flex gap="small" vertical>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </Flex> */}
  </div>
  </div>
  {/* <div class="flex items-center mt-20">
  <div class="w-16">
  LOB 2
  </div>
  <div class="w-wk">
     <Flex gap="small" vertical>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </Flex>
  </div>
  </div> */}
        </div>
        <div class="flex flex-col w-[33%]">
        <Suspense fallback={<BundleLoader />}>
        <PulseTable
         RowData={props.RowData}
        /></Suspense>
        </div>
    </div>
    </>
  )
}

export default SummaryTable
