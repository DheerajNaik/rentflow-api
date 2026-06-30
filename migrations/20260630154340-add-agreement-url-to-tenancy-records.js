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
  return db.addColumn('tenancy_records', 'agreement_file_url', {
    type: 'string',
    notNull: false
  })}

exports.down = function(db) {
  return db.removeColumn('tenancy_records', 'agreement_file_url')
};

exports._meta = {
  "version": 1
};
