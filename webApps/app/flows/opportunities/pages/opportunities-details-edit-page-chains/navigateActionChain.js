define([], () => {
  'use strict';

  class navigateActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const {
        $flow,
        $application
      } = context;
      await $flow.functions.navigateToDetailsEditPage($application, $flow.variables.opty.id);
    }
  }

  return navigateActionChain;
});