let Constants = []
Constants['ActivityStatusPlanned'] = 1;
Constants['ActivityStatusStarted'] = 2;
Constants['ActivityStatusFinished'] = 3;
Constants['ActivityStatusCanceled'] = 4;
Constants['ActivityStatusDeleted'] = 5;
Constants['UnsuccessfulReason_No_Answer'] = 1;
Constants['UnsuccessfulReason_Left_a_Voicemail'] = 2;
Constants['UnsuccessfulReason_Requested_a_Call_Back'] = 3;
Constants['UnsuccessfulReason_Booked_in_a_Call'] = 4;
Constants['AccountActiveStatus'] = 1;
Constants['AccountCloseStatus'] = 2;
Constants['AccountHoldStatus'] = 3;
Constants['CallTypeOutbound'] = 1;
Constants['CallTypeInbound'] = 2;
Constants['HubExecutionStatus'] = 1;
Constants['is_post_to_charms_no'] = 0;
Constants['is_post_to_charms_yes'] = 1;
Constants['post_hold_to_charms_yes'] = 1;
Constants['post_hold_to_charms_no'] = 0;

Constants['home_page'] = '/diary-management';

/** USER ENCRYPTION KEY */
Constants['response_cipher_key']='986669ea-74fb-4591-a271-ee987cd65695'
/*END OF USER ENCRYPTION KEY */

/** UNSUBSCRIBE ACCESS KEY FOR AUTH */
Constants['UNSUBSCRIBE_ACCESS_API_KEY'] = '046d5b80-0ee8-11ec-a65e-619896b1cea4';
/** End UNSUBSCRIBE ACCESS KEY FOR AUTH */

Constants['is_unsubscribe_no'] = 1
Constants['is_unsubscribe_yes'] = 2

/**FOR MODULES AND PERMISSIONS */
Constants['user'] = 1
Constants['diary-management'] = 2
Constants['enquiries'] = 3
Constants['engagement-hub'] = 4
Constants['reports'] = 5
Constants['duplicate-check'] = 6
Constants['user-profile'] = '/user-profile'

//Yes Or No
Constants['Yes'] = 1
Constants['No'] = 2

//Cal Flag 
Constants[1] = 'Successful'
Constants[2] = 'Not Successful'

//Email recurence type
Constants['crm_recurrence_type_only_once'] = 1
Constants['crm_recurrence_type_daily'] = 2
Constants['crm_recurrence_type_weekly'] = 3
Constants['crm_recurrence_type_monthly'] = 4
Constants['crm_recurrence_type_quarterly'] = 5
Constants['crm_recurrence_type_yearly'] = 6


export default Constants;