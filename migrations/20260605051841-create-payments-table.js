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
  return db.createTable('payments', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    tenancy_record_id: { type: 'int',  notNull: true },
    amount_paid: { type: 'decimal', notNull: true },
    payment_date: { type: 'date', notNull: true },
    payment_for_month: { type: 'int', notNull: true },
    payment_for_year: { type: 'int', notNull: true },
    payment_mode: { type: 'string', length: 500, notNull: true },
    paid_to_account: { type: 'string', notNull: false },
    balance: { type: 'decimal', notNull: false },
    notes:{type: 'text',notNull: false },
    created_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
    updated_at: { type: 'timestamp', defaultValue: 'CURRENT_TIMESTAMP', notNull: true },
  }).then(() => {
    console.log('payments table created successfully')
  }).catch((err) => {
    console.error('Error creating payments table:', err)
  })

};

exports.down = function(db) {
  return db.droptable("payments")
};

exports._meta = {
  "version": 1
};
