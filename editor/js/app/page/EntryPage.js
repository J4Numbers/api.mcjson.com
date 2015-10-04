import * as View from 'View';
export default class EntryPage extends View {
	constructor(){
		super();
		this.on('load',(ctx, done, next)=>{
			this.render();
			done();
		});

	}	
}