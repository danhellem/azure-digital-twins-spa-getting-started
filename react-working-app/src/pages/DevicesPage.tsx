import React from "react";

interface Props {}

export class DevicesPage extends React.Component<Props, IDevicesPage> {
    state: IDevicesPage = {
      message: "",     
    };
  
    componentDidMount() {
      
    }

    render() {
        return (
          <div>devices
          </div>
        )
    }
}

export default DevicesPage;

export interface IDevicesPage {
  message: string;  
}