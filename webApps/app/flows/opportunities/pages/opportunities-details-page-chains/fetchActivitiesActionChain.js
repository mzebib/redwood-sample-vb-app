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

  class fetchActivitiesActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const groupActivitiesByDate = await $functions.groupActivitiesByDate($variables.activityPendingList, $variables.activityCompletedList);

      $variables.activitiesGroupList = groupActivitiesByDate;
    }
  }

  return fetchActivitiesActionChain;
});
