export interface Launch {
  id: string;
  date: Date;
  upcoming: boolean;
  reserved?: boolean;
  name: string;
  details?: string;
  rocketId: string;
  launchpadId: string;
}

export interface Rocket {
  id: string;
  name: string;
}

export interface Launchpad {
  id: string;
  name: string;
  details: string;
}
