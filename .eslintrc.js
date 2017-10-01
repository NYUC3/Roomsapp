module.exports = 
{
  // http://eslint.org/docs/rules/
  "extends": [
  	"eslint:recommended",
  	"google"
 	],

	"parserOptions": {
		"ecmaVersion": 2017,
		"sourceType": "module"
	},

	"rules": {
		"padded-blocks": 0,
		"no-trailing-spaces": 0,
		"brace-style": 0,
		"object-curly-spacing": 0,
		"spaced-comment": 0,
		"block-spacing": 0,
		"max-len": [1, 120],
		"no-multi-str": 0
	},

	"env": {
		"node": true,
		"es6": true,
		"mocha": true
	}
}