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
 return db.createTable('tenancy_records', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    tenant_id: { type: 'int', notNull: true },
    house_id: { type: 'int', notNull: true },
    move_in_date: { type: 'date', notNull: true },
    move_out_date: { type: 'date', notNull: false },
    number_of_occupants: { type: 'int',  notNull: true },
    minimum_stay_months: { type: 'int', notNull: true },
    agreement_done: { type: 'tinyint',  notNull: false },
    agreement_expiry_date : { type: 'date', notNull: false },
    painting_charges: { type: 'decimal',  notNull: true },
    notes:{type: 'text',notNull: false },
    created_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
    updated_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
  }).then(() => {
    console.log('tenancy-records table created successfully')
  }).catch((err) => {
    console.error('Error creating tenancy-records table:', err)
  })
};

exports.down = function(db) {
   return db.dropTable('tenancy_records')
};

exports._meta = {
  "version": 1
};
