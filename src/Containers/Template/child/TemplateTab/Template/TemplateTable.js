import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, } from "antd";
import {
  StyledTable,
} from "../../../../../Components/UI/Antd";
import AddTemplateViewModal from "../Template/AddTemplateViewModal"

import { getTemplate } from "../../../../Rules/RulesAction";
import dayjs from "dayjs";
import { setCurrentEmail,handleTemplateViewModal } from "../../../../Rules/RulesAction";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const ButtonGroup = Button.Group;

// const data = [{ templateName: "Birthday", date: "29-10-20" }];
class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      templateId: "",
      template: "",
      type: "",
    };
  }
  componentDidMount() {
    this.props.getTemplate();
  }

  handleIconClick = (templateId, template, type) => {
    this.setState({ templateId, template, type });
    this.setState({ show: true });
  };
  // static getDerivedStateFromProps(props, state) {
  //   const { template } = this.props;
  //   console.log(">>>>stateChange<<<<<<<<<<<<<<<", state);
  // }
  handleCloseIconClick = () => {
    this.setState({ show: false });
  };
  render() {
    const columns = [
      { title: "", width: "2%" },
      { title: "Name", dataIndex: "name", width: "30%" },
      { title: "Customer", dataIndex: "customerName", width: "30%" },
      { title: "Description", dataIndex: "description", width: "40%" },
      { title: "Tag with", 
      dataIndex: "tagWith", 
      width: "40%",
      render: (name, item, i) => {
        return (
          <div class=" flex justify-evenly" >
          <ButtonGroup >
          <Button
        //  onClick={handleAdd}
        type="primary"
        //  style={{
        //   marginBottom: 16
        // }}
      >
        Action
      </Button>
      <Button
        //  onClick={handleAdd}
        type="primary"
        //  style={{
        //   marginBottom: 16
        // }}
      >
        Sequence
      </Button>
      <Button
        //  onClick={handleAdd}
        type="primary"
        //  style={{
        //   marginBottom: 16
        // }}
      >
        None
      </Button>
          
            
          </ButtonGroup>
        
        </div>
              
        )
      },

     },

      {
        title: "Created on",

        width: "15%",
        render: (name, item, i) => {
          return <span>{dayjs(item.creationDate).format("YYYY-MM-DD")}</span>;
        },
      },

      {
        title: "",
        width: "5%",
        render: (name, item, i) => {
          const close =
            this.state.templateId === item.templateId &&
            this.state.show === true;
          return (
            <>
             <Tooltip
                  // title="Close Template"
                  title="Close Template"
                
                >
                  <VisibilityOffIcon
                    type="eye-invisible"
                    onClick={() => {
                     
                      this.props.handleTemplateViewModal(true);
                     // handleSetCurrentCandidateId(item.candidateId);
                    
                   }}
                    style={{
                      fontSize: "1.125em",
                      //color: this.state.show ? "#1890ff" : "black",
                    }}
                    size="30"
                  />
                </Tooltip>
              
            </>
          );
        },
      },
    ];

    return (
      <>
        {/* <div> */}
          <StyledTable
            columns={columns}
            dataSource={this.props.template}
            scroll={{ y: 200 }}
            pagination={false}
         // pagination={{
            //   defaultPageSize: 10,
            //   showSizeChanger: true,
            //   pageSizeOptions: ["10", "20", "30", "40", "50"],
            // }}
          />
        {/* </div> */}
        {/* {this.state.show && ( */}
          {/* <div style={{ marginTop: "0.625em", borderTop: "0.0625em solid #adabab" }}> */}
            {/* <TemplateView
              templateId={this.state.templateId}
              template={this.state.template}
              type={this.state.type}
              currentEmail={this.props.currentEmail}
            /> */}
             <AddTemplateViewModal
             templateViewModal={this.props.templateViewModal}
             handleTemplateViewModal={this.props.handleTemplateViewModal}
              templateId={this.state.templateId}
              template={this.state.template}
              type={this.state.type}
              currentEmail={this.props.currentEmail}
            />
          {/* </div> */}
        {/* )} */}
      </>
    );
  }
}
const mapStateToProps = ({ rule }) => ({
  template: rule.template,
  currentEmail: rule.currentEmail,
  templateViewModal:rule.templateViewModal
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTemplate,
      setCurrentEmail,
      handleTemplateViewModal
    },
    dispatch
  );



export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable)

// function Button({ type, iconType, tooltip, role, size, onClick }) {
//   if (role === type) {
//     size = "1.375em";
//   } else {
//     size = "1em";
//   }
//   return (
//     <Tooltip title={tooltip}>
//       <Button
//         style={{
//           padding: "0.375em",
//           borderColor: "transparent",
//           color: role === type ? "#1890ff" : "grey",
//         }}
//         ghost={role !== type}
//         onClick={onClick}
//       >
//         {/* <i className={`fas ${iconType}`} style={{ fontSize: "1.25em" }}></i> */}
//       </Button>
//     </Tooltip>
//   );
// }
