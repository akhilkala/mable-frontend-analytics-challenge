import fs from "fs";
import path from "path";
import * as csv from "fast-csv";

interface IData {
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

const entries: IData[] = [];
let index = 0;

fs.createReadStream(path.resolve(__dirname, "assets", "test.csv"))
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    if (index % 10 !== 0) {
      index++;
      return;
    }
    const entry: any = {};
    Object.keys(row).forEach((key) => {
      if (!isNaN(row[key])) {
        if (key == "date") {
          entry[key] = new Date(
            row[key].slice(0, 4) +
              "-" +
              row[key].slice(4, 6) +
              "-" +
              row[key].slice(6, 8)
          );
        } else {
          entry[key] = parseInt(row[key]);
        }
        return;
      }
      try {
        const object = JSON.parse(row[key]);
        const filteredObject: any = {};
        Object.keys(object).forEach((k) => {
          if (
            object[k] == "not available in demo dataset" ||
            k == "adwordsClickInfo"
          )
            return;
          filteredObject[k] = key == "totals" ? parseInt(object[k]) : object[k];
        });
        // Filtering all the values in nested object which are not available in dataset
        entry[key] = filteredObject;
      } catch (err) {
        // Converting to JS Object is value is JSON
        entry[key] = row[key];
      }
      // Directly adding if string
    });

    entries.push(entry);
    index++;
  })
  .on("end", async () => {
    fs.writeFileSync(
      path.resolve(__dirname, "assets", "data.json"),
      JSON.stringify(entries),
      "utf8"
    );
    console.log("Data parsed");
  });
