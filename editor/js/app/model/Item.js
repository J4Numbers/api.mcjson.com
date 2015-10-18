import Model from 'mvc/Model';
export default class Item extends Model {
	constructor(){
		super({},{
			urlRoot: '/v1/items/'
		});
	}

	url(){
		return this.urlRoot + `${this.get('mod')}/${this.get('id')}.json`;
	}
}