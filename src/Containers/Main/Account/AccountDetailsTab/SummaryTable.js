import React from 'react'
import PieChart1 from '../../../../Components/Charts/PieChart1'
import { Flex, Progress } from 'antd';
import PulseTable from './AccountDocumentTab/PulseTable';

const SummaryTable = (props) => {
    const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();
  return (
    <>
     <div class="flex flex-col items-center ">
      <label class="font-bold"> {year}</label>
    </div>
   
    <div class="flex justify-between">
        <div class="flex flex-col w-[25%]">
            <div>
            Order By Value
     <PieChart1/>
    
     </div>
     <div>
     Order By Volume
     <PieChart1/>
   
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
        <PulseTable
         RowData={props.RowData}
        />
        </div>
    </div>
    </>
  )
}

export default SummaryTable
