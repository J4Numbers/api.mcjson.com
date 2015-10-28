import * as View from 'mvc/View';
export default class BlockEditor extends View {
	constructor(model){
		super();
		this.model = model;
		this.el.innerHTML = `<meta-category-list></meta-category-list>`;
		this.model.on('sync',()=>{
			this.qs("meta-category-list").setValue(this.model.get('meta'));
		})
	}

	render(){

	}
}