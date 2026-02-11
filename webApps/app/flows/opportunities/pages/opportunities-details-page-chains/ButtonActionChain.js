define([], () => {
  'use strict';

  class ButtonActionChain extends ActionChain {
    run() {
      // Navigates to the edit page
      return navigateToEdit();
    }
  }

  return ButtonActionChain;
});