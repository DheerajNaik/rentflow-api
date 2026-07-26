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
  return db.addColumn('houses', 'electricity_bill_image', {
    type: 'string',
    length: 200,
    notNull: false
  }).then(()=>{
   return db.addColumn('houses', 'electricity_bill_image_cloudinary_public_id', {
    type: 'string',
    length: 200,
    notNull: false
  })
  })
};

exports.down = function(db) {
  return db.deleteColumn('houses', 'electricity_bill_image', {
    type: 'string',
    length: 200,
    notNull: false
  }).then(()=>{
   return db.deleteColumn('houses', 'electricity_bill_image_cloudinary_public_id', {
    type: 'string',
    length: 200,
    notNull: false
  })
  })
};

exports._meta = {
  "version": 1
};
