import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../../Components/Utils";
const LocationActionLeft=lazy(()=>import("./LocationActionLeft"));
const LocationActionRight=lazy(()=> import("./LocationActionRight"));

class LocationHeader extends Component {
  render() {
    const {
        
        viewType,
        setLocationViewType,
    } = this.props;
    return (
      <div className="sticky mt-1 z-50"> 
        <ActionHeader
            leftComponent={

                <LocationActionLeft
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                translatedMenuItems={this.props.translatedMenuItems}
                    viewType={viewType}
                    setLocationViewType={setLocationViewType}
                />

            }
          rightComponent={
            <LocationActionRight
            translatedMenuItems={this.props.translatedMenuItems}
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            handleLocationModal={this.props.handleLocationModal}
          addlocationModal={this.props.addlocationModal}
            />
          }
        />
      </div>
    );
  }
}

export default LocationHeader;

