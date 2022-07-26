import axios from "axios";
import { Launch, Launchpad, Rocket } from "../model/types";

const Api = "https://api.spacexdata.com/v4";

export const getLaunches = async (): Promise<Launch[]> => {
  const response = await axios.get(`${Api}/launches`);
  const { status, data } = response;
  if (!(status === 200 && data)) return [];
  return data.map(
    (launch: any) =>
      ({
        id: launch.id,
        date: new Date(launch.date_utc),
        upcoming: !!launch.upcoming,
        rocketId: launch.rocket,
        launchpadId: launch.launchpad,
        name: launch.name,
        details: launch.details,
      } as Launch)
  );
};

export const getRockets = async (): Promise<Rocket[]> => {
  const response = await axios.get(`${Api}/rockets`);
  const { status, data } = response;
  if (!(status === 200 && data)) return [];
  return data.map(
    (rocket: any) =>
      ({
        id: rocket.id,
        name: rocket.name,
      } as Rocket)
  );
};

export const getLaunchpads = async (): Promise<Launchpad[]> => {
  const response = await axios.get(`${Api}/launchpads`);
  const { status, data } = response;
  if (!(status === 200 && data)) return [];
  return data.map(
    (launchpad: any) =>
      ({
        id: launchpad.id,
        name: launchpad.full_name,
        details: launchpad.details,
      } as Launchpad)
  );
};

export const reserve = async (
  launchId: string,
  reserved: boolean
): Promise<void> => {
  console.log(`${launchId} reservation mock: ${reserved}`);
};
