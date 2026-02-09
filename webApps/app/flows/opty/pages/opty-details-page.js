define(["ojs/ojarraydataprovider"], function (ArrayDataProvider) {
  'use strict';

  const actionTypesMap = new Map();
  const activitiesGroupMap = new Map();
  const activitiesMap = new Map();
  const objectivesMap = new Map();

  class PageModule {
    constructor(context) {
      // Initialize viewType to 'overview' when the page loads
      this.viewType = 'overview';
    }

    createADP(items, key) {
      return new ArrayDataProvider(items, { keyAttributes: key });
    }

    calculateOptyAmount(productsList) {
      let total = 0;

      if (productsList && productsList.length > 0) {
        for (const product of productsList) {
          total += product.amount;
        }
      }

      return total;
    }

    getGuidancePrompt(activityCompletedList, activityPendingList, opty) {
      let prompt = 'I am a B2B sales rep trying to qualify an opportunity for the following account: ' + opty.account + ". ";
      prompt += 'Generate actions for the following objectives: 1. Complete Research & Introduction, 2. Complete Discovery, and 3. Present the Solution to the Prospect. The actions may only include: Create Appointment, Create Task, Create Note, or Send Email. Only include relevant actions and spell the actions exactly as mentioned. Return response in the following JSON format: objectives (id, objective, status (PENDING) and actions (id, title. description, actionType, status (PENDING) fields) fields. The title should be 2-5 word summary of description and different from the actionType. Only return JSON object do not return any other text.';

      // let prompt = 'I am a B2B sales rep trying to qualify an opportunity for the HealthCo account. Generate actions for the following objectives: 1. Complete Research & Introduction, 2. Complete Discovery, and 3. Present the Solution to the Prospect. The actions may only include: Create Appointment, Create Task, Create Note, or Send Email. Only include relevant actions and spell the actions exactly as mentioned. Return response in the following JSON format: objectives (id, objective, status (PENDING) and actions (id, title. description, actionType, status (PENDING) fields) fields. The title should be 2-5 word summary of description and different from the actionType. Only return JSON object do not return any other text.';

      const allActivitiesList = [...activityCompletedList].concat([...activityPendingList]);

      let promptActivitiesList = [];

      let accountResearchCompleted = false;

      if (allActivitiesList && allActivitiesList.length > 0) {
        for (const activity of allActivitiesList) {
          if (!activity.isDefault) {
            promptActivitiesList.push({
              "activityType": activity.activityType,
              "title": activity.title,
              "description": activity.description
            });
          }

          if (activity.title === "Account Research") {
            accountResearchCompleted = true;
          }
        }
      }

      if (promptActivitiesList.length > 0) {
        prompt += " The actions must be different from the provided completed activities. Do not include actions for completed activities in response.";
        prompt += " Use the following list of completed activities:";
        prompt += JSON.stringify(promptActivitiesList);

        if (accountResearchCompleted) {
          prompt += " Do not include any action regarding research such as Research Overview.";
        }
      }


      return prompt;
    }

    setActionTypes(actionTypesList) {
      actionTypesList.forEach(actionType => {
        actionTypesMap.set(actionType.actionId, actionType);
      });
    }

    getObjectivesList() {
      return [...objectivesMap.values()];
    }

    setObjectivesList(responseText) {
      let jsonText = responseText.replaceAll("```json", "");
      jsonText = jsonText.replaceAll("```JSON", "");
      jsonText = jsonText.replaceAll("```", "");
      jsonText = jsonText.replaceAll("\n", "");

      const data = JSON.parse(jsonText);

      objectivesMap.clear();
      data.objectives.forEach(objective => {
        objectivesMap.set(objective.id, objective);
      });
    }

    getTomorrowDate() {
      const currentDate = new Date();
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

      const tomorrowDate = new Date(currentDate.getTime() + oneDayInMilliseconds);
      const month = ('' + (tomorrowDate.getMonth() + 1)).slice(-2);
      const day = ('' + tomorrowDate.getDate()).slice(-2);
      const year = String(tomorrowDate.getFullYear()).slice(-2);

      return `${month}/${day}/${year}`;
    }

    formatActivityDate(date) {
      const d = new Date(date);
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let day = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return month + " " + day + ", " + year;
    }

    groupActivitiesByDate(activitiesPendingList, activitiesCompetedList) {
      let activitiesPendingListCopy = JSON.parse(JSON.stringify(activitiesPendingList));
      let activitiesCompetedListCopy = JSON.parse(JSON.stringify(activitiesCompetedList));

      activitiesGroupMap.clear();
      activitiesMap.clear();

      let activitiesStatusMap = new Map();

      if (activitiesPendingListCopy && activitiesPendingListCopy.length > 0) {
        activitiesPendingListCopy.sort((a, b) => (a.activityDate > b.activityDate ? -1 : 1));

        for (let activity of activitiesPendingListCopy) {
          let items = [];
          let activityStatus = activity.activityStatus;

          if (activitiesStatusMap.has(activityStatus)) {
            items = activitiesStatusMap.get(activityStatus);
          }

          items.push(activity);
          activitiesStatusMap.set(activityStatus, items);
        }
      }

      if (activitiesCompetedListCopy && activitiesCompetedListCopy.length > 0) {
        activitiesCompetedListCopy.sort((a, b) => (a.activityDate > b.activityDate ? -1 : 1));

        for (let activity of activitiesCompetedListCopy) {
          let items = [];
          let activityDate = this.formatActivityDate(activity.activityDate);

          if (activitiesStatusMap.has(activityDate)) {
            items = activitiesStatusMap.get(activityDate);
          }

          items.push(activity);
          activitiesStatusMap.set(activityDate, items);
        }
      }

      let idCounter = 1;

      for (let [key, value] of activitiesStatusMap) {
        for (let activity of value) {
          activity.pinned = false;
          activity.groupId = idCounter;

          activitiesMap.set(activity.id, activity);
        }

        let status;
        let headerText;

        if (key === "Pending") {
          status = "Pending";
          headerText = "Pending (" + activitiesPendingListCopy.length + ")";
        } else {
          status = "Completed";
          headerText = key;
        }

        let activityGroup = {
          "id": idCounter,
          "date": key,
          "status": status,
          "headerText": headerText,
          "items": value
        };

        activitiesGroupMap.set(activityGroup.id, activityGroup);
        idCounter++;
      }

      let result = Array.from(activitiesGroupMap.values());
      // result.sort((a, b) => (a.id > b.id ? -1 : 1));

      return result;
    }

    goToDetailsView() {
      this.viewType = 'details';
    }

    goToOverview() {
      this.viewType = 'overview';
    }
  }

  return PageModule;
});
