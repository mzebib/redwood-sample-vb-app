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

  class changeViewTypeActionChain extends ActionChain {


    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.viewType
     */
    async run(context, { viewType }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.viewType = viewType;
    }
  }

  return changeViewTypeActionChain;
});
