// const list = require.context(".", true, /.js$/) 
const list = import.meta.globEager('./interface/*.js');
let apis = {}
for(let key in list) {
	if(key != "./index.js") {
		let obj = list[key]
		apis = {
			...apis,
			...obj
		}
	}
}
// list.keys().forEach(ele => {
// 	if(ele != "./index.js") { 
// 		let obj = list[ele]
// 		apis = {
// 			...apis,
// 			...obj
// 		}
// 	}
// })

// console.log(apis)

export default apis