import { ko, enUS } from "date-fns/locale";
import { format, formatDistanceToNowStrict } from "date-fns";

export const getYearMonthDay = (date: Date | string, lang: string) => {
  // console.log(lang);
  // const locale = lang === "ko" ? ko : enUS;
  const formatString = lang === "kr-KR" ? "yyyy년 LL월 dd일" : "yyyy-LL-dd";
  return format(new Date(date), formatString);
};

export const getDistanceFromToday = (date: Date | string, lang: string) => {
  // console.log(lang);
  const locale = lang === "kr-KR" ? ko : enUS;
  return formatDistanceToNowStrict(new Date(date), {
    locale: locale,
    addSuffix: true,
  });
};
