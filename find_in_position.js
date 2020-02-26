const dictionary = require( "./dictionary" );

const chunkToFind = process.argv[2].split("");

const findIndex = ( running ) => {
	if( running.length == 1 ){
		return dictionary.indexOf( running[0] );
	}else{
		const currentLength	= running.length;
		const currentChar	= running.shift();

		// Get to [ A, ... ] where the length of the array is
		// whatever the currentLength is.

		const lengthOffset = Math.pow( dictionary.length, currentLength-1 );

		// currentChar offset of a given length
		const charLengthOffset = Math.pow( dictionary.length, dictionary.indexOf( currentChar ) );

		return lengthOffset + charLengthOffset + findIndex( running );
	}
};

console.log( findIndex( chunkToFind ) );
