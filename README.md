## filter: HIGHLIGHTS
Catch up on the latest and greatest highlights from around the sports world.

## Installation and Setup Instructions
You can access this application here: http://highlights.andrewmitchell.io/

If you'd rather view this application on your local machine, you'll need node and npm installed globally.

Installation:
`npm install`

To Start Server: 
`npm run start-server-dev`

To Compile Front End:
`npm run start-react`

To Visit Local App:
`localhost:3000`


##Screenshots 

![Alt text](https://s3.amazonaws.com/personal-project-readmes/highlights-screen-shot-1.png "Home Page")
Select one of the buttons in the upper right corner to view highlights from that sport


![Alt text](https://s3.amazonaws.com/personal-project-readmes/highlights-screen-shot-2.png "Unique ID")
You can enter an ID or phrase you will remember here if you'd like to save any videos


## Technologies
- React
- Node
- Express
- PostgreSQL
- AWS

## Reflection
This was an application I built during my week off at Hack Reactor.  I was driven to build this out of personal experience.
When searching for a one stop shop for highlights there were a couple options, none of which seemed to be efficient.
With this application I hoped to provide an ad-free, no frills website where you can access and view the content you're 
looking for in quick fashion.

My core application technologies were all easy choices for their ease of use.  PostgreSQL was chosen as a persistent data store
purely to gain more experience with the database.  This application is hosted on AWS with a simple deployment to an EC2 instance
and an RDS instance. This was chosen our of time constraints, but a future iteration on this application bring a more elegant architecture.

From a functional perspect the biggest decision was the inclusion of a unique ID rather than setting up user profiles with
authentication.  There is no strong usecase for this application to store user data and therefore assume the liability of protecting
user data.  The only thing you might want to do is save highlights so you can share them with friends or watch them again later.
Allowing users to save highlights to a unique ID accomplishes this without exposing the application to any unnecessary liability


### Thanks for taking a look!  Hope you enjoy the highlights!
