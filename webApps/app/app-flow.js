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

    formatDate(date, format = 'M/D/YY') {
      const d = new Date(date);
      const year = d.getFullYear();
      const shortYear = String(year).slice(-2); // Last two digits of the year
      const month = String(d.getMonth() + 1).padStart(2, '0'); // Zero-padded month
      const day = String(d.getDate()).padStart(2, '0'); // Zero-padded day
      const monthName = d.toLocaleString('default', { month: 'long' });
      const monthNameShort = d.toLocaleString('default', { month: 'short' });

      switch (format) {
        case 'YYYY-MM-DD':
          return `${year}-${month}-${day}`;
        case 'YYYY/MM/DD':
          return `${year}/${month}/${day}`;
        case 'MM/DD/YYYY':
          return `${month}/${day}/${year}`;
        case 'M/DD/YYYY':
          return `${d.getMonth() + 1}/${d.getDate()}/${year}`;
        case 'MM/DD/YY':
          return `${month}/${day}/${shortYear}`;
        case 'M/D/YY':
          return `${d.getMonth() + 1}/${d.getDate()}/${shortYear}`;
        case 'MMMM D, YYYY':
          return `${monthName} ${day}, ${year}`;
        case 'MMM D, YYYY':
          return `${monthNameShort} ${day}, ${year}`;
        case 'DD-MM-YYYY':
          return `${day}-${month}-${year}`;
        default:
          return new Date(date).toLocaleDateString('en-US');
      }
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
