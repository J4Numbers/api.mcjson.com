import * as View from 'mvc/View';
export default class ItemEditor extends View {
	constructor(){
		super({
            events: {
                "change #type": (ev)=>{
                    this.model.set({ type: this.qs("#type").value});
                },
                "change .datetime": (ev)=>{
                    this.model.set({release: new Date( this.qs(".datetime [type=date]").value + " " + this.qs(".datetime [type=time]").value)})
                }
                "click #save": (ev)=>{
                    this.model.save();
                }
            }
        });
		this.el.innerHTML = `
        <label for='type'>Type:</label>
        <select id='type'>
        <option value="snapshot">Snapshot</option>
        <option value="release">Release</option>
        </select>
        <label>release:</label>
        <div class="datetime">
        <input type='date'/>
        <input type='time'/>
        </div>
        `;
        // "type":["release","snapshot"]
        // "released": "2015-08-07T14:08:17.000Z",
	}
}