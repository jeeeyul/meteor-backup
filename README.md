meteor-backup
=============

``` bash
$ npm install meteor-backup -g
$ meteor-backup -h myapp.meteor.com -o dump
```

Migration Free Meteor.com hosting to MongoLab
=============================================

```
$ meteor-backup -h myapp.meteor.com -o dump
$ mongorestore --host xxxxx.mlab.com --port 11399 --db mongolab_dbname --username mongolab_db_username --password mongolab_db_password dump/myapp_meteor_com
```
