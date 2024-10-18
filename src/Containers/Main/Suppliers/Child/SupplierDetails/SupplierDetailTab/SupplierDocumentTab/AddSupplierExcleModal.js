import React, { lazy, Suspense, Component } from "react";
import { Button,Switch } from "antd";
import { StyledDrawer} from "../../../../../../../Components/UI/Antd";
import AddSupplierExcleForm from "./AddSupplierExcleForm";
import AddManualForm from "./AddManualForm";

const ButtonGroup = Button.Group;

class AddSupplierExcleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isManual: true
        };
      }
      handleToggle = (checked) => {
        this.setState({
          isManual: checked
        });
      }
  render() {
    const {
        supplierExcleUploadModal,
        handleSupplierExcleUploadModal,
    } = this.props;
    return (
      <>
        <StyledDrawer
          title="Add Inventory"
          width="90%"
          visible={supplierExcleUploadModal}
          destroyOnClose
                    closable
                    onClose={() => handleSupplierExcleUploadModal(false)}
                    footer={null}
        >
          {/* <Suspense fallback={<BundleLoader />}>
            <AddSupplierExcleForm  
            />
          </Suspense> */}
           <div>
           <Switch
          checked={this.state.isManual}
          onChange={this.handleToggle}
          checkedChildren="Manual"
          unCheckedChildren="Excel"
          loading={false}
        />
        <div class="mt-2"></div>
        <Suspense fallback={<div>Loading...</div>}>
          {this.state.isManual ? (
           
           <AddManualForm/>
          ) : (
            <AddSupplierExcleForm />
          )}
        </Suspense>
      </div>
        </StyledDrawer>
      </>
    );
  }
}

export default AddSupplierExcleModal;
