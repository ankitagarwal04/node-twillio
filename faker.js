var faker = require("faker");

var fakeData = [{
  id: 1,
  first_name: "Kisan ",
  last_name: "app",
  phone_number: "+919971792703"
}, {
  id: 2,
  first_name: "Ankit ",
  last_name: "Agarwal",
  phone_number: "+919582376396"
}, {
  id: 3,
  first_name: "Ankit",
  last_name: "Kumar",
  phone_number: "+918860019688"
}, {
  id: 4,
  first_name: "Madhur",
  last_name: "Arya",
  phone_number: "+919654389727"
}, {
  id: 5,
  first_name: "Colton",
  last_name: "Haley",
  phone_number: "+911-952-508-9029 x875"
}, {
  id: 6,
  first_name: "Melvin",
  last_name: "Zemlak",
  phone_number: "+91(563) 240-3148 x09807"
}, {
  id: 7,
  first_name: "Ryan",
  last_name: "Bartell",
  phone_number: "+91403.875.7784"
}, {
  id: 8,
  first_name: "Eduardo",
  last_name: "Wilderman",
  phone_number: "+91(777) 607-2505 x75806"
}, {
  id: 9,
  first_name: "Cole",
  last_name: "Lindgren",
  phone_number: "+91087.776.8391"
}, {
  id: 10,
  first_name: "Jairo",
  last_name: "Heathcote",
  phone_number: "+91(350) 948-7197"
}, {
  id: 11,
  first_name: "Eugene",
  last_name: "Cruickshank",
  phone_number: "+91(621) 848-6655 x2201"
}, {
  id: 12,
  first_name: "Christian",
  last_name: "Hamill",
  phone_number: "+911-729-500-7953 x89992"
}, {
  id: 13,
  first_name: "Dulce",
  last_name: "Paucek",
  phone_number: "+91825.731.4514"
}, {
  id: 14,
  first_name: "Mabel",
  last_name: "Considine",
  phone_number: "+91213-617-8598 x4888"
}, {
  id: 15,
  first_name: "Harry",
  last_name: "Simonis",
  phone_number: "+91408.424.3859 x88333"
}, {
  id: 16,
  first_name: "Joannie",
  last_name: "Murazik",
  phone_number: "+911-693-593-7484"
}, {
  id: 17,
  first_name: "Uriel",
  last_name: "Zulauf",
  phone_number: "+911-480-734-7453 x7018"
}, {
  id: 18,
  first_name: "Greg",
  last_name: "Rau",
  phone_number: "+91286-817-7636"
}, {
  id: 19,
  first_name: "Vincenzo",
  last_name: "Bogisich",
  phone_number: "+91619.749.6989 x835"
}, {
  id: 20,
  first_name: "Mathilde",
  last_name: "Wolf",
  phone_number: "+91479-042-3714"
}, {
  id: 21,
  first_name: "Lola",
  last_name: "Murazik",
  phone_number: "+91831-784-1861"
}];


/*
var getUsersData = function() {
  console.log("..............");
  var len = 20;
  for(var i=0; i< len; i++) {
    (function(i)
    {
        var randomFirstName = faker.name.firstName(); // Rowan Nikolaus
  var randomLastName = faker.name.lastName(); // Rowan Nikolaus
  var randomPhoneNumber = faker.phone.phoneNumber(); // Rowan Nikolaus
  var user = {
    "id": i+1,
    "first_name": randomFirstName,
    "last_name": randomLastName,
    "phone_number": "+91" + randomPhoneNumber
  }
  usersData.push(user);
  // console.log(user);
  if (i == len - 1) {
        console.log(usersData);
        
    }

    })(i)
    }


}
*/

exports.getUsersData = function(callback) {
  callback(null, fakeData);
};


exports.getUserData = function(userId, callback) {

  fakeData.filter(function(user) {
    if (user.id == userId) {
      callback(null, user);
    }

  });

};