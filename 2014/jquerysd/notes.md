# You Want Client Side Package Management

Intro
-----

Come work with me! Especially if you can convert Ruby --> Scala,
     or write JavaScript.

Created
Co-authored
Co-authored

We only have 30 minutes so lets get into it.
Gonna take you through my experience since 2009ish

jqueryPlugins.js
----------------

This is real code from my first real programming job.

It's got a bunch in it

  * doOnce
  * Pub Sub
  * Cookie plugin, Jookie Plugin
  * JSON polyfil
  * Some crazy tooltip plugin

It should be obvious why this is wrong

  * It doesn't scale
  * Manual entry is error prone
  * Better make sure everything is in the correct order / dependencies
  * Not every page needs all these plugins

Git Submodules
--------------

Reasons why this sucks

  * Manually track down and add the git endpoint
  * How do you know what is a submodule and what isnt?
    * Check in .gitmodules?
  * Updating submodules in a commit is not clear

Real package managers
---------------------

* You'll notice I didn't include npm.
    * require is really fs.readFileSync
* You'll also notice I didn't include ember

THE PACKAGE MANAGERS
--------------------
Jam, Volo, Component all manage packages, but also do more

* Jam
    * AMD Only
    * Comes with modified require.js
* Volo
    * Also prefers AMD
    * Will convert non-AMD scripts
    * Includes build tools
* Component
    * Enforces CommonJS
    * Sync require
    * Does build tools also

Demo
----

Steps

  - Show blank HTML page
  - `bower install bootstrap`
  - Add jQuery script tag, Bootstrap CSS to the page.
