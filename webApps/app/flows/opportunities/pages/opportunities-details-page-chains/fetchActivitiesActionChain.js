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

      // Create calendar events
      const calendarEvents = [];
      const allActivities = [...$variables.activityPendingList, ...$variables.activityCompletedList];

      allActivities.forEach(activity => {
        if (activity.activityType === 'APPOINTMENT') {
          const startDate = new Date(activity.activityDate);
          const [time, ampm] = activity.activityTime.split(' ');
          let [hours, minutes] = time.split(':');

          if (ampm === 'PM' && hours !== '12') {
            hours = parseInt(hours, 10) + 12;
          } else if (ampm === 'AM' && hours === '12') {
            hours = 0;
          }

          startDate.setHours(hours);
          startDate.setMinutes(minutes);

          const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // Assuming 30 minutes duration

          calendarEvents.push({
            id: activity.id,
            title: activity.title,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            allDay: false,
          });
        }
      });

      $variables.calendarEventsList = calendarEvents;
    }
  }

  return fetchActivitiesActionChain;
});