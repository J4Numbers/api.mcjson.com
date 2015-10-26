import BaseModel from './BaseModel';

export default class Version extends BaseModel {
	constructor(attr){
		super(attr,{
			urlRoot: '/v1/versions/'
		});
	}

}