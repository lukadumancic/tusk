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
        .find((p) => p.id === s.data.selectedSprintId)
        .aspects.map((aspect) => {
          const asp = JSON.parse(
            JSON.stringify(s.data.aspects.find((a) => a.id == aspect.id))
          );
          asp.tasks = asp.tasks
            .map((t) => s.data.tasks.find((task) => task.id === t.id))
            .filter((x) => x);
          return asp;
        })
    : []
);

export const userDataSelector = createSelector(state, (s) =>
  s.data.users.find((user) => user.username === s.user.username)
);
