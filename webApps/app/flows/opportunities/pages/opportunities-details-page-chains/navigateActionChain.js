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

  class navigateActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.page The page to navigate to
     */
    async run(context, { page }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (page) {
        await Actions.navigateToPage(context, {
          page: page,
        });
      }
    }
  }

  return navigateActionChain;
});
