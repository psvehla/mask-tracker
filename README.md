# Mask Tracker

In Beijing, we all have pollution masks for those 'heavy days'. The manufacturers of these masks offer guidance on how long they will last before they need replacing. The guidance is based on the AQI rating of the air in which the mask is used. If the mask is worn in a range of pollution conditions, this actually makes it a little tricky to figure out how much life is left in a mask. I was using a spreadsheet, but found I would often forget to update it when I came home. Google Sheets does work on my phone, but the UX is less than edifying.

I also happened to be looking for a near-trivial project to take the [Ionic](http://ionicframework.com/docs/) framework for a spin.

The app supports multiple masks, since I have a few lying around by now. I also keep track of my son's masks. Since all of our masks are either VogMask or Cambridge types (which use the same filtration material), the app only supports those types (or other types that use the same filtration material). I didn't bother with others, since I don't actually expect anyone other than myself to be using this app.

# Contributing

This project is built using the [Ionic](http://ionicframework.com/docs/) framework, so used the Ionic starter template as a base. Instructions on how to set up your development environment follow, as provided by the starter template.

This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myBlank blank
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.
