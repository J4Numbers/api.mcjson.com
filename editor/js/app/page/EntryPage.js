import View from 'mvc/View';
import Item from '../model/Item';
export default class EntryPage extends View {
	constructor(subEditor){
		super({
			events: {
				"change *": (ev)=>{
					this.set(ev.target.getAttribute('name'),ev.target.value);
				}
			}
		});
		if(!subEditor){throw new Error("No sub editor provided.")}
		this.subEditor = subEditor;
		this.model = new Item();
		this.on('load',(ctx, done, next)=>{
			console.log(ctx);
			this.model.set({
				mod: ctx.params.mod,
				id: ctx.params.id
			})
			this.model.fetch().then(()=>{
				console.log(this.model.url(),this.model.attributes)
				this.render();
				done();
			});
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
			<div class="form-group">
				<label for="technical">Technical</label>
				<input type="checkbox" name="technical">
			</div>
		</div>
		<hr/>
		<div id="sub-editor">
		</div>`;
		this.qs('#sub-editor').appendChild(this.subEditor.el);
	}

	render(){
		this.qs('[name=mod]').value = this.model.get('mod');
		this.qs('[name=id]').value = this.model.get('id');
		this.qs('[name=technical]').checked = this.model.get('technical');
	}
}