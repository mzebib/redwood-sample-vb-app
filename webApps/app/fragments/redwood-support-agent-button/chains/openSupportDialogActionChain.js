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
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $fragment, $application, $constants, $variables } = context;

      const ojDialogSupportOpen = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-support',
        method: 'open',
      });
    }
  }

  return openSupportDialogActionChain;
});
