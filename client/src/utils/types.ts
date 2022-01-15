import { ReactElement } from "react";

export type Nullable<T> = null | T;

export type Children = {
  children: ReactElement | ReactElement[];
};

export interface IData {
  channelGrouping: string;
  date: Date;
  device: {
    browser: string;
    operatingSystem: string;
    deviceCategory: string;
    isMobile: boolean;
  };
  fullVisitorId: string;
  geoNetwork: {
    continent: string;
    subContinent: string;
    country: string;
    region: string;
    metro: string;
    city: string;
    networkDomain: string;
  };
  sessionId: string;
  socialEngagementType: string;
  totals: {
    visits: number;
    hits: number;
    pageviews: number;
    newVisits: number;
  };
  trafficSource: {
    campaign: string;
    source: string;
    medium: string;
    keyword: string;
  };
  visitId: number;
  visitNumber: number;
  visitStartTime: number;
}

export interface IPieData {
  name: string;
  value: number;
}
