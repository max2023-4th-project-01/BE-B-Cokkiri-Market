export const extractKeyName = (locationName: string | undefined) => {
  if (!locationName) return;
  const keyName = locationName.split(' ').at(-1);
  return keyName;
};
