import React, { lazy,Suspense } from 'react'
import { BundleLoader } from "../../../../Components/Placeholder";
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

       <div class="font-bold"> {year}</div>
       
    <div class="flex justify-between w-[79rem]">
    <div class="flex flex-col w-[35rem]">
        <Suspense fallback={<BundleLoader />}>
        <PulseTable
         RowData={props.RowData}
        /></Suspense>
        </div>
        <div class="flex flex-col ml-2">
        <div class="flex  w-[25%]">
            <div class="flex ">
            <div class="font-poppins font-bold">Order By Value</div>
     <DynamicPieChart dtype={"DistributorOrder"} 
        userId={props.RowData.distributorId} timeRangeType={year}/>
     </div>
     <div class="flex  justify-end">
     <div class="font-poppins font-bold">Order By Volume</div>
     <DynamicPieChart dtype={"DistributoVolume"} 
        userId={props.RowData.distributorId} timeRangeType={year}/>
   
     </div>
     </div>
     <div class="flex items-center w-[50rem]">
        <div class="w-16">
            LOB 1
            </div>
            <div class="w-[50rem]">
              <StackedBarChart dtype={"Bar"} 
        userId={props.RowData.distributorId} timeRangeType={year}/>
     {/* <Flex gap="small" vertical>
    <Progress percent={30} />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </Flex> */}
  </div>
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

    </>
  )
}

export default SummaryTable
