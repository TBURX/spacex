import { Action, createAction, PayloadAction } from "@reduxjs/toolkit";
import { Modal } from "antd";
import { eventChannel } from "redux-saga";
import {
  all,
  call,
  put,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import {
  getLaunches,
  getLaunchpads,
  getRockets,
  reserve as reserveBI,
} from "../bi";
import { Launch, Launchpad, Rocket } from "../model/types";
import { actions, selectors } from "../store/slice";

const LOAD = "LOAD";
const RESERVE = "RESERVE";
const UNRESERVE_CONFIRM = "UNRESERVE_CONFIRM";
const UNRESERVE = "UNRESERVE";
const load = createAction(LOAD);
const reserve = createAction<Launch>(RESERVE);
const unreserveConfirm = createAction<Launch>(UNRESERVE_CONFIRM);
const unreserve = createAction<Launch>(UNRESERVE);

export const sagaActions = {
  load,
  reserve,
  unreserveConfirm,
  unreserve,
};

function* loadWorker() {
  const loaded: boolean = yield select(selectors.loaded);
  if (loaded) return;
  const launches: Launch[] = yield call(getLaunches);
  yield put(actions.addLaunches(launches));
  const rockets: Rocket[] = yield call(getRockets);
  yield put(actions.addRockets(rockets));
  const launchpads: Launchpad[] = yield call(getLaunchpads);
  yield put(actions.addLaunchpads(launchpads));
  yield put(actions.setLoaded(true));
}

function* reserveWorker({ payload }: PayloadAction<Launch>) {
  yield call(reserveBI, payload.id, true);
  yield put(actions.setReserved({ id: payload.id, reserved: true }));
  Modal.info({ content: `"${payload.name}" succesfully reserved` });
}

function* unreserveWorker({ payload }: PayloadAction<Launch>) {
  yield call(reserveBI, payload.id, false);
  yield put(actions.setReserved({ id: payload.id, reserved: false }));
  Modal.info({
    content: `"${payload.name}" reservation succesfully cancelled`,
  });
}

function* unreserveConfirmWorker({ payload }: PayloadAction<Launch>) {
  const channel = eventChannel<Action>((emitter) => {
    Modal.confirm({
      content: `are you sure you want to cancel "${payload.name}" reservation?`,
      onOk: () => {
        emitter(unreserve(payload));
      },
    });
    return () => {};
  });
  while (true) {
    const action: Action = yield take(channel);
    yield put(action);
  }
}

export function* watcher() {
  yield takeEvery(LOAD, loadWorker);
  yield takeEvery(RESERVE, reserveWorker);
  yield takeEvery(UNRESERVE, unreserveWorker);
  yield takeEvery(UNRESERVE_CONFIRM, unreserveConfirmWorker);
}
