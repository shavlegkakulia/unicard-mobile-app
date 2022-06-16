import {ISearchServiceResponse} from '../../services/SearchService';

export enum organization_actions {
  set_organization = 'set_organization',
  set_fetching = 'set_fetching',
}

export interface IOrganizatiosState {
  fetching: boolean;
  organizations: ISearchServiceResponse[] | undefined;
}

export interface IOrganizationAction extends IOrganizatiosState {
  type: string;
}

export interface IOrganizationReducer {
  OrganizationReducer: IOrganizatiosState;
}
