/**
 * Created by Rahul_Sahay on 8/16/2015.
 */

var mongoose = require('mongoose');
var schema=mongoose.Schema;

var memberNameValidator = [
  function (val) {
    return (val.length > 0 && val.toLocaleLowerCase() != 'none')
  },
  // Custom error text...
  'Select a valid member name.' ];

var requiredStringValidator = [
  function (val) {
    var testVal = val.trim();
    return (testVal.length > 0)
  },
  // Custom error text...
  '{PATH} cannot be empty' ];

var momSchema = new schema({
  memberName: {type:String,required:true,validate: memberNameValidator},
  projectName: {type:String,required:true,validate: requiredStringValidator},
  workedYesterday: {type:String,required:true,validate: requiredStringValidator},
  workToday: {type:String,required:true,validate: requiredStringValidator},
  anyBlocker: {type:String,required:true,validate: requiredStringValidator},
  createdOn: {type:Date,default:Date.now}
});

//Creating model now

module.exports=mongoose.model('momModel',momSchema);