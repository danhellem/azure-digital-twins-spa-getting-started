export interface IModel {
    decommissioned: boolean;
    displayName: IDisplayName;
    description: string;
    id: string;
}

export interface IModels {
    value: IModel[]
}

export interface IDisplayName
{
    en: string;
}