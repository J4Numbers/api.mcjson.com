(function(){
	"use strict";
	class MetaCategoryList extends HTMLElement {

		constructor(){
			super();
		}

		createdCallback() {
			this.root = this.createShadowRoot();
			this.root.innerHTML = `
			<style>@import url("css/bootstrap.min.css");
			  meta-category{
			    display: block;
			  }
			</style>
			<div id='category-list'>
			</div>
			<hr/>
			<button class="btn" id="add-cat">Add Category</button>`;
		}

		getValue(){
			return [].map.call(this.root.querySelector("meta-category"),(e)=>e.getValue())
		}

		setValue(v){
			this.root.querySelector("#category-list").innerHTML = "";
			var catList = this.root.querySelector("#category-list");
			v.forEach((e)=>{
					var cat = document.createElement("meta-category");
					cat.setValue(e);
					catList.appendChild(cat);
			});
		}

	}

	document.registerElement('meta-category-list', MetaCategoryList);

	class MetaCategory extends HTMLElement {

		createdCallback() {
			this.root = this.createShadowRoot();
			this.root.innerHTML = `
			<style>@import url("css/bootstrap.min.css");</style>
			<input type="text" placeholder="category name" id="cat-label" />
			<div id='entry-list'>
			</div>
			<button class="btn" id="add-entry">Add Entry</button>`;
		}

		getValue(){
			return {
				label: this.root.querySelector("#cat-label").value, 
				entries: [].map.call(this.root.querySelector("meta-entry"),(e)=>e.getValue())
			}
		}

		setValue(v){
			this.root.querySelector("#cat-label").value = v.label;
			this.root.querySelector("#entry-list").innerHTML = "";
			var entryList = this.root.querySelector("#entry-list");
			v.entries.forEach((e)=>{
					var div = document.createElement("div");
					div.innerHTML = `<meta-entry></meta-entry><a href="#" id="remove">&times</a>`;
					div.querySelector("meta-entry").setValue(e);
					entryList.appendChild(div);
			});
		}

	}

	document.registerElement('meta-category', MetaCategory);

	class MetaEntry extends HTMLElement {

		createdCallback() {
			this.root = this.createShadowRoot();
			this.root.innerHTML = `
			<style>@import url("css/bootstrap.min.css");</style>
			<input type="text" placeholder="label" id="label"/>
			<input type="number" placeholder="label" id="value" min="0" max="15"/>`;
		}

		getValue(){
			return {
				label: this.root.querySelector("#label").value,
				value: this.root.querySelector("#value").value
			}
		}

		setValue(v){
			this.root.querySelector("#label").value = v.label;
			this.root.querySelector("#value").value = v.value;
		}

	}

	document.registerElement('meta-entry', MetaEntry);

})();