import * as View from 'View';
export default class EntryPage extends View {
	constructor(subEditor){
		super();
		if(!subEditor){throw new Error("No sub editor provided.")}
		this.subEditor = subEditor;
		this.on('load',(ctx, done, next)=>{
			this.render();
			done();
		});
		this.el.innerHTML = `<div id="general" class="row">
		<form class="form col-md-4">
			<div class="form-group">
				<label for="mod">Mod</label>
				<input class="form-control" type="text" name="mod">
			</div>
			<div class="form-group">
				<label for="id">Id</label>
				<input class="form-control" type="text" name="id">
			</div>
		</div>
		<hr/>
		<div id="sub-editor">
		</div>`;
		this.qs('#sub-editor').appendChild(this.subEditor.el);
	}

	render(){

	}
}