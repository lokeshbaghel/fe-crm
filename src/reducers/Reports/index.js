export function reports(state = [], action) {
    switch (action.type) {

        /* Cases for getting reports page default data */
        case 'GET_REPORT_LIST_REQUEST':
            return {
                blocking                    : true,
                enquiryTargetCardData       : [],
                enquiryTargetGraphData      : [],
                positiveScreeningCardData   : [],
                dropOffCardData             : [],
                filterData                  : [],
                agencies                    : [],
                marketingSources            : [],
                campaigns                   : [],
                dropOffCardDataList         : [],
                positiveScreeningRecords    : [],
                conversionRateCardData      : [],
                costPerConversionCardData   : [],
                conversionRateGraphData     : [],
                costPerConversionGraphData  : [],
                approvalForecastCardData    : [],
                approvalForecastGraphData   : [],
                enquiryTypes                : [],
                localAuthorityList          :[]
            };

        case 'GET_REPORT_LIST_SUCCESS':
            return {
                blocking                    : false,
                enquiryTargetCardData       : action.payload.enquiryTargetCardData,
                enquiryTargetGraphData      : action.payload.enquiryTargetGraphData,
                positiveScreeningCardData   : action.payload.positiveScreeningCardData,
                dropOffCardData             : action.payload.dropOffCardData,
                filterData                  : action.payload.filterDataResponse,
                agencies                    : action.payload.agencies,
                marketingSources            : action.payload.marketingSources,
                campaigns                   : action.payload.campaigns,
                dropOffCardDataList         : action.payload.dropOffCardDataList,
                positiveScreeningRecords    : action.payload.positiveScreeningRecords,
                conversionRateTargetCard    : action.payload.conversionRateTargetCard,
                costPerConversionCardData   : action.payload.costPerConversionCardData,
                conversionRateGraphData     : action.payload.conversionRateGraphData,
                costPerConversionGraphData  : action.payload.costPerConversionGraphData,
                approvalForecastCardData    : action.payload.approvalForecastCardData,
                approvalForecastGraphData   : action.payload.approvalForecastGraphData,
                enquiryTypes                : action.payload.enquiryTypes,
                localAuthorityList          : action.payload.localAuthority
            };
        
        case 'GET_REPORT_LIST_FAILURE':
            return {
                blocking                    : false,
                enquiryTargetCardData       : [],
                enquiryTargetGraphData      : [],
                positiveScreeningCardData   : [],
                dropOffCardData             : [],
                filterData                  : [],
                agencies                    : [],
                marketingSources            : [],
                campaigns                   : [],
                dropOffCardDataList         : [],
                positiveScreeningRecords    : [],
                conversionRateTargetCard    : [],
                costPerConversionCardData   : [],
                conversionRateGraphData     : [],
                costPerConversionGraphData  : [],
                approvalForecastCardData    : [],
                approvalForecastGraphData   : [],
                enquiryTypes                : [],
                localAuthorityList          : []
            };

        /* Cases for resetting reports */
        case 'RESET_REPORTS_DATA':
            return []; 

        default:
            return state;
    }
}