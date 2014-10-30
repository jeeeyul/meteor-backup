#! /usr/bin/env node
// -*- js -*-

"use strict";

var argv = require("optimist")
  .usage("Usage: $0 -h [host] -o [out]")
  .options("h", {
    alias : "host"
  })
  .options("o", {
    alias : "out",
    default : "dump"
  })
  .string("out")
  .string("host")
  .demand(["host", "out"])
  .argv;

var _ = require("underscore");
var spawn = require('child_process').spawn;
var colors = require('colors');

main();

function main(){
  console.log("Trying to get database information from " + argv.host.yellow + ".");
  try{
    var buffer = "";
    var child = spawn('meteor', ['mongo', argv.host, "--url"]);
    child.on('error', function(err){
      console.log("Error:".red + " " + "meteor".yellow + " seems to not installed!");
    });

    child.stdout.on('data', function(data){
      buffer += data;
    });

    child.on('exit', function(code){
      onURLReceive(buffer.trim());
    });
  }catch(err){
    conosl
  }
}

function onURLReceive(buffer){
  var segments = buffer.match(/^mongodb:\/\/([a-z0-9-]*):([a-z0-9-]*)@([^:]*):([0-9]+)\/([a-z_]+)$/);

  if(!segments){
    console.log("Error:".red +" " + argv.host.yellow + " seems not to be valid meteor product URL.");
    return;
  }

  var scheme = {
    userId : segments[1],
    password : segments[2],
    host : segments[3],
    port : parseInt(segments[4]),
    db : segments[5]
  };
  backup(scheme);
}

function backup(scheme){
  console.log("Starting backup from " + scheme.host.yellow + "/" + scheme.db.yellow + " to " + argv.out.yellow);
  var args = ['-h', scheme.host, '--port', scheme.port, '--username', scheme.userId, '--password', scheme.password, '-d', scheme.db, '-o', argv.out];
  var child = spawn('mongodump', args, {
    stdio : ['pipe', 'pipe', process.stdout]
  });
  child.on('error', function(err){
    console.log("Error:".red + " " + "momgodump".yellow + " seems to not installed!");
  });

  child.on('exit', function(){
    console.log("Done!");
  });
}
