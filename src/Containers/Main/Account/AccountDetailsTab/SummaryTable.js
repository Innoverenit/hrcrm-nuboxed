import React, { lazy,Suspense } from 'react'
import PieChart1 from '../../../../Components/Charts/PieChart1'
import { BundleLoader } from "../../../../Components/Placeholder";
import { Flex, Progress } from 'antd';
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
            Order By Value
     <AccountDonutChartByValue/>
    
     </div>
     <div>
     Order By Volume
     <AccountDonutChartByVolume/>
   
     </div>
     </div>
     <div class="flex flex-col mt-3 w-[30%] ml-36">
        <div class="flex items-center">
        <div class="w-16">
            LOB 1
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
  </div>
  <div class="flex items-center mt-20">
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
  </div>
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
