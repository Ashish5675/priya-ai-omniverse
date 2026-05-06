import { c as createLucideIcon, d as useActor, e as useQuery, f as useQueryClient, g as useMutation, h as createActor, r as reactExports, u as useAriaStore, j as jsxRuntimeExports, A as AnimatePresence, m as motion, P as Phone, b as ue } from "./index-Khuvrpqq.js";
import { B as Badge } from "./badge-C3dhjTQA.js";
import { S as Skeleton } from "./skeleton-Du1tc8iA.js";
import { b as speakText } from "./useVoice-CqPdfCbn.js";
import { X } from "./x-V8iWEkoj.js";
import { M as Mic } from "./mic-DTkU6c4e.js";
import { R as RefreshCw } from "./refresh-cw-BAeMeO08.js";
import { C as Clock } from "./clock-Cvc138nV.js";
import "./index-DwOZ_d1F.js";
import "./utils-Cd0OWsoi.js";
import "./clsx-DgYk2OaC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M16 2v6h6", key: "1mfrl5" }],
  ["path", { d: "m22 2-6 6", key: "6f0sa0" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const PhoneIncoming = createLucideIcon("phone-incoming", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 2 6 6", key: "1gw87d" }],
  ["path", { d: "m22 2-6 6", key: "6f0sa0" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const PhoneMissed = createLucideIcon("phone-missed", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272",
      key: "1wngk7"
    }
  ],
  ["path", { d: "M22 2 2 22", key: "y4kqgn" }],
  [
    "path",
    {
      d: "M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",
      key: "10hv5p"
    }
  ]
];
const PhoneOff = createLucideIcon("phone-off", __iconNode);
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
    return new argument.constructor(+argument);
  } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
    return new Date(argument);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
}
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}
const minutesInMonth = 43200;
const minutesInDay = 1440;
let defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}
function compareAsc(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const diff = _dateLeft.getTime() - _dateRight.getTime();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
  } else {
    return diff;
  }
}
function constructNow(date) {
  return constructFrom(date, Date.now());
}
function differenceInCalendarMonths(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const yearDiff = _dateLeft.getFullYear() - _dateRight.getFullYear();
  const monthDiff = _dateLeft.getMonth() - _dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}
function getRoundingMethod(method) {
  return (number) => {
    const round = method ? Math[method] : Math.trunc;
    const result = round(number);
    return result === 0 ? 0 : result;
  };
}
function differenceInMilliseconds(dateLeft, dateRight) {
  return +toDate(dateLeft) - +toDate(dateRight);
}
function endOfDay(date) {
  const _date = toDate(date);
  _date.setHours(23, 59, 59, 999);
  return _date;
}
function endOfMonth(date) {
  const _date = toDate(date);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}
