# Outline
- [Introduction](https://github.com/Mschw90/Trouvaille.io#introduction)
- [About Our Application](https://github.com/Mschw90/Trouvaille.io#about-our-application)
- [Where to Find Our Code](https://github.com/Mschw90/Trouvaille.io#where-to-find-our-code)
- [Framework](https://github.com/Mschw90/Trouvaille.io#framework)
- [Implementation Tools](https://github.com/Mschw90/Trouvaille.io#implementation-tools)

## Introduction
Trouvaille is a meduim to long distance social ride-share mobile application for use in the USA. 

Our intent was to create a social platform that allows users to elicit the services of their friends and peers. We drew inspiration from other social-service platforms such as Uber, Lyft and Venmo. This model allows us to scale and expand based on demand and at will due to extremely low overhead costs. We hope that Trouvaille makes roadtripping easier for our users and provides them an outlet to expand their social network. 

## About Our Application
Our team built this project using [React Native](https://facebook.github.io/react-native/). Although our application supports deployment in Andriod and iOS environments, we rarely tested in any Android enviornments. Beyond that, our primary testing enviornments were for iPhones 6S, 6S Plus, 7, 7S, 8 and X. The software all of these phones ran were iOS 11.2 and above. If you find any bugs or issues, please bring them up with our team.  

The code within this repository contains the source code for our React Native version of the application.

## Where To Find Our Code
| Design Location | Link to Source Code |
| --- | --- |
| Front End | https://github.com/Mschw90/Trouvaille.io |
| Back End | https://github.com/TScafeJR/Ride-Server |


## Framework
In order to ultimately scale our application as both a mobile application and a website, we decided as a team to create a centralized server that manages requests to and from our users. In order to acheive this setup, we bundled the [website and server together in a seperate repository](https://github.com/TScafeJR/Ride-Server) and put the React Native code within this repository. To reduce labor, it makes sense to have both of these versions make requests to the same server rather than writing a different server for both applications. This strategy also allows us to access and edit the same databases. This should help limit the complexity of our application, however this project required some creative work arounds to keep this structure viable as we scaled up.

## Implementation Tools
We deployed our server to Heroku in order to create an API endpoint for apps and website. This server in turn handled a number of responsibilities:
  1. It stored and retrieved photographs taken on the application for user profile photographs and cars on a database hosted by Amazon Web Services (AWS).
  2. It communicated with our PostgreSQL database. We in turn used this database to execute queries on the relevent information for our user. This made loading our user feed, retreiving user information and searches easier to execute than using the alternative (MongoDB) database.
  3. We loaded information from a site [Makemydrive.fun](Makemydrive.fun) to load things to do during the user's trip. We bundled this information with each individual trip and it was accessible when viewing the individual trip information.




