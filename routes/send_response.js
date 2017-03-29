exports.sendErrorMessage = function(msg, res, status) {
  var errResponse = {
    status: status,
    message: msg
  };
  sendData(errResponse, res);
};

function sendData(data, res) {
  res.type("json");
  res.jsonp(data);
}