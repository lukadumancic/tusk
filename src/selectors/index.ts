import { createSelector } from 'reselect';

const state = (store: any) => store;

export const stateSelector = createSelector(state, (s) => s);
export const userSelector = createSelector(state, (s) => s.user);
export const dataSelector = createSelector(state, (s) => s.data);