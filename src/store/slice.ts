import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Launch, Launchpad, Rocket } from "../model/types";
import { IMap } from "../types";
import { IState } from "./types";

const initialState: IState = {
  launches: {},
  rockets: {},
  launchpads: {},
  loaded: false,
};

const { actions, reducer } = createSlice({
  initialState,
  name: "explore the space",
  reducers: {
    addLaunches: (state: IState, { payload }: PayloadAction<Launch[]>) => {
      payload.forEach((launch) => {
        state.launches[launch.id] = launch;
      });
    },
    addRockets: (state: IState, { payload }: PayloadAction<Rocket[]>) => {
      payload.forEach((rocket) => {
        state.rockets[rocket.id] = rocket;
      });
    },
    addLaunchpads: (state: IState, { payload }: PayloadAction<Launchpad[]>) => {
      payload.forEach((launchpad) => {
        state.launchpads[launchpad.id] = launchpad;
      });
    },
    setReserved: (
      state: IState,
      { payload }: PayloadAction<{ id: string; reserved: boolean }>
    ) => {
      const { id, reserved } = payload;
      state.launches[id].reserved = reserved;
    },
    setLoaded: (state: IState, { payload }: PayloadAction<boolean>) => {
      state.loaded = payload;
    },
  },
});

const launches = (state: IState): IMap<Launch> => state.launches;
const rockets = (state: IState): IMap<Rocket> => state.rockets;
const launchpads = (state: IState): IMap<Launchpad> => state.launchpads;
const loaded = (state: IState): boolean => state.loaded;
const pastLaunches = createSelector([launches], (_launches): Launch[] =>
  Object.values(_launches)
    .filter((launch) => !launch.upcoming)
    .sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    })
);
const upcomingLaunches = createSelector([launches], (_launches): Launch[] =>
  Object.values(_launches)
    .filter((launch) => launch.upcoming && !launch.reserved)
    .sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
);
const reservedLaunches = createSelector([launches], (_launches): Launch[] =>
  Object.values(_launches)
    .filter((launch) => launch.upcoming && launch.reserved)
    .sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
);
const launchRocket = createSelector(
  [launches, rockets],
  (_launches, _rockets) => (launchId: string) =>
    _rockets[_launches[launchId]?.rocketId]
);
const launchLaunchpad = createSelector(
  [launches, launchpads],
  (_launches, _launchpads) => (launchId: string) =>
    _launchpads[_launches[launchId]?.launchpadId]
);

const selectors = {
  launches,
  pastLaunches,
  upcomingLaunches,
  reservedLaunches,
  launchRocket,
  launchLaunchpad,
  loaded,
};

export { actions, reducer, selectors };
