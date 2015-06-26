// Essentials
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

// App
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var _ = require('underscore');

// Additions
var Firebase = require('firebase')
var _ = require('underscore');


// Configuration
var ref = new Firebase("https://newstestapp.firebaseio.com/");

// STATES

// options
var LogRegSelect = "Login";

// User
var username;
var email;
var password;

// Options

// Dispatch functions
function handleUsername(data) {
	username = data;
}

function handleEmail(data) {
	email = data;
}

function handlePassword(data) {
	password = data;
}

function handleLoginSelect() {
	LogRegSelect = LogRegSelect == "Login" ? "Register" : "Login";
}

function login(email, password) {
	ref.authWithPassword({
		email: email,
		password: password
	}, function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			console.log("Authenticated successfully with payload:", authData);
			window.location.href ="#/submit";
		}
	});
}

function register(email, password, username) {
	ref.createUser({
		email: email,
		password: password
	}, function(error, userData) {
		if (error) {
			console.log("Error creating user:", error);
		} else {
			var userRef = ref.child("users");
			var uid = userData.uid;
			userRef.child(uid).set({
				username: username,
				role: 10
			});
			console.log("Successfully created user account with uid:", userData.uid);
			login(email, password);
		}
	});
}

// State functions
var LoginStore = assign({}, EventEmitter.prototype, {
	getState: function() {
		return {
			email: email,
			password: password,
			username: username,
			LogRegSelect: LogRegSelect,
		}
	},
	checkAuth: function() {
		var authData = ref.getAuth();
		if (authData) {
			window.location.href ="#/submit";
		} else {
			console.log("User is logged out");
		}
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

// Dispatcher
AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case AppConstants.HANDLE_EMAIL:
			handleEmail(action.data);
			LoginStore.emitChange();
			break;
		case AppConstants.HANDLE_PASSWORD:
			handlePassword(action.data);
			LoginStore.emitChange();
			break;
		case AppConstants.HANDLE_USERNAME:
			handleUsername(action.data);
			LoginStore.emitChange();
			break;
		case AppConstants.HANDLE_LOGIN_SELECT:
			handleLoginSelect();
			LoginStore.emitChange();
			break;
		case AppConstants.LOGIN:
			login(action.email, action.password);
			LoginStore.emitChange();
			break;
		case AppConstants.REGISTER:
			register(action.email, action.password, action.username);
			LoginStore.emitChange();
			break;
		default:
	}
});

module.exports = LoginStore;