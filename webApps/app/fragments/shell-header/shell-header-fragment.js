define([],
  () => {
  'use strict';

  class FragmentModule {
  };
  
  FragmentModule.prototype.navigateToHomePage = function() {
    let url = window.location.href;
    let parseUrlArr = url.split('?');

    if (parseUrlArr && parseUrlArr.length > 1) {
      const baseUrl = parseUrlArr[0];
      window.location.replace(baseUrl);
    }
  };

  return FragmentModule;
});