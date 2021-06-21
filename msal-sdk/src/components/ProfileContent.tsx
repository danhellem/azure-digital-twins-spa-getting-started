import React from "react";

export class ProfileContent extends React.Component<IProfileContentProps, {}> {
    static defaultProps: Partial<IProfileContentProps> = {};

    render() {
        return (
            <div>profile content</div>
        )
    }
}

export default ProfileContent;

interface IProfileContentProps {
    open: boolean;    
  }