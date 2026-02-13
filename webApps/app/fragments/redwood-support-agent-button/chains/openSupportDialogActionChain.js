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

  class openSupportDialogActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $fragment, $application, $constants, $variables } = context;

      const ojDialogSupportOpen = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-support',
        method: 'isOpen',
      });

      if (ojDialogSupportOpen === false) {
        await Actions.resetVariables(context, {
          variables: [
    '$variables.userRequest',
  ],
        });

        const ojDialogSupportOpen2 = await Actions.callComponentMethod(context, {
          selector: '#oj-dialog-support',
          method: 'open',
        });
      }
    }
  }

  return openSupportDialogActionChain;
});
