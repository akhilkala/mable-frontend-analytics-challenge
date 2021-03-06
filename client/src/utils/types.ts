import { ReactElement } from "react";

export type Nullable<T> = null | undefined | T;

export type Children = {
  children: ReactElement | ReactElement[];
};

export interface IChartState {
  startDate: Date;
  endDate: Date;
  data: any;
  timelineFilter: string;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setData: (data: any) => void;
  setTimelineFilter: (filter: string) => void;
}

export interface IPieData {
  name: string;
  value: number;
}

export interface ILineData {
  name: string;
  views: number;
}

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
