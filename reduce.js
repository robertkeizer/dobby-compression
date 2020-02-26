const Big = require( "big.js" );

Big.DP = 2000;

//const basesToCheck = [ 9, 8, 7, 6, 5, 4, 3, 2];
const basesToCheck = [ 2 ];

const numToReduce = Big( process.argv[2] );

const mergeFormula = ( str ) => {
	//console.log( "This is mergeFormula; I have str of " );
	//console.log( str );
	return str;
};

const reduce = ( running, str ) => {

	if( str !== "" ){
		console.log( running.toFixed().length + " digits and " + str );
	}

	if( running.toPrecision().length < 10 ){
		return str+"+"+running.toFixed()+";";
	}else{

		const best = basesToCheck.map( ( baseNum ) => {

			//console.log( "Testing base " + baseNum );

			// Some stupidly huge number that should be optimized more
			// at a later point
			let currentHighestExp = 1000;

			while(
				Big( running ).minus(
					Big(baseNum).pow( currentHighestExp )
				).lte( 0 ) ) {
				
				// Get smaller
				currentHighestExp = currentHighestExp-1;
			}

			const _new = running.minus( Big( baseNum ).pow( currentHighestExp ) );

			strToUse = str + baseNum + "^" + currentHighestExp.toFixed() + ";";

			return { baseNum, _new, strToUse };
		} ).reduce( ( best, c ) => {
			if( !best ){
				return c;
			}

			const bestLength = best._new.toFixed().length+best.strToUse.length;
			const cLength = c._new.toFixed().length+c.strToUse.length;

			if( cLength < bestLength ){
				best = c;
			}
			return best;
		}, null );

		// Let's go ahead and mangle the str to remove any duplicate
		// bases that exist
		const realStrToUse = mergeFormula( best.strToUse )

		if( best._new.s > 0 ){
			return reduce( best._new, realStrToUse);
		}else{
			console.log( "This should never happen." );
		}
	}
};
console.log( reduce( numToReduce,  "" ) );
