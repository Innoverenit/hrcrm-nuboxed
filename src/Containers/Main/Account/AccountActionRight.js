import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import { Button,  Tooltip } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';

class AccountActionRight extends React.Component {
    render() {
        const { handleDistributorModal, viewType,user } = this.props;
        return (
            <FlexContainer alignItems="center">
                {viewType === "list" ? (
                    <Tooltip title="Create">
                        {user.accountCreateInd === true && user.erpInd === true &&(
                        <Button
                            type="primary"  onClick={() => handleDistributorModal(true)}>
                            <DataSaverOnIcon className=" !text-icon" /> Add {/* <PlusOutlined /> */}
                        </Button>
                        )}
                    </Tooltip>
                ) : null}
                 <div className="max-sm:hidden">
          <Button type="primary"  
        onClick={() => this.props.handleAccountImportModal(true)}
        >
          <UploadIcon className=" !text-icon"/>  Import
          </Button>
          </div>
            </FlexContainer>
        );
    }
}

const mapStateToProps = ({auth }) => ({
    user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountActionRight);
