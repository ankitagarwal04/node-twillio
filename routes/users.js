var express = require("express");
var router = express.Router();
var usersFakeData = require("../faker.js");
var async = require("async");
var sendResponse = require("./send_response.js");

router.get("/", function(req, res, next) {

	var usersData = [];
	async.auto({
		getUserData: function(callback) {
			usersFakeData.getUsersData(function(err, data) {
				if (err) {
					callback(err);
				} else {
					usersData = data;
					callback(null);
				}
			});
		}
	}, function(err, result) {
		if (err) {
			var msg = err.toString() + "Something with user data";
			return sendResponse.sendErrorMessage(msg, reply, 500);
		} else {
			res.render("users", {
				users: usersData
			});
		}

	});
});



router.get("/:id", function(req, res, next) {
	var userId = req.params.id;
	var usersData = [];
	async.auto({
		getUserData: function(callback) {
			usersFakeData.getUsersData(function(err, data) {
				if (err) {
					callback(err);
				} else {
					usersData = data;
					callback(null);
				}
			});
		}
	}, function(err, result) {
		if (err) {
			var msg = err.toString() + "Something with Database";
			return sendResponse.sendErrorMessage(msg, reply, 500);
		} else {
			usersData.filter(function(user) {
				if (user.id == userId) {
					res.render("userInfo", {
						user: user
					});
				}

			});
		}

	});
});



module.exports = router;