var ReviewActions = require('./ReviewActions');

var ref = new Firebase("https://newstestapp.firebaseio.com/");

var Server = {
	getSubmissions: function() {
		var getRef = ref.child("articles");
		getRef.on("child_added", function(dataSnapshot) {
			var data = dataSnapshot.val();
			data['id'] = dataSnapshot.key()
			ReviewActions.getSubmissionList(data);
		});
	}
}

module.exports = Server;