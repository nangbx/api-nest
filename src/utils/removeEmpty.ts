/* eslint-disable security/detect-object-injection */
export default function removeEmpty(obj: any) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
}
