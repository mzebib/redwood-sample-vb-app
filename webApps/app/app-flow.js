define([], () => {
  'use strict';

  class AppModule {
    getInitials(fullName) {
      let initials = "";
      let names = fullName.split(' ');

      if (names.length > 0) {
        initials = names[0].charAt(0).toUpperCase();

        if (names.length > 1) {
          initials += names[names.length - 1].charAt(0).toUpperCase();
        }
      }

      return initials;
    }

    toTitleCase(str) {
      if (str) {
        let strCopy = str;
        strCopy = strCopy.replaceAll("_", " ");
        strCopy = strCopy.replace(/\w\S*/g, function (s) {
          return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
        });
      }

      return str;
    }

    formatCurrency(value) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      });

      return formatter.format(value);
    }

    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US');
    }

    truncateString(str, maxLength) {
      if (str && str.length > maxLength) {
        return str.substring(0, maxLength) + "...";
      }

      return str;
    }

    async timeDelay(timeInMS) {
      new Promise(resolve => setTimeout(resolve, timeInMS));
    }
  }

  return AppModule;
});
