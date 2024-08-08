import React, { Component } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Button,Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TextInput } from "../../../../../Components/UI/Elements";
import ViewEditCard from "../../../../../Components/UI/Elements/ViewEditCard";
import dayjs from "dayjs";
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";

class SingleCertification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      editInd: true,
    };
  }
  render() {
    const {
      certification: { name,creationDate, certificationId },
      handleChange,
      value,
      data,
      linkedCertification,
      handleUpdateCertification,
      handleDeleteCertification,
      updatingCertifications,
      
    } = this.props;
    console.log();
    const currentdate = dayjs().format("DD/MM/YYYY");
        const date = dayjs(creationDate).format("DD/MM/YYYY");
    // const disableDelete = linkedSources && linkedSources.includes(documentTypeId)
    return (
      <CertificationWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div class=" flex justify-between" >
                <CertificationName style={{ flexBasis: "85%" }}>{name} &nbsp;&nbsp;{date === currentdate ? <span className="blink">New</span> : null}</CertificationName>
                <div>
                  {this.props.certification.editInd ? (
       <BorderColorIcon
    style={{fontSize:"1rem"}}
       tooltipTitle="Edit"
       iconType="edit"
       onClick={toggleViewType}
       
     />
                  ) : null}
                  &nbsp;
                  <Tooltip title="Delete">
                  <StyledPopconfirm
              // title="Do you want to delete?"
              title={<FormattedMessage id="app.doyouwanttodelete" defaultMessage="Do you want to delete" />}
              onConfirm={() => handleDeleteCertification(certificationId)}
            >
                    <DeleteOutlined
                     
                      // onClick={() => handleDeleteCertification(certificationId)}
                      size="14px"
                      style={{
                        verticalAlign: "center",
                        marginLeft: "5px",
                        color: "red",
                      }}
                    />
                     </StyledPopconfirm>
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div class=" flex">
                <TextInput
                  name={data}
                  // value={value || libraryType}
                  defaultValue={name}
                  onChange={handleChange}
                  style={{ width: "61%" }}
                />
                <br />
             
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                   Loading={updatingCertifications}
                    //disabled={!value}
                    onClick={() =>
                     handleUpdateCertification(certificationId, value, toggleViewType())
                    }
                  >
                    {/* Save */}
                    <FormattedMessage id="app.update" defaultMessage="Update" />
                  </Button>
                  &nbsp;
                  <Button type="primary" ghost onClick={() => toggleViewType()}>
                    {/* Cancel */}
                    <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                  </Button>
                </div>
              </div>
            )
          }
        </ViewEditCard>
      </CertificationWrapper>
    );
  }
}

export default SingleCertification;

const CertificationWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const CertificationName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const LibraryValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;


const AppIcon1 = (props) => (
  
  <BorderColorIcon

  />



);

const EditIcon1 = styled(AppIcon1)`
  color: black;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
