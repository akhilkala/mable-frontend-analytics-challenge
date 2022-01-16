# Mable Frontend Analytics Challenge

### Steps to run

* Create a .env file in the root of the client (Refer to .env.example)
* `cd client && npm install`
* `cd api && npm install`
* `cd api && npm run dev`
* `cd client && npm start`


### Data Parsing

* Data has been parsed and cleaned up with api/src/parse.ts
* Only the JSON is included in the repo
* To run the parsing script place the csv file in api/src/assets and run `cd api && npm run parse`


### Data handling in client

* Data is fetched from an API in src/context/DataContext.tsx
* All the grouping and reduction is handled here (Each function has 3 arguments used to filter data)
* useData hook is used to access data in any component
* src/components/ChartSection is a higher order component which renders a chart and its filter options
* src/components/DateRange is a dumb component used to render date filters
* src/components/LineChart and src/components/PieChart are the chart components
* src/hooks/useChartState is used to track chart filter state


### Problems

* Client is slow because it has a lot of data in memory, ideally should make API call for only required data
* Not Resonsive below 560px
* Favicon has not been changed