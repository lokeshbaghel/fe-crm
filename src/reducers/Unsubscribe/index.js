export function unsubscribe(state = [], action) {
    switch (action.type) {

        case 'UNSUBSCRIBE_REQUEST':
            return{
                blocking            : true,
                is_unsubscribe      : null,
                message             : null
            };
        
        case 'UNSUBSCRIBE_SUCCESS':
            return{
                blocking            : false,
                is_unsubscribe      : action.payload.is_unsubscribe,
                message             : action.payload.message,
            };

        case 'UNSUBSCRIBE_FAILURE':
            return{
                blocking            : false,
                is_unsubscribe      : null,
                message             : null
            };

        default:
            return state;
    }
}