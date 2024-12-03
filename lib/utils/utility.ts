/**
 * 객체에 특정 키가 존재하는지 확인하는 타입 가드 함수
 * @param obj 확인할 객체
 * @param key 확인할 키
 * @returns 키가 객체에 존재하면 true, 그렇지 않으면 false
 */
// export function hasKey<T extends object, K extends PropertyKey>(obj: T, key: K): key is keyof T {
//     return key in obj;
// }
/**
 * 객체에 특정 키가 존재하는지 확인하는 타입 가드 함수
 * @param obj 확인할 객체
 * @param key 확인할 키
 * @returns 키가 객체에 존재하면 true, 그렇지 않으면 false
 */
export function hasKey<T extends object>(
  obj: T,
  key: PropertyKey
): key is keyof T {
  return key in obj;
}
