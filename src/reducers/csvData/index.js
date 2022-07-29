export function csvData(state = [], action) {
    switch (action.type) {

        case 'GET_ALL_USERS_REQUEST':
            return {
                data: [],
            };

        case 'GET_ALL_USERS_SUCCESS':
            return{
                data: action.payload.csvUsers
            };

        case 'GET_ALL_USERS_FAILURE':
            return {
                data: [], 
            }

        default:
            return state;
    }
}