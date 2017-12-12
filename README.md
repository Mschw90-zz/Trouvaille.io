# Outline
- Introduction
- About Our Application
- Where to Find Our Code
- Framework
- Implementation Tools

## Introduction
Trouvaille is a meduim to long-distance ride sharing application for use in the USA. The code below contains the source code for our React Native version of the application. 

## About Our Application
TBA

## Where To Find Our Code
| Design Location | Link to Source Code |
| --- | --- |
| Front End | https://github.com/Mschw90/Trouvaille.io |
| Back End | https://github.com/TScafeJR/Ride-Server |


## Framework
In order to scale our application, as both a mobile app and a website we decided as a team to create a centralized server that manages requests to and from our users. In order to acheive this setup, we bundled the website and server together in a seperate repository and put the React Native code in this repository. To reduce labor, it makes sense to have both of these versions make requests to the same server rather than writing a different server for both applications. This should help limit the complexity of our application, however this project required some creative work arounds to keep this structure viable as we scaled up.


###### Implementation Tools



