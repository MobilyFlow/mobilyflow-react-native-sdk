export const removeUndefined = <T extends object>(obj: T) => {
  for (const key of Object.keys(obj)) {
    if ((obj as any)[key] === undefined) {
      delete (obj as any)[key];
    }
  }
  return obj;
};
