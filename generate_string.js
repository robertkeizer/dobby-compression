const dictionary = require( "./dictionary" );

const lengthToGenerate = 100; 

const randomInDict = ( ) => {
	const min = 0;
	const max = dictionary.length-1;
	return dictionary[Math.floor(Math.random() * (max - min + 1)) + min];
}

let _result = "";
for( let i=0; i<lengthToGenerate; i++ ){
	_result += randomInDict();
}

console.log( _result );
