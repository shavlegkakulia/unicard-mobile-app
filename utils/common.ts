export const sleep = async (callBack: Function, timeout: number = 0) => {
    await new Promise(res => setTimeout(res, timeout));
    return callBack;
  };
  
  export const objectHasValue = (obj: any) => Boolean(Object.keys(obj || {})[0]);
  
  export const stringToObject = (value: string) => {
    if (!value) return {};
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (_) {
      return {};
    }
  };