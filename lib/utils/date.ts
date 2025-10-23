import { ko, enUS, type Locale } from "date-fns/locale";
import { format, formatDistanceToNowStrict } from "date-fns";

export function formatDateFmt(
  timestamp: string | number | Date,
  fmt: string
): string {
  const date = new Date(timestamp);
  const o: Record<string, number> = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substring(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? String(o[k])
          : ("00" + o[k]).substring(("" + o[k]).length)
      );
    }
  }
  return fmt.trim();
}

export const getYearMonthDay = (
  date: Date | string,
  locale: string
): string => {
  const formats: Record<string, string> = {
    "kr-KR": "yyyy년 LL월 dd일",
    "en-US": "yyyy-LL-dd",
  };
  const formatString = formats[locale] || "yyyy-LL-dd";
  return format(new Date(date), formatString);
};

export const getDistanceFromToday = (
  date: Date | string,
  locale: string
): string => {
  const formats: Record<string, Locale> = {
    "kr-KR": ko,
    "en-US": enUS,
  };
  return formatDistanceToNowStrict(new Date(date), {
    locale: formats[locale],
    addSuffix: true,
  });
};

export function formatToKoreanDate(
  utcDateString: string | number | Date
): string {
  const date = new Date(utcDateString);
  const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const year = koreaTime.getFullYear();
  const month = String(koreaTime.getMonth() + 1).padStart(2, "0");
  const day = String(koreaTime.getDate()).padStart(2, "0");
  const hours = String(koreaTime.getHours()).padStart(2, "0");
  const minutes = String(koreaTime.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

/**
 * Format date
 * @param date
 * @param local
 * @returns {string}
 */
export function formatDate(
  date: string | number | Date | null | undefined,
  local: string | null | undefined
): string {
  if (!date || !local) return typeof date === "string" ? date : "";
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const res = d.toLocaleDateString(local, options);
  // If the format is Chinese date, it will be converted to a horizontal bar
  const format =
    local.slice(0, 2).toLowerCase() === "zh"
      ? res.replace("年", "-").replace("月", "-").replace("日", "")
      : res;
  return format;
}
