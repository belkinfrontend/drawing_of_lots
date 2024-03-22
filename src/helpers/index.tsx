import { teamNames } from '../constants';

export const getRandomTeamNames = () => {
  const uniqueItems = (arr: string[]) => [
    ...new Set(arr.sort(() => Math.random() - 0.5)),
  ];
  const randomTeamNames = uniqueItems(
    teamNames.sort(() => Math.random() - 0.5).slice(0, 3)
  );
  return randomTeamNames;
};
