import React from 'react'
import Tree from 'react-tree-graph'
import 'react-tree-graph/dist/style.css'

import './styled.css'
const EmployeeTreeMap = (props) => {
  console.log("Maped",props.employeeTreeMap)
  const data=props.employeeTreeMap

  return (
   
    <React.Fragment>
      <div className="pulse-background">
        <Tree
          animated
          data={data}
          color="white"
          width={400}
          height={400}
          //style={{ backgroundColor:"whitesmoke"}}
          
          nodeRadius={15}
          // gProps={{ className: 'node', onClick: handleClick }}
          margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
        />
      </div>
    </React.Fragment>
  )
}

export default (EmployeeTreeMap);