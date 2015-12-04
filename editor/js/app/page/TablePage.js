import * as View from 'mvc/View';
export default class TablePage extends View {
  constructor(){
    super();
    this.data = [];
    this.filter = "";
    this.table = "NONE";
    this.on('load',(ctx, done, next)=>{
      this.loadData(ctx.params.table)
      .then(()=>{this.render();done()})
      
    });
    this.el.innerHTML = `<div id="heading"></div>
    <input type="text" id="filter"/>
    <table class="table">
    <thead>
    <tr>
    <th>Mod</th>
    <th>Id</th>
    <th>Released</th>
    <th>Updated</th>
    <th>Edit</th>
    </tr>
    </thead>
    <tbody id="entries"></tbody>
    </table>`;
    this.delegateEvents({
      "keyup #filter":()=>{
        this.filter = this.qs('#filter').value;
        this.render();
      }
    })
  }

  loadData(table){
    this.table = table;
    return fetch('v1/' + table)
    .then((resp) => resp.json())
    .then((data) => this.data = data)
  }

  render(){
    this.el.querySelector('#heading').innerHTML = `<h1>${this.table}</h1><p>Found ${this.data.length} entries</p>`;
    this.el.querySelector('#entries').innerHTML = this.data.filter((e)=> this.filter.length == 0 || e.id.toLowerCase().indexOf(this.filter.toLowerCase()) != -1).map((e)=>`<tr>
      <td>${e.mod}</td>
      <td>${e.id}</td>
      <td><version-select value="${e.introduced_at}"/></td>
      <td><version-select value="${e.changed_at}"/></td>
      <td><a href="#/${this.table}/${e.mod}/${e.id}" class="btn btn-primary edit">Edit</a></td>
    </tr>`).join('\n');
  }

}