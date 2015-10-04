(function(){

	var data = fetch('/v1/versions',{headers: new Headers({'Accept':'application/json'})}).then(function(r){return r.json();});

	var VersionSelectorPrototype = Object.create(HTMLElement.prototype);

	VersionSelectorPrototype.createdCallback = function() {
		var self = this;
	  this.selector = document.createElement("select");
	  this.selector.addEventListener("change",function(ev){
	  	ev.stopPropagation();
	  	self.setAttribute("value", self.selector.value);
	  	self.dispatchEvent(new Event('change'));
	  })
	  data.then(function(versions){
	  	versions.map(function(r){return r.id}).reverse().forEach(function(v){
	  		self.selector.add(new Option(v));
	  	});
	  	self.appendChild(self.selector);
	  	self.selector.value = self.getAttribute("value");
	  });
	};

	VersionSelectorPrototype.attributeChangedCallback = function(name, old, newValue){
		if(name === "value"){
			this.selector.value = newValue;
		}
	}

	VersionSelector = document.registerElement('version-select',{
		prototype: VersionSelectorPrototype
	})
})()