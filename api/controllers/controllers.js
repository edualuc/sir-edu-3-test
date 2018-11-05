'use strict';

let controllers = [];

controllers.push(require(__dirname + '/routes/auth-controller'));
controllers.push(require(__dirname + '/routes/students-controller'));
controllers.push(require(__dirname + '/routes/schools-controller'));
controllers.push(require(__dirname + '/routes/adaptation-controller'));
controllers.push(require(__dirname + '/routes/document-controller'));
controllers.push(require(__dirname + '/routes/files-controller'));
controllers.push(require(__dirname + '/routes/judgement-controller'));

module.exports = controllers
