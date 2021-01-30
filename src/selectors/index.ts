import { createSelector } from "reselect";

const state = (store: any) => store;

export const stateSelector = createSelector(state, (s) => s);
export const userSelector = createSelector(state, (s) => s.user);
export const dataSelector = createSelector(state, (s) => s.data);

/*export const companyTeamsSelector = createSelector(state, (s) => s.data.teams);
export const companyProjectsSelector = createSelector(
  state,
  (s) => s.data.projects
);
export const projectSprintsSelector = createSelector(
  state,
  (s) => s.data.sprints
);*/
export const companyTeamsSelector = createSelector(state, (s) =>
  s.data.selectedCompanyId !== -1
    ? s.data.companies.filter((c) => c.id === s.data.selectedCompanyId)[0].teams
    : []
);

export const companyProjectsSelector = createSelector(state, (s) =>
  s.data.selectedCompanyId !== -1
    ? s.data.companies.filter((c) => c.id === s.data.selectedCompanyId)[0]
        .projects
    : []
);

export const projectSprintsSelector = createSelector(state, (s) =>
  s.data.selectedProjectId !== -1
    ? s.data.projects.filter((p) => p.id === s.data.selectedProjectId)[0]
        .sprints
    : []
);

export const sprintAspectSelector = createSelector(state, (s) =>
  s.data.selectedSprintId !== -1
    ? s.data.sprints
        .filter((p) => p.id === s.data.selectedSprintId)[0]
        .aspects.map((aspect) => s.data.aspects.find((a) => a.id == aspect.id))
    : []
);

export const userDataSelector = createSelector(state, (s) =>
  s.data.users.find((user) => user.username === s.user.username)
);
