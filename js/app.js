/* data goes here */
var data = [];
			
function Item(data) {
	this.title = ko.observable(data.title);
	this.isDone = ko.observable(data.isDone);
	this.edit = ko.observable(data.edit);
	
	this.startEdit = function (event) {
		console.log("editing");
		this.edit(true);
	}
	
	this.updateItem = function (item) {
		this.edit(false);
	}

}

 function todoList(title, children) {
	// Data
	var self = this;
	self.title = ko.observableArray();
	self.title(title);

	self.editTitle = ko.observable();
	self.editTitle(false);
	
	self.items = ko.observableArray(children);
	self.newItemText = ko.observable();

	//
	self.toggleEditTitle = function() {
		var state = self.editTitle();
		self.editTitle(!state);
	}

	//
	self.incompleteItems = ko.computed(function() {
		return ko.utils.arrayFilter(self.items(), 
			function(item) { 
				return !item.isDone() && !item._destroy;
			});
	});

	self.completeItems = ko.computed(function(){
		return ko.utils.arrayFilter(self.items(), 
			function(item) { 
				return item.isDone() && !item._destroy;
			});
	});

	// Operations
	self.addItem = function() {
		self.items.push(new Item({ title: this.newItemText(), edit: false }));
		self.newItemText("");
	};

	self.removeItem = function(item) {
		 self.items.destroy(item) 
	};

	self.removeCompleted = function() {
		self.items.destroyAll(self.completeItems());
	};

	/* Load the data */
	var mappedItems = $.map(data, function(item){
		return new Item(item);
	});

	self.items(mappedItems);			
}

// This is a list of todoLists
function todoLists() {
	var self = this;

	self.lists = ko.observableArray([]);

	self.newListText = ko.observable();
	
    // Operations
	self.addList = function(name) {
		self.lists.push(new todoList(self.newListText(), []));
		self.newListText("");
	};

	// Operation
	self.removeList = function(list) {
		self.lists.destroy(list) 
	};
}
 
// The view model is an abstract description of the state of the UI, but without any knowledge of the UI technology (HTML)
var viewModel = {
    data: new todoLists()
};
 
ko.applyBindings(viewModel);
