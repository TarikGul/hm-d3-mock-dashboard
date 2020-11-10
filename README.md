# Welcome to the HelloMeter Dashboard:

![Alt Text](./public/dashboard-master.gif)

## Getting Started

- Clone this repo and install the dependencies.

`npm install`

- Start the package, and go to http://localhost:3000

`npm start`


## The Data

### What can we infer from the ScatterPlot?

There is a certain customer threshold before delays start to happen. Especially above a 700 TTS. That could mean many things it could mean many things but its something to notice. 

In addition, the least amount of customers seem to be breakfast then late night(late night being the least busy). Lunch is the busiest, and where most of the delays can be seen. 

One thing to make aware, there seems to be groups of outliers, and they hold major pockets. It could mean that there isnt enough help behind the counter. 

### Additional helper graphs?

The Graphs I would put below the main Scatterplot would be helper data, and aggregations for example:

- The average amount of people in the store per `day_part` adjacent to a graph showing the average `TTS` per `day_part`. 

- A graph monitoring success trends over time. Monitoring trends after changes and have the graph reflect those changes. 

- A Table showing adjusted metrics after outliers are dealt with.
