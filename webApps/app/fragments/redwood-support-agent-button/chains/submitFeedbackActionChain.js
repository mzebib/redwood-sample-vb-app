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

  class submitFeedbackActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $fragment, $application, $constants, $variables } = context;

      $variables.submitInProgress = true;

      const response = await Actions.callRest(context, {
        endpoint: 'redwoodAgenticEngineeringAPI/postApiAgent',
        body: $variables.userRequest,
      });

      if (response.ok === true) {

        await Actions.fireNotificationEvent(context, {
          summary: 'Feedback Received',
          displayMode: 'persist',
          type: 'confirmation',
          message: 'Thank you for your feedback! Our product team will review it and will notify you of any updates.',
        });

        await Actions.resetVariables(context, {
          variables: [
    '$variables.userRequest',
  ],
        });

        await Actions.callChain(context, {
          chain: 'closeSupportDialogActionChain',
        });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Feedback Processing Failed',
          message: 'Sorry, feedback couldn\'t be processed at this time. Please try again later.',
          displayMode: 'persist',
        });
      }

      $variables.submitInProgress = false;
    }
  }

  return submitFeedbackActionChain;
});
