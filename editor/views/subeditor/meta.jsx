import React from 'react';
import View from 'mvc/View';
export class MetaCategoryList extends React.Component {

		render(){
			var categories = this.props.cat.map((c)=>{return <MetaCategory category={c}></MetaCategory>;})
			return <div class="category-list">
				<div class='categories'>
				{categories}
				</div>
				<hr/>
				<button 
					className="btn" 
					id="add-cat"
					onClick={handleAddCat}
				>Add Category</button>
				</div>;
		}	

		handleAddCat(){
			var cat = new MetaCategory();
		}
	}

export class MetaCategory extends React.Component {

		constructor(){
			super();
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

		render(){

			return <div class="meta-category">
				<input type="text" placeholder="category name" id="cat-label" />
				<div class='entry-list'>
				</div>
				<button class="btn" id="add-entry">Add Entry</button>
			</div>;
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

