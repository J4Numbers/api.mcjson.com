## Structure plan

* Router
  * /[table]
    * `<TableView url="/v1/blocks" />` element, store for fetching list, mapping to just and then tabling it
      * `{ list:[ { mod, id, name, added, updated } ...], filter:"" }`
      * FETCH `store.dispatch(fetchData(props.url)=>{action:'SET_LIST', list:[...]})`
      * FILTER `store.dispatch(setFilter(newFilter))`
  * /[table]/[mod]/[id]
    * `<TableSpecificEditor url="/v1/blocks/minecraft/stone" />`, editor for a specific type,  
      fetches data from url, saves back to it. Server MUST check mod/id against path and rename as   
      appropriate.
        * `{ data:{ specific fields...}, isDirty: true/false }`, save data back to `props.url`
        * FETCH `store.dispatch(fetchData(props.url)=>{action:'SET_DATA', data:{...} })`
        * SAVE `fetch(props.url, {method: "PUT", body: {..}}).then(()=>store.dispatch({action: 'CLEAR_DIRTY'))`
        * ..Editor specific actions (set mod/id/ add meta etc