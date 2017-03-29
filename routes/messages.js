var express = require("express");
var router = express.Router();
var usersFakeData = require("../faker.js");
var async = require("async");
var twilio = require("twilio");
var sendResponse = require("./send_response.js");


var accountSid = "ACff85fe081aad10dec1315ba91ad36fab"; // Your Account SID from www.twilio.com/console
var authToken = "0a5882bf5d4a5c656450d254085b3040"; // Your Auth Token from www.twilio.com/console

var twilio = require("twilio");
var client = new twilio.RestClient(accountSid, authToken);

router.get("/all", function(req, res, next) {
	var allMessages = [];
	async.auto({
		getMessages: function(callback) {
			var sql = "SELECT * FROM messages ORDER BY created_at DESC";
			connection.query(sql, function(err, result) {
				if (err) {
					callback(err);
				} else {
					console.log(result);
					allMessages = result;
					callback(null);
				}
			});

		}

	}, function(err, result) {
		console.log("..err..", err);
		if (err) {
			var msg = err.toString();
			return sendResponse.sendErrorMessage(msg, res, 500);
		} else {
			res.render("messages", {
				messages: allMessages
			});

		}

	});
});


router.get("/:id/message", function(req, res, next) {

	var userId = req.params.id;
	res.render("message", {
		title: "Enter your message",
		user_id: userId,
		show_form: true,
		message: ""
	});
});

router.post("/:id/send_otp", function(req, res, next) {

	var userId = req.params.id;
	var message = req.body.message;
	var otp = randomFixedInteger(6);
	var messageDetail = {};
	var userData = {};

	async.auto({
		getUserData: function(callback) {
			usersFakeData.getUserData(userId, function(err, data) {
				if (err) {
					callback(err);
				} else {
					userData = data;
					callback(null);
				}
			});
		},
		sendTwillioSms: ["getUserData", function(result, callback) {


			client.messages.create({
				body: message + " Hi. Your OTP is " + otp,
				to: userData.phone_number, // Text this number
				from: "+14073782821" // From a valid Twilio number
			}, function(err, message) {
				if (err) {
					callback(err);
				} else {
					messageDetail = message;
					callback(null);
				}
			});

		}],
		saveOtpData: ["sendTwillioSms", function(result, callback) {

			var sql = " insert into messages(first_name, last_name, message, phone_number, date_created, otp) values(?, ?, ?, ?, ?, ?)";
			var firstName = userData.first_name;
			var lastName = userData.last_name;
			var dateCreated = messageDetail.date_created;
			var body = messageDetail.body;
			var phoneNumber = userData.phone_number;

			connection.query(sql, [firstName, lastName, body, phoneNumber, dateCreated, otp], function(err, result) {
				if (err) {
					callback(err);
				} else {
					callback(null);
				}
			});
		}]
	}, function(err, result) {
		if (err) {
			var msg = "Something with Database";
			return sendResponse.sendErrorMessage(msg, res, 500);
		} else {
			res.render("message", {
				message: "Successfully otp sent",
				show_form: false,
				user_id: userId
			});

		}
	});
});


var randomFixedInteger = function(length) {
	return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
};

module.exports = router;