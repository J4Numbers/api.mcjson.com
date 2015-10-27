import * as View from 'mvc/View';
export default class ItemEditor extends View {
	constructor(model){
		super();
		this.model = model;
		this.el.innerHTML = `

		<div class="metadata">
		</div>`;
	}

	render(){
		this.qs(".metadata").innerHTML = this.model.get('meta').map((meta)=>{
			return `<div class="meta-category" id="meta-category-${meta.label}">
			<h3>${meta.label}</h3>` +
			meta.entries.map((entry)=>`<div><strong>${entry.label}</strong> : ${entry.value}</div>`).join("\n") +
			`</div>`;
		}).join("\n");
	}
}