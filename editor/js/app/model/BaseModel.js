import Model from 'mvc/Model';

export default class BaseModel extends Model {

	url(){
		return this.urlRoot + `${this.get('mod')}/${this.get('id')}`;
	}

}