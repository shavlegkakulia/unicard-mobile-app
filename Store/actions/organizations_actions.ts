import SearchService, {
  ISearchDetailsRequest,
} from '../../services/SearchService';
import {organization_actions} from '../types/organizations_types';

export const get_organizations =
  (data?: ISearchDetailsRequest) => (dispatch: any) => {
    dispatch({type: organization_actions.set_fetching, fetching: true});
    SearchService.GenerateSearch(data).subscribe({
      next: Response => {
        console.log('++++++++++++++++++', Response.data.search_result);
        if (Response.data.resultCode === '200') {
          dispatch({
            type: organization_actions.set_organization,
            organizations: Response.data.search_result,
          });
        }
      },
      complete: () =>
        dispatch({type: organization_actions.set_fetching, fetching: false}),
      error: () =>
        dispatch({type: organization_actions.set_fetching, fetching: false}),
    });
  };

