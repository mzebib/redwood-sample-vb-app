define([], () => {
  'use strict';

  class CalendarPage {
    constructor() {
      this.currentDate = ko.observable(new Date().toISOString());
    }
  }

  return CalendarPage;
});