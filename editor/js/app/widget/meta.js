import * as View from 'mvc/View';
export class MetaCategoryList extends View {

		constructor(){
			super();
			this.subViews = [];
			this.el.innerHTML = `<div class='category-list'>
			</div>
			<hr/>
			<button class="btn" id="add-cat">Add Category</button>`;
			this.delegateEvents({
				"click #add-cat": ()=>{
					var cat = new MetaCategory();
					this.subViews.push(cat);
					this.qs('.category-list').appendChild(cat.el);
				}
			});
		}

		getValue(){
			return this.subViews.map((e)=>e.getValue());
		}

		setValue(v){
			this.qs(".category-list").innerHTML = "";
			this.subViews = [];
			var catList = this.qs(".category-list");
			v.forEach((e)=>{
					var cat = new MetaCategory();
					cat.setValue(e);
					this.subViews.push(cat);
			});
			this.subViews.map((e)=>this.qs(".category-list").appendChild(e.el));
		}
	}

export class MetaCategory extends View {

		constructor(){
			super();
			this.subViews = [];
			this.el.innerHTML = `<input type="text" placeholder="category name" id="cat-label" />
			<div class='entry-list'>
			</div>
			<button class="btn" id="add-entry">Add Entry</button>`;
			this.delegateEvents({
				"click #add-entry": ()=>{
					var cat = new MetaEntry();
					this.subViews.push(cat);
					var div = document.createElement("div");
					div.innerHTML = `<a href="#" id="remove">&times</a>`;
					div.insertBefore(cat.el, div.querySelector("a"));
					this.qs(".entry-list").appendChild(div);
				}
			});
		}

		getValue(){
			return {
				label: this.qs("#cat-label").value, 
				entries: this.subViews.map((e)=>e.getValue())
			}
		}

		setValue(v){
			this.qs("#cat-label").value = v.label;
			this.qs(".entry-list").innerHTML = "";
			var entryList = this.qs(".entry-list");
			console.log(v.entries);
			v.entries.forEach((e)=>{
				var cat = new MetaEntry();
					cat.setValue(e);
					this.subViews.push(cat);
					var div = document.createElement("div");
					div.innerHTML = `<a href="#" id="remove">&times</a>`;
					div.insertBefore(cat.el, div.querySelector("a"));
					entryList.appendChild(div);
			});
		}

	}

	class MetaEntry extends View {

		constructor(){
			super();
			this.el.innerHTML = `
			<input type="text" placeholder="label" id="label"/>
			<input type="number" placeholder="label" id="value" min="0" max="15"/>`;
		}

		getValue(){
			return {
				label: this.qs("#label").value,
				value: this.qs("#value").value
			}
		}

		setValue(v){
			this.qs("#label").value = v.label;
			this.qs("#value").value = v.value;
		}

	}

