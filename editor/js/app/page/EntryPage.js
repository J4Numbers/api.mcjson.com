import View from 'mvc/View';

export default class EntryPage extends View {
	constructor(model, subEditor){
		super({
			events: {
				"change #general": (ev)=>{
					this.model.set({
						mod: this.qs("#general [name=mod]").value,
						id: this.qs("#general [name=id]").value
					});
				},
				"click #save": (ev)=>{
					this.model.save();
				}
			}
		});
		if(!subEditor){throw new Error("No sub editor provided.")}
		this.model = model;
		this.subEditor = new subEditor(this.model);
		this.on('load',(ctx, done, next)=>{
			this.model.set({
				mod: ctx.params.mod,
				id: ctx.params.id
			})
			this.model.fetch().then(()=>{
				console.log(this.model.url(),this.model.attributes)
				this.render();
				done();
			}).catch((resp)=>{
				if(resp.status == 404){
					//TODO: SHOW 404 OR MAKE IT A NEW PAGE
					this.model.clear();
					this.model.set({
						mod: ctx.params.mod,
						id: ctx.params.id
					});
					this.render();
					done();
				}
				console.error(resp.stack);
			});
		});
		this.el.innerHTML = `<div id="general" class="row">
		<form class="form col-md-4">
			<div class="form-group">
				<label for="mod">Mod</label>
				<input class="form-control" type="text" name="mod" readonly="true">
			</div>
			<div class="form-group">
				<label for="id">Id</label>
				<input class="form-control" type="text" name="id" readonly="true">
			</div>
		</div>
		<hr/>
		<div id="sub-editor">
		</div>
		<hr/>
		<button class="btn" id="save">Save</button>
		`;
		this.qs('#sub-editor').appendChild(this.subEditor.el);
	}

	render(){
		this.qs('[name=mod]').value = this.model.get('mod');
		this.qs('[name=id]').value = this.model.get('id');
		this.subEditor.render();
	}
}