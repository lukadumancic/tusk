import { createSelector } from "reselect";

const state = (store: any) => store;

export const stateSelector = createSelector(state, (s) => s);
export const userSelector = createSelector(state, (s) => s.user);
export const dataSelector = createSelector(state, (s) => s.data);

export const companyTeamsSelector = createSelector(state, (s) => s.data.teams);
export const companyProjectsSelector = createSelector(
  state,
  (s) => s.data.projects
);
export const projectSprintsSelector = createSelector(
  state,
  (s) => s.data.sprints
);
/*export const companyTeamsSelector = createSelector(state, (s) =>
  s.data.selectedCompanyId !== -1
    ? s.data.companies
        .filter((c) => c.id === s.data.selectedCompanyId)[0]
        .teams.map((teamId) => {
          const teamIndex = s.data.teams.findIndex(
            (team) => team.id === teamId
          );
          if (teamIndex === -1) {
            return null;
          }
          return s.data.teams[teamIndex];
        })
        .filter((t) => t)
    : []
);*/

/*
export const companyProjectsSelector = createSelector(state, (s) =>
  s.data.selectedCompanyId !== -1
    ? s.data.companies
        .filter((c) => c.id === s.data.selectedCompanyId)[0]
        .projects.map((projectId) => {
          const projectIndex = s.data.projects.findIndex(
            (projects) => projects.id === projectId
          );
          if (projectIndex === -1) {
            return null;
          }
          return s.data.teams[projectIndex];
        })
        .filter((t) => t)
    : []
);*/

/*export const projectSprintsSelector = createSelector(state, (s) =>
  s.data.selectedProjectId !== -1
    ? s.data.projects
        .filter((p) => p.id === s.data.selectedProjectId)[0]
        .sprints.map((sprintId) => {
          const sprintIndex = s.data.sprints.findIndex(
            (sprint) => sprint.id === sprintId
          );
          if (sprintIndex === -1) {
            return null;
          }
          return s.data.teams[sprintIndex];
        })
        .filter((t) => t)
    : []
);*/
