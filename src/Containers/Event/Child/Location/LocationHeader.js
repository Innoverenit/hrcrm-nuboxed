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
      <div style={{position: "sticky",
      top: "3.35rem",
      zIndex: "998"}} >
        <ActionHeader
            leftComponent={

                <LocationActionLeft
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
                    viewType={viewType}
                    setLocationViewType={setLocationViewType}
                />

            }
          rightComponent={
            <LocationActionRight
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

