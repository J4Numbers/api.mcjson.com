import * as View from 'mvc/View';
import {MetaCategoryList} from '../../widget/meta';
export default class BlockEditor extends View {
	constructor(model){
		super();
		this.model = model;
		this.metaEditor = new MetaCategoryList();
		this.el.appendChild(this.metaEditor.el);
		this.model.on('sync',()=>{
			this.metaEditor.setValue(this.model.get('meta'));
		})
	}

	render(){

	}
}