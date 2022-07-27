import { Action, createAction, PayloadAction } from "@reduxjs/toolkit";
import { Modal } from "antd";
import { eventChannel } from "redux-saga";
import { call, put, select, take, takeEvery } from "redux-saga/effects";
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

const load = createAction(LOAD);
const reserve = createAction<{ launch: Launch; isReserved: boolean }>(RESERVE);
const unreserveConfirm = createAction<Launch>(UNRESERVE_CONFIRM);

export const sagaActions = {
  load,
  reserve,
  unreserveConfirm,
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

function* reserveWorker({
  payload,
}: PayloadAction<{ launch: Launch; isReserved: boolean }>) {
  const { launch, isReserved } = payload;
  yield call(reserveBI, launch.id, isReserved);
  yield put(actions.setReserved({ id: launch.id, reserved: isReserved }));
  const content = isReserved
    ? `"${launch.name}" succesfully reserved`
    : `"${launch.name}" reservation succesfully cancelled`;
  Modal.info({ content });
}

function* unreserveConfirmWorker({ payload }: PayloadAction<Launch>) {
  const channel = eventChannel<Action>((emitter) => {
    Modal.confirm({
      content: `are you sure you want to cancel "${payload.name}" reservation?`,
      onOk: () => {
        emitter(reserve({ launch: payload, isReserved: false }));
      },
    });
    return () => {};
  });
  const action: Action = yield take(channel);
  yield put(action);
}

export function* watcher() {
  yield takeEvery(LOAD, loadWorker);
  yield takeEvery(RESERVE, reserveWorker);
  yield takeEvery(UNRESERVE_CONFIRM, unreserveConfirmWorker);
}
