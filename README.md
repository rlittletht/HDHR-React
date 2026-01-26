# HDHR-React

This is a quickly thrown together react front-end for HDHomeRun devices. 
It allows you to multi-select recordings and delete either one or all of the selected items.

Maybe more to come someday, but for now it has multi-select and delete which was the goal.

To build:
* Clone the repository
* Copy src/Secrets-Sample.ts to src/Secrets.ts and fill in your HDHomeRun storage device id
* Run `npm install` to install dependencies
* Run `npm start` to start the development server


You can get your device from the devices page in the HDHomeRun app, or you can hope that
http://hdhomerun.local finds your storage device before it finds your tuner on the network.

If hdhomerun.local doesn't find your storage device, keep trying...your DNS will update...maybe...