import React from 'react'
import PieChart1 from '../../../../Components/Charts/PieChart1'
import { Flex, Progress } from 'antd';

const SummaryTable = () => {
    const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();
  return (
    <>
     <div class="flex flex-col items-start">
      <h1>This Year {year}</h1>
      {/* <p>{day}/{month}/{year} </p> */}
    </div>
   
    <div class="flex justify-between">
        <div class="flex flex-col w-[47.5%]">
            <div>
     <PieChart1/>
     Order By Value
     </div>
     <div>
     <PieChart1/>
     Order By Volume
     </div>
     </div>
     <div class="flex flex-col w-[47.5%]">
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
    </div>
    </>
  )
}

export default SummaryTable
