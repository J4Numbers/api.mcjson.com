import BaseMetaModel from './BaseMetaModel';

export default class Block extends BaseMetaModel {
	constructor(attr){
		super(attr,{
			urlRoot: '/v1/blocks/'
		});
	}

}