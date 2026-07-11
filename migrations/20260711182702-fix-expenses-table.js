'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {

  return db.changeColumn('expenses','house_id',{type:'varchar(36)',notNull:false})
  .then(()=>{
   return db.addColumn('expenses', 'is_active', {
     type: 'tinyint', length: 1, notNull: true, defaultValue: 1 
  })
  })

  
};

exports.down = function(db) {
  return db.changeColumn('expenses','house_id',{type:'varchar(36)',notNull:false})
  .then(()=>{
   return db.addColumn('expenses', 'is_active', {
     type: 'tinyint', length: 1, notNull: true, defaultValue: 1 
  })
  })
};

exports._meta = {
  "version": 1
};
