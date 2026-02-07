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

  class closeSupportDialogActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $fragment, $application, $constants, $variables } = context;

      const ojDialogSupportOpen = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-support',
        method: 'isOpen',
      });

      if (ojDialogSupportOpen === true) {
        const ojDialogSupportClose = await Actions.callComponentMethod(context, {
          selector: '#oj-dialog-support',
          method: 'close',
        });
      }
    }
  }

  return closeSupportDialogActionChain;
});
