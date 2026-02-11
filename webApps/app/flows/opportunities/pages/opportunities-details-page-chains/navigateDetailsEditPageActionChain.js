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

  class navigateDetailsEditPageActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const toOpportunitiesDetailsEdit = await Actions.navigateToPage(context, {
        page: 'opportunities-details-edit',
      });
    }
  }

  return navigateDetailsEditPageActionChain;
});
