
let page = ( _ => {
	let exports = {};
	let data;
	let rdy = false;

	let gui_init = _ =>
		polyp.generate_from_description({
			"elements" :  [
				{
					"element_name" : "container_vertical",
					"path" : "body",
					"parameters" : {
						"id" : "container_main",
						"container_count" : 3
					}
				},
				{
					"element_name" : "list",
					"path" : "#container_main_1",
					"parameters" : {
						"id" : "container_main_bottom",
						"subelement_name" : "list_article",
						"subelements" : data.reverse().map(e => {return {
							"title" : e.title,
							"text" : e.text.map( e => e.trim()),	
							"add_class" : `year_${e.year}`
						}})
					}
				},	
				{
					"element_name" : "header",
					"path" : "#container_main_0",
					"parameters" : {
						"title" : "Zirkus Weisheit"
					}
				}
			],
			"hormone_id" : "afrika"
		}, qualle);

	let init = _ => {
		(Promise.resolve(null))
			.then(_ => qualle.init_from_context(document), console.error)
			.then(gui_init)
			.then(console.log, console.error);	
	};

	exports.init = (_data, page_rdy) => {
		if (_data) data = _data;
		if (page_rdy) rdy = true;

		if (data && rdy){
			init();
		}
	}

	return exports;
})();

page_init=page.init;

document.addEventListener("DOMContentLoaded", _ => page.init(void 0, true));
