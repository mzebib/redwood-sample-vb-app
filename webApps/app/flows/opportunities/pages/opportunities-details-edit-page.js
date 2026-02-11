define(["ojs/ojarraydataprovider"], function (ArrayDataProvider) {
  'use strict';

  class PageModule {

    getAccountsListADP() {
      const items = [
        {
          "label": "Redline Hosting",
          "value": "Redline Hosting"
        }
      ];

      return new ArrayDataProvider(items, { keyAttributes: "value" });
    }

    getTeamMembersListADP() {
      const items = [
        {
          "label": "Sales Rep",
          "value": "Sales Rep"
        }
      ];

      return new ArrayDataProvider(items, { keyAttributes: "value" });
    }

    getSalesStagesListADP() {
      const items = [
        {
          "label": "01 - Qualification",
          "value": "01 - Qualification"
        },
        {
          "label": "02 - Discovery",
          "value": "02 - Discovery"
        },
        {
          "label": "03 - Building Vision",
          "value": "03 - Building Vision"
        },
        {
          "label": "04 - Presentation",
          "value": "04 - Presentation"
        },
        {
          "label": "05 - Agreement",
          "value": "05 - Agreement"
        },
        {
          "label": "06 - Negotiation",
          "value": "06 - Negotiation"
        },
        {
          "label": "07 - Closed",
          "value": "07 - Closed"
        }
      ];

      return new ArrayDataProvider(items, { keyAttributes: "value" });
    }

    getSalesMethodsListADP() {
      const items = [
        {
          "label": "Standard Sales Process",
          "value": "Standard Sales Process"
        }
      ];

      return new ArrayDataProvider(items, { keyAttributes: "value" });
    }

    getCurrencyListADP() {
      const items = [
        {
          "label": "USD",
          "value": "USD"
        }
      ];

      return new ArrayDataProvider(items, { keyAttributes: "value" });
    }

    getStatusListADP() {
      const items = [
        {
          "label": "Open",
          "value": "Open"
        },
        {
          "label": "Won",
          "value": "Won"
        },
        {
          "label": "No Sale",
          "value": "No Sale"
        },
        {
          "label": "Lost",
          "value": "Lost"
        }
      ];

      return new ArrayDataProvider(items, { keyAttributes: "value" });
    }
  }

  return PageModule;
});
