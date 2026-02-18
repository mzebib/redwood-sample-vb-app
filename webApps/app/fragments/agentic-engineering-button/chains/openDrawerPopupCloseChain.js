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

  class openDrawerPopupCloseChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $fragment, $application, $constants, $variables } = context;

      $variables.openDrawerPopup = true;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.userRequest',
  ],
      });
    }
  }

  return openDrawerPopupCloseChain;
});
