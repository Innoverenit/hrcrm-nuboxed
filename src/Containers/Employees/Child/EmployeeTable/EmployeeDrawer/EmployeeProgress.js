import React from 'react';
import { Flex, Progress } from 'antd';
const EmployeeProgress = () => (
  <Flex gap="small" wrap="wrap">
    <Progress type="circle" percent={75} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} />
  </Flex>
);
export default EmployeeProgress;