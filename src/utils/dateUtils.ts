// src/utils/dateUtils.ts

export const dateUtils = {
  formatDate: (dateString: string, locale: string = "es-ES") => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
      });
    } catch {
      return dateString;
    }
  },

  formatDateRange: (
    startDate: string,
    endDate?: string,
    locale: string = "es-ES"
  ) => {
    const start = dateUtils.formatDate(startDate, locale);
    const end = endDate ? dateUtils.formatDate(endDate, locale) : "Presente";
    return `${start} - ${end}`;
  },

  calculateDuration: (startDate: string, endDate?: string) => {
    if (!startDate) return "";

    try {
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : new Date();

      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

      if (diffMonths < 12) {
        return `${diffMonths} ${diffMonths === 1 ? "mes" : "meses"}`;
      } else {
        const years = Math.floor(diffMonths / 12);
        const remainingMonths = diffMonths % 12;

        let result = `${years} ${years === 1 ? "año" : "años"}`;
        if (remainingMonths > 0) {
          result += ` y ${remainingMonths} ${
            remainingMonths === 1 ? "mes" : "meses"
          }`;
        }

        return result;
      }
    } catch {
      return "";
    }
  },

  isDateInRange: (date: string, startRange: string, endRange: string) => {
    try {
      const targetDate = new Date(date);
      const start = new Date(startRange);
      const end = new Date(endRange);

      return targetDate >= start && targetDate <= end;
    } catch {
      return false;
    }
  },

  sortByDate: <
    T extends { date?: string; startDate?: string; createdAt?: string }
  >(
    items: T[],
    dateField: keyof T = "date" as keyof T,
    ascending: boolean = false
  ) => {
    return [...items].sort((a, b) => {
      const dateA = new Date(String(a[dateField] || ""));
      const dateB = new Date(String(b[dateField] || ""));

      if (ascending) {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  },
};
