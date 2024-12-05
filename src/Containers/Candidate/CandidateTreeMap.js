import React, {  } from 'react'
import Tree from 'react-tree-graph'
import 'react-tree-graph/dist/style.css'
import '../../Containers/Employees/Child/EmployeeTable/styled.css'
const CandidateTreeMap = (props) => {
  console.log("Maped",props.candidateTreeMap)
  const data=props.candidateTreeMap

  return (
   
    <React.Fragment>
      <div className="pulse-background">
        <Tree
          animated
          data={data}
          color="white"
          width={400}
          height={400}        
          nodeRadius={15}
          margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
        />
      </div>
    </React.Fragment>
  )
}

export default (CandidateTreeMap);