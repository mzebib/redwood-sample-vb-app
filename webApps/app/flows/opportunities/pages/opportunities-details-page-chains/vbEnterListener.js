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

  class vbEnterListener extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;


      await Actions.callChain(context, {
        chain: 'fetchActivitiesActionChain',
      });

      const calendarEvents = await $page.functions.getCalendarEvents($variables.activityPendingList);

      await Actions.assignVariable(context, {
        variable: '$page.variables.calendarEventsList',
        value: calendarEvents,
      });
    }
  }

  return vbEnterListener;
});
