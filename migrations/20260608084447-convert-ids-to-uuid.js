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
  return db.changeColumn('buildings','id',{type:'varchar(36)',notNull:true})
  .then(()=>db.changeColumn('houses','id',{type:'varchar(36)',notNull : true} ))
  .then(()=>db.changeColumn('houses', 'building_id', {type:'varchar(36)',notNull:true}))
  .then(()=>db.changeColumn('expenses', 'id', {type:'varchar(36)',notNull:true}))
  .then(()=>db.changeColumn('expenses', 'building_id', {type:'varchar(36)',notNull:true}))
  .then(()=>db.changeColumn('expenses', 'house_id', {type:'varchar(36)',notNull:true}))
  .then(()=>db.changeColumn('payments', 'id', {type:'varchar(36)',notNull:true}))
  .then(()=>db.changeColumn('payments', 'tenancy_record_id', {type:'varchar(36)',notNull:true}))
  .then(()=>db.changeColumn('tax', 'id', {type:'varchar(36)',notNull:true}))
  .then(()=>db.changeColumn('tax', 'building_id', {type:'varchar(36)',notNull:true}))
  .then(()=>db.changeColumn('tenants', 'id', {type:'varchar(36)',notNull:true}))
  .then(()=>db.changeColumn('tenancy_records', 'id', {type:'varchar(36)',notNull:true}))
  .then(()=>db.changeColumn('tenancy_records', 'tenant_id', {type:'varchar(36)',notNull:true}))
  .then(()=>db.changeColumn('tenancy_records', 'house_id', {type:'varchar(36)',notNull:true}))
  
};

exports.down = function(db) {
  return db.changeColumn('buildings','id',{type:'int',notNull:true})
  .then(()=>db.changeColumn('houses','id',{type:'int',notNull : true} ))
  .then(()=>db.changeColumn('houses', 'building_id', {type:'int',notNull:true}))
  .then(()=>db.changeColumn('expenses', 'id', {type:'int',notNull:true}))
  .then(()=>db.changeColumn('expenses', 'building_id', {type:'int',notNull:true}))
  .then(()=>db.changeColumn('expenses', 'house_id', {type:'int',notNull:true}))
  .then(()=>db.changeColumn('payments', 'id', {type:'int',notNull:true}))
  .then(()=>db.changeColumn('payments', 'tenancy_record_id', {type:'int',notNull:true}))
  .then(()=>db.changeColumn('tax', 'id', {type:'int',notNull:true}))
  .then(()=>db.changeColumn('tax', 'building_id', {type:'int',notNull:true}))
  .then(()=>db.changeColumn('tenants', 'id', {type:'int',notNull:true}))
  .then(()=>db.changeColumn('tenancy_records', 'id', {type:'int',notNull:true}))
  .then(()=>db.changeColumn('tenancy_records', 'tenant_id', {type:'int',notNull:true}))
  .then(()=>db.changeColumn('tenancy_records', 'house_id', {type:'int',notNull:true}))
};

exports._meta = {
  "version": 1
};
