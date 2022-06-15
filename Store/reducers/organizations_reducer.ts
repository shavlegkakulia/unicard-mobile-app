import { IOrganizationAction, IOrganizatiosState, organization_actions } from "../types/organizations_types";

const initialState: IOrganizatiosState = {
    organizations: undefined,
    fetching: false
}

export default function OrganizationReducer (state = initialState, action: IOrganizationAction) {
    switch(action.type) {
        case organization_actions.set_organization: 
            return {...state, organizations: action.organizations}
        case organization_actions.set_fetching: 
            return {...state, fetching: action.fetching}
        default: return {...state}
    }
}