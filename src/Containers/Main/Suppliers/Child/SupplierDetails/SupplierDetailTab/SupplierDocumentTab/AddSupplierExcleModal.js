import React, { lazy, Suspense, Component } from "react";
import { Button,Switch } from "antd";
import { StyledDrawer} from "../../../../../../../Components/UI/Antd";
import AddSupplierDocumentForm from "./AddSupplierDocumentForm";
import { BundleLoader } from "../../../../../../../Components/Placeholder";
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
          title="Excle"
          width="85%"
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
          checkedChildren="Excel"
          unCheckedChildren="Manual"
          loading={false}
        />
        <div class="mt-2"></div>
        <Suspense fallback={<div>Loading...</div>}>
          {this.state.isManual ? (
           <AddSupplierExcleForm />
          ) : (
          <AddManualForm/>
          )}
        </Suspense>
      </div>
        </StyledDrawer>
      </>
    );
  }
}

export default AddSupplierExcleModal;