function isLastDayOfMonth(date) {
  const _date = toDate(date);
  return +endOfDay(_date) === +endOfMonth(_date);
}
function differenceInMonths(dateLeft, dateRight) {
  const _dateLeft = toDate(dateLeft);
  const _dateRight = toDate(dateRight);
  const sign = compareAsc(_dateLeft, _dateRight);
  const difference = Math.abs(
    differenceInCalendarMonths(_dateLeft, _dateRight)
  );
  let result;
  if (difference < 1) {
    result = 0;
  } else {
    if (_dateLeft.getMonth() === 1 && _dateLeft.getDate() > 27) {
      _dateLeft.setDate(30);
    }
    _dateLeft.setMonth(_dateLeft.getMonth() - sign * difference);
    let isLastMonthNotFull = compareAsc(_dateLeft, _dateRight) === -sign;
    if (isLastDayOfMonth(toDate(dateLeft)) && difference === 1 && compareAsc(dateLeft, _dateRight) === 1) {
      isLastMonthNotFull = false;
    }
    result = sign * (difference - Number(isLastMonthNotFull));
  }
  return result === 0 ? 0 : result;
}
function differenceInSeconds(dateLeft, dateRight, options) {
  const diff = differenceInMilliseconds(dateLeft, dateRight) / 1e3;
  return getRoundingMethod(options == null ? void 0 : options.roundingMethod)(diff);
}
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
const formatDistance$1 = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options == null ? void 0 : options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}
const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
const formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
const formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}
const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
const localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;
const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
const match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const enUS = {
  code: "en-US",
  formatDistance: formatDistance$1,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function formatDistance(date, baseDate, options) {
  const defaultOptions2 = getDefaultOptions();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const minutesInAlmostTwoDays = 2520;
  const comparison = compareAsc(date, baseDate);
  if (isNaN(comparison)) {
    throw new RangeError("Invalid time value");
  }
  const localizeOptions = Object.assign({}, options, {
    addSuffix: options == null ? void 0 : options.addSuffix,
    comparison
  });
  let dateLeft;
  let dateRight;
  if (comparison > 0) {
    dateLeft = toDate(baseDate);
    dateRight = toDate(date);
  } else {
    dateLeft = toDate(date);
    dateRight = toDate(baseDate);
  }
  const seconds = differenceInSeconds(dateRight, dateLeft);
  const offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft)) / 1e3;
  const minutes = Math.round((seconds - offsetInSeconds) / 60);
  let months;
  if (minutes < 2) {
    if (options == null ? void 0 : options.includeSeconds) {
      if (seconds < 5) {
        return locale.formatDistance("lessThanXSeconds", 5, localizeOptions);
      } else if (seconds < 10) {
        return locale.formatDistance("lessThanXSeconds", 10, localizeOptions);
      } else if (seconds < 20) {
        return locale.formatDistance("lessThanXSeconds", 20, localizeOptions);
      } else if (seconds < 40) {
        return locale.formatDistance("halfAMinute", 0, localizeOptions);
      } else if (seconds < 60) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", minutes, localizeOptions);
      }
    }
  } else if (minutes < 45) {
    return locale.formatDistance("xMinutes", minutes, localizeOptions);
  } else if (minutes < 90) {
    return locale.formatDistance("aboutXHours", 1, localizeOptions);
  } else if (minutes < minutesInDay) {
    const hours = Math.round(minutes / 60);
    return locale.formatDistance("aboutXHours", hours, localizeOptions);
  } else if (minutes < minutesInAlmostTwoDays) {
    return locale.formatDistance("xDays", 1, localizeOptions);
  } else if (minutes < minutesInMonth) {
    const days = Math.round(minutes / minutesInDay);
    return locale.formatDistance("xDays", days, localizeOptions);
  } else if (minutes < minutesInMonth * 2) {
    months = Math.round(minutes / minutesInMonth);
    return locale.formatDistance("aboutXMonths", months, localizeOptions);
  }
  months = differenceInMonths(dateRight, dateLeft);
  if (months < 12) {
    const nearestMonth = Math.round(minutes / minutesInMonth);
    return locale.formatDistance("xMonths", nearestMonth, localizeOptions);
  } else {
    const monthsSinceStartOfYear = months % 12;
    const years = Math.trunc(months / 12);
    if (monthsSinceStartOfYear < 3) {
      return locale.formatDistance("aboutXYears", years, localizeOptions);
    } else if (monthsSinceStartOfYear < 9) {
      return locale.formatDistance("overXYears", years, localizeOptions);
    } else {
      return locale.formatDistance("almostXYears", years + 1, localizeOptions);
    }
  }
}
function formatDistanceToNow(date, options) {
  return formatDistance(date, constructNow(date), options);
}
let callIdCounter = BigInt(4);
const mockCallLogs = [
  {
    id: BigInt(1),
    callSid: "DEMO-CA001",
    callerPhone: "+91-9876543210",
    duration: BigInt(142),
    status: "completed",
    transcript: "Hello, I need help setting up my IoT devices. Priya guided through the MQTT configuration step by step.",
    timestamp: BigInt(Date.now() - 1e3 * 60 * 45)
  },
  {
    id: BigInt(2),
    callSid: "DEMO-CA002",
    callerPhone: "+91-8765432109",
    duration: BigInt(0),
    status: "missed",
    transcript: "",
    timestamp: BigInt(Date.now() - 1e3 * 60 * 120)
  },
  {
    id: BigInt(3),
    callSid: "DEMO-CA003",
    callerPhone: "+1-555-987-6543",
    duration: BigInt(317),
    status: "completed",
    transcript: "Legal document analysis requested. Priya reviewed the NDA clauses, flagged three risk areas, and provided compliance suggestions.",
    timestamp: BigInt(Date.now() - 1e3 * 60 * 60 * 3)
  },
  {
    id: BigInt(4),
    callSid: "CA8f2e1a3b4c5d",
    callerPhone: "+44-7700-900123",
    duration: BigInt(58),
    status: "failed",
    transcript: "Connection dropped during initial greeting phase.",
    timestamp: BigInt(Date.now() - 1e3 * 60 * 60 * 7)
  }
];
const callsMock = {
  getCallLogs: async () => {
    await new Promise((r) => setTimeout(r, 400));
    return [...mockCallLogs].reverse();
  },
  makeCall: async (req) => {
    await new Promise((r) => setTimeout(r, 800));
    callIdCounter += BigInt(1);
    const record = {
      id: callIdCounter,
      callSid: `DEMO-CA${String(callIdCounter).padStart(3, "0")}`,
      callerPhone: req.toPhone,
      duration: BigInt(0),
      status: "active",
      transcript: req.message ? `Message queued: "${req.message}"` : "Connecting…",
      timestamp: BigInt(Date.now())
    };
    mockCallLogs.push(record);
    return record;
  },
  getCallRecord: async (id) => {
    await new Promise((r) => setTimeout(r, 200));
    return mockCallLogs.find((c) => c.id === id) ?? null;
  },
  initCallModule: async () => {
    await new Promise((r) => setTimeout(r, 300));
    return true;
  }
};
const callKeys = {
  all: ["calls"],
  logs: () => [...callKeys.all, "logs"],
  record: (id) => [...callKeys.all, "record", id.toString()],
  init: () => [...callKeys.all, "init"]
};
function useCallLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: callKeys.logs(),
    queryFn: async () => {
      try {
        if (actor && !isFetching) {
          const records = await actor.getCallLogs();
          return records;
        }
      } catch {
      }
      return callsMock.getCallLogs();
    },
    enabled: true,
    refetchInterval: 5e3
  });
}
function useMakeCall() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      try {
        if (actor) {
          return await actor.makeCall(req);
        }
      } catch {
      }
      return callsMock.makeCall(req);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: callKeys.logs() });
    }
  });
}
function useInitCalls() {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: callKeys.init(),
    queryFn: async () => {
      try {
        if (actor) {
          return await actor.initCallModule();
        }
      } catch {
      }
      return callsMock.initCallModule();
    },
    staleTime: Number.POSITIVE_INFINITY
  });
}
const BAR_KEYS = ["b0", "b1", "b2", "b3", "b4", "b5", "b6"];
function VoiceBars() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-[3px] h-8", children: BAR_KEYS.map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "w-[4px] rounded-full bg-primary",
      style: {
        height: `${30 + Math.sin(i * 1.2) * 50}%`,
        animation: `pulse-bar ${0.6 + i * 0.1}s ease-in-out ${i * 0.08}s infinite`,
        opacity: 0.9
      }
    },
    key
  )) });
}
function formatDuration$1(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
function CallModal({ open, onClose, incomingCall }) {
  const [view, setView] = reactExports.useState("form");
  const [phone, setPhone] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const [elapsed, setElapsed] = reactExports.useState(0);
  const [activeRecord, setActiveRecord] = reactExports.useState(null);
  const timerRef = reactExports.useRef(null);
  const endingTimerRef = reactExports.useRef(null);
  const makeCall = useMakeCall();
  const language = useAriaStore((s) => s.language);
  const incomingPhone = (incomingCall == null ? void 0 : incomingCall.phone) ?? "";
  const incomingGreeting = (incomingCall == null ? void 0 : incomingCall.greeting) ?? "";
  reactExports.useEffect(() => {
    if (open) {
      if (incomingPhone) {
        setView("active");
        setPhone(incomingPhone);
        setElapsed(0);
        startTimer();
        speakText(incomingGreeting, language);
      } else {
        setView("form");
        setPhone("");
        setMessage("");
        setElapsed(0);
      }
    } else {
      clearAll();
    }
  }, [open, incomingPhone, incomingGreeting, language]);
  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1e3);
  }
  function clearAll() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (endingTimerRef.current) clearTimeout(endingTimerRef.current);
    setElapsed(0);
    setActiveRecord(null);
  }
  async function handleStartCall() {
    if (!phone.trim()) {
      ue.error("Enter a phone number");
      return;
    }
    try {
      const record = await makeCall.mutateAsync({
        toPhone: phone.trim(),
        message: message.trim()
      });
      setActiveRecord(record);
      setView("active");
      setElapsed(0);
      startTimer();
      ue.success(`Connecting to ${phone.trim()}…`);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Call failed");
    }
  }
  function handleHangUp() {
    clearAll();
    setView("ending");
    ue.info("Call ended");
    endingTimerRef.current = setTimeout(() => {
      onClose();
      setView("form");
    }, 3e3);
  }
  const isDemo = (activeRecord == null ? void 0 : activeRecord.callSid.startsWith("DEMO-")) ?? incomingCall != null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm",
        onClick: () => {
          if (view === "form") onClose();
        }
      },
      "backdrop"
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.92, y: 32 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.92, y: 32 },
        transition: { type: "spring", stiffness: 340, damping: 28 },
        className: "fixed inset-0 z-50 flex items-center justify-center pointer-events-none",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "pointer-events-auto w-full max-w-md glass-panel scanline-overlay rounded-xl overflow-hidden",
            "data-ocid": "call.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  incomingCall && view === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneIncoming, { className: "w-5 h-5 text-primary animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm tracking-widest uppercase text-primary/80", children: view === "form" ? "New Call" : view === "active" ? incomingCall ? "Incoming Call" : "Active Call" : "Call Ending" }),
                  isDemo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 px-2 py-0.5 rounded text-xs font-mono bg-yellow-400/20 text-yellow-300 border border-yellow-400/30", children: "SIMULATED" })
                ] }),
                view === "form" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Close",
                    "data-ocid": "call.close_button",
                    onClick: onClose,
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
                view === "form" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -16 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: 16 },
                    className: "p-6 flex flex-col gap-4",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "call-phone", className: "hud-label", children: "Phone Number" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "call-phone",
                            className: "input-holographic",
                            placeholder: "+91 98765 43210",
                            value: phone,
                            onChange: (e) => setPhone(e.target.value),
                            onKeyDown: (e) => {
                              if (e.key === "Enter") void handleStartCall();
                            },
                            "data-ocid": "call.phone_input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "call-message", className: "hud-label", children: "Message for Priya (optional)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "textarea",
                          {
                            id: "call-message",
                            className: "input-holographic resize-none",
                            rows: 3,
                            placeholder: "Say something to the caller when connected…",
                            value: message,
                            onChange: (e) => setMessage(e.target.value),
                            "data-ocid": "call.message_textarea"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            className: "btn-outline flex-1",
                            onClick: onClose,
                            "data-ocid": "call.cancel_button",
                            children: "Cancel"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "btn-cyan flex-1 flex items-center justify-center gap-2",
                            onClick: () => void handleStartCall(),
                            disabled: makeCall.isPending,
                            "data-ocid": "call.submit_button",
                            children: [
                              makeCall.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                              "Start Call"
                            ]
                          }
                        )
                      ] })
                    ]
                  },
                  "form"
                ),
                view === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.96 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 0.96 },
                    className: "p-6 flex flex-col items-center gap-5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute w-20 h-20 rounded-full bg-primary/20 animate-ping" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute w-24 h-24 rounded-full bg-primary/10 animate-pulse" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-16 h-16 rounded-full bg-card border-2 border-primary glow-cyan flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-7 h-7 text-primary" }) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-lg", children: phone }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-mono text-2xl tracking-widest mt-1", children: formatDuration$1(elapsed) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1 font-mono uppercase tracking-widest", children: incomingCall ? "Priya speaking…" : "Connected" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "PRIYA" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(VoiceBars, {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "LIVE" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "w-14 h-14 rounded-full bg-destructive flex items-center justify-center hover:opacity-90 transition-smooth glow-purple shadow-lg",
                          onClick: handleHangUp,
                          "data-ocid": "call.hangup_button",
                          "aria-label": "Hang up",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "w-6 h-6 text-destructive-foreground" })
                        }
                      )
                    ]
                  },
                  "active"
                ),
                view === "ending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    className: "p-8 flex flex-col items-center gap-4 text-center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "w-10 h-10 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "Call Ended" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm font-mono", children: [
                        "Duration: ",
                        formatDuration$1(elapsed)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Closing in 3 seconds…" })
                    ]
                  },
                  "ending"
                )
              ] })
            ]
          }
        )
      },
      "modal"
    )
  ] }) });
}
function formatDuration(seconds) {
  const s = Number(seconds);
  if (s === 0) return "—";
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const r = (s % 60).toString().padStart(2, "0");
  return `${m}:${r}`;
}
function formatTimestamp(ts) {
  try {
    const ms = Number(ts);
    return formatDistanceToNow(new Date(ms), { addSuffix: true });
  } catch {
    return "—";
  }
}
function StatusBadge({ status }) {
  const classes = {
    completed: "bg-green-500/20 text-green-300 border-green-500/30",
    active: "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
    failed: "bg-red-500/20 text-red-300 border-red-500/30",
    missed: "bg-amber-400/20 text-amber-300 border-amber-400/30"
  };
  const icons = {
    completed: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
    active: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 animate-pulse" }),
    failed: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "w-3 h-3" }),
    missed: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneMissed, { className: "w-3 h-3" })
  };
  const cls = classes[status] ?? "bg-muted text-muted-foreground border-border/30";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono border ${cls}`,
      children: [
        icons[status] ?? null,
        status.toUpperCase()
      ]
    }
  );
}
const SKELETON_COL_KEYS = ["sc0", "sc1", "sc2", "sc3", "sc4"];
const SKELETON_ROW_KEYS = ["sr0", "sr1", "sr2", "sr3"];
function RowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/20", children: SKELETON_COL_KEYS.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full bg-muted/40 rounded" }) }, key)) });
}
function CallsPage() {
  const { data: logs = [], isLoading, refetch } = useCallLogs();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [incomingCall, setIncomingCall] = reactExports.useState(null);
  const language = useAriaStore((s) => s.language);
  useInitCalls();
  function handleSimulateIncoming() {
    const greeting = language === "hindi" ? "नमस्ते, मैं प्रिया हूँ। आपकी कैसे सहायता करूँ?" : language === "nagpuri" ? "नमस्कार, मैं प्रिया हूँ। का सेवा करना हे?" : "Hello, this is Priya. How may I assist you today?";
    setIncomingCall({ phone: "+91-9000-000-000", greeting });
    setModalOpen(true);
  }
  function handleCloseModal() {
    setModalOpen(false);
    setIncomingCall(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 p-6 space-y-6 scanline-overlay",
      "data-ocid": "calls.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label mb-1", children: "ARIA OMNIVERSE — MODULE" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-6 h-6 text-primary" }),
                  "Call Center"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "btn-outline flex items-center gap-1.5 !py-2 !px-3 !text-xs",
                    onClick: () => refetch(),
                    "data-ocid": "calls.refresh_button",
                    "aria-label": "Refresh call logs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                      "Refresh"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "btn-outline flex items-center gap-1.5 !py-2 !px-3 !text-xs",
                    onClick: handleSimulateIncoming,
                    "data-ocid": "calls.simulate_incoming_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneIncoming, { className: "w-3.5 h-3.5" }),
                      "Simulate Incoming"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "btn-cyan flex items-center gap-2",
                    onClick: () => {
                      setIncomingCall(null);
                      setModalOpen(true);
                    },
                    "data-ocid": "calls.new_call_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                      "New Call"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.08 },
            className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
            children: [
              {
                label: "Total Calls",
                value: logs.length,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary" })
              },
              {
                label: "Completed",
                value: logs.filter((l) => l.status === "completed").length,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-green-400" })
              },
              {
                label: "Missed",
                value: logs.filter((l) => l.status === "missed").length,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneMissed, { className: "w-4 h-4 text-amber-400" })
              },
              {
                label: "Avg Duration",
                value: (() => {
                  const completed = logs.filter(
                    (l) => l.status === "completed" && Number(l.duration) > 0
                  );
                  if (!completed.length) return "—";
                  const avg = completed.reduce((a, l) => a + Number(l.duration), 0) / completed.length;
                  const m = Math.floor(avg / 60).toString().padStart(2, "0");
                  const s = Math.round(avg % 60).toString().padStart(2, "0");
                  return `${m}:${s}`;
                })(),
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-secondary" })
              }
            ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "module-panel flex items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-card flex items-center justify-center border border-border/30", children: stat.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hud-label", children: stat.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-mono text-lg font-bold", children: stat.value })
                  ] })
                ]
              },
              stat.label
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.14 },
            className: "module-panel overflow-hidden !p-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border/20 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hud-label", children: "Call Log" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "ml-auto text-xs font-mono border-primary/30 text-primary/70",
                    children: "Live · every 5s"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", "data-ocid": "calls.table", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/20 text-left", children: ["Phone", "Duration", "Status", "Transcript", "Time"].map(
                  (h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 hud-label font-semibold", children: h }, h)
                ) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? SKELETON_ROW_KEYS.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(RowSkeleton, {}, key)) : logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    colSpan: 5,
                    className: "px-4 py-12 text-center text-muted-foreground font-mono",
                    "data-ocid": "calls.empty_state",
                    children: "No call records yet. Start your first call."
                  }
                ) }) : logs.map((record, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CallRow,
                  {
                    record,
                    index: idx + 1
                  },
                  record.id.toString()
                )) })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CallModal,
          {
            open: modalOpen,
            onClose: handleCloseModal,
            incomingCall
          }
        )
      ]
    }
  );
}
function CallRow({ record, index }) {
  const isDemo = record.callSid.startsWith("DEMO-");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.tr,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.04 },
      className: "border-b border-border/10 hover:bg-card/50 transition-colors",
      "data-ocid": `calls.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-primary/60 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[140px]", children: record.callerPhone }),
          isDemo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-mono bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 shrink-0", children: "SIM" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-right text-muted-foreground tabular-nums", children: formatDuration(record.duration) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: record.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 max-w-xs", children: record.transcript ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs line-clamp-2 leading-relaxed", children: record.transcript }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40 text-xs font-mono", children: "—" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs font-mono text-muted-foreground whitespace-nowrap", children: formatTimestamp(record.timestamp) })
      ]
    }
  );
}
export {
  CallsPage
};
