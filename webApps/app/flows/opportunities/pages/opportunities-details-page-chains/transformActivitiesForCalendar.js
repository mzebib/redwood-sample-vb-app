define([], () => {
  'use strict';

  return class PageModule {
    transformActivities(activities) {
      if (!activities) {
        return [];
      }

      return activities.map(activity => {
        return {
          id: activity.id,
          start: activity.activityDate,
          end: activity.activityDate,
          allDay: true,
          eventTitle: activity.title,
          calendarProvider: 'appointments',
          tertiaryText: '',
          metaText: '',
          icon: activity.icon,
          iconLabel: ''
        };
      });
    }
  };
});