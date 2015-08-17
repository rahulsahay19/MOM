/**
 * Created by Rahul_Sahay on 8/16/2015.
 */

var momModel = require('../models/mom.server.model.js');

//Query db to return the entire list
exports.list = function(req,res){
  var query=momModel.find();

  //Then apply sorting on the same
  query.sort({createdOn:'desc'})
    .limit(10)
    .exec(function(err,results){
      res.render('index',{title: 'Scrum Meeting List',notes:results});
    });
};

//return filtered result
exports.filterByMember= function (req,res) {
  var query = momModel.find();
  //apply filtering
  var filter = req.body.memberName;

  query.sort({createdOn:'desc'});

  if(filter.length>0){
    query.where({memberName:filter})
  }

  query.exec(function (err,results) {
    res.render('index',{title: 'Scrum Meeting List',notes:results})
  })
}
//Create the function to save the form data in mongo db
exports.create = function (req, res) {
  var entry = new momModel({
    //Now, obtain the form data from the req object
    //which is passed in the function
      memberName: req.body.memberName,
      projectName: req.body.projectName,
      workedYesterday: req.body.workedYesterday,
      workToday: req.body.workToday,
      anyBlocker: req.body.anyBlocker,
  });

  // To save the collection in mongo db
  entry.save(function (err) {
    if (err) {
      var errMsg = 'Sorry, there was an error while saving the data. ' + err;
      res.render('newnote', { title: 'MOM - New Note (error)', message: errMsg });
    }
    else {
      console.log('Note saved successfully!');
      // Redirect to the home page to display list of notes...
      res.redirect(301, '/');
    }
  });
};

/*Function to fetch the note*/

exports.getNote=function(req,res){
  res.render('newnote',{title:'MOM - New Note'});
};