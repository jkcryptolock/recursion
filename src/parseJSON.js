// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  // input json will always be string

  // array - if first char = [ & last char = ]
  // object - if first char = { and last char = };
  
  // parseJSON function wraps for inner function parseJSONString
  // parseJSONStrong recursively goes through the string and parses the string into output of:
    // output: array, object, number, string, boolean, null, or undefined
  // throws error if not able to recognize any 
  
  //
  if (json === 'null') {
  	return null;
  } else if (json === 'true') {
  	return true;
  } else if (json === 'false') {
  	return false;
  } else if (Number(json)) {
  	return Number(json);
  } else if (json[0] === '"' && json[json.length - 1] === '"') {
  	return json.slice(1, -1);
  } else if (json[0] === "'" && json[json.length - 1] === "'") {
  	return json.slice(1, -1);
  }

  if ((json[0] === '[') && (json[json.length - 1] === ']')) {
  	if (json === '[]'){
  		return [];
  	}
  	let contents = json.slice(1, -1);
  	let elements = contents.split(',');
  	let result = elements.map((el) => parseJSON(el));
  	return result;
  }

  if (json[0] === '{' && json[json.length - 1] === '}') {
  	var obj = {};
  	if (json === '{}') {
  		return {};
  	}
  	let objContents = json.slice(1, -1);
  	//console.log(objContents)
  	let colon = json.indexOf(':');
  	//console.log(colon)
  	let comma = json.indexOf(',');
  	//console.log(comma)
  	
  	let key = parseJSON(json.slice(1, colon));
  	
  	if (comma !== -1){
  		let value = parseJSON(json.slice(colon + 1, comma));
  		obj[key] = value;
  		json = json.slice(colon, comma)
  		//console.log(value)
  	} else {
  		let value = parseJSON(json.slice(colon + 1));
  		obj[key] = value;
  		//console.log(value);
  	}
  	console.log(key)

  	return obj;
  }
};
