// Format: yyyy-mm-dd
import { getDateObject } from './getDateLocalString';

export function getAge(birthDate) {
  const today = new Date();
  const birthDateObj = getDateObject(JSON.parse(birthDate));

  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }

  return age;
}
