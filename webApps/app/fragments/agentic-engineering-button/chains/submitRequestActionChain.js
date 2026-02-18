define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class submitRequestActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $fragment, $application, $constants, $variables } = context;

      if ($variables.validRequest === 'valid') {
        $variables.submitInProgress = true;

        const response = await Actions.callRest(context, {
          endpoint: 'redwoodAgenticEngineeringAPI/postApiAgent',
          body: $variables.userRequest,
        });

        if (response.ok === true) {

          await Actions.fireNotificationEvent(context, {
            summary: 'Request Received',
            displayMode: 'persist',
            type: 'confirmation',
            message: 'Thank you for your request! Our product team will review it and will notify you of any updates.',
          });

          await Actions.resetVariables(context, {
            variables: [
              '$variables.userRequest',
            ],
          });

          await Actions.callChain(context, {
            chain: 'closeDrawerPopupCloseChain',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Request Processing Failed',
            message: 'Sorry, your request couldn\'t be processed at this time. Please try again later.',
            displayMode: 'persist',
          });
        }

        $variables.submitInProgress = false;
      }
    }
  }

  return submitRequestActionChain;
});
