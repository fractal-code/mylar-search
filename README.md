# mylar:search

The Mylar platform features a multi-key search system that enables keyword search over data encrypted with different keys. This is crucial for enabling collaboration between users and other traditional functionality in web applications.

(More information about the system is available [here](http://eprint.iacr.org/2013/508.pdf)).

This meteor packages extends the core functionality of [Mylar](https://github.com/gliesesoftware/mylar).

## Installation
Ensure you have the [mylar:platform package](https://github.com/gliesesoftware/mylar) or an equivalent set of packages added to your app.

```console
meteor add mylar:platform
```

Ensure you have the following libraries to build the crypto server:<br>

- libreadline
- libgmp
- libpbc
- libcrypto++9

Add the mylar:search package to your app

```console
meteor add mylar:search
```
## Usage<br>
1. Add 'SEARCHABLE' attribute to your encrypted fields annotations. <br>
```javascript
// make the encrypted 'messages' field in Collection 'Messages' searchable
Messages._encrypted_fields({'message': {princ: 'roomprinc', 
                                           princtype: 'room', 
                                           auth: ['_id', 'foo'],
                                           attr: 'SEARCHABLE'}});
```
<br>
2. Publish a search filter on the server
```javascript
// publishes filter for "Messages" Collection named "messages-user-can-access"
// takes in an argument "userID" to identify the rooms user has access to
// returns an array of room ID's to check against each message
Messages.publish_search_filter("messages-user-can-access", function (userID) {
	// create a list of all the rooms this user has access to
	var rooms = Rooms.find({$or: [{createdByID: userID},
				           {invitedID : userID}]}).fetch();
	var filters = [];
	_.each(rooms, function(room) {
	    filters.push({rID: room._id});
	});
	
	return filters;
    };
});
```
<br>
3. Search for words in fields of a collection using a filter
```javascript
// search for word 'foo' in field 'message' using filter 'blue-colored'
// use logged in user's principal & pass in 'filterInput' to search filter
// log search result in callback
Messages.search("blue-colored", {'message': 'foo'}, Principal.user(), 'filterInput', function (result) {console.log("Search result: " + result);});
```
<br>

