import BaseMetaModel from './BaseMetaModel';

export default class Version extends BaseMetaModel {
	constructor(attr){
		super(attr,{
			urlRoot: '/v1/versions/'
		});
	}

}