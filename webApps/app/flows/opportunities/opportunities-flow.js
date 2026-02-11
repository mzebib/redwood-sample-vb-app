define([], () => {
  'use strict';

  class FlowModule {
    navigateToDetailsEditPage(application, optyId) {
      const navFlow = application.getFlow('opty');
      navFlow.navigateToPage('opty-details-edit-page', {
        optyId: optyId
      });
    }
  }
  
  return FlowModule;
});